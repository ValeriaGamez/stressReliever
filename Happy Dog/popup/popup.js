const request = {
    "pet": undefined,
    "space": undefined,
    "user": undefined
};
let available = true;
let isSleeping = false;
let pets = [];
let lock = false;
let currentTabReady = false;
// let breed = 0;

let state_data = undefined;

var goodies_owned = [
    { "id": 1, "type": 1 },
    { "id": 23, "type": 2 },
    { "id": 31, "type": 3 }
];
let put_on_goodies = [true, false, false];

let favoriteUsers = [];

let cached_actions = [];

// chrome.storage.local.set({ "goodies_owned": goodies_owned });
// chrome.storage.local.set({ "put_on_goodies": put_on_goodies });
let goodie_bag_open = false;
document.getElementById("goodie_bag_detail").style.display = "none";

let goodies_loaded = false;

function putOnGoodies() {
    console.log(put_on_goodies);
    var slots_filled = [false, false, false, false];

    for (var i = 0; i < put_on_goodies.length; i++) {
        var x = i + 1;
        var type = goodies_owned[i]["type"];
        if (put_on_goodies[i]) {
            document.getElementById("goodie" + x).style.backgroundColor = "#FFFFFF";
            document.getElementById("goodie" + x).style.opacity = "0.7";
            document.getElementById("slot" + type).style.display = "block";
            document.getElementById("slot" + type).style.backgroundImage = "url('https://storage.googleapis.com/office-pets/goodies/" + goodies_owned[i]["id"] + ".png')";
            slots_filled[type - 1] = true;
        }
        else {
            document.getElementById("goodie" + x).style.backgroundColor = "transparent";
        }
    }
    if (!slots_filled[0]) document.getElementById("slot1").style.display = "none";
    if (!slots_filled[1]) document.getElementById("slot2").style.display = "none";
    if (!slots_filled[2]) document.getElementById("slot3").style.display = "none";
    if (!slots_filled[3]) document.getElementById("slot4").style.display = "none";
    if (!slots_filled[4]) document.getElementById("slot5").style.display = "none";
}

function hideGoodies() {
    document.getElementById("slot1").style.display = "none";
    document.getElementById("slot2").style.display = "none";
    document.getElementById("slot3").style.display = "none";
    document.getElementById("slot4").style.display = "none";
    document.getElementById("slot5").style.display = "none";
}

document.getElementById("goodie_bag").addEventListener("click", function (event) {
    goodie_bag_open = !goodie_bag_open;
    if (goodie_bag_open) {
        if(goodies_loaded == false) {
            getGoodiesOwned(true);
        }
        
        document.getElementById("goodie_bag_detail").style.display = "flex";
        document.getElementById("goodie_bag").style.transform = 'rotate(90deg)';
    }
    else {
        document.getElementById("goodie_bag_detail").style.display = "none";
        document.getElementById("goodie_bag").style.transform = 'rotate(0deg)';
    }
});

document.getElementById("photoshoot").addEventListener("click", function (event) {                    
    photoshootBg.style.display = "flex";
    picture.style.backgroundColor = "#F2F2F2";
    picture.style.backgroundImage = "none";

    var flash = document.createElement('div');
    flash.setAttribute("class", "flash");
    document.body.appendChild(flash);

    setTimeout(() => {
        flash.style.display = "none";
      }, "1000")

    let shootRequest = {...request};

    for (var i = 0; i < put_on_goodies.length; i++) {
        var x = i + 1;
        var type = goodies_owned[i]["type"];
        if (put_on_goodies[i]) {
            shootRequest["goodie" + type] = goodies_owned[i]["id"];
        }
    }
    shootRequest["breed"] = "breed" + request.breed;
    shootRequest["background"] = background_color.top_background.replace("#", "");
    console.log(shootRequest);

    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/createImage-2";
    const options = {
        method: 'POST',
        body: JSON.stringify(shootRequest),
        headers: { 'Content-Type': 'application/json' }
    };
    fetch(endpoint_url, options).then((response) => 
    {
        if(response.status == 200){
            return response.text();
        }
        else{
            return "error";
        }
    })
    .then((text) => {
        picture.src = "https://storage.googleapis.com/office-pets/photobook/" + text + ".png";
        draftPhotoId = text;
    });
});

bg = document.createElement('div');
bg.setAttribute("class", "bg");
// document.body.appendChild(bg);

var logoImg = document.createElement('img');
logoImg.setAttribute("src", "logo.png");
logoImg.setAttribute("class", "logo");
logoImg.style.width = "100px";

// var formDiv = document.createElement("div");
// formDiv.setAttribute("class", "formDiv");

// var form = document.createElement("form");
// form.setAttribute("method", "post");

// var NAME = document.createElement("input");
// NAME.setAttribute("type", "text");
// NAME.setAttribute("name", "name");
// NAME.setAttribute("placeholder", "The name your friends call you");
// NAME.setAttribute("class", "formField");
// NAME.setAttribute("required", true);

// var SPACE = document.createElement("input");
// SPACE.setAttribute("type", "text");
// SPACE.setAttribute("name", "space");
// SPACE.setAttribute("placeholder", "Space");
// SPACE.setAttribute("class", "formField");
// SPACE.setAttribute("required", true);

