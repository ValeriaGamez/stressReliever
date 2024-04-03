console.log("Office Pets extension content script running");

const initPos = [330, 20];

function log(msg) {
    console.log("[OFFICE PETS] " + msg);
}

let lock = false;
let dontMove = false;
let lastActive = undefined;
let lastPanelShown = undefined;
let breed = 3;
defaultImg = "breed" + breed + "-normal";

panel = document.createElement('div');
panel.style.display = 'none';
panel.setAttribute("class", "petControlPanel");

var walkBtn = document.createElement("div");
walkBtn.setAttribute("class", "petControlBtn");
walkBtn.innerHTML = "Walk";
// panel.appendChild(walkBtn);

var poopBtn = document.createElement("div");
poopBtn.setAttribute("class", "petControlBtn");
poopBtn.innerHTML = "Poop";
// panel.appendChild(poopBtn);

var hideBtn = document.createElement("div");
hideBtn.setAttribute("class", "hideControlBtn");
hideBtn.innerHTML = "Hide";
panel.appendChild(hideBtn);

hideBtn.onclick = () => {
    panel.style.display = "none";
}

var feedBtn = document.createElement("div");
feedBtn.setAttribute("class", "petControlBtn");
feedBtn.innerHTML = "Feed";
panel.appendChild(feedBtn);

var treatBtn = document.createElement("div");
treatBtn.setAttribute("class", "petControlBtn");
treatBtn.innerHTML = "Treat";
panel.appendChild(treatBtn);

var petBtn = document.createElement("div");
petBtn.setAttribute("class", "petControlBtn");
petBtn.innerHTML = "Pet";
panel.appendChild(petBtn);

var toyBtn = document.createElement("div");
toyBtn.setAttribute("class", "petControlBtn");
toyBtn.innerHTML = "Toy";
panel.appendChild(toyBtn);

var followMouseToggle = document.createElement("div");
followMouseToggle.setAttribute("class", "petControlToggleBG");
panel.appendChild(followMouseToggle);

var followMouseToggleOption1 = document.createElement("div");
followMouseToggleOption1.setAttribute("class", "petControlToggleSelected");
followMouseToggleOption1.innerHTML = "Follow";
followMouseToggle.appendChild(followMouseToggleOption1);

var followMouseToggleOption2 = document.createElement("div");
followMouseToggleOption2.setAttribute("class", "petControlToggleUnselected");
followMouseToggleOption2.innerHTML = "Stay";
followMouseToggle.appendChild(followMouseToggleOption2);

let followMouse = true;

followMouseToggleOption1.onclick = () => {
    followMouseToggleOption1.setAttribute("class", "petControlToggleSelected");
    followMouseToggleOption2.setAttribute("class", "petControlToggleUnselected");
    followMouse = true;
}

followMouseToggleOption2.onclick = () => {
    followMouseToggleOption2.setAttribute("class", "petControlToggleSelected");
    followMouseToggleOption1.setAttribute("class", "petControlToggleUnselected");
    followMouse = false;
}

var dismissBtn = document.createElement("div");
dismissBtn.setAttribute("class", "petDismissBtn");
dismissBtn.innerHTML = "Go back home";
panel.appendChild(dismissBtn);



var myPetContainer = document.createElement('div');
myPetContainer.style.position = "absolute";
myPetContainer.style.left = initPos[0] + 'px';
myPetContainer.style.top = initPos[1] + 'px';
myPetContainer.style.display = 'block';
myPetContainer.style['z-index'] = "2147483699";
myPetContainer.style.transform = 'translate3d(0px, 0px, 0)';
// myPetContainer.style.transition = 'transform 2s cubic-bezier(.28,0,.76,.76)';

