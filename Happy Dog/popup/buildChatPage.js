var chatPageBg = document.createElement('div');
chatPageBg.setAttribute("class", "bg");
chatPageBg.style.backgroundColor = "#E5F9FF";
chatPageBg.style.height = "2000px";
chatPageBg.style.display = "none";
chatPageBg.style.justifyContent = "flex-start";
document.body.appendChild(chatPageBg);

var storeTitleRow = document.createElement('div');
storeTitleRow.setAttribute("class", "row");
storeTitleRow.style.justifyContent = "space-between";
storeTitleRow.style.alignItems = "center";
storeTitleRow.style.width = "450px";

var storeTitle = document.createElement("h1");
storeTitle.innerHTML = "Chat (beta)";

var closeBtn = document.createElement("button");
closeBtn.innerHTML = "X";
closeBtn.setAttribute("class", "actionButton");
closeBtn.style.backgroundColor = "#72C6F5";
closeBtn.style.width = "40px";
closeBtn.addEventListener("click", function (event) {
    getState();
    chatPageBg.style.display = "none";
});

storeTitleRow.appendChild(storeTitle);
storeTitleRow.appendChild(closeBtn);
chatPageBg.appendChild(storeTitleRow);

var initialGreetings = [
    "Woof woof! Hi there, my beloved owner! I am so happy to see you today! How can I make you even happier?",
    "Woof woof! Do you want to play fetch or go for a walk? I am always ready for some fun and exercise!",
    "Woof woof! Hello, hello! It's so grrrreat to see you!",
    "Woof woof! Hello, hello! Is there anything fun or exciting we can do today, like go for a walk or play fetch?",
    "Hello! I'm ready for whatever pawsome adventures you have in mind!",
    "Woof woof! Hi there, my lovely owner! I'm so happy to see you today! How are you feeling?",
    "Woof! Is there anything I can do to make you even happier? I'm always here to bring joy and love into your life.", 
    "Woof woof! Hi there! I'm so happy to see you! How are you feeling today? Is there anything I can do to make you even happier?", 
    "Woof woof! Hi there, my favorite human! How are you feeling today?", 
    "Woof woof! How are you feeling today? I hope you're doing well because I always want to see you happy and healthy.", 
    "Woof woof! Hi! How are you feeling today?",
    "Woof woof! Hi! Is there anything I can do to make you happy?",
    "Woof! I'm always here to wag my tail and offer you some cuddles and love.", 
    "Woof woof! Hi there, my favorite human! How are you feeling today?",
    "Woof! I hope you're doing well because I'm always here to make you happy and give you lots of love and cuddles.", 
    "Woof woof! Do you need me to do anything to make you smile?",
    "Woof woof! How are you feeling today? I'm always so happy to see you! I'm here to give you all the love and cuddles you need.",
    "Let's go for a walk or play some fetch! Whatever makes you happy, I'm up for it.", 
    "Woof woof!! I'm your loyal doggy pet and I'm always happy to see you! How are you feeling today?", 
    "Woof woof! Hi there, human! How are you feeling today? I'm always here to cheer you up and make you happy with my wagging tail and furry cuddles.", 
    "Woof woof! Hi there, my wonderful friend! How are you doing today? I hope you're feeling happy and loved, just like I am whenever I'm with you.", 
    "Woof woof! Hi there! How are you today? I'm so excited to see you!",
    "Woof woof! Anything I can do to make you happier? Maybe a cuddle or a game of fetch? I'm always here to bring a smile to your face!", 
    "Woof woof! Hi there, human! I'm so excited to spend time with you and make you happy. What can I do to make your day better?",
    "Woof woof! It's so grrrreat to see you! Do you want to play fetch or go for a walk? Or maybe you just want some cuddles and pets?", 
    "Woof woof! Hi there, my favorite human! How are you feeling today? I hope you're doing well because seeing you happy makes me wag my tail with joy!", 
    "Woof woof! Hi there! I'm so happy to see you! How are you feeling today?", 
    "Hi! Maybe I can give you some cuddles or play with my favorite toy? Whatever it is, just let me know and I'll do my best to bring a smile to your face!", 
    "Woof woof! Hi there, human! I'm so happy to see you today! How are you feeling?", 
    "Woof woof! Hi there, my favorite human! I'm so happy to see you today!", 
    "Woof woof! My favorite human! How are you feeling? I always want to make sure you're happy.", 
    "Woof woof! Hi there, human! I'm so happy to see you! How are you feeling today?", 
    "Woof woof! Hi there, human! It's so great to see you! I'm always so happy when you're around. How are you feeling today?", 
    "Hi there! Is there anything I can do to make your day even better? Maybe we can go for a walk or play fetch in the park?",
    "Woof woof! How are you doing today? Is there anything I can do to make your day even better? Let's play or go for a walk!",
    "Woof woof! I'm always ready for some fun with you!",
]

