function getNavigation() {
    var navigation = new Array();
    navigation.push($('div.qp[role="navigation"]'));
    navigation.push($('div.qp[role="navigation"]').next());
    return navigation;
}

function hideNavigation() {
    var topNavigation = getNavigation();
    console.log("Hiding Gmail top navigation...");
    for(var div in topNavigation) {
        if (topNavigation[div]) {
            topNavigation[div].slideUp("fast");
        }
    }
}

function showNavigation() {
    var topNavigation = getNavigation();
    console.log("Showing Gmail top navigation...");
    for(var div in topNavigation) {
        if (topNavigation[div]) {
            topNavigation[div].slideDown("fast");
        }
    }
}

var topNavigation = getNavigation();
if (topNavigation) {
    console.log("Applying current settings to Gmail page...");
    console.log(topNavigation);
    chrome.extension.sendRequest({method: "loadOptions"}, function(response) {
        console.log("Option saved is: " + response.hidden);
        if (response.hidden == "false" || response.hidden == undefined) {
            console.log("Option off - doing nothing.");
        } else {
            hideNavigation();
        }
    });
}

chrome.extension.onRequest.addListener( function(request, sender, sendResponse) {
    console.log("Message received to content script.");
    if (request.method == "showNavigation") {
        console.log("Received showNavigation message.");
        showNavigation();
        var response_message = "Executed showNavigation.";
    } else if (request.method == "hideNavigation") {
        console.log("Received hideNavigation messages.");
        hideNavigation();
        var response_message = "Executed hideNavigation.";
    } else {
        console.log("Received unknown message: " + request.method);
        var response_message = "Did not understand message.";
    }
    sendResponse({response: response_message});
});
