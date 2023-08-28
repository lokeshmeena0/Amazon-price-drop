console.log("background script is running");

scrapItems();

setInterval(scrapItems, 30000);


function scrapItems(){
    let openWindow = window.open("https://www.amazon.in/gp/registry/wishlist?requiresSignIn=1&ref_=nav_AccountFlyout_wl");

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
        console.log(request.items);
        openWindow.close();
        if('delete' in request){
            console.log('yaya');
            const itemId = request.delete;
            $.ajax({
                type: 'GET',
                url: `http://localhost:8000/scrap/destroy/${itemId}`,
                success: function(data){
                    console.log('Data from server: ');
                    console.log(data);
                },
                error: function(err){
                    console.log('There was some error: ', err);
                } 
            });
        }else{
            // openWindow.close();
                $.ajax({
                type: 'POST',
                url: 'http://localhost:8000/scrap/scrapit',
                data: request,
                success: function(data){
                    console.log('Data from server: ');
                    console.log(data.data);
                    if('priceDropped' in data.data){
                        console.log('Dropped');
                        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                            chrome.tabs.sendMessage(tabs[0].id, data);
                        });
                    }else{
                        console.log('Updated');
                    }
                },
                error: function(err){
                    console.log('There was some error: ', err);
                } 
            });
        }
    });
}


