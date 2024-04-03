var stickerPageBg = document.createElement('div');
stickerPageBg.setAttribute("class", "bg");
stickerPageBg.style.backgroundColor = "#E5F9FF";
stickerPageBg.style.height = "2000px";
stickerPageBg.style.display = "none";
stickerPageBg.style.justifyContent = "flex-start";
document.body.appendChild(stickerPageBg);

var storeTitleRow = document.createElement('div');
storeTitleRow.setAttribute("class", "row");
storeTitleRow.style.justifyContent = "space-between";
storeTitleRow.style.alignItems = "center";
storeTitleRow.style.width = "450px";

var storeTitle = document.createElement("h1");
storeTitle.innerHTML = "Dogmoji";

var closeBtn = document.createElement("button");
closeBtn.innerHTML = "X";
closeBtn.setAttribute("class", "actionButton");
closeBtn.style.backgroundColor = "#72C6F5";
closeBtn.style.width = "40px";
closeBtn.addEventListener("click", function (event) {
    stickerPageBg.style.display = "none";
    stickerSearchRow.style.display = "none";
});

storeTitleRow.appendChild(storeTitle);
storeTitleRow.appendChild(closeBtn);
stickerPageBg.appendChild(storeTitleRow);

var stickerSearchRow = document.createElement("div");
stickerSearchRow.style = "display: none; flex-direction: row; align-items: center; margin-bottom: 10px";
stickerPageBg.appendChild(stickerSearchRow);

var stickerSearchBox = document.createElement('textarea'); 
stickerSearchBox.type = "text";  
stickerSearchBox.setAttribute("type", "text");
stickerSearchBox.setAttribute("value", "");
stickerSearchBox.setAttribute("placeholder", "Create your own...Type something (e.g. 'hello!')");
stickerSearchBox.setAttribute("row", 1);
stickerSearchBox.setAttribute("style", "width: 400px; height: 15px; resize: none; padding: 10px; border-radius: 30px; font-family: Rubik; line-height: 15px; background-color: #D1F2FD; border-color: Transparent; font-size: 14px; outline-color: #D1F2FD;");
stickerSearchRow.appendChild(stickerSearchBox);

var stickerLoadingMsg = document.createElement("p");
stickerLoadingMsg.innerHTML = "Loading stickers...";
stickerPageBg.appendChild(stickerLoadingMsg);

var copyStickerPrompt = document.createElement("div");
copyStickerPrompt.innerHTML = "Right-click and choose 'Copy Image' from the menu";
copyStickerPrompt.style = "position: fixed; top: 300px; background-color: #333333; color: white; align-items: center; display: none; padding: 20px; font-size: 18px; opacity: 80%"
stickerPageBg.appendChild(copyStickerPrompt);

var stickerSearchBtn = document.createElement('div'); 
stickerSearchBtn.style = "cursor: pointer; margin-left: 8px"
stickerSearchBtn.innerHTML = '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6667 8C18.3485 8 21.3333 10.9848 21.3333 14.6667M22.2117 22.2065L28 28M25.3333 14.6667C25.3333 20.5577 20.5577 25.3333 14.6667 25.3333C8.77563 25.3333 4 20.5577 4 14.6667C4 8.77563 8.77563 4 14.6667 4C20.5577 4 25.3333 8.77563 25.3333 14.6667Z" stroke="#72C6F5" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/></svg>'
stickerSearchRow.appendChild(stickerSearchBtn);

var stickersContainer = document.createElement("div");
stickersContainer.style = "display: flex; flex-direction: row; align-items: center; flex-wrap: wrap; justify-content: center";
stickerPageBg.appendChild(stickersContainer);

function getSticker(input) {
    document.getElementById("loader").style.display = "block";
    stickerLoadingMsg.style.display = "block";

    var stickerRequest = { ...request };
    stickerRequest['background'] = "350x350";
    for (var i = 0; i < put_on_goodies.length; i++) {
        var x = i + 1;
        var type = goodies_owned[i]["type"];
        if (put_on_goodies[i]) {
            stickerRequest["goodie" + type] = goodies_owned[i]["id"];
        }
    }
    stickerRequest["breed"] = "breed" + request.breed;

    if (input) {
        stickerRequest["text"] = stickerSearchBox.value.trim();
    }

    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/createSticker";
    const options = {
        method: 'POST',
        body: JSON.stringify(stickerRequest),
        headers: { 'Content-Type': 'application/json' }
    };
    fetch(endpoint_url, options)
        .then((response) => { 
            return response.json(); })
        .then((myJson) => {
            document.getElementById("loader").style.display = "none";
            stickerLoadingMsg.style.display = "none";
            stickerSearchRow.style.display = "flex";
            stickerSearchBox.value = "";

            console.log(myJson);
            stickersContainer.innerHTML = "";

            var prompt = document.createElement("p");
            prompt.innerHTML = "create more"

            if ("text" in stickerRequest == false) {
                var text = document.createElement("div");
                text.style = "width: 80%; font-size: 16px; margin-top: 10px; font-weight: bold";
                text.innerHTML = "POPULAR";
                stickersContainer.appendChild(text);
            }

            for (var i = 0; i < myJson.length; i++) {
                var picture = document.createElement("img");
                picture.style = "display: flex; flex-direction: row; width: 120px; height: 120px; align-items: center; background-size: contain; margin: 10px;";
                picture.addEventListener("click", function (event) {
                    copyStickerPrompt.style.display = "flex";
                    setTimeout(() => {
                        copyStickerPrompt.style.display = "none";
                    }, "3000");
                });
                picture.style.cursor = "pointer";
                picture.src = myJson[i];
                stickersContainer.appendChild(picture);
            }

            if ("text" in stickerRequest == false) {
                var text = document.createElement("button");
                text.setAttribute("class", "actionButton");
                text.style = "width: 80%; font-size: 16px; margin-top: 10px; font-weight: bold; text-align: center; background-color: #72C6F5";
                text.innerHTML = "Create a new dogmoji with your own message...";
                stickersContainer.appendChild(text);
                
                text.addEventListener("click", () => {
                    stickerSearchBox.focus();
                });
            }
        });
}

function searchSticker() {
    console.log(stickerSearchBox.value.trim());
    if (stickerSearchBox.value.trim().length == 0) {
        return
    }
    stickersContainer.innerHTML = "";
    getSticker(stickerSearchBox.value.trim())
}

stickerSearchBtn.addEventListener("click", searchSticker);
document.addEventListener('keydown', (event) => {
    if(event.which === 13 && !event.shiftKey) {
        event.preventDefault();
        searchSticker();
    }
}, false);