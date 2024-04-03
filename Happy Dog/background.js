// Fired when the extension is first installed,
// when the extension is updated to a new version,
// and when Chrome is updated to a new version.
// chrome.runtime.onInstalled.addListener(function () {
//     // refresh all tabs
//     chrome.tabs.getAllInWindow(null, function (tabs) {
//         var today = new Date();
//         var currentTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//         console.log("refreshing all tabs at " + currentTime);
//         for (var i = 0; i < tabs.length; i++) {
//             chrome.tabs.update(tabs[i].id, { url: tabs[i].url });
//         }
//     })
// });

var currentTime = 0;
var lastTimeChecked = 0;
chrome.tabs.onCreated.addListener((tabId, changeInfo, tab) => {
    var currentDate = new Date();
    currentTime = currentDate.getTime(); // in milliseconds

    if (currentTime >= lastTimeChecked + 48 * 60 * 60 * 1000) { // recheck every 48 hours
        // do server check
        chrome.storage.local.get(['session', 'pet'], function (result) {
            var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/getState";
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    "pet": result.pet,
                    "space": result.session.space,
                }),
                headers: { 'Content-Type': 'application/json' }
            };

            fetch(endpoint_url, options)
                .then((response) => { return response.json(); })
                .then((myJson) => {
                    console.log(myJson);
                    if ((myJson['state_mood'] < 10) || (myJson['state_poop'] > 90) || (myJson['state_stomach'] < 10)) {
                        chrome.action.setBadgeBackgroundColor({ color: 'red' }, () => {
                            chrome.action.setBadgeText({ text: ' ' });
                        });
                    }
                });

        });
        lastTimeChecked = currentTime;
    }
});

// background.js
chrome.runtime.onConnect.addListener(function (port) {
    if (port.name === "popup") {
        port.onDisconnect.addListener(function () {
            console.log("popup has been closed");

            chrome.storage.local.get(['session', 'cached_actions', 'pet'], function (result) {
                if ((result.cached_actions.length == 0) || (result.cached_actions === undefined)) {
                    console.log("there is not batch action to update");
                    return;
                }

                var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/batch_action_update";
                let batch_action_update_request = {
                    "pet": result.pet,
                    "space": result.session.space,
                    "user": result.session.user,
                    "actions": result.cached_actions
                };

                console.log("making batch update on:");
                console.log(batch_action_update_request);

                const options = {
                    method: 'POST',
                    body: JSON.stringify(batch_action_update_request),
                    headers: { 'Content-Type': 'application/json' }
                };
        
                fetch(endpoint_url, options)
                    .then((response) => { return response.json(); })
                    .then((msg) => {
                        console.log(msg);
                        chrome.storage.local.set({ "cached_actions": [] });
                    });
            })
        });
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.referralCode){
        chrome.runtime.setUninstallURL('https://www.gethappydog.com/uninstall?id=' + request.referralCode);
    }

    if (request.handoff){
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { "continue": request.handoff});

            // for (var i = 1; i < tabs.length; i++) {
            //     chrome.tabs.sendRequest(tabs[i].id, { "hidePet": "xxx" });                         
            //   }

        });
    }
});

chrome.storage.local.get(['referral_code'], function (result) {
    chrome.runtime.setUninstallURL('https://www.gethappydog.com/uninstall?id=' + result.referral_code);
});

// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         console.log(sender.tab ?
//             "from a content script:" + sender.tab.url :
//             "from the extension");

//         console.log(request);

//         var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/batch_action_update";

//         const options = {
//             method: 'POST',
//             body: JSON.stringify(request.request),
//             headers: { 'Content-Type': 'application/json' }
//         };

//         fetch(endpoint_url, options)
//             .then((response) => { return response.json(); })
//             .then((msg) => {
//                 console.log(msg);
//             });
//     }
// );