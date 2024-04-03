function disableButtons() {
    fetchBtn.disabled = true;
    feedButton.disabled = true;
    treatButton.disabled = true;
    toyButton.disabled = true;
    petButton.disabled = true;
    parkBtn.disabled = true;
    sendToDaycareBtn.disabled = true;

    fetchBtn.setAttribute("class", "bigActionButtonDisabled");
    feedButton.setAttribute("class", "actionButtonDisabled");
    treatButton.setAttribute("class", "actionButtonDisabled");
    toyButton.setAttribute("class", "actionButtonDisabled");
    petButton.setAttribute("class", "actionButtonDisabled");
    parkBtn.setAttribute("class", "actionButtonDisabled");
    sendToDaycareBtn.setAttribute("class", "actionButtonDisabled");
}

function enableButtons() {
    fetchBtn.disabled = false;
    feedButton.disabled = false;
    treatButton.disabled = false;
    toyButton.disabled = false;
    petButton.disabled = false;
    parkBtn.disabled = false;
    sendToDaycareBtn.disabled = false;

    fetchBtn.setAttribute("class", "bigActionButton");
    feedButton.setAttribute("class", "actionButton");
    treatButton.setAttribute("class", "actionButton");
    toyButton.setAttribute("class", "actionButton");
    petButton.setAttribute("class", "actionButton");
    parkBtn.setAttribute("class", "actionButton");
    sendToDaycareBtn.setAttribute("class", "actionButton");
}

function readTextFile(file, callback) {
    var obj = new XMLHttpRequest();
    obj.overrideMimeType("application/json");
    obj.open("GET", file, true);
    obj.onreadystatechange = function () {
        if (obj.readyState === 4 && obj.status == "200") {
            callback(obj.responseText);
        }
    }
    obj.send(null);
}

