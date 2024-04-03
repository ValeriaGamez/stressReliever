var bannerDiv = document.getElementById("banner");

document.getElementById("banner_action1").addEventListener("click", function (event) {
    bannerDiv.style.display = "none";
    window.open("https://chrome.google.com/webstore/detail/happy-dog-virtual-pet-for/cdoblkdcnbcdlcfklmbmkapbekgfbijp", "_blank");

    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/rewardReview";
    const options = {
        method: 'POST',
        body: JSON.stringify({ 'user': request['user'], 'space': request['space'], 'pet': request['pet'], 'action': 1 }),
        headers: { 'Content-Type': 'application/json' }
    };
    fetch(endpoint_url, options).then((response) => { return response.json(); });
});

document.getElementById("banner_action2").addEventListener("click", function (event) {
    bannerDiv.style.display = "none";

    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/rewardReview";
    const options = {
        method: 'POST',
        body: JSON.stringify({ 'user': request['user'], 'space': request['space'], 'pet': request['pet'], 'action': 2 }),
        headers: { 'Content-Type': 'application/json' }
    };
    fetch(endpoint_url, options).then((response) => { return response.json(); });
});

function fetchMessage(request) {
    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/getMessage";
    const options = {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' }
    };

    fetch(endpoint_url, options)
        .then((response) => { return response.json(); })
        .then((msg) => {
            console.log(msg);
            // console.log(msg["message"]);
            for (var i = 0; i < msg.length; i++) {
                if (msg[i]['campaign'] == "review_incentive") {
                    document.getElementById("banner_message").innerHTML = msg[i]["message"];
                    bannerDiv.style.display = "flex";
                    break;
                }
            }
        });
}


// var photobookBg = document.createElement('div');
// photobookBg.setAttribute("class", "bg");
// photobookBg.style.backgroundColor = "#FFF7FC";
// photobookBg.style.display = "none";
// document.body.appendChild(photobookBg);

// document.getElementById("photobook").addEventListener("click", function (event) {                    
//     photobookBg.style.display = "flex";
// });

// var closeBtn = document.createElement("button");
// closeBtn.innerHTML = "X";
// closeBtn.setAttribute("class", "actionButton");
// closeBtn.style.backgroundColor = "#FF9ABD";
// closeBtn.style.width = "40px";
// closeBtn.addEventListener("click", function (event) {
//     photobookBg.style.display = "none";
// });
// photobookBg.appendChild(closeBtn);
