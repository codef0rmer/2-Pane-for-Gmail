function showPopup() {
    chrome.tabs.getSelected(null, function(tab) {
        console.log("Sending message to: " + tab.id);
        if (localStorage["hidden"] == "true") {
            var action = "showNavigation";
            localStorage["hidden"] = false;
        } else {
            var action = "hideNavigation";
            localStorage["hidden"] = true;
        }
        
        chrome.tabs.sendRequest(tab.id, {method: action}, function(response) {
            console.log("Response received: " + response.response);
            window.close();
        });
    });
}
document.addEventListener('DOMContentLoaded', showPopup);
