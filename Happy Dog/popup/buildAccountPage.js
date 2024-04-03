var accountPageBg = document.createElement('div');
accountPageBg.setAttribute("class", "bg");
accountPageBg.style.backgroundColor = "#CEEFFF";
accountPageBg.style.height = "2000px";
accountPageBg.style.display = "none";
accountPageBg.style.justifyContent = "flex-start";
document.body.appendChild(accountPageBg);

var accountTitleRow = document.createElement('div');
accountTitleRow.setAttribute("class", "row");
accountTitleRow.style.justifyContent = "space-between";
accountTitleRow.style.alignItems = "center";
accountTitleRow.style.width = "450px";

var accountTitle = document.createElement("h1");
accountTitle.innerHTML = "Account";

var closeBtn = document.createElement("button");
closeBtn.innerHTML = "X";
closeBtn.setAttribute("class", "actionButton");
closeBtn.style.backgroundColor = "#72C6F5";
closeBtn.style.width = "40px";
closeBtn.addEventListener("click", function (event) {
    accountPageBg.style.display = "none";
});

accountTitleRow.appendChild(accountTitle);
accountTitleRow.appendChild(closeBtn);
accountPageBg.appendChild(accountTitleRow);

document.getElementById("account").addEventListener("click", function (event) {
    accountPageBg.style.display = "flex";
});

var signInState = document.createElement('div');
signInState.style = "text-align: center; margin-top: 30px;"
accountPageBg.appendChild(signInState);

var userNameDiv = document.createElement('div');
userNameDiv.style = "display:flex; flex-direction: row; align-items: center";
accountPageBg.appendChild(userNameDiv);

var userName = document.createElement('h2');
userName.style = "text-align: center;"
userNameDiv.appendChild(userName);
var currentUsername = "";

var userNameEditBtn = document.createElement('div');
// userNameEditBtn.setAttribute("class", "actionButton");
userNameEditBtn.style = "cursor: pointer; font-size: 12px; margin-left: 10px; display: none"
userNameEditBtn.innerHTML = "Edit";
userNameDiv.appendChild(userNameEditBtn);

var signInBtn = document.createElement('button');
signInBtn.setAttribute("class", "actionButton");
signInBtn.style="width: 90px; background-color: #72C6F5;  margin-top: 30px;"
signInBtn.innerHTML = "Sign in";
accountPageBg.appendChild(signInBtn);

var user_signed_in = false;
var token;

signInState.innerHTML = "<h2>Not signed in</h2><h3>Some features are only available after you sign in</h3>";
userName.innerHTML = "";
signInBtn.innerHTML = "Sign in";
function updateSignInState(signedIn) {
    if (signedIn) {
        user_signed_in = true;
        signInBtn.innerHTML = "Sign out";
        if (token) {
            var x = new XMLHttpRequest();
            x.responseType = 'json';
            x.open('GET', 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token);
            x.onload = function() {
                let response = x.response 
                signInState.innerHTML = "<h2>Signed in as: <span style=\"color: #839EFF\">" + response["email"] + "</span></h2>"
            };
            x.send();
            // alert(token);

            var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/checkUser";
            const options = {
                method: 'POST',
                body: JSON.stringify({'token': token}),
                headers: { 'Content-Type': 'application/json' }
            };
        
            fetch(endpoint_url, options)
                .then((response) => { return response.json(); })
                .then((myJson) => {
                    console.log(myJson);
                    if(myJson.userName) {
                        userName.innerHTML = "Username: <span style=\"color: #839EFF\">" + myJson.userName + "</span>";
                        currentUsername = myJson.userName;
                        usernameTextBox.value = myJson.userName;
                        userNameEditBtn.style.display = "block";
                    }
            });            


        }
    }
    else {
        user_signed_in = false;
        signInState.innerHTML = "<h2>Not signed in</h2><h3>Some features are only available after you sign in</h3>";
        userName.innerHTML = "";
        currentUsername = "";
        signInBtn.innerHTML = "Sign in";
        userNameEditBtn.style.display = "none";

    }
}
// updateSignInState(false);

// updateSignInState(user_signed_in);
chrome.identity.onSignInChanged.addListener(function (account_id, signedIn) {
    updateSignInState(signedIn);
});