var myPetBg = document.createElement('div');
myPetBg.style.height = "240px";
myPetBg.style.width = "200px";
myPetBg.style.backgroundImage = 'url(' + chrome.runtime.getURL("images/shadow_gray.png") + ')';
myPetBg.style.backgroundSize = "100% 100%";
myPetBg.style.position = "absolute";
myPetBg.style.left = "0px";
myPetBg.style.top = "0px";
myPetBg.style.display = 'none';

myPet = document.createElement('div');
myPet.src = defaultImg;
myPet.style.animationIterationCount = "infinite";
myPet.style['display'] = 'block';
myPet.style.position = "absolute";
myPet.style.height = "100%";
myPet.style.width = "100%";
myPet.style.left = '0px';
myPet.style.top = '0px';
myPet.style['z-index'] = "2147483699";

myPet.style.animationName = "normal";
myPet.style.animationDuration = "1s";
myPet.style.animationIterationCount = "infinite";

let dynamicStyles = null;
function addAnimation(body) {
    //   if (!dynamicStyles) {
    dynamicStyles = document.createElement('style');
    dynamicStyles.type = 'text/css';
    document.head.appendChild(dynamicStyles);
    //   }
    dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
}

ball = document.createElement('div');
ball.style.left = initPos[0] + 60 + 'px';
ball.style.top = initPos[1] + 120 + 'px';
ball.style['display'] = 'none';
ball.style.position = "absolute";
ball.style.height = "30px";
ball.style.width = "30px";
ball.style.borderRadius = "15px";
// ball.style.backgroundColor = "#F15BB5";
ball.style.backgroundImage = 'url(' + chrome.runtime.getURL("images/ball.png") + ')';
ball.style.backgroundSize = "30px 30px";
ball.style['z-index'] = "20000000";

var poopElm = document.createElement('div');
poopElm.style.left = '450px';
poopElm.style.top = '150px';
poopElm.style['display'] = 'none';
poopElm.style.position = "absolute";
poopElm.style.height = "60px";
poopElm.style.width = "60px";
poopElm.style.backgroundImage = 'url(' + chrome.runtime.getURL("images/poop.png") + ')';
poopElm.style.backgroundSize = "60px 60px";
poopElm.style['z-index'] = "3000000000";
// poopElm.style.cursor = "url('https://storage.googleapis.com/office-pets/petHand.png'), auto;";
poopElm.setAttribute("class", "poopDiv");


var poopCleanUpMsg = document.createElement('div');
poopCleanUpMsg.innerHTML = "Click to clean up after your pet";
poopCleanUpMsg.style.left = '410px';
poopCleanUpMsg.style.top = '230px';
poopCleanUpMsg.style.width = "150px";
poopCleanUpMsg.style.textAlign = "center";
poopCleanUpMsg.style['display'] = 'none';
poopCleanUpMsg.style.position = "absolute";
poopCleanUpMsg.style['z-index'] = "3000000000";
poopCleanUpMsg.style.color = "#4caf50";
poopCleanUpMsg.style.fontSize = "16px";
poopCleanUpMsg.style.fontWeight = "bold";

feedback = document.createElement('div');
feedback.style.left = '0px';
feedback.style.top = '0px';
// feedback.style.width = "20px";
// feedback.style.height = "20px";
feedback.style['display'] = 'block';
feedback.style.position = "absolute";
feedback.style['z-index'] = "2147483699";
feedback.style.color = "#4caf50";
feedback.style.fontSize = "20px";
feedback.style.fontWeight = "bold";


var myPetHead = document.createElement('div');
myPetHead.setAttribute('style', 'height: 240px; width: 200px; position: absolute; top: 0px;');
myPetHead.style.animationName = "headNormal";
myPetHead.style.animationDuration = "1s";
myPetHead.style.animationIterationCount = "infinite";
myPetHead.style['z-index'] = "3000000001";

