var referralPageBg = document.createElement('div');
referralPageBg.setAttribute("class", "bg");
referralPageBg.style.backgroundColor = "#E5F9FF";
referralPageBg.style.height = "2000px";
referralPageBg.style.display = "none";
referralPageBg.style.justifyContent = "flex-start";
document.body.appendChild(referralPageBg);

document.getElementById("referral_btn").addEventListener("click", function (event) {
    referralPageBg.style.display = "flex";
});

var storeTitleRow = document.createElement('div');
storeTitleRow.setAttribute("class", "row");
storeTitleRow.style.justifyContent = "space-between";
storeTitleRow.style.alignItems = "center";
storeTitleRow.style.width = "500px";

var storeTitle = document.createElement("h1");
storeTitle.innerHTML = "Refer friends and get rewarded";

var closeBtn = document.createElement("button");
closeBtn.innerHTML = "X";
closeBtn.setAttribute("class", "actionButton");
closeBtn.style.backgroundColor = "#72C6F5";
closeBtn.style.width = "40px";
closeBtn.addEventListener("click", function (event) {
    getState();
    referralPageBg.style.display = "none";
});

storeTitleRow.appendChild(storeTitle);
storeTitleRow.appendChild(closeBtn);
referralPageBg.appendChild(storeTitleRow);

var referralToggleBG = "background-color: #D9D9D9; width: 500px; height: 36px; border-radius: 36px; font-size: 16px; font-weight: bold; color: white; line-height: 36px; text-align: center; cursor: pointer; display:flex; flex-direction: row; margin-bottom: 10px"
var referralToggleSelected = "background-color: #72C6F5; width: 50%; height: 36px; border-radius: 36px; font-size: 16px; font-weight: bold; color: white; line-height: 36px; text-align: center; cursor: pointer;"
var referralToggleUnselected = "background-color: #D9D9D9; width: 50%; height: 36px; border-radius: 36px; font-size: 16px; font-weight: bold; color: #666666; line-height: 36px; text-align: center; cursor: pointer;"

var referralToggle = document.createElement("div");
referralToggle.style = referralToggleBG;
// panel.appendChild(followMouseToggle);

var referralToggleOption1 = document.createElement("div");
referralToggleOption1.style = referralToggleSelected;
referralToggleOption1.innerHTML = "I want to refer someone";
referralToggle.appendChild(referralToggleOption1);

var referralToggleOption2 = document.createElement("div");
referralToggleOption2.style = referralToggleUnselected;
referralToggleOption2.innerHTML = "I was referred by someone";
referralToggle.appendChild(referralToggleOption2);

let referring = true;

referralToggleOption1.onclick = () => {
    referralToggleOption1.style = referralToggleSelected;
    referralToggleOption2.style = referralToggleUnselected;
    referring = true;
    referringDiv.style.display = "flex";
    referredByDiv.style.display = "none";
    referralAllocationDiv.style.display = "block";
}

referralToggleOption2.onclick = () => {
    referralToggleOption2.style = referralToggleSelected;
    referralToggleOption1.style = referralToggleUnselected;
    referring = false;
    referringDiv.style.display = "none";
    referredByDiv.style.display = "flex";
    referralAllocationDiv.style.display = "none";
}

referralPageBg.appendChild(referralToggle);

var referringDiv = document.createElement('div');
referringDiv.style = "width: 500px; display:flex; flex-direction: column";
referralPageBg.appendChild(referringDiv);

var referredByDiv = document.createElement('div');
referredByDiv.style = "width: 500px; display:none; flex-direction: column";
referralPageBg.appendChild(referredByDiv);

var referralCodePrompt1 = document.createElement('h3');
referralCodePrompt1.innerHTML = "Your referral code";
referringDiv.appendChild(referralCodePrompt1);

var referralCodeBg = document.createElement('div');
referralCodeBg.style.fontSize = "30px";
referralCodeBg.innerHTML = "";
referringDiv.appendChild(referralCodeBg);

var referralCodePrompt2 = document.createElement('h3');
referralCodePrompt2.innerHTML = "Share your code with friends. When they install Happy Dog, they can enter your referral code and you will both earn 100 stars";
referringDiv.appendChild(referralCodePrompt2);

var referralCode;

function updateReferralRecord(referralCode) {
    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/referralGetRecord";
    const options = {
        method: 'POST',
        body: JSON.stringify({"referralCode": referralCode}),
        headers: { 'Content-Type': 'application/json' }
    };
    fetch(endpoint_url, options)
        .then((response) => { 
            return response.json(); })
        .then((myJson) => {
            console.log(myJson);
            referralRewardEarned.innerHTML = "Referral program balance: " + myJson["rewardEarned"] + "<img src='star.png' height='18' width='18' style='margin-left: 3px; margin-right: 3px' />"
            if (myJson["referredBy"]) {
                referralToggle.style.display = "none";
            }
        });
}