var count = true;
function displayStates(data) {
    console.log(data);
    console.log(data["xp"]);

    // var isSleeping = false;

    var spaceName = document.getElementById("spaceName");
    if (data?.['space']) spaceName.innerHTML = "Space: " + data['space'];

    var mood = document.getElementById("mood");
    if (data['state_mood'] > 75) mood.innerHTML = 'Happiest on earth';
    else if (data['state_mood'] > 50) mood.innerHTML = 'Delighted';
    else if (data['state_mood'] > 25) mood.innerHTML = 'Grumpy';
    else mood.innerHTML = 'Depressed';

    // var health = document.getElementById("health");
    // if(data['state_health'] > 75) health.innerHTML = 'Healthy';
    // else if(data['state_health'] > 50) health.innerHTML = 'Feeling alright';
    // else if(data['state_health'] > 25) health.innerHTML = 'Feeling sick';
    // else health.innerHTML = 'Critical condition';

    var stomach = document.getElementById("stomach");
    if (data['state_stomach'] > 75) stomach.innerHTML = 'Full tummy';
    else if (data['state_stomach'] > 50) stomach.innerHTML = 'Feels like eating';
    else if (data['state_stomach'] > 25) stomach.innerHTML = 'A little hungry';
    else stomach.innerHTML = 'Extremely hungry';

    var poop = document.getElementById("poop");
    if (data['state_poop'] == 100) {
        poop.innerHTML = '(~_~;)';
    }
    else if (data['state_poop'] > 75) poop.innerHTML = 'Holding hard';
    else if (data['state_poop'] > 50) poop.innerHTML = 'Feeling it';
    else if (data['state_poop'] > 25) poop.innerHTML = 'Not feeling it';
    else poop.innerHTML = 'Just went';

    var energy = document.getElementById("energy");
    if (data['state_energy'] > 75) energy.innerHTML = 'Let\'s play!';
    else if (data['state_energy'] > 50) energy.innerHTML = 'Well-rested';
    else if (data['state_energy'] > 25) energy.innerHTML = 'Tired';
    else energy.innerHTML = 'Extremely tired';

    var state = document.getElementById("state");
    // state.innerHTML = (data['with_user']?.length == 0 || data['with_user'] == undefined)
    //     ? data["name"] + " is here"
    //     : data["name"] + " is out with " + data['with_user'];

    // if(!(data['with_user']?.length == 0 || data['with_user'] == undefined)) 
    //     state.innerHTMLdata = data["name"] + " is out with " + data['with_user'];


    if (data['with_user']?.length == 0 || data['with_user'] == undefined) {
        // state.innerHTML = data["name"] + " is here";

        if (data['state_energy'] < 5) {
            state.innerHTML = "Sleeping...shh...will wake up in an hour.";
            hideGoodies();
        }
        else if (data['state_poop'] == 100) {
            state.innerHTML = data["name"] + " pooped on the carpet, please clean it up...";
        }
        else if (data['state_poop'] > 90) {
            state.innerHTML = data["name"] + " is about to poop on the carpet";
        }
        else if (data['state_stomach'] < 25) {
            state.innerHTML = data["name"] + " is hungry, about to eat garbage";
        }
        else if (data['state_mood'] < 50) {
            state.innerHTML = data["name"] + " is lonely, about to make trouble";
        }
        else if (count) {
            // pet is good, should clear the reminder red "dot"
            chrome.action.setBadgeText({ 'text': '' });

            readTextFile("quotes.json", function (text) {
                var quotesData = JSON.parse(text);
                var index = Math.floor(Math.random() * quotesData.length);

                state.innerHTML = (Math.random() > 0.1)
                    ? data["name"] + " is here"
                    : data["name"] + " found a quote <p>\"" + quotesData[index].text + " - " + quotesData[index].author + "\"</p>";

                count = false;
            });
        }
        
        if (data['state_energy'] < 5) {
            myPet.style.animationName = "sleep";
            myPetHead.style.animationName = "headSleeping";
            hideGoodies();
            isSleeping = true;
            document.getElementById("chatBubbleContainer").style.display = "none";
        }
        else {
            isSleeping = false;
            myPet.style.animationName = "normal";
            myPetHead.style.animationName = "headNormal";

            // myPet.style.animationName = "runningLeft";
            // myPetHead.style.animationName = "headRunningLeft";
            // slot1.style.animationName = "slot1RunningLeft";
            // slot2.style.animationName = "slot2RunningLeft";
            // slot4.style.animationName = "slot4RunningLeft";

            // myPet.style.animationName = "runningRight";
            // myPetHead.style.animationName = "headRunningRight";
            // slot1.style.animationName = "slot1RunningRight";
            // slot2.style.animationName = "slot2RunningRight";
            // slot4.style.animationName = "slot4RunningRight";
            // myPetBg.style.transform = "scaleX(-1)";
        }

        available = true;
    }
    else {
        state.innerHTML = data["name"] + " is out with " + data['with_user'];
        myPetHead.style.display = "none";
        available = false;
        hideGoodies();
    }

    if (data["xp"] > 0) {
        document.getElementById("xp").innerHTML = data["xp"];
    } else {
        document.getElementById("xp").innerHTML = 0;
    }

    // if (data["xp"] >= 200) {
    //     document.getElementById("redeemBtn").style.backgroundColor = background_color.buttons;
    //     document.getElementById("redeemBtn").disabled = false;
    // } else {
    //     document.getElementById("redeemBtn").style.backgroundColor = "#DBDBDB";
    //     document.getElementById("redeemBtn").disabled = true;
    // }

    document.getElementById("health-circle").setAttribute('style', 'stroke-dashoffset: ' + (248 - data['state_health'] * (248 / 100)));
    document.getElementById("mood-circle").setAttribute('style', 'stroke-dashoffset: ' + (155 - data['state_mood'] * (155 / 100)));
    document.getElementById("stomach-circle").setAttribute('style', 'stroke-dashoffset: ' + (155 - data['state_stomach'] * (155 / 100)));
    document.getElementById("poop-circle").setAttribute('style', 'stroke-dashoffset: ' + (155 - data['state_poop'] * (155 / 100)));
    document.getElementById("energy-circle").setAttribute('style', 'stroke-dashoffset: ' + (155 - data['state_energy'] * (155 / 100)));

    console.log("available: " + available);
    if ((available) && (isSleeping == false)) {
        if (lock == false)  enableButtons();
        document.getElementById("myPet").style.display = "block";
        document.getElementById("outSign").style.display = "none";
    }
    else {
        disableButtons();
        hideGoodies();
        if (available == false) {
            document.getElementById("myPet").style.display = "none";
            document.getElementById("shadowContainer").style.display = "none";
            document.getElementById("outSign").style.display = "flex";
        }
    }

    if (data['boarding']) {
        document.getElementById("petBox").style.display = "none";
        document.getElementById("state").style.display = "none";
        document.getElementById("pet_actions_and_states").style.display = "none";
        document.getElementById("atDaycare").style.display = "flex";
        document.getElementById("chatBubbleContainer").style.display = "none";
    }
    else {
        document.getElementById("petBox").style.display = "block";
        document.getElementById("state").style.display = "block";
        document.getElementById("pet_actions_and_states").style.display = "flex";
        document.getElementById("atDaycare").style.display = "none";
        document.getElementById("chatBubbleContainer").style.display = "flex";
    }

    if (data['state_poop'] == 100) {
        document.getElementById("poopImg").style.display = "block";
    }

    // if (data['personality']) {
    //     document.getElementById("personality").innerHTML = "Personality: " + data['personality'].join(", ")
    // }
}

