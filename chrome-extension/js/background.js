function onRequest(request, sender, sendResponse) {
    chrome.pageAction.show(sender.tab.id);
    if (request.method == "loadOptions") {
        console.log("Retrieving hidden setting...");
        console.log(localStorage.hidden);
        sendResponse({hidden: localStorage.hidden});
    } else if (request.method == "saveOptions") {
        console.log("Storing hidden setting...");
        console.log(request.options);
        localStorage["hidden"] = request.hidden;
    }
}
chrome.extension.onRequest.addListener(onRequest);