// var s = document.createElement("input");
// s.setAttribute("type", "submit");
// s.setAttribute("value", "Join or create space");
// s.setAttribute("class", "formBtn");

// form.appendChild(NAME);
// form.appendChild(SPACE);
// form.appendChild(s);
// formDiv.appendChild(form);
bg.appendChild(logoImg);
// bg.appendChild(formDiv);

petCreateBg = document.createElement('div');
petCreateBg.setAttribute("class", "bg");
petCreateBg.style.backgroundColor = "white";
// document.body.appendChild(petCreateBg);

var petCreateFormDiv = document.createElement("div");
petCreateFormDiv.setAttribute("class", "formDiv");
petCreateFormDiv.style.marginTop = "10px";

var petCreateText = document.createElement("p");
petCreateText.setAttribute("class", "formPrompt");
petCreateText.innerHTML = "This space has no pet. Adopt one now:";

pickPetBg = document.createElement('div');
pickPetBg.setAttribute("class", "petPickDiv");
var petImg = document.createElement('img');
petImg.style.width = "180px";

var leftBtn = document.createElement('button');
leftBtn.innerHTML = "<";
leftBtn.setAttribute("class", "petSelectBtn");
pickPetBg.appendChild(leftBtn);

pickPetBg.appendChild(petImg);

var rightBtn = document.createElement('button');
rightBtn.innerHTML = ">";
rightBtn.setAttribute("class", "petSelectBtn");
pickPetBg.appendChild(rightBtn);

var petCreateForm = document.createElement("form");
petCreateForm.setAttribute("method", "post");

var petName = document.createElement("input");
petName.setAttribute("type", "text");
petName.setAttribute("placeholder", "Give your pet a name");
petName.setAttribute("class", "formField");
petName.setAttribute("required", true);
petName.style.backgroundColor = "#FAFAFA";

var petCreateBtn = document.createElement("input");
petCreateBtn.setAttribute("type", "submit");
petCreateBtn.setAttribute("value", "Submit Adoption Request!");
petCreateBtn.setAttribute("class", "formBtn");

var leaveSpaceBtn = document.createElement("button");
leaveSpaceBtn.setAttribute("class", "secondaryBtn");
leaveSpaceBtn.innerHTML = "Leave space";

petCreateForm.appendChild(petName);
// petCreateForm.appendChild(field2);
// petCreateForm.appendChild(field3);
petCreateForm.appendChild(petCreateBtn);
petCreateForm.appendChild(leaveSpaceBtn);
petCreateFormDiv.appendChild(petCreateForm);

petCreateBg.appendChild(petCreateText);
petCreateBg.appendChild(pickPetBg);
petCreateBg.appendChild(petCreateFormDiv);

var loader = document.getElementById("loader");
loader.style.left = '0px';
loader.style.top = '0px';
loader.style.width = '100%';
loader.style.height = '2000px';
loader.style.backgroundColor = 'white';
loader.style.zIndex = "111111111";
// loader.style.opacity = '80%';
loader.style.position = "absolute";
loader.style.display = "none";


function showLoader() {
    loader.style.display = "block";
}

function hideLoader() {
    loader.style.display = "none";
}

chrome.storage.local.get(['session', 'pet', 'put_on_goodies', 'goodies_owned'], function (result) {
    console.log(result);
    console.log(result.put_on_goodies);
    if (result.session?.user && result.session?.space) {
        bg.remove();
        console.log("current session:");
        console.log(result.session);
        request.space = result.session.space;
        request.user = result.session.user;

        if (result.pet) {
            request.pet = result.pet;
        } 

        getPets(result.session.space)
            .then((response) => { return response.json(); })
            .then((myJson) => {
                console.log(myJson);
                if (myJson.length > 0) {
                    pets = myJson;
                    setPet(myJson[0]['name'], myJson[0]['breed']);
                    updateCurrentPet();
                } else displayAdoption();
            });

        console.log(request);

        getGoodiesOwned(false);
        fetchMessage(request);
    }
    else{
        loginBg.style.display = "flex";
        photobookBg.style.display = "flex";
    }
});

function addItemToBag(idx) {
    var div = document.createElement("div");
    div.style = "height: 40px; width: 40px; border-radius: 10px; margin-right: 3px; cursor: pointer; background-size: 40px 40px; margin-bottom: 3px"
    div.setAttribute("id", "goodie" + idx);
    div.addEventListener("click", function (event) {
        var index = parseInt(event.target.id.replace("goodie", ""));
        if (put_on_goodies[index - 1]) {
            put_on_goodies[index - 1] = false;
        }
        else {
            // first take down goodies of the type
            var type = goodies_owned[index - 1]["type"];
            for (var i = 0; i < put_on_goodies.length; i++) {
                if (goodies_owned[i]["type"] == type) {
                    put_on_goodies[i] = false;
                }
            }
            put_on_goodies[index - 1] = true;
        }
        chrome.storage.local.set({ "put_on_goodies": put_on_goodies });
        putOnGoodies();
    });
    div.style.backgroundImage = "url('https://storage.googleapis.com/office-pets/goodies/" + goodies_owned[idx - 1]["id"] + ".png')";
    document.getElementById("goodies_bag_inside").appendChild(div);
}

