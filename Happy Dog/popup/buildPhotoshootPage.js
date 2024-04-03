var draftPhotoId = undefined;
var generatedPhotoId = undefined;
var photoBackgroundColor = undefined;

var photoshootBg = document.createElement('div');
photoshootBg.setAttribute("class", "bg");
photoshootBg.style.backgroundColor = "#FFC5DA";
photoshootBg.style.height = "1500px";
photoshootBg.style.display = "none";
photoshootBg.style.justifyContent = "flex-start";
document.body.appendChild(photoshootBg);

var titleRow = document.createElement('div');
titleRow.style = "display: flex; flex-direction: row; justify-content: space-between; width: 90%";
photoshootBg.appendChild(titleRow);

var title = document.createElement('h1');
title.innerHTML = "Create Dogmoji";
titleRow.appendChild(title);

var closeBtn = document.createElement("button");
closeBtn.innerHTML = "Discard";
closeBtn.setAttribute("class", "actionButton");
closeBtn.style.backgroundColor = "#FF6499";
closeBtn.style.width = "80px";
// closeBtn.style.marginLeft = "400px";
closeBtn.addEventListener("click", function (event) {
    photoshootBg.style.display = "none";
    photoBackgroundColor = undefined;
});
titleRow.appendChild(closeBtn);

var photoshootStep2Btn = document.createElement("button");
photoshootStep2Btn.innerHTML = "Generate";
// photoshootStep2Btn.setAttribute("class", "actionButton");
// photoshootStep2Btn.style.backgroundColor = "#FF6499";
// photoshootStep2Btn.style.width = "80px";
// photoshootStep2Btn.style.marginLeft = "400px";

photoshootStep2Btn.style="position: fixed; top: 500px; padding: 15px 20px; background-color: #FF6499; border-radius: 50px; border-width: 0px; color: white; cursor: pointer; font-size: 20px; box-shadow: 0px 0px 10px gray;";

photoshootStep2Btn.addEventListener("click", function (event) {
    var request = {
        "baseImage": draftPhotoId, "background": photoBackgroundColor, "text": stickerTextBox.value.trim(), "fontStyle": selectedFont, "fontColor": selectedFontColor
    }
    console.log(request)
    showLoader();
    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/createSticker-2";
    const options = {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' }
    };
    fetch(endpoint_url, options).then((response) => 
    {
        hideLoader();
        if(response.status == 200){
            return response.json();
        }
        else{
            return "error";
        }
    })
    .then((json) => {
        console.log(json[0])
        picture2.src = "https://storage.googleapis.com/office-pets/photobook/" + json[0] + ".png";
        photoshootBg2.style.display = "flex";        
        generatedPhotoId = json[0];
    });
});
photoshootBg.appendChild(photoshootStep2Btn);

var pictureFrame = document.createElement("div");
pictureFrame.style = "display: flex; flex-direction: column; width: 300px; height: 350px; align-items: center; margin: 20px; margin-bottom: 5px";
pictureFrame.style.backgroundColor = "white";

var picture = document.createElement("img");
picture.style = "display: flex; flex-direction: row; width: 260px; height: 260px; align-items: center; background-size: contain;";
picture.style.margin = "20px";
picture.addEventListener("click", function (event) {
    alert("Click \"Generate\"");
});
picture.style.cursor = "pointer";

pictureFrame.appendChild(picture);
photoshootBg.appendChild(pictureFrame);

var backgroundColorPickerHeader = document.createElement("h2");
backgroundColorPickerHeader.style.width = "90%";
backgroundColorPickerHeader.innerHTML = "1. Choose a background";
photoshootBg.appendChild(backgroundColorPickerHeader);

var backgroundColorPicker = document.createElement("div");
backgroundColorPicker.style = "display: flex; flex-direction: row; flex-wrap: wrap; padding: 10px; justify-content: center"

for (var i = 0; i < 23; i++) {
    var backgroundOption = document.createElement("div");
    backgroundOption.style = "width: 30px; height: 30px; background-size: 30px 30px; margin: 3px; cursor: pointer";
    backgroundOption.style.backgroundImage = "url('https://storage.googleapis.com/office-pets/backgrounds/" + i + ".png')";
    backgroundOption.setAttribute("id", "backgroundColor" + i);
    backgroundOption.addEventListener("click", function (event) {
        picture.style.backgroundImage = "url('https://storage.googleapis.com/office-pets/backgrounds/" + event.target.id.replace("backgroundColor", "") + ".png')";
        photoBackgroundColor = event.target.id.replace("backgroundColor", "");
    });
    backgroundColorPicker.appendChild(backgroundOption);
}
photoshootBg.appendChild(backgroundColorPicker);