var slot1 = document.createElement('div');
slot1.setAttribute('style', 'position: absolute; top: 31px; left: 8px; height: 120px; width: 120px; background-size: 120px 120px;');
// slot1.style.backgroundImage = "url('https://storage.googleapis.com/office-pets/goodies/1.png')";
slot1.style['z-index'] = "3000000002";
slot1.style.animationName = "slot1Normal";
slot1.style.animationDuration = "1s";
slot1.style.animationIterationCount = "infinite";

var slot2 = document.createElement('div');
slot2.setAttribute('style', 'position: absolute; top: 0px; left: 0px; height: 120px; width: 120px; background-size: 120px 120px;');
// slot2.style.backgroundImage = "url('https://storage.googleapis.com/office-pets/goodies/23.png')";
slot2.style['z-index'] = "3000000003";
slot2.style.animationName = "slot1Normal";
slot2.style.animationDuration = "1s";
slot2.style.animationIterationCount = "infinite";

var slot4 = document.createElement('div');
slot4.setAttribute('style', 'position: absolute; top: 100px; left: 15px; height: 120px; width: 120px; background-size: 120px 120px;');
// slot4.style.backgroundImage = "url('https://storage.googleapis.com/office-pets/goodies/77.png')";
slot4.style['z-index'] = "3000000000";
slot4.style.animationName = "slot1Normal";
slot4.style.animationDuration = "1s";
slot4.style.animationIterationCount = "infinite";

var slot5 = document.createElement('div');
slot5.setAttribute('style', 'position: absolute; top: 85px; left: 34px; height: 120px; width: 120px; background-size: 120px 120px;');
slot5.style['z-index'] = "3000000000";
slot5.style.animationName = "slot1Normal";
slot5.style.animationDuration = "1s";
slot5.style.animationIterationCount = "infinite";

myPetBg.appendChild(myPet);
myPetBg.appendChild(slot5);
myPetBg.appendChild(slot4);
myPetBg.appendChild(myPetHead);
myPetBg.appendChild(slot1);
myPetBg.appendChild(slot2);

myPetBg.style.transform = "scale(0.8)";
document.documentElement.appendChild(myPetContainer);
myPetContainer.appendChild(myPetBg);
// document.documentElement.appendChild(myPet);
// document.documentElement.appendChild(myPetCache);
document.documentElement.appendChild(ball);
document.documentElement.appendChild(poopElm);
document.documentElement.appendChild(poopCleanUpMsg);
document.documentElement.appendChild(panel);
document.documentElement.appendChild(feedback);

myPetBg.addEventListener("click", function () {
    pet();
});

const request = {
    "pet": undefined,
    "space": undefined,
    "user": undefined
};


chrome.storage.local.get(['session'], function (result) {
    if (result.session.user && result.session.space) {
        console.log("current session:");
        console.log(result.session);
        request.space = result.session.space;
        request.user = result.session.user;
    }
});

chrome.storage.local.get(['pet'], function (result) {
    console.log("current pet:");
    console.log(result.pet);
    request.pet = result.pet;
});