var fetchBtn = document.getElementById("fetch-btn");
fetchBtn.addEventListener('click', function (event) {
    if (available) {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
            var tab = tabs[0];
            if (tab.url.startsWith("https://chrome.google.com/")) {
                alert("https://chrome.google.com/ does not allow your pet to be there. Try on a different website.");
            }
            else if (tab.url.startsWith("https://chromewebstore.google.com/")) {
                alert("https://chromewebstore.google.com/ does not allow your pet to be there. Try on a different website.");
            }
            else if (tab.url.startsWith("chrome://newtab/")) {
                alert("The New Tab page does not allow your pet to be there. Try on a different website.");
            }
            // else if (currentTabReady == false){
            //     alert("Please refresh the current tab first.");
            // }
            else {
                sendMsgToActiveTab({ "action": "fetch", 
                    "goodies": {
                        "slot1": slot1.style.backgroundImage,
                        "slot2": slot2.style.backgroundImage,
                        "slot4": slot4.style.backgroundImage,
                        "slot5": slot5.style.backgroundImage,
                    },
                    "state_data": state_data
                });
                showLoader();
                setTimeout(function doneFetch() {
                    hideLoader();
                    window.close();
                }, 5000);
            }
        });
    } else {
        alert(request.pet + " is busy");
    }
});

var parkBtn = document.getElementById("dogPark");
parkBtn.addEventListener('click', function (event) {
    if (request.pet_id){
        var link = "https://www.gethappydog.com/park/?id=" + request.pet_id + "&breed=" + request.breed;
        window.open(link, "_blank");
    }
});

var activity1 = document.getElementById("activity1");
var activity2 = document.getElementById("activity2");
var activity3 = document.getElementById("activity3");

function getRecentActivity() {
    if (request.space == undefined || request.user == undefined || request.pet == undefined) return;
    console.log("getting recent activities");
    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/getRecentActivity";
    const options = {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' }
    };
    fetch(endpoint_url, options)
        .then((response) => { return response.json(); })
        .then((myJson) => {
            hideLoader();
            if (myJson.length == 0) {
                for (var i = 0; i < 5; i++) {
                    document.getElementById("activity" + (i + 1).toString()).innerHTML = "";
                }
                return;
            }

            for (var i = 0; i < 5; i++) {
                const elem = document.getElementById("activity" + (i + 1).toString());
                const time = new Date(Date.parse(myJson[i]['time']));
                const now = Date.now();
                let timeDiff = (now - time) / 1000 / 60;
                let timeUnit = "minutes";
                if (timeDiff >= 60) {
                    timeDiff = timeDiff / 60;
                    timeUnit = "hours";
                } else if (timeDiff >= 60 * 24) {
                    timeDiff = timeDiff / (60 * 24);
                    timeUnit = "days";
                }

                let act = "hanged out with ";
                if (myJson[i]['activity'] == "poop") {
                    act = "taken out to poop by "
                } else if (myJson[i]['activity'] == "treat") {
                    act = "given a treat by "
                } else if (myJson[i]['activity'] == "toy") {
                    act = "played toy with "
                } else if (myJson[i]['activity'] == "pet") {
                    act = "pet by "
                } else if (myJson[i]['activity'] == "walk") {
                    act = "went for a walk with "
                } else if (myJson[i]['activity'] == "feed") {
                    act = "fed by "
                }

                elem.innerHTML = timeDiff.toFixed(0) + " " + timeUnit + " ago: " + act + myJson[i]['by_user'];

                if ( (timeUnit == "minutes") && (timeDiff < 5) ) {
                    elem.innerHTML = "Just now: " + act + myJson[i]['by_user'];
                }
            }
        });
}

function updateRecentActivity(data, justHappened){
    if(data["activity"]){
        for (var i = 0; i < Math.min(5, data["activity"].length); i++) {            
            const elem = document.getElementById("activity" + (i + 1).toString());
            const time = new Date(Date.parse(data['time'][i]));
            const now = Date.now();
            let timeDiff = (now - time) / 1000 / 60;
            let timeUnit = "minutes";
            if (timeDiff >= 60) {
                timeDiff = timeDiff / 60;
                timeUnit = "hours";
            } else if (timeDiff >= 60 * 24) {
                timeDiff = timeDiff / (60 * 24);
                timeUnit = "days";
            }

            let act = "hanged out with ";
            if (data['activity'][i] == "poop") {
                act = "taken out to poop by "
            } else if (data['activity'][i] == "treat") {
                act = "given a treat by "
            } else if (data['activity'][i] == "toy") {
                act = "played toy with "
            } else if (data['activity'][i] == "pet") {
                act = "pet by "
            } else if (data['activity'][i] == "walk") {
                act = "went for a walk with "
            } else if (data['activity'][i] == "feed") {
                act = "fed by "
            }
            if (justHappened){
                if (i == 0) timeDiff = 0;
            }

            elem.innerHTML = timeDiff.toFixed(0) + " " + timeUnit + " ago: " + act + data['by_user'][i];

            if ( (timeUnit == "minutes") && (timeDiff < 5) ) {
                elem.innerHTML = "Just now: " + act + data['by_user'][i];
            }
        }
    }
}