chrome.identity.getAuthToken({ 'interactive': false }, function(userToken) {
    if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
        return;
    }
    if (userToken) {
        token = userToken;
        updateSignInState(true);    
    }
});

signInBtn.addEventListener("click", function (event) {
    if (user_signed_in){
        token = undefined;
        updateSignInState(false);

        // Option 1
        From: https://stackoverflow.com/questions/26080632/how-do-i-log-out-of-a-chrome-identity-oauth-provider
        chrome.identity.launchWebAuthFlow(
            { 'url': 'https://accounts.google.com/logout' },
            function(tokenUrl) {
                responseCallback();
            }
        );
        chrome.identity.clearAllCachedAuthTokens();
    
        // Option 2
        // chrome.identity.getAuthToken({ 'interactive': false }, function(token) {
        //     var url = 'https://accounts.google.com/o/oauth2/revoke?token=' + token;
        //     window.fetch(url);
        
        //     chrome.identity.removeCachedAuthToken({token: token}, function (){
        //         alert('Signed out');
        //     });
        // });
    }
    else{
        chrome.identity.getAuthToken({
            interactive: true
        }, function(userToken) {
            if (chrome.runtime.lastError) {
                alert(chrome.runtime.lastError.message);
                return;
            }
            if (userToken) {
                token = userToken;
                // updateSignInState(true);    
            }
        });
    }
});

var changeUsernameDiv = document.createElement("div");
changeUsernameDiv.style="display: none; position: fixed; top: 160px; width: 300px; height: 200px; padding: 30px; background-color: white; border-radius: 50px; border-width: 0px; font-size: 16px; box-shadow: 0px 0px 10px gray; flex-direction: row; align-items: center; flex-wrap: wrap; align-content: center";

var usernameTextBox = document.createElement('textarea'); 
usernameTextBox.type = "text";  
usernameTextBox.setAttribute("type", "text");
usernameTextBox.setAttribute("row", 1);
usernameTextBox.setAttribute("style", "width: 100%; height: 15px; resize: none; padding: 10px; border-radius: 30px; font-family: Rubik; line-height: 15px; background-color: #CEEFFF; border-color: Transparent; font-size: 14px; outline-color: #D1F2FD; margin-top: 20px; margin-bottom: 20px");
changeUsernameDiv.appendChild(usernameTextBox);

var changeUsernameSaveBtn = document.createElement("button");
changeUsernameSaveBtn.setAttribute("class", "actionButton");
changeUsernameSaveBtn.style = "background-color: #72C6F5; width: 70px"
changeUsernameSaveBtn.innerHTML = "Save";
changeUsernameSaveBtn.addEventListener("click", function (event) {
    if (currentUsername == usernameTextBox.value) {
        return;
    }

    showLoader();
    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/changeUsername";
            const options = {
                method: 'POST',
                body: JSON.stringify({'token': token, 'username': usernameTextBox.value}),
                headers: { 'Content-Type': 'application/json' }
            };
        
            fetch(endpoint_url, options)
                .then((response) => { 
                    hideLoader();
                    if(response.status == 200) {
                        alert("saved");
                        changeUsernameDiv.style.display = "none";
                        userName.innerHTML = "Username: <span style=\"color: #839EFF\">" + usernameTextBox.value + "</span>";
                        currentUsername = usernameTextBox.value;
                    }
                    else if (response.status == 202) {
                        alert("The username is already taken");
                    }
                    else if (response.status == 203) {
                        alert("The username is invalid");
                    }
                    else {
                        alert("Sorry something went wrong. Please try again later");
                    }
                 })         
});

var changeUsernameDismissBtn = document.createElement("button");
changeUsernameDismissBtn.setAttribute("class", "actionButton");
changeUsernameDismissBtn.style = "background-color: gray; width: 70px";
changeUsernameDismissBtn.innerHTML = "Cancel";
changeUsernameDismissBtn.addEventListener("click", function (event) {
    changeUsernameDiv.style.display = "none";
});

changeUsernameDiv.appendChild(changeUsernameSaveBtn);
changeUsernameDiv.appendChild(changeUsernameDismissBtn);

accountPageBg.appendChild(changeUsernameDiv);

userNameEditBtn.addEventListener("click", function (event) {
    changeUsernameDiv.style.display = "flex";
});