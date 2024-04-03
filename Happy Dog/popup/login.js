// form.addEventListener('submit', formSubmit);

// function formSubmit(event) {
//     showLoader();
//     //set session
//     setSession(SPACE.value, NAME.value);

//     // displayPetPicker();

//     //check pet
//     getPets(SPACE.value)
//         .then((response) => { return response.json(); })
//         .then((myJson) => {
//             hideLoader();
//             if (myJson.length > 0){                
//                 document.body.appendChild(confirmEntranceBg);
//                 confirmEntranceBtn.addEventListener('click', function (){confirmEntranceBg.remove();})
//                 if (/^\s*$/.test(SPACE.value)) {
//                     confirmSpaceName.innerHTML = "\"" + SPACE.value + "\"";
//                 }
//                 else {
//                     confirmSpaceName.innerHTML = SPACE.value;
//                 }
//                 // setPet(myJson[0]['name']);
//                 pets = myJson;
//                 setPet(myJson[0]['name'], myJson[0]['breed']);
//                 updateCurrentPet();
//                 getGoodiesOwned(true);
//                 // getScores();
//                 var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/getSpaceUserCount";
//                 const options = {
//                     method: 'POST',
//                     body: JSON.stringify(request),
//                     headers: { 'Content-Type': 'application/json' }
//                 };
//                 fetch(endpoint_url, options)
//                     .then((response) => { return response.json(); })
//                     .then((myJson) => {
//                         console.log(myJson);
//                         if (myJson["count"] <= 1) confirmTextPplList.innerHTML = "This space has " + myJson["count"] + " member";
//                         else confirmTextPplList.innerHTML = myJson["count"] + " people are members of this space";
//                     });
//             } 
//             else displayAdoption();
//         });
//     event.preventDefault();
// }

var leaveBtn = document.getElementById("leaveBtn");
leaveBtn.addEventListener('click', leaveSpace);
leaveSpaceBtn.addEventListener('click', leaveSpace);
confirmBackBtn.addEventListener('click', leaveSpace);

function leaveSpace() {
    batch_action_update();

    chrome.storage.local.remove(["pet", "session", "goodies_owned", "put_on_goodies"], function() {
        request.pet = undefined;
        request.space = undefined;
        request.user = undefined;
        document.body.appendChild(bg);
    });

    chrome.tabs.query({}, function(tabs) {
        for (var i = 0; i < tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, { "session": { "user": undefined, "space": undefined }, "pet": undefined });
        }
    });

    location.reload();
}

// function displayPetPicker(){
//     document.body.appendChild(pickPetBg);
// }

petCreateForm.addEventListener('submit', createPet);
// petCreateBtn.addEventListener('click', createPet);
async function createPet(event) {
    showLoader();
    request.pet = petName.value;
    event.preventDefault();
    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/createPet";
    const options = {
        method: 'POST',
        body: JSON.stringify({ "space": request.space, "pet": petName.value, "breed": pickedIdx }),
        headers: { 'Content-Type': 'application/json' }
    };

    let response = await fetch(endpoint_url, options).then(
        ()=>{
            pets[0] = {"name": petName.value, "breed": pickedIdx };
            setPet(petName.value, pickedIdx);    
            updateCurrentPet();
            getGoodiesOwned(true);
            location.reload();
        }
    ).then(hideLoader());

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
}