function getScores() {
    if (request.space == undefined || request.user == undefined || request.pet == undefined) return;
    console.log("Getting favorite users...");
    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/getFavoriteUsers";
    const options = {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' }
    };
    fetch(endpoint_url, options)
        .then((response) => { return response.json(); })
        .then((myJson) => {
            console.log(myJson);

            for (let i = 0; i < myJson.length; i++) {
                if (myJson[i]["by_user"] == request.user) {
                    myJson[i]["count"] += cached_actions.length;
                }
            }

            favoriteUsers = myJson;
            console.log(myJson);
            sorted = myJson.sort((a, b) => (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0));
            if (sorted[0]?.['by_user']) {
                document.getElementById("firstFav").innerHTML = "1: " + sorted[0]['by_user'];
                confirmTextPplList.innerHTML = sorted[0]?.['by_user'];
            }
            if (sorted[1]?.['by_user']) {
                document.getElementById("secondFav").innerHTML = "2: " + sorted[1]['by_user'];
                confirmTextPplList.innerHTML = confirmTextPplList.innerHTML + ", " + sorted[1]?.['by_user'];
            }
            if (sorted[2]?.['by_user']) {
                document.getElementById("thirdFav").innerHTML = "3: " + sorted[2]['by_user'];
            }
            if (sorted.length > 0) {
                if (sorted.length > 2) {
                    confirmTextPplList.innerHTML = confirmTextPplList.innerHTML + " and " + String(sorted.length - 2) + " other people are members of this space";
                }
                else if (sorted.length == 1) {
                    confirmTextPplList.innerHTML = confirmTextPplList.innerHTML + " is member of this space";
                }
                else if (sorted.length == 2) {
                    confirmTextPplList.innerHTML = confirmTextPplList.innerHTML + " are members of this space";
                }
            }

            if (sorted[0]?.['count']) document.getElementById("firstFavScore").innerHTML = sorted[0]['count'];
            if (sorted[1]?.['count']) document.getElementById("secondFavScore").innerHTML = sorted[1]['count'];
            if (sorted[2]?.['count']) document.getElementById("thirdFavScore").innerHTML = sorted[2]['count'];

            var userScore = sorted.filter(obj => {
                return obj.by_user === request.user
            })
            if (userScore[0]) document.getElementById("personalScore").innerHTML = userScore[0]['count'];
        });
}

function updateFavoriteUsers(data){
    console.log(data);
    sorted = data.sort((a, b) => (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0));
    if (sorted[0]?.['by_user']) {
        document.getElementById("firstFav").innerHTML = "1: " + sorted[0]['by_user'];
        confirmTextPplList.innerHTML = sorted[0]?.['by_user'];
    }
    if (sorted[1]?.['by_user']) {
        document.getElementById("secondFav").innerHTML = "2: " + sorted[1]['by_user'];
        confirmTextPplList.innerHTML = confirmTextPplList.innerHTML + ", " + sorted[1]?.['by_user'];
    }
    if (sorted[2]?.['by_user']) {
        document.getElementById("thirdFav").innerHTML = "3: " + sorted[2]['by_user'];
    }

    if (sorted[0]?.['count']) document.getElementById("firstFavScore").innerHTML = sorted[0]['count'];
    if (sorted[1]?.['count']) document.getElementById("secondFavScore").innerHTML = sorted[1]['count'];
    if (sorted[2]?.['count']) document.getElementById("thirdFavScore").innerHTML = sorted[2]['count'];

    var userScore = sorted.filter(obj => {
        return obj.by_user === request.user
    })
    if (userScore[0]) document.getElementById("personalScore").innerHTML = userScore[0]['count'];
}

async function getGoodiesOwned(shouldFetchOnline) {
    chrome.storage.local.get(['put_on_goodies', 'goodies_owned'], async function (result) {
        console.log(result);
        if (result.put_on_goodies === undefined) {
            chrome.storage.local.set({ "put_on_goodies": put_on_goodies });
        }
        else {
            put_on_goodies = result.put_on_goodies;
        }

        if (result.goodies_owned === undefined) {
            chrome.storage.local.set({ "goodies_owned": goodies_owned });
        }
        else {
            goodies_owned = result.goodies_owned;
        }

        removeAllChildNodes(document.getElementById("goodies_bag_inside"));

        if(shouldFetchOnline) {
            console.log("fetching goodies...");
            var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/getGoodies";
            const options = {
                method: 'POST',
                body: JSON.stringify(request),
                headers: { 'Content-Type': 'application/json' }
            };
            const response = await fetch(endpoint_url, options);
            console.log(request);
            console.log(response);
            if (response.ok) {
                try {
                    await response.json().then(myJson => {
                        console.log(goodies_owned);
                        console.log(goodies_owned.length);
                        console.log(myJson);
                        var new_goodies = [];
                        for (var i = 0; i < myJson.length; i++) {
                            // check if there are new goodies locally not stored
                            var new_goodie = true;
                            for (var j = 0; j < goodies_owned.length; j++) {
                                if (myJson[i]["id"] == goodies_owned[j]["id"]) {
                                    new_goodie = false;
                                }
                            }

                            if (new_goodie) new_goodies.push(myJson[i]);
                        }
                        console.log("new...")
                        console.log(new_goodies);

                        if (new_goodies.length > 0) {
                            //if there are new goodies, show the goodie bag
                            document.getElementById("goodie_bag_detail").style.display = "flex";
                            document.getElementById("goodie_bag").style.transform = 'rotate(90deg)';

                            for (var i = 0; i < new_goodies.length; i++) {
                                // if there are new goodies, for each new goodie:
                                // append a new "false" item to put_on_goodies
                                // append the new item to goodies_owned
                                put_on_goodies.push(false);
                                goodies_owned.push(new_goodies[i]);
                                // addItemToBag(goodies_owned.length);
                            }

                            chrome.storage.local.set({ "goodies_owned": goodies_owned });
                            chrome.storage.local.set({ "put_on_goodies": put_on_goodies });
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
                goodies_loaded = true;
            }
        }

        for (var i = 0; i < put_on_goodies.length; i++) {
            var idx = i + 1;
            addItemToBag(idx);
        }
        if (isSleeping == false)    putOnGoodies();
    });
}

sendMsgToActiveTab({ "ping": "hello" });
function sendMsgToActiveTab(msg) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, msg, function(response){
            if (response?.hasOwnProperty('farewell')){
                console.log(response.farewell);
                currentTabReady = true;
            }
        });
    });
}


