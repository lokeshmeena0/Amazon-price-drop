console.log('content script 3 loaded');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // console.log('hello');
    // console.log(request.data);
    let priceDroppedItems = request.data.priceDroppedItems;
    // console.log(`Size of list: ${priceDroppedItems.length}`);
    let element = `<h3 style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                        sans-serif;">Prices of following items have dropped on amazon: </h3>`;
    console.log(priceDroppedItems);
    for (item of priceDroppedItems) {
        let itemName = item.product.name;
        let itemOldPrice = item.product.price;
        let itemNewPrice = item.newPrice;
        let itemLink = item.product.link;
        element = element + `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                            sans-serif;">
                                <p>Name: <b>${itemName}</b></p><br>
                                <p>Old Price: <b>${itemOldPrice}</b></p>
                                <p>New Price: <b>${itemNewPrice}</b></p><br>
                                <p>Check it out <a href=${itemLink}>here</a><hr>
                            </div>`;
    }
    alertify.alert('Amazon Price Drop Alert!', element);
});