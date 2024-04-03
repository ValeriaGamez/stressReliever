var loginBg = document.createElement('div');
loginBg.setAttribute("class", "bg");
loginBg.style.backgroundColor = "rgba(0, 0, 0, .6)";
loginBg.style.height = "1400px";
loginBg.style.display = "none";
loginBg.style.justifyContent = "flex-start";
document.body.appendChild(loginBg);

var loginBox = document.createElement('div');
loginBox.style = "width: 300px; height: 250px; background-color: white; opacity: 100%; \
position: fixed; top: 180px; border-radius: 20px; display: flex; flex-direction: column; \
justify-content: center; align-items: center";

var logoImg = document.createElement('img');
logoImg.setAttribute("src", "logo_transparent_bg.png");
logoImg.setAttribute("class", "logo");
logoImg.style.width = "60px";
logoImg.style.marginBottom = "10px";

var createSpaceBtn = document.createElement("button");
createSpaceBtn.style="width: 70%; height: 36px; background-color: #967ADA; border-radius: 50px; border-width: 0px; color: white; cursor: pointer; font-size: 16px;";
createSpaceBtn.innerHTML = "Create a space";

var createSpaceLine = document.createElement("p");
createSpaceLine.style="margin-top: 5px";
createSpaceLine.innerHTML = "To get a new Happy Dog"

var enterSpaceBtn = document.createElement("button");
enterSpaceBtn.style="margin-top: 10px; width: 70%; height: 36px; background-color: #967ADA; border-radius: 50px; border-width: 0px; color: white; cursor: pointer; font-size: 16px;";
enterSpaceBtn.innerHTML = "Enter a space";

var enterSpaceLine = document.createElement("p");
enterSpaceLine.style="margin-top: 5px";
enterSpaceLine.innerHTML = "To take care of existing Happy Dog"

loginBox.appendChild(logoImg);
loginBox.appendChild(createSpaceBtn);
loginBox.appendChild(createSpaceLine);
loginBox.appendChild(enterSpaceBtn);
loginBox.appendChild(enterSpaceLine);
loginBg.appendChild(loginBox);

//------

var createFormType = "create";

var createSpaceBg = document.createElement('div');
createSpaceBg.setAttribute("class", "bg");
createSpaceBg.style.backgroundColor = "#C8B9F2";
createSpaceBg.style.height = "1400px";
createSpaceBg.style.display = "none";
createSpaceBg.style.justifyContent = "flex-start";
document.body.appendChild(createSpaceBg);

var createSpaceTitle = document.createElement("h1");
createSpaceTitle.innerHTML = "Create a new space";

var createSpaceCloseBtn = document.createElement("button");
createSpaceCloseBtn.innerHTML = "X";
createSpaceCloseBtn.setAttribute("class", "actionButton");
createSpaceCloseBtn.style.backgroundColor = "#FF9ABD";
createSpaceCloseBtn.style.width = "40px";
createSpaceCloseBtn.style.marginLeft = "300px";
createSpaceCloseBtn.style.marginTop = "80px";
createSpaceCloseBtn.addEventListener("click", function (event) {
    createSpaceBg.style.display = "none";
});

var form = document.createElement("form");
form.setAttribute("method", "post");
form.style.width = "300px";

var spaceNameLine = document.createElement("h3");
spaceNameLine.innerHTML = "Give your space a name";

var nameLine = document.createElement("h3");
nameLine.innerHTML = "What do others call you?";

var errorLine = document.createElement("h3");
errorLine.innerHTML = "...";
errorLine.style.color = "red";

var SPACE = document.createElement("input");
SPACE.setAttribute("type", "text");
SPACE.setAttribute("name", "space");
SPACE.setAttribute("placeholder", "Space");
SPACE.setAttribute("class", "formField");
SPACE.setAttribute("required", true);
SPACE.style.marginBottom = "10px";

var NAME = document.createElement("input");
NAME.setAttribute("type", "text");
NAME.setAttribute("name", "name");
NAME.setAttribute("placeholder", "Your name");
NAME.setAttribute("class", "formField");
NAME.setAttribute("required", true);

