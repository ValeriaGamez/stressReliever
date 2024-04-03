var leaderBoardBg = document.createElement('div');
leaderBoardBg.setAttribute("class", "bg");
leaderBoardBg.style.backgroundColor = "#FFF7FC";
leaderBoardBg.style.display = "none";
leaderBoardBg.style.height = "1400px";
leaderBoardBg.style.justifyContent = "flex-start";
document.body.appendChild(leaderBoardBg);

var leaderBoardTitleRow = document.createElement('div');
leaderBoardTitleRow.setAttribute("class", "row");
leaderBoardTitleRow.style.justifyContent = "space-between";
leaderBoardTitleRow.style.alignItems = "center";
leaderBoardTitleRow.style.width = "450px";

var leaderBoardTitle = document.createElement("h1");
leaderBoardTitle.innerHTML = "Leaderboard";
leaderBoardTitle.style.width = "320px";

var closeBtn = document.createElement("button");
closeBtn.innerHTML = "X";
closeBtn.setAttribute("class", "actionButton");
closeBtn.style.backgroundColor = "#FF9ABD";
closeBtn.style.width = "40px";
closeBtn.addEventListener("click", function (event) {
    leaderBoardBg.style.display = "none";
});

var refreshBtn = document.createElement("button");
refreshBtn.style.backgroundImage="url(refresh.svg)";
refreshBtn.setAttribute("class", "actionButton");
refreshBtn.style.backgroundColor = "#FFF7FC";
refreshBtn.style.width = "40px";
refreshBtn.style.display = "none";
refreshBtn.addEventListener("click", function (event) {
    loadingLeaderboard.style.display = "flex";
    refreshBtn.style.display = "none";
    loadLeaderboard();
    leaderBoardContent.innerHTML = "";
});

leaderBoardTitleRow.appendChild(leaderBoardTitle);
leaderBoardTitleRow.appendChild(refreshBtn);
leaderBoardTitleRow.appendChild(closeBtn);
leaderBoardBg.appendChild(leaderBoardTitleRow);

// header
var header = document.createElement("div");
header.style.display = "flex";
header.style.flexDirection = "row";
header.style.width = "450px";
header.style.height = "30px";
header.style.alignItems = "center";
header.style.backgroundColor = "#C8B9F2";
header.style.borderRadius = "5px";

var headerItem1 = document.createElement("div");
headerItem1.style.width = "70px";
headerItem1.style.textAlign = "center";
headerItem1.style.fontWeight = "bolder";
headerItem1.innerHTML = "RANK";

var headerItem2 = document.createElement("div");
headerItem2.style.width = "70px";
headerItem2.style.fontWeight = "bolder";
headerItem2.innerHTML = "PET";

var headerItem3 = document.createElement("div");
headerItem3.style.width = "70px";

var img = new Image();
img.src = 'Heart.png';
img.style.width = "15px";
img.style.height = "15px";
headerItem3.appendChild(img);

var headerItem4 = document.createElement("div");
headerItem4.style.width = "70px";
headerItem4.style.fontWeight = "bolder";
headerItem4.innerHTML = "GOODIES";

header.appendChild(headerItem1);
header.appendChild(headerItem2);
header.appendChild(headerItem3);
header.appendChild(headerItem4);
leaderBoardBg.appendChild(header);

var loadingLeaderboard = document.createElement("div");
loadingLeaderboard.style = "margin-top: 30px"
loadingLeaderboard.innerHTML = "loading...";
leaderBoardBg.appendChild(loadingLeaderboard);

var leaderboardLoaded = false;

var leaderBoardContent = document.createElement('div');
leaderBoardBg.appendChild(leaderBoardContent);


function loadLeaderboard() {
    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/getLeaderboard";
    const options = {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' }
    };

    fetch(endpoint_url, options)
        .then((response) => { return response.json(); })
        .then((msg) => {
            loadingLeaderboard.style.display = "none";
            refreshBtn.style.display = "flex";

            console.log(msg);
            // row by row
            for (var i = 0; i < msg.length; i++) {
                var row = document.createElement("div");
                row.style = "display: flex; flex-direction: row; width: 450px; height: 30px; align-items: center";

                if ((msg[i]["space"] == request["space"]) && (msg[i]["pet"] == request["pet"])){
                    row.style.backgroundColor = "#FFF1B6";
                    row.style.borderRadius = "5px";
                }

                var rank = document.createElement("div");
                rank.style.width = "70px";
                rank.style.textAlign = "center";
                rank.innerHTML = msg[i]["rank"] + 1;

                var petName = document.createElement("div");
                petName.style.width = "70px";
                petName.innerHTML = msg[i]["pet"];

                var heartCnt = document.createElement("div");
                heartCnt.style.width = "70px";
                heartCnt.innerHTML = msg[i]["hearts"];
                
                var goodieCnt = document.createElement("div");
                goodieCnt.style.width = "90px";

                row.appendChild(rank);
                row.appendChild(petName);
                row.appendChild(heartCnt);
                
                msg[i]["goodies"].push({ "id": 1, "type": 1 });
                msg[i]["goodies"].push({ "id": 23, "type": 2 });
                msg[i]["goodies"].push({ "id": 31, "type": 3 });

                if(msg[i]["goodies"].length > 0){
                    var shuffledArray = msg[i]["goodies"].sort((a, b) => 0.5 - Math.random());
                    for (var j = 0; j < 4; j++){
                        if(shuffledArray[j]){
                            var goodie1 = document.createElement("div");
                            goodie1.style = "height: 30px; width: 30px; border-radius: 10px; margin-right: 3px; background-size: 30px 30px;"
                            goodie1.style.backgroundImage = "url('https://storage.googleapis.com/office-pets/goodies/" + shuffledArray[j]["id"] + ".png')";
                            row.appendChild(goodie1);
                        }
                    }
                    row.appendChild(goodieCnt);
                }
                
                leaderBoardContent.appendChild(row);
                leaderBoardContent.appendChild(document.createElement("br"));
                if (msg[i]["goodies"].length > 4) {
                    goodieCnt.innerHTML = "  and " + (msg[i]["goodies"].length - 4) + " more";
                }
            }
            leaderboardLoaded = true;
        });
}

document.getElementById("leaderboard").addEventListener("click", function (event) {                    
    leaderBoardBg.style.display = "flex";
    if (leaderboardLoaded)  return;
    loadLeaderboard();
});