var pickedIdx = 0;
var maxPetIdx = 10;
setPetImg(pickedIdx);

function setPetImg(idx) {
    petImg.setAttribute("src", "pet_" + idx + ".png");
}

leftBtn.addEventListener("click", function () {
    pickedIdx = (pickedIdx > 0) ? pickedIdx - 1 : maxPetIdx
    console.log(pickedIdx);
    setPetImg(pickedIdx);
});

rightBtn.addEventListener("click", function () {
    pickedIdx = (pickedIdx < maxPetIdx) ? pickedIdx + 1 : 0
    console.log(pickedIdx);
    setPetImg(pickedIdx);
});

let currentSlot = 0;

function updateCurrentPet() {
    request.pet = pets[currentSlot]['name'];

    document.getElementById("firstFav").innerHTML = "1: ";
    document.getElementById("secondFav").innerHTML = "2: ";
    document.getElementById("thirdFav").innerHTML = "3: ";
    document.getElementById("firstFavScore").innerHTML = "";
    document.getElementById("secondFavScore").innerHTML = "";
    document.getElementById("thirdFavScore").innerHTML = "";
    document.getElementById("personalScore").innerHTML = "";

    // getRecentActivity();
    getState();
    // getScores();
}

let dynamicStyles = null;
function addAnimation(body) {
    //   if (!dynamicStyles) {
    dynamicStyles = document.createElement('style');
    dynamicStyles.type = 'text/css';
    document.head.appendChild(dynamicStyles);
    //   }
    dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
}

var newAction = false;

var myPet = document.getElementById("myPet");
myPet.setAttribute('style', 'height: 240px; width: 200px');
myPet.style.animationName = "normal";
myPet.style.animationDuration = "1s";
myPet.style.alignItems = "center";
myPet.style.animationIterationCount = "infinite";

var myPetHead = document.getElementById("myPetHead");
myPetHead.setAttribute('style', 'height: 240px; width: 200px; position: absolute; top: 0px;');
myPetHead.style.animationName = "headNormal";
myPetHead.style.animationDuration = "1s";
myPetHead.style.animationIterationCount = "infinite";

var slot1 = document.getElementById("slot1");
slot1.style.animationName = "slot1Normal";
slot1.style.animationDuration = "1s";
slot1.style.animationIterationCount = "infinite";

var slot2 = document.getElementById("slot2");
slot2.style.animationName = "slot1Normal";
slot2.style.animationDuration = "1s";
slot2.style.animationIterationCount = "infinite";

var slot4 = document.getElementById("slot4");
slot4.style.animationName = "slot1Normal";
slot4.style.animationDuration = "1s";
slot4.style.animationIterationCount = "infinite";

var slot5 = document.getElementById("slot5");
slot5.style.animationName = "slot1Normal";
slot5.style.animationDuration = "1s";
slot5.style.animationIterationCount = "infinite";

var feedButton = document.getElementById("feedButton");
feedButton.addEventListener('click', function (event) {
    disableButtons();
    if (lock) return;

    lock = true;

    updateChatBubble("feed");

    const time = new Date();
    if(state_data["activity"]){
        state_data["activity"].unshift("feed");
        state_data["time"].unshift(time);
        state_data["by_user"].unshift(request.user);
    }
    else{
        state_data["activity"] = ["feed"];
        state_data["time"] = [time];
        state_data["by_user"] = [request.user];

    }

    if(state_data["xp"])    state_data["xp"] ++;
    else    state_data["xp"] = 1;

    if(state_data['state_stomach'] < 50)   state_data['state_stomach'] = state_data['state_stomach'] + 50;
    else    state_data['state_stomach'] = 100;

    if(state_data['state_energy'] > 1)   state_data['state_energy'] = state_data['state_energy'] - 1;
    else    state_data['state_energy'] = 0;
    
    displayStates(state_data);
    updateRecentActivity(state_data, true);
    cached_actions.push("feed");
    chrome.storage.local.set({ "cached_actions": cached_actions });

    myPet.style.animationName = "eating";
    myPetHead.style.animationName = "headEating";
    slot1.style.animationName = "slot1Eating";
    slot2.style.animationName = "slot2Eating";
    slot4.style.animationName = "reset";
    // hideGoodies();
    setTimeout(reset, 3000);
});