var s = document.createElement("input");
s.setAttribute("type", "submit");
s.setAttribute("value", "Create space");
s.setAttribute("class", "formBtn");
s.style.backgroundColor = "#FF6499";

form.appendChild(createSpaceCloseBtn);
form.appendChild(createSpaceTitle);
form.appendChild(spaceNameLine);
form.appendChild(SPACE);
form.appendChild(errorLine);
form.appendChild(nameLine);
form.appendChild(NAME);
form.appendChild(s);

createSpaceBg.appendChild(form);

function update_space_form(type) {
    if (type == 0) {
        createSpaceTitle.innerHTML = "Create a new space";
        spaceNameLine.innerHTML = "Give your space a name";
        errorLine.innerHTML = "";
        s.setAttribute("value", "Create space");
        createFormType = "create";
    }
    else {
        createSpaceTitle.innerHTML = "Enter a space";
        spaceNameLine.innerHTML = "What’s the name of the space?";
        errorLine.innerHTML = "";
        s.setAttribute("value", "Enter space");
        createFormType = "enter";
    }
}

createSpaceBtn.onclick = () => {
    createSpaceBg.style.display = "flex";
    update_space_form(0);
}

enterSpaceBtn.onclick = () => {
    createSpaceBg.style.display = "flex";
    update_space_form(1);
}

form.addEventListener('submit', createForm);
// prevent form submission on enter
form.onkeypress = function(e) {
    var key = e.charCode || e.keyCode || 0;     
    if (key == 13) {
      e.preventDefault();
    }
} 

function createForm(event) {
    event.preventDefault();

    if (createFormType == "create"){
        if (SPACE.value.endsWith(' ') || SPACE.value.startsWith(' ')){
            errorLine.innerHTML = "Space name cannot start or end with spaces"
        }
        else{
            showLoader();
    
            errorLine.innerHTML = "Creating space: " + SPACE.value;
    
            getPets(SPACE.value)
            .then((response) => { return response.json(); })
            .then((myJson) => {
                hideLoader();
                console.log(myJson);
                if (myJson.length > 0){                
                    errorLine.innerHTML = "The space name is already taken";
                } 
                else {
                    setSession(SPACE.value, NAME.value);
                    createSpaceBg.style.display = "none";
                    displayAdoption();
                } 
            });
        }
    }
    else if (createFormType == "enter") {
        showLoader();

        //check pet
        getPets(SPACE.value)
            .then((response) => { return response.json(); })
            .then((myJson) => {

                hideLoader();
                if (myJson.length > 0){               
                    //set session
                    setSession(SPACE.value, NAME.value);

                    document.body.appendChild(confirmEntranceBg);
                    confirmEntranceBtn.addEventListener('click', function (){confirmEntranceBg.remove();})
                    if (/^\s*$/.test(SPACE.value)) {
                        confirmSpaceName.innerHTML = "\"" + SPACE.value + "\"";
                    }
                    else {
                        confirmSpaceName.innerHTML = SPACE.value;
                    }
                    
                    pets = myJson;
                    setPet(myJson[0]['name'], myJson[0]['breed']);
                    updateCurrentPet();
                    getGoodiesOwned(true);
                    
                    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/getSpaceUserCount";
                    const options = {
                        method: 'POST',
                        body: JSON.stringify(request),
                        headers: { 'Content-Type': 'application/json' }
                    };
                    fetch(endpoint_url, options)
                        .then((response) => { return response.json(); })
                        .then((myJson) => {
                            console.log(myJson);
                            if (myJson["count"] <= 1) confirmTextPplList.innerHTML = "This space has " + myJson["count"] + " member";
                            else confirmTextPplList.innerHTML = myJson["count"] + " people are members of this space";
                        });

                    createSpaceBg.style.display = "none";
                    loginBg.style.display = "none";
                    photobookBg.style.display = "none";
                } 
                else {
                    errorLine.innerHTML = "The space doesn't not exist";
                }
            });
        event.preventDefault();
    }
}