var stickerTextBoxHeader = document.createElement("h2");
stickerTextBoxHeader.style.width = "90%";
stickerTextBoxHeader.innerHTML = "2. Add some text to the image";
photoshootBg.appendChild(stickerTextBoxHeader);

var stickerTextBox = document.createElement('textarea'); 
stickerTextBox.type = "text";  
stickerTextBox.setAttribute("type", "text");
stickerTextBox.setAttribute("value", "");
stickerTextBox.setAttribute("placeholder", "Add some text...Type something (e.g. 'hello!')");
stickerTextBox.setAttribute("row", 1);
stickerTextBox.setAttribute("style", "width: 90%; height: 15px; resize: none; padding: 10px; border-radius: 30px; font-family: Rubik; line-height: 15px; background-color: #FFACCB; border-color: Transparent; font-size: 14px; outline-color: #D1F2FD; margin-top: 20px; margin-bottom: 20px");
photoshootBg.appendChild(stickerTextBox);


var fontPickerHeader = document.createElement("h2");
fontPickerHeader.style.width = "90%";
fontPickerHeader.innerHTML = "Choose a font style:";
photoshootBg.appendChild(fontPickerHeader);

var fontPicker = document.createElement("div");
fontPicker.style = "display: flex; flex-direction: row; flex-wrap: wrap; padding: 10px; justify-content: center"
var selectedFont = 7;

for (var i = 0; i < 8; i++) {
    var fontOption = document.createElement("div");
    fontOption.style = "width: 80px; height: 80px; background-size: 80px 80px; margin: 3px; cursor: pointer";
    fontOption.style.backgroundImage = "url('https://storage.googleapis.com/office-pets/fontExamples/" + i + ".png')";
    fontOption.setAttribute("id", "fontOption" + i);
    fontOption.addEventListener("click", function (event) {
        selectedFont = event.target.id.replace("fontOption", "");
        updateFontSelection(selectedFont);
    });
    fontPicker.appendChild(fontOption);
}
photoshootBg.appendChild(fontPicker);

function updateFontSelection(index) {
    for (var i = 0; i < 8; i++) {
        if (i == index) {
            document.getElementById("fontOption" + i).style.backgroundColor = "white";
        }
        else {
            document.getElementById("fontOption" + i).style.backgroundColor = "transparent";
        }
    }
}
updateFontSelection(selectedFont);

var fontColorPickerHeader = document.createElement("h2");
fontColorPickerHeader.style.width = "90%";
fontColorPickerHeader.innerHTML = "Choose a font color:";
photoshootBg.appendChild(fontColorPickerHeader);

var fontColorPicker = document.createElement("div");
fontColorPicker.style = "display: flex; flex-direction: row; flex-wrap: wrap; padding: 10px; justify-content: center"
var selectedFontColor = 0;

fontColors = ["#FF6499", "#AA8DD8", "#2db673", "#666666", "#fee307", "#72C6F5", "#62FBF6", "#FFC66D", "#FB60C4", "#B4DE58", "#B141FF", "#FF3F62", "#3f51b5", "#FFFFFF"];

for (var i = 0; i < fontColors.length; i++) {
    var fontColorOption = document.createElement("div");
    fontColorOption.style = "width: 30px; height: 30px; margin: 3px; cursor: pointer; border-style: solid; border-width: 3px; border-color: transparent; box-sizing: border-box;";
    fontColorOption.style.backgroundColor = fontColors[i];
    fontColorOption.setAttribute("id", "fontColorOption" + i);
    fontColorOption.addEventListener("click", function (event) {
        selectedFontColor = event.target.id.replace("fontColorOption", "");
        updateFontColorSelection(selectedFontColor);
    });
    fontColorPicker.appendChild(fontColorOption);
}
photoshootBg.appendChild(fontColorPicker);

function updateFontColorSelection(index) {
    for (var i = 0; i < fontColors.length; i++) {
        if (i == index) {
            document.getElementById("fontColorOption" + i).style.borderColor = "white";
        }
        else {
            document.getElementById("fontColorOption" + i).style.borderColor = "transparent";
        }
    }
}
updateFontColorSelection(selectedFontColor);