chrome.runtime.onMessage.addListener(
    function (result, sender, sendResponse) {        
        console.log("message received");
        console.log(result);

        if (result.hasOwnProperty('ping')) { // if received a ping, reply with a ping
            sendResponse({farewell: "ack"});
        }

        if (result.hasOwnProperty('session')) {
            console.log("current session:");
            console.log(result.session);
            request.space = result.session.space;
            request.user = result.session.user;
        }

        // if (myPet.style.display == "none") {
        if (result.hasOwnProperty('pet')) {
            console.log("current pet:");
            console.log(result.pet);
            request.pet = result.pet;
        }
        if (result.hasOwnProperty('breed')) {
            console.log("current breed:");
            console.log(result.breed);
            breed = result.breed;
        }
        if (result.hasOwnProperty('goodies')) {
            console.log("current goodies:");
            console.log(result.goodies);
            slot1.style.backgroundImage = result.goodies.slot1;
            slot2.style.backgroundImage = result.goodies.slot2;
            slot4.style.backgroundImage = result.goodies.slot4;
            slot5.style.backgroundImage = result.goodies.slot5;
        }
        if (result.hasOwnProperty('state_data')) {
            if (result.state_data.state_poop > 0) {
                // auto poop
                setTimeout(poop, 4000);
            }
        }

        if (result.hasOwnProperty('continue')) {
            document.onclick = handleMouseClick;

            lock = false;
            
            myPetContainer.style.left = result.continue.bounding.left + 'px';
            myPetContainer.style.top = result.continue.bounding.top + window.scrollY + 'px';
            myPetContainer.style.transition = 'transform 0s';
            myPetContainer.style.transform = 'translate3d(0px, 0px, 0)';
            myPetContainer.style.display = 'block';
            initPos[0] = result.continue.bounding.left;
            initPos[1] = result.continue.bounding.top

            myPetBg.style.display = 'block';
            lastActive = new Date();
            
            panel.style.top = initPos[1] + window.scrollY + 'px';
            panel.style.left = ( myPetBg.getBoundingClientRect().left - 260 ) + "px";
            panel.style.top = myPetBg.getBoundingClientRect().top + "px";

            breed = result.continue.breed;
            followMouse = result.continue.followMouse;
            slot1.style.backgroundImage = result.continue.goodies1;
            slot2.style.backgroundImage = result.continue.goodies2;
            slot4.style.backgroundImage = result.continue.goodies4;
            slot5.style.backgroundImage = result.continue.goodies5;

            if (followMouse) {
                followMouseToggleOption1.setAttribute("class", "petControlToggleSelected");
                followMouseToggleOption2.setAttribute("class", "petControlToggleUnselected")
            }
            else {
                followMouseToggleOption2.setAttribute("class", "petControlToggleSelected");
                followMouseToggleOption1.setAttribute("class", "petControlToggleUnselected");
            }
            
            reset();
        }

        if (result.hasOwnProperty('hidePet')) {
            myPetContainer.style.display = 'block';
            myPetBg.style.display = 'block';
        }

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

        myPet.style.animationName = "normal";
        myPetHead.style.animationName = "headNormal";

        if (result.hasOwnProperty('action')) {
            log("action: " + result.action);
            if (result.action == 'fetch') {
                fetchPet(false);
            }
            if (result.action == 'walk') walk();
            if (result.action == 'pet') pet();
            if (result.action == 'feed') feed();
            if (result.action == 'treat') treat();
            if (result.action == 'poop') poop();
            if (result.action == 'toy') toy();
        }
    }
);


walkBtn.addEventListener("click", function () {
    if (lock) return;
    lock = true;
    lastActive = new Date();

    walk();
    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/walk";
    const options = {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' }
    };

    fetch(endpoint_url, options)
        .then((response) => { return response.text(); })
        .then((msg) => {
            console.log(msg);
        });
});

poopBtn.addEventListener("click", function () {
    if (lock) return;
    lock = true;
    lastActive = new Date();

    poop();
    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/poop";
    const options = {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' }
    };

    fetch(endpoint_url, options)
        .then((response) => { return response.text(); })
        .then((msg) => {
            console.log(msg);
        });
});

feedBtn.addEventListener("click", function () {
    if (lock) return;
    lock = true;
    lastActive = new Date();

    feed();
    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/feed";
    const options = {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' }
    };

    fetch(endpoint_url, options)
        .then((response) => { return response.text(); })
        .then((msg) => {
            console.log(msg);
        });
});

treatBtn.addEventListener("click", function () {
    if (lock) return;
    lock = true;
    lastActive = new Date();

    treat();
    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/treat";
    const options = {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' }
    };

    fetch(endpoint_url, options)
        .then((response) => { return response.text(); })
        .then((msg) => {
            console.log(msg);
        });
});

petBtn.addEventListener("click", function () {
    if (lock) return;
    lock = true;
    lastActive = new Date();

    pet();
    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/pet";
    const options = {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' }
    };

    fetch(endpoint_url, options)
        .then((response) => { return response.text(); })
        .then((msg) => {
            console.log(msg);
        });
});