var lastChatBubbleShown = new Date().getTime();
function updateChatBubble(action) {
    lastChatBubbleShown = new Date().getTime();
    document.getElementById("dismissChatBubble").style.display = "block";
    document.getElementById("chatBubbleBg").style.display = "block";

    let msg;
    if (action == "pet"){
        let msgs = ["Thanks for petting me!", "I love it when you pet me!", "Woof! Keep petting me!",
            "Woof woof! Keep going!", "You're the paw-someest petter!", "Arf arf, keep those scritches coming!",
            "I love when you pet me, it's like a massage for my fur.", "Arf, arf! More scratches, please!", "Mmm, that's the stuff! Keep it up! 🐾",
        ]
        msg = msgs[Math.floor(Math.random()*msgs.length)]
    }
    if (action == "feed"){
        let msgs = ["Woof! Thanks for feeding me!", "Yum! I love food!", "Nom Nom Nom...Thanks for feeding me!", "Nom, Nom, Nom...Delicious!",
        "Yummy! Thank you so much for this delicious meal!",
        "Nom Nom Nom! I've been waiting for this all day! You're the best!",
        "Oh wow, my favorite! You really know how to make me happy!",
        "My tummy feels so satisfied and content. You're such a good owner!",
        "Woof woof! Yummy! This food is absolutely delicious!",
        "Thank you so much for the tasty meal! I can't wag my tail enough!",
        "Oh boy, you really know how to make a dog's belly happy! I'm so lucky.",
        "My tummy is full and my heart is bursting with gratitude. You're the best!",
        "I gobble up every bite and savor the flavor. Your cooking skills are top-notch!"
    ]
        msg = msgs[Math.floor(Math.random()*msgs.length)]
    }
    if (action == "treat"){
        let msgs = ["Woof! Yes! Treat!", "I love treats! Nom Nom Nom...", "Om nom nom! Thanks for the treat!",
            "Oh boy! Treat time! I can't resist these tasty morsels!",
            "Mmm, these treats are pawsome! Thank you for spoiling me!",
            "You're the best! Treats make me feel loved and appreciated!",
            "Yippee! Treats are like tiny bursts of happiness in my mouth!",
            "I would do tricks all day just to get more of these yummy treats!",
            "Yummy! Treats like this make life so much sweeter. You're the best!",
            "Woof! Yummy! Treat time is the best time!",
            "Arf arf arf! Treats make life pawsitively wonderful!"
        ]
        msg = msgs[Math.floor(Math.random()*msgs.length)]
    }
    if (action == "toy"){
        let msgs = ["Woof Woof! I love playing toy with you!", "That's my favorite toy! Woof!",
            "Yippee! I can't wait to play with this toy! You're the greatest!",
            "Wow, you really know what I love! This toy is pawsitively fantastic!",
            "This toy is so much fun! Thank you for making me the happiest dog in the world!",
            "You always find the coolest toys! I'm one lucky pup!",
            "Woof woof! Thank you for the toy! I love it!",
            "Ruff ruff ruff! This toy is pawsitively amazing! I love you!"
        ]
        msg = msgs[Math.floor(Math.random()*msgs.length)]
    }

    if ((msg) && (document.getElementById("chatBubble").innerHTML != msg)) {
        document.getElementById("chatBubble").innerHTML = msg;
        messages.push({"role": "assistant", "content": msg});
        displayMessages();
    }
}

setInterval(function () {
    var current = new Date().getTime();
    if ((current - lastChatBubbleShown) > 3000) {
        document.getElementById("dismissChatBubble").style.display = "none";
        document.getElementById("chatBubbleBg").style.display = "none";
    }
}, 1000);


function petFunction(event) {
    if (isSleeping) return;

    disableButtons();
    if (lock) return;

    lock = true;
    
    updateChatBubble("pet");
    
    const time = new Date();
    if(state_data["activity"]){
        state_data["activity"].unshift("pet");
        state_data["time"].unshift(time);
        state_data["by_user"].unshift(request.user);
    }
    else{
        state_data["activity"] = ["pet"];
        state_data["time"] = [time];
        state_data["by_user"] = [request.user];
    }

    if(state_data["xp"])    state_data["xp"] ++;
    else    state_data["xp"] = 1;

    if(state_data['state_mood'] < 95)   state_data['state_mood'] = state_data['state_mood'] + 5;
    else    state_data['state_mood'] = 100;

    if(state_data['state_energy'] > 1)   state_data['state_energy'] = state_data['state_energy'] - 1;
    else    state_data['state_energy'] = 0;
    
    displayStates(state_data);
    updateRecentActivity(state_data, true);
    cached_actions.push("pet");
    chrome.storage.local.set({ "cached_actions": cached_actions });

    myPet.style.animationName = "happy";
    myPetHead.style.animationName = "headHappy";
    slot1.style.animationName = "reset";
    slot2.style.animationName = "reset";
    slot4.style.animationName = "reset";
    // hideGoodies();
    setTimeout(reset, 3000);
}

