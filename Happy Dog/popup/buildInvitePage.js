var invitePageBg = document.createElement('div');
invitePageBg.setAttribute("class", "bg");
invitePageBg.style.backgroundColor = "#CEEFFF";
invitePageBg.style.height = "1300px";
invitePageBg.style.display = "none";
invitePageBg.style.justifyContent = "flex-start";
document.body.appendChild(invitePageBg);

var closeBtn = document.createElement("button");
closeBtn.innerHTML = "X";
closeBtn.setAttribute("class", "actionButton");
closeBtn.style.backgroundColor = "#FF9ABD";
closeBtn.style.width = "40px";
closeBtn.style.marginLeft = "400px";
closeBtn.addEventListener("click", function (event) {
    invitePageBg.style.display = "none";
});
invitePageBg.appendChild(closeBtn);

var invitePrompt = document.createElement("h2");
invitePrompt.style.marginTop = "200px";
invitePrompt.innerHTML = "Send this link to anyone you want to invite:";
invitePageBg.appendChild(invitePrompt);

var inviteLinkRow = document.createElement("div");
inviteLinkRow.style = "display: flex; flex-direction: row; align-items: center";
invitePageBg.appendChild(inviteLinkRow);

var inviteLink = document.createElement("h2");
inviteLinkRow.appendChild(inviteLink);
inviteLink.style.backgroundColor = "pink";
inviteLink.style.padding = "8px";
inviteLink.style.paddingLeft = "12px";
inviteLink.style.paddingRight = "12px";
inviteLink.style.borderRadius = "20px";

var copyLinkBtn = document.createElement("button");
copyLinkBtn.innerHTML = "copy";
copyLinkBtn.setAttribute("class", "actionButton");
copyLinkBtn.style.backgroundColor = "#FF9ABD";
copyLinkBtn.addEventListener("click", function (event) {
    navigator.clipboard.writeText(inviteLink.innerHTML);
    copyLinkBtn.innerHTML = "copied";
    copyLinkBtn.style.backgroundColor = "#DBDBDB";
});

inviteLinkRow.appendChild(copyLinkBtn);

document.getElementById("inviteBtn").addEventListener("click", function (event) {
    invitePageBg.style.display = "flex";
    copyLinkBtn.innerHTML = "copy";
    copyLinkBtn.style.backgroundColor = "#FF9ABD";
    
    let inviteLinkRequest = {...request};

    for (var i = 0; i < put_on_goodies.length; i++) {
        var x = i + 1;
        var type = goodies_owned[i]["type"];
        if (put_on_goodies[i]) {
            inviteLinkRequest["slot" + type] = goodies_owned[i]["id"];
        }
    }
    console.log(inviteLinkRequest);

    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/getLink";
    const options = {
        method: 'POST',
        body: JSON.stringify(inviteLinkRequest),
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
        inviteLink.innerHTML = "https://gethappydog.com/link/?id=" + text;
    });
});