toyBtn.addEventListener("click", function () {
    if (lock) return;
    lock = true;
    lastActive = new Date();

    toy();
    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/toy";
    const options = {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' }
    };

    fetch(endpoint_url, options)
        .then((response) => { return response.text(); })
        .then((msg) => {
            console.log(msg);
        });
});

poopElm.addEventListener("click", function () {
    poopElm.style.display = "none";
});

poopElm.addEventListener("mouseover", function () {
    dontMove = true;
    poopCleanUpMsg.style.display = "block";
});

poopElm.addEventListener("mouseleave", function () {
    dontMove = false;
    poopCleanUpMsg.style.display = 'none';
});

dismissBtn.addEventListener("click", function () {
    dismiss();
});

window.addEventListener('beforeunload', function (e) {
    dismiss();
    // Cancel the event
    // e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    // Chrome requires returnValue to be set
    // e.returnValue = '';
});

function passBy() {
    if (!document.hidden) {
        log("tab active");
        var rand_0T99 = Math.floor(Math.random() * 100);
        if (rand_0T99 > 50) {
            fetchPet(true);
        }
        setTimeout(dismiss, 15 * 1000); //dismiss after 15s
    }
}
// setInterval(passBy, 90 * 60 * 1000); // Time in milliseconds


function checkActive() {
    if (lastActive) {
        let current = new Date();

        if (followMouse) {
            if ((current - lastActive) > 10 * 60 * 1000) { //if last active is 10 minutes ago, dismiss
                console.log("Inactive for too long, going to dismiss");
                dismiss();
            }
        }
        else {
            if ((current - lastActive) > 20 * 60 * 1000) { //if last active is 20 minutes ago, dismiss
                console.log("Inactive for too long, going to dismiss");
                dismiss();
            }
        }
    }
}
setInterval(checkActive, 60 * 1000); // Time in milliseconds


myPetBg.addEventListener("mouseout", function () {
    myPet.src = defaultImg;
    dontMove = false;
});

panel.addEventListener("mouseleave", function () {
    panel.style.display = 'none';
    dontMove = false;
});

panel.addEventListener("mouseover", function () {
    dontMove = true;
});

myPetBg.addEventListener("mouseover", function () {
    if (lock) return;

    dontMove = true;
    panel.style.left = ( myPetBg.getBoundingClientRect().left - 260 ) + "px";
    panel.style.top = myPetBg.getBoundingClientRect().top + window.scrollY + "px";
    panel.style.display = 'flex';
    lastPanelShown = new Date().getTime();
});

let previousScrollY = 0;
window.addEventListener('scroll', function (e) {
    myPetContainer.style.top = initPos[1] + window.scrollY + "px";
    panel.style.top = myPetBg.getBoundingClientRect().top + window.scrollY + "px";
    poopElm.style.top = 150 + window.scrollY + "px";
    poopCleanUpMsg.style.top = 230 + window.scrollY + "px";
    ball.style.top =  parseInt(ball.style.top.replace('px','')) + window.scrollY - previousScrollY + "px";
    previousScrollY = window.scrollY;
});