var petButton = document.getElementById("petButton");
petButton.addEventListener('click', petFunction);
// myPet.addEventListener('click', petFunction);
var petBox = document.getElementById("petBox");
petBox.addEventListener('click', petFunction);

var treatButton = document.getElementById("treatButton");
treatButton.addEventListener('click', function (event) {
    disableButtons();
    if (lock) return;

    lock = true;

    updateChatBubble("treat");
    
    const time = new Date();
    if(state_data["activity"]){
        state_data["activity"].unshift("treat");
        state_data["time"].unshift(time);
        state_data["by_user"].unshift(request.user);
    }
    else{
        state_data["activity"] = ["treat"];
        state_data["time"] = [time];
        state_data["by_user"] = [request.user];
    }

    if(state_data["xp"])    state_data["xp"] ++;
    else    state_data["xp"] = 1;

    if(state_data['state_stomach'] < 98)   state_data['state_stomach'] = state_data['state_stomach'] + 2;
    else    state_data['state_stomach'] = 100;

    if(state_data['state_mood'] < 95)   state_data['state_mood'] = state_data['state_mood'] + 5;
    else    state_data['state_mood'] = 100;

    if(state_data['state_energy'] > 1)   state_data['state_energy'] = state_data['state_energy'] - 1;
    else    state_data['state_energy'] = 0;
    
    displayStates(state_data);
    updateRecentActivity(state_data, true);
    cached_actions.push("treat");
    chrome.storage.local.set({ "cached_actions": cached_actions });

    myPet.style.animationName = "treat";
    myPetHead.style.animationName = "headTreat";
    slot1.style.animationName = "reset";
    slot2.style.animationName = "reset";
    slot4.style.animationName = "reset";
    // hideGoodies();
    setTimeout(reset, 3000);
});

var toyButton = document.getElementById("toyButton");
toyButton.addEventListener('click', function (event) {
    disableButtons();
    if (lock) return;

    lock = true;

    updateChatBubble("toy");
    
    const time = new Date();
    if(state_data["activity"]){
        state_data["activity"].unshift("toy");
        state_data["time"].unshift(time);
        state_data["by_user"].unshift(request.user);
    }
    else{
        state_data["activity"] = ["toy"];
        state_data["time"] = [time];
        state_data["by_user"] = [request.user];
    }

    if(state_data["xp"])    state_data["xp"] ++;
    else    state_data["xp"] = 1;

    if(state_data['state_mood'] < 80)   state_data['state_mood'] = state_data['state_mood'] + 20;
    else    state_data['state_mood'] = 100;

    if(state_data['state_energy'] > 5)   state_data['state_energy'] = state_data['state_energy'] - 5;
    else    state_data['state_energy'] = 0;
    
    displayStates(state_data);
    updateRecentActivity(state_data, true);
    cached_actions.push("toy");
    chrome.storage.local.set({ "cached_actions": cached_actions });

    myPet.style.animationName = "toy";
    myPetHead.style.animationName = "headToy";
    hideGoodies();
    setTimeout(reset, 3000);
});

function reset() {
    // updateCurrentPet();
    request.pet = pets[currentSlot]['name'];
    // getState();

    enableButtons();
    lock = false;
    // feedback.style.display = "none"
    myPet.style.animationName = "normal";
    myPetHead.style.animationName = "headNormal";
    slot1.style.animationName = "reset";
    slot2.style.animationName = "reset";
    slot4.style.animationName = "reset";
    putOnGoodies();
    // updateState();

    let user_exist = false;
    for (let i = 0; i < favoriteUsers.length; i++){
        if(favoriteUsers[i]["by_user"] == request.user){
            favoriteUsers[i]["count"]++;
            user_exist = true;
        }
    }
    if (!user_exist){
        favoriteUsers.push({"by_user": request.user, "count": 1});
    }
    updateFavoriteUsers(favoriteUsers);

    if (state_data['state_energy'] < 5) {
        myPet.style.animationName = "sleep";
        myPetHead.style.animationName = "headSleeping";
        isSleeping = true;
        disableButtons();
        hideGoodies();
    }
}

async function batch_action_update (){
    // alert("making batch update");
    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/batch_action_update";
    
    let batch_action_update_request = {...request};
    batch_action_update_request["actions"] = cached_actions;
    
    const options = {
        method: 'POST',
        body: JSON.stringify(batch_action_update_request),
        headers: { 'Content-Type': 'application/json' }
    };

    await fetch(endpoint_url, options)
        .then((response) => { return response.json(); })
        .then((msg) => {
            cached_actions = [];
            chrome.storage.local.set({ "cached_actions": cached_actions });
            
            console.log("before updating state data===>");
            console.log(state_data);
            state_data = msg;
            console.log(state_data);
        });
}

// timer, periodically do a batch update if cache_actions is not empty
setInterval(function () {
    if(cached_actions.length > 0){
        console.log("making batch update");
        batch_action_update();
    }
}, 15 * 1000);