// page 2

var photoshootBg2 = document.createElement('div');
photoshootBg2.setAttribute("class", "bg");
photoshootBg2.style.backgroundColor = "#FFC5DA";
photoshootBg2.style.height = "1500px";
photoshootBg2.style.display = "none";
photoshootBg2.style.justifyContent = "flex-start";
document.body.appendChild(photoshootBg2);

var buttonRow = document.createElement('div');
buttonRow.style = "display: flex; flex-direction: row; justify-content: space-between; width: 90%";
photoshootBg2.appendChild(buttonRow);

var backBtn = document.createElement("button");
backBtn.innerHTML = "Back";
backBtn.setAttribute("class", "actionButton");
backBtn.style.backgroundColor = "#FF6499";
backBtn.addEventListener("click", function (event) {
    photoshootBg2.style.display = "none";
});
buttonRow.appendChild(backBtn);

var closeBtn = document.createElement("button");
closeBtn.innerHTML = "X";
closeBtn.setAttribute("class", "actionButton");
closeBtn.style.backgroundColor = "#FF6499";
closeBtn.addEventListener("click", function (event) {
    photoshootBg.style.display = "none";
    photoshootBg2.style.display = "none";
    photoBackgroundColor = undefined;
});
buttonRow.appendChild(closeBtn);

var pictureFrame2 = document.createElement("div");
pictureFrame2.style = "display: flex; flex-direction: column; width: 300px; height: 350px; align-items: center; margin: 20px; margin-bottom: 5px";
pictureFrame2.style.backgroundColor = "white";

var picture2 = document.createElement("img");
picture2.style = "display: flex; flex-direction: row; width: 260px; height: 260px; align-items: center; background-size: contain;";
picture2.style.margin = "20px";
picture2.addEventListener("click", function (event) {
    alert("Right-click and choose Copy Image from the menu");
});
picture2.style.cursor = "pointer";

pictureFrame2.appendChild(picture2);
photoshootBg2.appendChild(pictureFrame2);

var copyPrompt = document.createElement("div");
copyPrompt.style.width = "300px";
copyPrompt.style.textAlign = "center";
copyPrompt.innerHTML = "To copy it: Right-click and choose 'Copy Image'";
photoshootBg2.appendChild(copyPrompt);

var savePrompt = document.createElement("div");
savePrompt.style.width = "300px";
savePrompt.style.textAlign = "center";
savePrompt.innerHTML = "To save it: Right-click and choose 'Save Image As...'";
photoshootBg2.appendChild(savePrompt);

var downloadImageBtn = document.createElement("button");
downloadImageBtn.innerHTML = "Share on our photobook";
downloadImageBtn.setAttribute("class", "actionButton");
downloadImageBtn.style.backgroundColor = "#FF6499";
downloadImageBtn.style.width = "200px";
downloadImageBtn.style.marginTop = "40px";
downloadImageBtn.addEventListener("click", function (event) {
    if (generatedPhotoId) {
        if (!token) {
            // alert("Please sign in first");
            photoshootBg2.appendChild(loginPromptDiv);
            loginPromptDiv.style.display = "block";
            loginPrompt.innerHTML = "To post on photobook, please login first";
            return;
        }
        var shareRequest = { ...request };
        shareRequest['photoId'] = generatedPhotoId;
        shareRequest['token'] = token;

        var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/add2Photobook";
        const options = {
            method: 'POST',
            body: JSON.stringify(shareRequest),
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(endpoint_url, options).then((response) => {
            if (response.status == 200) {
                return response.text();
            }
            else {
                return "error";
            }
        });
        downloadImageBtn.style.display = "none";
        visitPhotobook.style.display = "flex";
    }
});
photoshootBg2.appendChild(downloadImageBtn);

var visitPhotobook = document.createElement("button");
visitPhotobook.innerHTML = "Woohoo! Visit our photobook";
visitPhotobook.setAttribute("class", "actionButton");
visitPhotobook.style.width = "220px";
visitPhotobook.style.textAlign = "center";
visitPhotobook.style.backgroundColor = "#FFC5DA";
visitPhotobook.style.color = "#FF6499";
visitPhotobook.style.display = "none";
visitPhotobook.style.marginTop = "40px";
visitPhotobook.addEventListener("click", function (event) {
    window.open("https://gethappydog.com/photobook.html", "_blank");
});
photoshootBg2.appendChild(visitPhotobook);