function handleMouseClick(event) {
    if (dontMove) return;
    if (lock) return;
    if (!followMouse) return;

    reset();
    var eventDoc, doc, body;
    event = event || window.event; // IE-ism
    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop || body && body.scrollTop || 0) -
            (doc && doc.clientTop || body && body.clientTop || 0);
    }

    // if ((event.pageX < 250) && (event.pageY < 234)) return;

    // var id = window.setTimeout(function() {}, 0);
    // while (id--) {
    //     window.clearTimeout(id); // will do nothing if no timeout with id is present
    // }
    // clearTimeout(runnerTimer);

    ball.style.top = (event.pageY - (ball.offsetHeight / 2)) + "px";
    ball.style.left = (event.pageX - (ball.offsetWidth / 2)) + "px";

    if (myPetBg.style.display != 'none') {
        ball.style.display = "block";
    }
    
    panel.style.display = "none";

    var xPos = event.pageX - (myPetBg.offsetWidth / 2);
    var yPos = event.pageY - (myPetBg.offsetHeight / 2) - window.scrollY;
    var center = myPetBg.getBoundingClientRect().left + (myPetBg.offsetWidth / 2);

    if (event.pageX > center) { 
        myPet.style.animationName = "runningRight";
        myPetHead.style.animationName = "headRunningRight";
        slot1.style.animationName = "slot1RunningRight";
        slot2.style.animationName = "slot2RunningRight";
        slot4.style.animationName = "slot4RunningRight";
        slot5.style.animationName = "slot5RunningRight";     
    } else {
        myPet.style.animationName = "runningRight";
        myPetHead.style.animationName = "headRunningRight";
        slot1.style.animationName = "slot1RunningRight";
        slot2.style.animationName = "slot2RunningRight";
        slot4.style.animationName = "slot4RunningRight";
        slot5.style.animationName = "slot5RunningRight";     
        myPetBg.style.transform = "scale(0.8) scaleX(-1)";
    }
    myPetBg.style.height = "240px";
    myPetBg.style.width = "240px";

    myPetContainer.style.transition = 'transform 2s cubic-bezier(.28,0,.76,.76)';
    var translate3dValue = "translate3d(" + (xPos - initPos[0]) + "px, " + (yPos - initPos[1]) + "px, 0)";
    myPetContainer.style.transform = translate3dValue;

    // runnerTimer = setTimeout(reset, 2500);

    lastActive = new Date();
}

setInterval(checkStopRunning, 1000); // Time in milliseconds
function checkStopRunning() {
    if (myPet.style.animationName != "runningRight" && myPet.style.animationName != "runningLeft")  return;

    if (myPetBg.style.display == 'none')    return;

    if (
        ball.getBoundingClientRect().left > myPetBg.getBoundingClientRect().left
        &&
        ball.getBoundingClientRect().left < (myPetBg.getBoundingClientRect().left + myPetBg.getBoundingClientRect().width)
        &&
        ball.getBoundingClientRect().top > myPetBg.getBoundingClientRect().top
        &&
        ball.getBoundingClientRect().top < (myPetBg.getBoundingClientRect().top + myPetBg.getBoundingClientRect().height)
    ) {
        reset();
    }
}

function showFeedback(data) {
    feedback.style.display = "block";
    let string = "";
    for (const [key, value] of Object.entries(data)) {
        string = string + key + ": " + value + "<br>";
    }
    feedback.innerHTML = string;
    feedback.style.left = myPetBg.getBoundingClientRect().right + 10 + "px";
    feedback.style.top = myPetBg.getBoundingClientRect().top + 20 + "px";
    setTimeout(function () { feedback.style.display = "none"; }, 2000);
}