document.getElementById("poopImg").addEventListener('click', function (event) {
    document.getElementById("poopImg").style.display = "none";

    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/poopCleanUp";
    const options = {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' }
    };

    fetch(endpoint_url, options)
        .then((response) => { return response.json(); })
        .then((msg) => {
            console.log(msg);
            state_data['state_poop'] = 0;
            displayStates(msg);
            // getState();
        });
});

// document.getElementById("redeemBtn").addEventListener('click', function (event) {
//     redeemGoodie();
// });

async function redeemGoodie() {
    console.log("make batch update before getting new goodies");
    const json = await batch_action_update();
    console.log("getting new goodie");

    console.log(request);
    showLoader();
    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/redeemGoodie";
    const options = {
        method: 'POST',
        body: JSON.stringify({
            "pet": request.pet,
            "space": request.space,
        }),
        headers: { 'Content-Type': 'application/json' }
    };
    fetch(endpoint_url, options)
        .then((response) => {
            hideLoader();
            location.reload();
            // getState();
        })
}

function getState() {
    console.log("getting state for:")
    console.log(request);
    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/getState";
    const options = {
        method: 'POST',
        body: JSON.stringify({
            "pet": request.pet,
            "space": request.space,
        }),
        headers: { 'Content-Type': 'application/json' }
    };

    fetch(endpoint_url, options)
        .then((response) => { return response.json(); })
        .then((myJson) => {
            console.log(myJson);
            state_data = myJson;
            displayStates(myJson);
            updateRecentActivity(myJson, false);
            request.pet_id = myJson.id;
            // sendMsgToActiveTab({"state": myJson});
            
            // TODO: move this somewhere else
            getAdRewardId()
        });
}

function getAdRewardId() {
    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/getAdRewardId";
    const options = {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' }
    };

    fetch(endpoint_url, options)
        .then((response) => { return response.json(); })
        .then((myJson) => {
            console.log(myJson);
            request.ad_reward_id = myJson;
        });
}

async function getPets(space) {
    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/getPetsAndBreed";
    const options = {
        method: 'POST',
        body: JSON.stringify({ "space": space }),
        headers: { 'Content-Type': 'application/json' }
    };

    console.log(options);

    let response = await fetch(endpoint_url, options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
}

function setSession(space, user) {
    request.space = space;
    request.user = user;
    chrome.storage.local.set({ "session": { "user": user, "space": space } }, function () {
        request.space = space;
        request.user = user;
        bg.remove();
    });

    chrome.tabs.query({}, function (tabs) {
        for (var i = 0; i < tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, { "session": { "user": user, "space": space } });
        }
    });
}