chrome.storage.local.get(['referral_code'], function (result) {
    if(result.referral_code){
        referralCodeBg.innerHTML = result.referral_code;
        referralCode = result.referral_code;
        updateReferralRecord(referralCode);
    }
    else{
        referralCode = Date.now().toString(36);
        referralCodeBg.innerHTML = referralCode;
        chrome.storage.local.set({ "referral_code": referralCode });
       
        var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/referralRegister";
        const options = {
            method: 'POST',
            body: JSON.stringify({"referralCode": referralCode}),
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(endpoint_url, options)
            .then((response) => { 
                return response.json(); })
            .then((myJson) => {
                console.log(myJson);
            });
        
        chrome.runtime.sendMessage({"referralCode": referralCode});
    }
});

var referralAllocationDiv = document.createElement('div');
referralAllocationDiv.style = "width: 460px; background-color: #D1F2FD; border-radius: 20px; padding: 20px; margin-top: 10px";
referralPageBg.appendChild(referralAllocationDiv);

var referralRewardEarned = document.createElement('h1');
referralRewardEarned.innerHTML = "Referral program balance:"
referralAllocationDiv.appendChild(referralRewardEarned);

var referralRewardEarnedExplainer = document.createElement('h3');
referralRewardEarnedExplainer.innerHTML = "You can choose to give these to any space (Each space can receive referral rewards for up to 1000 stars in total):"
referralAllocationDiv.appendChild(referralRewardEarnedExplainer);

var referralRewardSpace = document.createElement("input");
referralRewardSpace.setAttribute("type", "text");
referralRewardSpace.setAttribute("name", "space");
referralRewardSpace.setAttribute("placeholder", "Space");
referralRewardSpace.setAttribute("class", "formField");
referralRewardSpace.setAttribute("required", true);
referralRewardSpace.style.marginBottom = "10px";
referralRewardSpace.style.width = "80%";
referralAllocationDiv.appendChild(referralRewardSpace);

var referralRewardAmt = document.createElement("input");
referralRewardAmt.setAttribute("type", "number");
referralRewardAmt.setAttribute("name", "amount");
referralRewardAmt.setAttribute("placeholder", "Amount");
referralRewardAmt.setAttribute("class", "formField");
referralRewardAmt.setAttribute("required", true);
referralRewardAmt.style.marginBottom = "10px";
referralRewardAmt.style.width = "80%";
referralAllocationDiv.appendChild(referralRewardAmt);

var referralRewardResponse = document.createElement("h3");
referralRewardResponse.innerHTML = "";
referralRewardResponse.style.margin = "0";
referralRewardResponse.style.marginBottom = "10px";
referralAllocationDiv.appendChild(referralRewardResponse);

var referralRewardConfirm = document.createElement("button");
referralRewardConfirm.setAttribute("class", "actionButton");
referralRewardConfirm.style.backgroundColor = "#72C6F5";
referralRewardConfirm.style.width = "100px";
referralRewardConfirm.style.marginLeft = "0";
referralRewardConfirm.innerHTML = "Confirm";
referralAllocationDiv.appendChild(referralRewardConfirm);

referralRewardConfirm.onclick = () => {
    if(referralRewardSpace.value && referralRewardAmt.value > 0){
        referralRewardConfirm.style.display = "none";
        var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/referralApply";
        const options = {
            method: 'POST',
            body: JSON.stringify({"referralCode": referralCode, "amount": referralRewardAmt.value, "space": referralRewardSpace.value}),
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(endpoint_url, options)
            .then((response) => { 
                return response.text(); })
            .then((responseText) => {
                referralRewardConfirm.style.display = "block";
                console.log(responseText);
                updateReferralRecord(referralCode);
                referralRewardResponse.innerHTML = responseText;
            });
    }
}

var enterReferralCodePrompt = document.createElement("h3");
enterReferralCodePrompt.innerHTML = 'If you were referred, enter your referrer\'s code to get free <img src="star.png" height="12" width="12" style="margin-left: 3px; margin-right: 3px" />:'
referredByDiv.appendChild(enterReferralCodePrompt);

var enterReferralCode = document.createElement("input");
enterReferralCode.setAttribute("type", "text");
enterReferralCode.setAttribute("name", "amount");
enterReferralCode.setAttribute("placeholder", "Referral Code");
enterReferralCode.setAttribute("class", "formField");
enterReferralCode.setAttribute("required", true);
enterReferralCode.style.marginBottom = "10px";
enterReferralCode.style.width = "80%";
referredByDiv.appendChild(enterReferralCode);

var enterReferralCodeResponse = document.createElement("h3");
enterReferralCodeResponse.style.display = "none";
referredByDiv.appendChild(enterReferralCodeResponse);

var enterReferralCodeConfirm = document.createElement("button");
enterReferralCodeConfirm.setAttribute("class", "actionButton");
enterReferralCodeConfirm.style.backgroundColor = "#72C6F5";
enterReferralCodeConfirm.style.width = "80px";
enterReferralCodeConfirm.style.marginLeft = "0px";
enterReferralCodeConfirm.innerHTML = 'Get <img src="star.png" height="12" width="12" style="margin-left: 3px; margin-right: 3px" />';
referredByDiv.appendChild(enterReferralCodeConfirm);

enterReferralCodeConfirm.onclick = () => {
    if(enterReferralCode.value){
        enterReferralCodeConfirm.style.display = "none";
        enterReferralCodeResponse.style.display = "flex";
        enterReferralCodeResponse.innerHTML = "checking...";
        
        var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/referralClaim";
        const options = {
            method: 'POST',
            body: JSON.stringify({"referralCode": referralCode, "referredBy": enterReferralCode.value}),
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(endpoint_url, options)
            .then((response) => { 
                return response.text(); })
            .then((responseString) => {
                enterReferralCodeResponse.innerHTML = responseString;
                enterReferralCodeResponse.style.display = "flex";
                
                if(responseString == "success") {
                    updateReferralRecord(referralCode);
                    referralToggleOption1.style = referralToggleSelected;
                    referralToggleOption2.style = referralToggleUnselected;
                    referring = true;
                    referringDiv.style.display = "flex";
                    referredByDiv.style.display = "none";
                    referralAllocationDiv.style.display = "block";
                    alert("Congratulations! You and your referrer earned 100 stars!")
                }
                else{
                    enterReferralCodeConfirm.style.display = "block";
                }
            });
    }
}