function fetchPet(passBy) {
    if (myPetBg.style.display != "none") {
        console.log("pet already present");
        return;
    }
    // var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/fetch";
    // const options = {
    //     method: 'POST',
    //     body: JSON.stringify(request),
    //     headers: { 'Content-Type': 'application/json' }
    // };
    // fetch(endpoint_url, options)
    //     .then((response) => { return response.text(); })
    //     .then((msg) => {
    //         if (msg == "success") {
                lock = false;
                followMouseToggleOption1.setAttribute("class", "petControlToggleSelected");
                followMouseToggleOption2.setAttribute("class", "petControlToggleUnselected");
                followMouse = true;
                
                myPetContainer.style.left = initPos[0] + 'px';
                myPetContainer.style.top = initPos[1] + window.scrollY + 'px';
                myPetContainer.style.transform = 'translate3d(0px, 0px, 0)';
                myPetContainer.style.transition = 'transform 2s cubic-bezier(.28,0,.76,.76)';
                myPetContainer.style.display = 'block';
                
                myPetBg.style.display = 'block';
                ball.style.display = 'block';
                ball.style.left = initPos[0] + 60 + 'px';
                ball.style.top = initPos[1] + 120 + 'px';

                lastActive = new Date();
                
                panel.style.top = initPos[1] + window.scrollY + 'px';
                panel.style.left = ( myPetBg.getBoundingClientRect().left - 260 ) + "px";
                panel.style.top = myPetBg.getBoundingClientRect().top + "px";

                myPet.style.animationName = "runningRight";
                myPetHead.style.animationName = "headRunningRight";
                slot1.style.animationName = "slot1RunningRight";
                slot2.style.animationName = "slot2RunningRight";
                slot4.style.animationName = "slot4RunningRight";
                slot5.style.animationName = "slot5RunningRight";
                myPetBg.style.height = "240px";
                myPetBg.style.width = "240px";
                myPetBg.style.transform = "scale(0.8) scaleX(-1)";
                setTimeout(reset, 2500);

                if (!passBy) {
                    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/walkAndPoop";
                    const options = {
                        method: 'POST',
                        body: JSON.stringify(request),
                        headers: { 'Content-Type': 'application/json' }
                    };

                    fetch(endpoint_url, options)
                        .then((response) => { return response.text(); })
                        .then((msg) => {
                            console.log(msg);
                        });

                    alert('Ready! Click anywhere on screen now.');
                    showFeedback({ "mood": "+20", "energy": "-20" });
                    document.onclick = handleMouseClick;
                }
        //     } else console.log("tried to fetch pet, but: " + msg);
            // updateState(passBy);
        // });
}


function pet() {
    panel.style.display = 'none';
    myPet.style.animationName = "happy";
    myPetHead.style.animationName = "headHappy";
    slot1.style.animationName = "reset";
    slot2.style.animationName = "reset";
    slot4.style.animationName = "reset";
    slot5.style.animationName = "reset";

    showFeedback({ "mood": "+5" });
    setTimeout(reset, 5000);
}

function walk() {
    panel.style.display = 'none';
    alert('Ready! Click anywhere on screen now.');
    showFeedback({ "mood": "+20", "energy": "-20" });
    document.onclick = handleMouseClick;
}

function feed() {
    panel.style.display = 'none';
    myPet.style.animationName = "eating";
    myPetHead.style.animationName = "headEating";
    slot1.style.animationName = "slot1Eating";
    slot2.style.animationName = "slot2Eating";
    slot4.style.animationName = "reset";
    slot5.style.animationName = "reset";

    showFeedback({ "stomach": "+50" });
    setTimeout(reset, 5000);
}

function treat() {
    panel.style.display = 'none';
    myPet.style.animationName = "treat";
    myPetHead.style.animationName = "headTreat";
    slot1.style.animationName = "reset";
    slot2.style.animationName = "reset";
    slot4.style.animationName = "reset";
    slot5.style.animationName = "reset";

    showFeedback({ "stomach": "+2", "mood": "+5" });
    setTimeout(reset, 5000);
}

function poop() {
    // panel.style.display = 'none';
    // myPet.style.animationName = "poop";
    poopElm.style.display = 'block';
    showFeedback({ "poop": "0" });
    // setTimeout(reset, 5000);
}

function toy() {
    panel.style.display = 'none';
    myPet.style.animationName = "toy";
    myPetHead.style.animationName = "headToy";
    slot1.style.display = "none";
    slot2.style.display = "none";
    slot4.style.display = "none";
    slot5.style.display = "none";
    showFeedback({ "mood": "+20", "energy": "-5" });
    setTimeout(reset, 5000);
}