function setPet(myPet, myBreed) {
    chrome.storage.local.set({ "pet": myPet }, function () {
        request.pet = myPet;
        request.breed = myBreed
        petCreateBg.remove();
    });

    chrome.tabs.query({}, function (tabs) {
        for (var i = 0; i < tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, { "pet": myPet, "breed": myBreed });
        }
    });

    var breed = myBreed;

    addAnimation('@keyframes headNormal {\
        0% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') -3px 10px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(-15deg);\
        }\
        100% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') -3px 10px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(-15deg);\
        }\
    }');

    addAnimation('@keyframes headSleeping {\
        0% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-2.png") + ') 60px 90px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(92deg);\
        }\
        100% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-2.png") + ') 60px 90px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(90deg);\
        }\
    }');

    addAnimation('@keyframes headEating {\
        0% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') -13px 70px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(13deg);\
        }\
        10% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') -13px 60px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(13deg);\
        }\
        20% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') -13px 70px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(13deg);\
        }\
        30% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') -13px 60px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(13deg);\
        }\
        40% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') -13px 70px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(13deg);\
        }\
        50% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') -13px 60px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(13deg);\
        }\
        60% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') -13px 70px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(13deg);\
        }\
        70% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') -13px 70px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(13deg);\
        }\
        100% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') -13px 60px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(13deg);\
        }\
    }');

    addAnimation('@keyframes reset {\
        0% {}\
        100% {}\
    }');

    addAnimation('@keyframes slot1Eating {\
        0% {\
            transform: rotate(28deg) translateX(13px) translateY(45px);\
        }\
        10% {\
            transform: rotate(28deg) translateX(13px) translateY(40px);\
        }\
        20% {\
            transform: rotate(28deg) translateX(13px) translateY(45px);\
        }\
        30% {\
            transform: rotate(28deg) translateX(13px) translateY(40px);\
        }\
        40% {\
            transform: rotate(28deg) translateX(13px) translateY(45px);\
        }\
        50% {\
            transform: rotate(28deg) translateX(13px) translateY(40px);\
        }\
        60% {\
            transform: rotate(28deg) translateX(13px) translateY(45px);\
        }\
        70% {\
            transform: rotate(28deg) translateX(13px) translateY(40px);\
        }\
        100% {\
            transform: rotate(28deg) translateX(13px) translateY(45px);\
        }\
    }');

    addAnimation('@keyframes slot2Eating {\
        0% {\
            transform: rotate(28deg) translateX(25px) translateY(35px);\
        }\
        10% {\
            transform: rotate(28deg) translateX(25px) translateY(30px);\
        }\
        20% {\
            transform: rotate(28deg) translateX(25px) translateY(35px);\
        }\
        30% {\
            transform: rotate(28deg) translateX(25px) translateY(30px);\
        }\
        40% {\
            transform: rotate(28deg) translateX(25px) translateY(35px);\
        }\
        50% {\
            transform: rotate(28deg) translateX(25px) translateY(30px);\
        }\
        60% {\
            transform: rotate(28deg) translateX(25px) translateY(35px);\
        }\
        70% {\
            transform: rotate(28deg) translateX(25px) translateY(30px);\
        }\
        100% {\
            transform: rotate(28deg) translateX(25px) translateY(35px);\
        }\
    }');

    addAnimation('@keyframes headHappy {\
        0% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-3.png") + ') -3px 10px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(-15deg);\
        }\
        100% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-3.png") + ') -3px 10px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(-15deg);\
        }\
    }');

    addAnimation('@keyframes headTreat {\
        0% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-4.png") + ') -3px 10px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(-12deg);\
        }\
        50% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-4.png") + ') -3px 10px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(-17deg);\
        }\
        100% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-4.png") + ') -3px 10px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(-12deg);\
        }\
    }');

    addAnimation('@keyframes headToy {\
        0% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') -13px 70px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(10deg);\
        }\
        15% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') -13px 70px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(18deg);\
        }\
        30% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') -13px 70px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(10deg);\
        }\
        45% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') -13px 70px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(18deg);\
        }\
        60% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') 10px 10px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(-130deg);\
        }\
        100% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') 10px 10px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(-130deg);\
        }\
    }');

    addAnimation('@keyframes normal {\
        0% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-normal-2.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        25% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-normal-3.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        50% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-normal-2.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        75% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-normal-3.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        100% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-normal-2.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
    }');

    addAnimation('@keyframes happy {\
        0% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-happy-1.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        17% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-happy-2.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        34% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-happy-1.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        51% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-happy-2.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        68% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-happy-1.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        85% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-happy-2.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        100% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-happy-1.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
    }');
    
    addAnimation('@keyframes toy {\
        0% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-toy-1.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        15% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-toy-2.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        30% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-toy-1.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        45% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-toy-2.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        60% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-toy-3.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        100% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-toy-4.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
    }');

    addAnimation('@keyframes treat {\
        0% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-treat-1.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        25% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-treat-2.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        50% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-treat-1.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        75% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-treat-2.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        100% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-treat-1.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
    }');

    addAnimation('@keyframes eating {\
        0% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-eating-1.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        10% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-eating-2.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        20% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-eating-1.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        30% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-eating-2.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        40% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-eating-1.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        50% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-eating-2.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        60% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-eating-1.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        70% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-eating-3.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        100% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-eating-3.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
    }');

    addAnimation('@keyframes sleep {\
        0% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-sleep-1.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        33% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-sleep-1.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        66% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-sleep-2.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        100% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-sleep-3.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
    }');

    addAnimation('@keyframes normalRandom {\
        0% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-normal-random.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        100% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-normal-random.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
    }');

    addAnimation('@keyframes runningRight {\
        0% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-runningRight-1.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        17% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-runningRight-2.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        34% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-runningRight-1.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        51% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-runningRight-2.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        68% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-runningRight-1.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        85% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-runningRight-2.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        100% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-runningRight-1.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
    }');

    addAnimation('@keyframes runningLeft {\
        0% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-runningLeft-1.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        17% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-runningLeft-2.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        34% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-runningLeft-1.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        51% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-runningLeft-2.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        68% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-runningLeft-1.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        85% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-runningLeft-2.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
        100% {\
            background: url('+ chrome.runtime.getURL("images/breed" + breed + "/breed" + breed + "-runningLeft-1.png") + ');\
            background-size: contain;\
            background-repeat: no-repeat;\
        }\
    }');

    addAnimation('@keyframes headRunningRight {\
        0% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') 0px 40px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(-25deg) translateX(70px);\
        }\
        17% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') 0px 45px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(-25deg) translateX(70px);\
        }\
        34% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') 0px 40px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(-25deg) translateX(70px);\
        }\
        51% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') 0px 45px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(-25deg) translateX(70px);\
        }\
        68% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') 0px 40px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(-25deg) translateX(70px);\
        }\
        85% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') 0px 45px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(-25deg) translateX(70px);\
        }\
        100% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') 0px 40px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(-25deg) translateX(70px);\
        }\
    }');

    addAnimation('@keyframes headRunningLeft {\
        0% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') 0px 30px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(25deg) translateX(5px);\
        }\
        17% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') 0px 35px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(25deg) translateX(5px);\
        }\
        34% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') 0px 30px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(25deg) translateX(5px);\
        }\
        51% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') 0px 35px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(25deg) translateX(5px);\
        }\
        68% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') 0px 30px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(25deg) translateX(5px);\
        }\
        85% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') 0px 35px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(25deg) translateX(5px);\
        }\
        100% {\
            background: url('+ chrome.runtime.getURL("../images/breed" + breed + "/breed" + breed + "-head-1.png") + ') 0px 30px;\
            background-size: 160px 160px;\
            background-repeat: no-repeat;\
            transform: rotate(25deg) translateX(5px);\
        }\
    }');

    addAnimation('@keyframes slot1RunningRight {\
        0% {\
            transform: rotate(-10deg) translateX(75px) translateY(20px);\
        }\
        17% {\
            transform: rotate(-10deg) translateX(75px) translateY(25px);\
        }\
        34% {\
            transform: rotate(-10deg) translateX(75px) translateY(20px);\
        }\
        51% {\
            transform: rotate(-10deg) translateX(75px) translateY(25px);\
        }\
        68% {\
            transform: rotate(-10deg) translateX(75px) translateY(20px);\
        }\
        85% {\
            transform: rotate(-10deg) translateX(75px) translateY(25px);\
        }\
        100% {\
            transform: rotate(-10deg) translateX(75px) translateY(20px);\
        }\
    }');

    addAnimation('@keyframes slot1RunningLeft {\
        0% {\
            transform: rotate(40deg) translateX(30px) translateY(0px);\
        }\
        17% {\
            transform: rotate(40deg) translateX(30px) translateY(5px);\
        }\
        34% {\
            transform: rotate(40deg) translateX(30px) translateY(0px);\
        }\
        51% {\
            transform: rotate(40deg) translateX(30px) translateY(5px);\
        }\
        68% {\
            transform: rotate(40deg) translateX(30px) translateY(0px);\
        }\
        85% {\
            transform: rotate(40deg) translateX(30px) translateY(5px);\
        }\
        100% {\
            transform: rotate(40deg) translateX(30px) translateY(0px);\
        }\
    }');

    addAnimation('@keyframes slot2RunningRight {\
        0% {\
            transform: rotate(-10deg) translateX(70px) translateY(20px);\
        }\
        17% {\
            transform: rotate(-10deg) translateX(70px) translateY(25px);\
        }\
        34% {\
            transform: rotate(-10deg) translateX(70px) translateY(20px);\
        }\
        51% {\
            transform: rotate(-10deg) translateX(70px) translateY(25px);\
        }\
        68% {\
            transform: rotate(-10deg) translateX(70px) translateY(20px);\
        }\
        85% {\
            transform: rotate(-10deg) translateX(70px) translateY(25px);\
        }\
        100% {\
            transform: rotate(-10deg) translateX(70px) translateY(20px);\
        }\
    }');

    addAnimation('@keyframes slot2RunningLeft {\
        0% {\
            transform: rotate(40deg) translateX(48px) translateY(-15px);\
        }\
        17% {\
            transform: rotate(40deg) translateX(48px) translateY(-10px);\
        }\
        34% {\
            transform: rotate(40deg) translateX(48px) translateY(-15px);\
        }\
        51% {\
            transform: rotate(40deg) translateX(48px) translateY(-10px);\
        }\
        68% {\
            transform: rotate(40deg) translateX(48px) translateY(-15px);\
        }\
        85% {\
            transform: rotate(40deg) translateX(48px) translateY(-10px);\
        }\
        100% {\
            transform: rotate(40deg) translateX(48px) translateY(-15px);\
        }\
    }');

    addAnimation('@keyframes slot4RunningRight {\
        0% {\
            transform: rotate(-10deg) translateX(80px) translateY(10px);\
        }\
        17% {\
            transform: rotate(-10deg) translateX(80px) translateY(15px);\
        }\
        34% {\
            transform: rotate(-10deg) translateX(80px) translateY(10px);\
        }\
        51% {\
            transform: rotate(-10deg) translateX(80px) translateY(15px);\
        }\
        68% {\
            transform: rotate(-10deg) translateX(80px) translateY(10px);\
        }\
        85% {\
            transform: rotate(-10deg) translateX(80px) translateY(15px);\
        }\
        100% {\
            transform: rotate(-10deg) translateX(80px) translateY(10px);\
        }\
    }');

    addAnimation('@keyframes slot4RunningLeft {\
        0% {\
            transform: rotate(10deg) translateX(0px) translateY(0px);\
        }\
        17% {\
            transform: rotate(10deg) translateX(0px) translateY(5px);\
        }\
        34% {\
            transform: rotate(10deg) translateX(0px) translateY(0px);\
        }\
        51% {\
            transform: rotate(10deg) translateX(0px) translateY(5px);\
        }\
        68% {\
            transform: rotate(10deg) translateX(0px) translateY(0px);\
        }\
        85% {\
            transform: rotate(10deg) translateX(0px) translateY(5px);\
        }\
        100% {\
            transform: rotate(10deg) translateX(0px) translateY(0px);\
        }\
    }');
    addAnimation('@keyframes slot5RunningRight {\
        0% {\
            transform: rotate(-25deg) translateX(15px) translateY(12px) scaleX(-1);\
        }\
        17% {\
            transform: rotate(-30deg) translateX(15px) translateY(24px) scaleX(-1);\
        }\
        34% {\
            transform: rotate(-25deg) translateX(15px) translateY(12px) scaleX(-1);\
        }\
        51% {\
            transform: rotate(-30deg) translateX(15px) translateY(24px) scaleX(-1);\
        }\
        68% {\
            transform: rotate(-25deg) translateX(15px) translateY(12px) scaleX(-1);\
        }\
        85% {\
            transform: rotate(-30deg) translateX(15px) translateY(24px) scaleX(-1);\
        }\
        100% {\
            transform: rotate(-25deg) translateX(15px) translateY(12px) scaleX(-1);\
        }\
    }');
}

function displayAdoption() {
    document.body.appendChild(petCreateBg);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}