// this is for trigger a background script action when closing popup, in order to make batch updates
chrome.runtime.connect({ name: "popup"});

// function showRandom() {
//     if ((available) && (isSleeping == false) && (myPet.style.animationName == "normal")) {
//         var rand_0T99 = Math.floor(Math.random() * 100);
//         if (rand_0T99 > 50) {
//             document.getElementById("speech_bubble").style.display = "block";
//             setTimeout(function () {
//                 document.getElementById("speech_bubble").style.display = "none";
//             }, 1000); //dismiss after 1s
//         }
//     }
// }
// setInterval(showRandom, 15 * 1000); // Time in milliseconds

document.getElementById("loadFavHoomans").addEventListener('click', function (event) {
    getScores();
    document.getElementById("loadFavHoomans").style.display = "none";
    document.getElementById("xxx").style.display = "flex";
});

document.getElementById("ins_icon").addEventListener("click", function (event) {
    window.open("https://www.instagram.com/get_happy_dog/", "_blank")
});

document.getElementById("discord").addEventListener("click", function (event) {
    window.open("https://discord.gg/AaqgxTJzXk", "_blank")
});

document.getElementById("daycareSectionBg").addEventListener("click", function (event) {
    window.open("https://www.gethappydog.com/daycare/?id=" + request.pet_id, "_blank")
});

var sendToDaycareBtn = document.getElementById("sendToDaycare");
sendToDaycareBtn.addEventListener("click", function (event) {
    state_data["boarding"] = true;
    toggleDaycare();
});
document.getElementById("backFromDaycare").addEventListener("click", function (event) {
    state_data["boarding"] = false;
    toggleDaycare();
});

function toggleDaycare () {
    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/sendToDaycare";
    const options = {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' }
    };

    fetch(endpoint_url, options)
        .then((response) => { return response.json(); })
        .then((myJson) => {
            console.log(myJson);
            displayStates(myJson);
        });
}

document.getElementById("goodie_bag").addEventListener("mouseover", function (event) {
    document.getElementById("goodie_text").style.display = "block";
});
document.getElementById("goodie_bag").addEventListener("mouseout", function (event) {
    document.getElementById("goodie_text").style.display = "none";
});

document.getElementById("photoshoot").addEventListener("mouseover", function (event) {
    document.getElementById("snapshot_text").style.display = "block";
});
document.getElementById("photoshoot").addEventListener("mouseout", function (event) {
    document.getElementById("snapshot_text").style.display = "none";
});

document.getElementById("photobook").addEventListener("mouseover", function (event) {
    document.getElementById("photobook_text").style.display = "block";
});
document.getElementById("photobook").addEventListener("mouseout", function (event) {
    document.getElementById("photobook_text").style.display = "none";
});

document.getElementById("leaderboard").addEventListener("mouseover", function (event) {
    document.getElementById("leaderboard_text").style.display = "block";
});
document.getElementById("leaderboard").addEventListener("mouseout", function (event) {
    document.getElementById("leaderboard_text").style.display = "none";
});

document.getElementById("ins_icon").addEventListener("mouseover", function (event) {
    document.getElementById("comic_text").style.display = "block";
});
document.getElementById("ins_icon").addEventListener("mouseout", function (event) {
    document.getElementById("comic_text").style.display = "none";
});

document.getElementById("discord").addEventListener("mouseover", function (event) {
    document.getElementById("discord_text").style.display = "block";
});
document.getElementById("discord").addEventListener("mouseout", function (event) {
    document.getElementById("discord_text").style.display = "none";
});

document.getElementById("referral_btn").addEventListener("mouseover", function (event) {
    document.getElementById("referral_text").style.display = "block";
});
document.getElementById("referral_btn").addEventListener("mouseout", function (event) {
    document.getElementById("referral_text").style.display = "none";
});

document.getElementById("spaceBtn").addEventListener("click", function (event) {
    if (document.getElementById("spaceDetails").style.display == "flex") {
        document.getElementById("spaceDetails").style.display = "none";    
    }
    else{
        document.getElementById("spaceDetails").style.display = "flex";
    }
});

document.getElementById("dismissChatBubble").addEventListener('click', function (event) {
    document.getElementById("dismissChatBubble").style.display = "none";
    document.getElementById("chatBubbleBg").style.display = "none";
});

document.addEventListener("scroll", (event) => {
    document.getElementById("scrollDownIndicator").style.display = "none";
});

document.getElementById("adsForStarsButton").addEventListener("click", function (event) {                    
    if (request.ad_reward_id){
        window.open("https://www.gethappydog.com/ads/?id=" + request.ad_reward_id, "_blank")
    }
});

// document.getElementById("dogmoji_btn").addEventListener("click", function (event) {
//     stickerPageBg.style.display = "flex";
//     getSticker();
// });


// function text(url) {
//     return fetch(url).then(res => res.text());
//   }
  
//   text('https://www.cloudflare.com/cdn-cgi/trace').then(data => {
//     let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
//     let ip = data.match(ipRegex)[0];
//     console.log(data);
//   });

//   function getIPFromAmazon() {
//     fetch("https://checkip.amazonaws.com/").then(res => res.text()).then(data => console.log(data))
//   }
  
//   getIPFromAmazon()