function reset() {
    lock = false;
    feedback.style.display = "none"
    myPet.style.animationName = "normal";
    myPetHead.style.animationName = "headNormal";
    slot1.style.animationName = "reset";
    slot2.style.animationName = "reset";
    slot4.style.animationName = "reset";
    slot5.style.animationName = "reset";

    slot1.style.display = "block";
    slot2.style.display = "block";
    slot4.style.display = "block";
    slot5.style.display = "block";

    // myPetBg.style.height = "240px";
    // myPetBg.style.width = "240px";
    myPetBg.style.width = "200px";
    myPetBg.style.transform = "scale(0.8)";
    // updateState(false);
}

function dismiss() {
    if (myPetBg.style.display == "none") {
        return;
    }
    console.log("****************Dismissing****************")
    lock = true;
    ball.style.display = 'none';
    panel.style.display = 'none';
    feedback.style.display = "none";

    myPet.style.animationName = "runningRight";
    myPetHead.style.animationName = "headRunningRight";
    slot1.style.animationName = "slot1RunningRight";
    slot2.style.animationName = "slot2RunningRight";
    slot4.style.animationName = "slot4RunningRight";    
    slot5.style.animationName = "slot5RunningRight";
    myPetBg.style.height = "240px";
    myPetBg.style.width = "240px";

    ball.style.left = initPos[0] + 60 + 'px';;
    ball.style.top = initPos[1] + 120 + 'px';;

    var translate3dValue = "translate3d(" + (window.innerWidth) + "px, " + (initPos[1]) + "px, 0)";
    myPetContainer.style.transform = translate3dValue;
    // setTimeout(() => {
    //     // myPetBg.style.display = 'none';
    //     // myPetBg.style.height = "240px";
    //     // myPetBg.style.width = "200px";
    //     // myPet.style.left = initPos[0] + 'px';
    //     // myPet.style.top = initPos[1] + 'px';
    //     reset();
    // }, 2000);

    // var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/dismiss";
    // const options = {
    //     method: 'POST',
    //     body: JSON.stringify(request),
    //     headers: { 'Content-Type': 'application/json' }
    // };

    // fetch(endpoint_url, options)
    //     .then((response) => { return response.text(); })
    //     .then((msg) => {
    //         console.log(msg);
    //         if(msg == "success"){
    lastActive = undefined;
    setTimeout(() => {
        myPetBg.style.display = 'none';
        lock = false;
    }, 500);
        //     }
        // });
}

document.addEventListener("visibilitychange", function () {
    
    if (document.visibilityState == "hidden") {
        if (myPetBg.style.display == "none") {
            return;
        } 
        var rect = myPetContainer.getBoundingClientRect();
        myPetContainer.style.display = 'none';
        myPetBg.style.display = 'none';
        ball.style.display = 'none';
        panel.style.display = 'none';
        chrome.runtime.sendMessage(
            {
                "handoff": {
                    "bounding": rect,
                    "followMouse": followMouse,
                    "goodies1": slot1.style.backgroundImage,
                    "goodies2": slot2.style.backgroundImage,
                    "goodies4": slot4.style.backgroundImage,
                    "goodies5": slot5.style.backgroundImage,
                    "breed": breed
                }
                
            }
        );
    }
});

myPetBg.setAttribute("class", "handCursor");

function updateState(passBy) {
    if (document.hidden) return;
    if (myPetBg.style.display != 'block') return;

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
            setTimeout(reset, 2500);

            if ((myJson.state_poop > 0) && (!passBy)) {
                // auto poop
                poop();
                var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/poop";
                const options = {
                    method: 'POST',
                    body: JSON.stringify(request),
                    headers: { 'Content-Type': 'application/json' }
                };

                fetch(endpoint_url, options)
                    .then((response) => { return response.text(); })
                    .then((msg) => {
                        console.log(msg);
                    });
            }
        });
}

setInterval(function () {
    var current = new Date().getTime();
    if ((current - lastPanelShown) > 2000) {
        panel.style.display = "none";
    }
}, 1000);