// this script handles the delete item

console.log("content script 2 is loaded");

const deleteButtons = document.querySelectorAll('[id^="delete-button-"] input');

for(button of deleteButtons){
    console.log('Delete');
    button.addEventListener('click', function(){
        const str = button.getAttribute('aria-labelledby');
        const strArray = str.split('-');
        const itemId = strArray[2];
        console.log(itemId);
        chrome.runtime.sendMessage({delete:itemId});
    });
}