messages = [];
messages.push({"role": "assistant", "content": initialGreetings[Math.floor(Math.random()*initialGreetings.length)]});

var messageContainer = document.createElement("div");
messageContainer.style = "width: 400px; display: flex; flex-direction: column; height: 150px; overflow-y: scroll; margin-bottom: 200px;";
chatPageBg.appendChild(messageContainer);

function displayMessages() {
    // clear messageContainer by removing all children
    while (messageContainer.firstChild) {
        messageContainer.removeChild(messageContainer.firstChild);
    }

    for (var i = 0; i < messages.length; i++) {
        var messageRow = document.createElement("div");
        
        if (messages[i]["content"].includes("My response: ")){
            messageRow.innerHTML = messages[i]["content"].split("My response: ")[1];
        }
        else {
            messageRow.innerHTML = messages[i]["content"];
        }

        if (messages[i]["content"] == "not enough xp") {
            messageRow.innerHTML = 'Sorry I don\'t have enough <img src="star.png" height="12" width="12" style="margin-left: 3px; margin-right: 3px" /> to respond (>_<)';
        }
        if (messages[i]["content"] == "error") {
            messageRow.innerHTML = 'Sorry I am having some issue. Please try again later (x.x)';
        }

        messageRow.style = "width: 400px; margin-top: 20px; margin-bottom: 0px; font-size: 14px; color: #666666; line-height: 20px;"
        messageContainer.appendChild(messageRow);

        if (messages[i]["role"] == "assistant") {
            messageRow.style.color = "#4EA7AD";
            document.getElementById("chatBubble").innerHTML = messageRow.innerHTML;
        }

        if (i == messages.length - 1) {
            if (messages[i]["role"] != "assistant") {
                var messageRow = document.createElement("div");
                messageRow.style = "width: 400px; margin-top: 20px; margin-bottom: 0px; font-size: 14px; color: #4EA7AD; line-height: 20px;"
                messageRow.innerHTML = "Happy dog is thinking..."
                messageContainer.appendChild(messageRow);
            }
        }
    }
    
    messageContainer.scrollTop = messageContainer.scrollHeight;
    
    var inputRow = document.createElement("div");
    chatPageBg.appendChild(inputRow);   
}

displayMessages();

var petDiv = document.createElement('div');
petDiv.style="position: absolute; top: 180px;"
petDiv.style.transform = "scale(0.75)"
chatPageBg.appendChild(petDiv)

var shadow = document.createElement('div');
shadow.innerHTML = '<svg width="200" height="240" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse id="ellip" cx="100.5" cy="193.5" rx="93.5" ry="32.5" fill="#D1F2FD" /></svg>'
shadow.style="position: absolute; top: 0px; z-index: -1"
petDiv.appendChild(shadow);

var myPet = document.createElement('div');
myPet.setAttribute('style', 'height: 240px; width: 200px');
myPet.style.animationName = "normal";
myPet.style.animationDuration = "1s";
myPet.style.alignItems = "center";
myPet.style.animationIterationCount = "infinite";

var myPetHead = document.createElement('div');
myPetHead.setAttribute('style', 'height: 240px; width: 200px; position: absolute; top: 0px;');
myPetHead.style.animationName = "headNormal";
myPetHead.style.animationDuration = "1s";
myPetHead.style.animationIterationCount = "infinite";
petDiv.appendChild(myPet)
petDiv.appendChild(myPetHead)

var inputRow = document.createElement("div");
inputRow.style = "display: flex; flex-direction: row; align-items: center";
chatPageBg.appendChild(inputRow);

var inputBox = document.createElement('textarea'); 
inputBox.type = "text";  
//Assign different attributes to the element.
inputBox.setAttribute("type", "text");
inputBox.setAttribute("value", "");
inputBox.setAttribute("placeholder", "Say something to your happy dog");
inputBox.setAttribute("row", 1);
inputBox.setAttribute("style", "width: 400px; height: 15px; resize: none; padding: 10px; border-radius: 30px; font-family: Rubik; line-height: 15px; background-color: #D1F2FD; border-color: Transparent; font-size: 14px; outline-color: #D1F2FD;");
inputRow.appendChild(inputBox);

var sendBtn = document.createElement('div'); 
sendBtn.style = "cursor: pointer; margin-left: 8px"
sendBtn.innerHTML = '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.5188 3.94575L9.47881 7.94575C1.38548 10.6524 1.38548 15.0658 9.47881 17.7591L13.0521 18.9458L14.2388 22.5191C16.9321 30.6125 21.3588 30.6125 24.0521 22.5191L28.0654 10.4924C29.8521 5.09241 26.9188 2.14575 21.5188 3.94575ZM21.9454 11.1191L16.8788 16.2125C16.6788 16.4125 16.4254 16.5058 16.1721 16.5058C15.9188 16.5058 15.6654 16.4125 15.4654 16.2125C15.0788 15.8258 15.0788 15.1858 15.4654 14.7991L20.5321 9.70575C20.9188 9.31908 21.5588 9.31908 21.9454 9.70575C22.3321 10.0924 22.3321 10.7324 21.9454 11.1191Z" fill="#72C6F5"/></svg>';
inputRow.appendChild(sendBtn);

function sendMsg() {
    if (inputBox.value.trim().length == 0) {
        return
    }
    
    messages.push({"role": "user", "content": inputBox.value});
    displayMessages();

    console.log(messages);

    var chatRequest = { ...request };
    chatRequest['messages'] = messages.slice(-6);

    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/chat-test";
    const options = {
        method: 'POST',
        body: JSON.stringify(chatRequest),
        headers: { 'Content-Type': 'application/json' }
    };
    fetch(endpoint_url, options)
        .then((response) => { 
            return response.json(); })
        .then((myJson) => {
            console.log(myJson);
            messages.push({"role": "assistant", "content": myJson});
            displayMessages();
        });

    inputBox.value = "";
}

sendBtn.addEventListener("click", sendMsg);
document.addEventListener('keydown', (event) => {
    if(event.which === 13 && !event.shiftKey) {
        event.preventDefault();
        sendMsg();
    }
}, false);

document.getElementById("chat_button").addEventListener("click", function (event) {
    chatPageBg.style.display = "flex";
    messageContainer.scrollTop = messageContainer.scrollHeight;
});

document.getElementById("chatBubble").addEventListener("click", function (event) {
    chatPageBg.style.display = "flex";
    messageContainer.scrollTop = messageContainer.scrollHeight;
});

var chatPriceLine = document.createElement("div");
chatPriceLine.style = "display: flex; flex-direction: row; align-items: center; margin-top: 5px; width: 450px; color: #999999;";

var chatPriceLinePt1 = document.createElement("div");
chatPriceLinePt1.innerHTML = '10<img src="star.png" height="12" width="12" style="margin-left: 3px; margin-right: 3px" /> / message';

var chatPriceLinePt2 = document.createElement("div");
chatPriceLinePt2.style = "margin-left: 10px; cursor: pointer";
chatPriceLinePt2.innerHTML = '<u>(how to get more?)</u>';
chatPriceLinePt2.addEventListener("click", function (event) {
    document.getElementById("purchasePage").style.display = "flex";
});

chatPriceLine.appendChild(chatPriceLinePt1);
chatPriceLine.appendChild(chatPriceLinePt2);
chatPageBg.appendChild(chatPriceLine);

var chatInstructions = document.createElement("div");
chatInstructions.style = "display: flex; flex-direction: row; align-items: center; margin-top: 20px; width: 450px; color: #999999";
chatInstructions.innerHTML = "You can say anything to your happy dog. Just a few examples: <br><br>Ask it to tell a joke <br>Talk about how you feel today <br>Ask for help with your homework <br>Anything you want to talk to you friends about"
chatPageBg.appendChild(chatInstructions);

