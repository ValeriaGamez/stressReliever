var moodPageBg = document.createElement('div');
moodPageBg.setAttribute("class", "bg");
moodPageBg.style.backgroundColor = "#F3FCF7";
moodPageBg.style.height = "2000px";
moodPageBg.style.display = "none";
moodPageBg.style.justifyContent = "flex-start";
document.body.appendChild(moodPageBg);

var moodPageRowTitleRow = document.createElement('div');
moodPageRowTitleRow.setAttribute("class", "row");
moodPageRowTitleRow.style.justifyContent = "space-between";
moodPageRowTitleRow.style.alignItems = "center";
moodPageRowTitleRow.style.width = "450px";

var closeBtn = document.createElement("button");
closeBtn.innerHTML = "X";
closeBtn.setAttribute("class", "actionButton");
closeBtn.style.backgroundColor = "#97CDB5";
closeBtn.style.width = "40px";
closeBtn.style.position = "absolute";
closeBtn.style.left = "500px";
closeBtn.addEventListener("click", function (event) {
    moodPageBg.style.display = "none";
});
moodPageBg.appendChild(closeBtn);

var contentDiv = document.createElement("div");
contentDiv.style = "display: flex; flex-direction: row; width: 100%";
moodPageBg.appendChild(contentDiv);

var leftSection = document.createElement("div");
leftSection.style = "display: flex; flex-direction: column; width: 50%; padding: 20px";
contentDiv.appendChild(leftSection);

var rightSection = document.createElement("div");
rightSection.style = "display: flex; flex-direction: column; width: 50%";
contentDiv.appendChild(rightSection);

// moodData = {
//     "2023-10-01": {
//         "mood_score": 5, "entry": "this is something"
//     },
//     "2023-10-02": {
//         "mood_score": 2, "entry": "this is something 2"
//     },
//     "2023-01-02": {
//         "mood_score": 3, "entry": null
//     },
//     // "2023-10-26": {
//     //     "mood_score": 3, "entry": "this is something 2"
//     // }
// }

moodData = {}
chrome.storage.local.get(['mood_data'], function (result) {
    // console.log(result)
    if ("mood_data" in result) {
        moodData = result["mood_data"];
    }
    updateMoodTable();
});


months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
monthNumbers = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
days = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
"21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];

var today = new Date();
var today_year = today.getFullYear();
var today_month = today.getMonth();
var today_day = today.getDate();
year = today.getFullYear();

var selectedDate = monthNumbers[today_month] + "-" + days[today_day - 1];


document.getElementById("mood_button").addEventListener("click", function (event) {
    moodPageBg.style.display = "flex";
    var key = year + "-" + monthNumbers[today_month] + "-" + days[today_day - 1];
    if ( moodData[key] == undefined ) {
        moodGreetingPage.style.display = "flex";
    } else {
        updateSelection(moodData[key]["mood_score"]);
        if("entry" in moodData[key]) {
            diaryEntry.value = moodData[key]["entry"];
        }  
    }
})

var moodResponseBox = document.createElement("h3"); 
moodResponseBox.style = "display: flex; flex-direction: column; height: 100px; width: 100px; ";
leftSection.appendChild(moodResponseBox);

var line1 = document.createElement("h2");
line1.innerHTML = (today_month + 1) + "/" + today_day + "<br>How are you today?";
leftSection.appendChild(line1);

var moodHeartsRow = document.createElement("div");
moodHeartsRow.style = "display: none; flex-direction: row; margin-bottom: 5px";
leftSection.appendChild(moodHeartsRow);

var heart1 = document.createElement("div");
// heart1.innerHTML = '<img src="heart_blue_filled.png" height="18" width="18" margin-right: 3px" />';
moodHeartsRow.appendChild(heart1);

var heart2 = document.createElement("div");
// heart2.innerHTML = '<img src="heart_blue_filled.png" height="18" width="18" margin-right: 3px" />';
moodHeartsRow.appendChild(heart2);

var heart3 = document.createElement("div");
// heart3.innerHTML = '<img src="heart_blue_filled.png" height="18" width="18" margin-right: 3px" />';
moodHeartsRow.appendChild(heart3);

var heart4 = document.createElement("div");
// heart4.innerHTML = '<img src="heart_blue_filled.png" height="18" width="18" margin-right: 3px" />';
moodHeartsRow.appendChild(heart4);

var heart5 = document.createElement("div");
// heart5.innerHTML = '<img src="heart_blue_filled.png" height="18" width="18" margin-right: 3px" />';
moodHeartsRow.appendChild(heart5);

// var chatPriceLinePt1 = document.createElement("div");
// chatPriceLinePt1.innerHTML = '10<img src="star.png" height="12" width="12" style="margin-left: 3px; margin-right: 3px" /> / message';

var moodOption1 = document.createElement("div");
moodOption1.style = "display: flex; flex-direction: row; align-items: center; margin-top: 5px; cursor: pointer; ";
var moodOption1Box = document.createElement("div");
moodOption1Box.style = "width: 20px; height: 20px; background-color: #65D29E; border-radius: 3px";
var moodOption1Text = document.createElement("div");
moodOption1Text.style = "margin-left: 5px;";
moodOption1Text.innerHTML = "Amazing! Happier than happy dog";
moodOption1.appendChild(moodOption1Box);
moodOption1.appendChild(moodOption1Text);

var moodOption2 = document.createElement("div");
moodOption2.style = "display: flex; flex-direction: row; align-items: center; margin-top: 5px; cursor: pointer; ";
var moodOption2Box = document.createElement("div");
moodOption2Box.style = "width: 20px; height: 20px; background-color: #A5E3C5; border-radius: 3px";
var moodOption2Text = document.createElement("div");
moodOption2Text.style = "margin-left: 5px;";
moodOption2Text.innerHTML = "Pretty good";
moodOption2.appendChild(moodOption2Box);
moodOption2.appendChild(moodOption2Text);

var moodOption3 = document.createElement("div");
moodOption3.style = "display: flex; flex-direction: row; align-items: center; margin-top: 5px; cursor: pointer; ";
var moodOption3Box = document.createElement("div");
moodOption3Box.style = "width: 20px; height: 20px; background-color: #FFF1B6; border-radius: 3px";
var moodOption3Text = document.createElement("div");
moodOption3Text.style = "margin-left: 5px;";
moodOption3Text.innerHTML = "It’s ok";
moodOption3.appendChild(moodOption3Box);
moodOption3.appendChild(moodOption3Text);

var moodOption4 = document.createElement("div");
moodOption4.style = "display: flex; flex-direction: row; align-items: center; margin-top: 5px; cursor: pointer; ";
var moodOption4Box = document.createElement("div");
moodOption4Box.style = "width: 20px; height: 20px; background-color: #FFD394; border-radius: 3px";
var moodOption4Text = document.createElement("div");
moodOption4Text.style = "margin-left: 5px;";
moodOption4Text.innerHTML = "Not good";
moodOption4.appendChild(moodOption4Box);
moodOption4.appendChild(moodOption4Text);

var moodOption5 = document.createElement("div");
moodOption5.style = "display: flex; flex-direction: row; align-items: center; margin-top: 5px; cursor: pointer; ";
var moodOption5Box = document.createElement("div");
moodOption5Box.style = "width: 20px; height: 20px; background-color: #A98C79; border-radius: 3px";
var moodOption5Text = document.createElement("div");
moodOption5Text.style = "margin-left: 5px;";
moodOption5Text.innerHTML = "Sad";
moodOption5.appendChild(moodOption5Box);
moodOption5.appendChild(moodOption5Text);

var moodOptionHint = document.createElement("div");
moodOptionHint.innerHTML = "click again to change";
moodOptionHint.style = "font-size: 10px; margin-top: 3px; display: none"

var diaryEntry = document.createElement("textarea");
diaryEntry.type = "text";
diaryEntry.setAttribute("placeholder", "Your diary");
diaryEntry.style = "background-color: #E6F8F0; border-radius: 5px; border-color: Transparent; margin-top: 20px; font-size: 10px; padding: 5px; outline-color: #C4E8F4; height:80px"
diaryEntry.addEventListener("input", (event) => {
    var key = year + "-" + selectedDate;
    if(moodData[key] != undefined) {
        moodData[key]["entry"] = diaryEntry.value.trim();
    }
    else {
        moodData[key] = {
            "entry": diaryEntry.value.trim()
        }
    }
    if (Object.keys(moodData).length > 0){
        chrome.storage.local.set({ "mood_data": moodData });
    }
});

leftSection.appendChild(moodOption1);
leftSection.appendChild(moodOption2);
leftSection.appendChild(moodOption3);
leftSection.appendChild(moodOption4);
leftSection.appendChild(moodOption5);
leftSection.appendChild(moodOptionHint);
leftSection.appendChild(diaryEntry);

moodOption1.addEventListener("click", function (event) {
    var key = year + "-" + selectedDate;

    // if (key in moodData) {
    //     if ("mood_score" in moodData[key]) {
    //         updateSelection(4);
    //     }
    //     else {
    //         updateSelection(5);
    //     }
    // }
    // else {
    //     updateSelection(5)
    // }
    // updateMoodTable();

    if (moodData[key] == undefined) {
        moodData[key] = {
            "mood_score": 5
        }
        updateSelection(5);
    }
    else {
        if (moodData[key]["mood_score"] != undefined){
            moodData[key]["mood_score"] = 4;
            updateSelection(4);
        }
        else {
            moodData[key]["mood_score"] = 5;
            updateSelection(5);
        }
    }
    updateMoodTable();
});

moodOption2.addEventListener("click", function (event) {
    var key = year + "-" + selectedDate;
    if (moodData[key] == undefined) {
        moodData[key] = {
            "mood_score": 4
        }
        updateSelection(4);
    }
    else {
        if (moodData[key]["mood_score"] != undefined){
            moodData[key]["mood_score"] = 3;
            updateSelection(3);
        }
        else {
            moodData[key]["mood_score"] = 4;
            updateSelection(4);
        }
    }
    updateMoodTable();
});

moodOption3.addEventListener("click", function (event) {
    var key = year + "-" + selectedDate;
    if (moodData[key] == undefined) {
        moodData[key] = {
            "mood_score": 3
        }
        updateSelection(3);
    }
    else {
        if (moodData[key]["mood_score"] != undefined){
            moodData[key]["mood_score"] = 2;
            updateSelection(2);
        }
        else {
            moodData[key]["mood_score"] = 3;
            updateSelection(3);
        }
    }
    updateMoodTable();
});

moodOption4.addEventListener("click", function (event) {
    var key = year + "-" + selectedDate;
    if (moodData[key] == undefined) {
        moodData[key] = {
            "mood_score": 2
        }
        updateSelection(2);
    }
    else {
        if (moodData[key]["mood_score"] != undefined){
            moodData[key]["mood_score"] = 1;
            updateSelection(1);
        }
        else {
            moodData[key]["mood_score"] = 2;
            updateSelection(2);
        }
    }
    updateMoodTable();
});

moodOption5.addEventListener("click", function (event) {
    var key = year + "-" + selectedDate;
    if (moodData[key] == undefined) {
        moodData[key] = {
            "mood_score": 1
        }
        updateSelection(1);
    }
    else {
        if (moodData[key]["mood_score"] != undefined){
            // moodData[key]["mood_score"] = 5;
            // updateSelection(5);
            // moodData[key]["mood_score"] = undefined;
            delete moodData[key]["mood_score"]
            updateSelection();
        }
        else {
            moodData[key]["mood_score"] = 1;
            updateSelection(1);
        }
    }
    updateMoodTable();
});

function updateSelection(score) {
    if (score == undefined) {
        moodOption1.style.display = "flex";
        moodOption2.style.display = "flex";
        moodOption3.style.display = "flex";
        moodOption4.style.display = "flex";
        moodOption5.style.display = "flex";
        moodOptionHint.style.display = "none";
        moodHeartsRow.style.display = "none";
    }

    if (score == 5) {
        moodOption1.style.display = "flex";
        moodOption2.style.display = "none";
        moodOption3.style.display = "none";
        moodOption4.style.display = "none";
        moodOption5.style.display = "none";
        moodOptionHint.style.display = "flex";
        moodHeartsRow.style.display = "flex";
        heart1.innerHTML = '<img src="heart_blue_filled.png" height="18" width="18" margin-right: 3px" />'
        heart2.innerHTML = '<img src="heart_blue_filled.png" height="18" width="18" margin-right: 3px" />'
        heart3.innerHTML = '<img src="heart_blue_filled.png" height="18" width="18" margin-right: 3px" />'
        heart4.innerHTML = '<img src="heart_blue_filled.png" height="18" width="18" margin-right: 3px" />'
        heart5.innerHTML = '<img src="heart_blue_filled.png" height="18" width="18" margin-right: 3px" />'
    }

    if (score == 4) {
        moodOption1.style.display = "none";
        moodOption2.style.display = "flex";
        moodOption3.style.display = "none";
        moodOption4.style.display = "none";
        moodOption5.style.display = "none";
        moodOptionHint.style.display = "flex";
        moodHeartsRow.style.display = "flex";
        heart1.innerHTML = '<img src="heart_blue_filled.png" height="18" width="18" margin-right: 3px" />'
        heart2.innerHTML = '<img src="heart_blue_filled.png" height="18" width="18" margin-right: 3px" />'
        heart3.innerHTML = '<img src="heart_blue_filled.png" height="18" width="18" margin-right: 3px" />'
        heart4.innerHTML = '<img src="heart_blue_filled.png" height="18" width="18" margin-right: 3px" />'
        heart5.innerHTML = '<img src="heart_blue_empty.png" height="18" width="18" margin-right: 3px" />'
    }

    if (score == 3) {
        moodOption1.style.display = "none";
        moodOption2.style.display = "none";
        moodOption3.style.display = "flex";
        moodOption4.style.display = "none";
        moodOption5.style.display = "none";
        moodOptionHint.style.display = "flex";
        moodHeartsRow.style.display = "flex";
        heart1.innerHTML = '<img src="heart_blue_filled.png" height="18" width="18" margin-right: 3px" />'
        heart2.innerHTML = '<img src="heart_blue_filled.png" height="18" width="18" margin-right: 3px" />'
        heart3.innerHTML = '<img src="heart_blue_filled.png" height="18" width="18" margin-right: 3px" />'
        heart4.innerHTML = '<img src="heart_blue_empty.png" height="18" width="18" margin-right: 3px" />'
        heart5.innerHTML = '<img src="heart_blue_empty.png" height="18" width="18" margin-right: 3px" />'
    }

    if (score == 2) {
        moodOption1.style.display = "none";
        moodOption2.style.display = "none";
        moodOption3.style.display = "none";
        moodOption4.style.display = "flex";
        moodOption5.style.display = "none";
        moodOptionHint.style.display = "flex";
        moodHeartsRow.style.display = "flex";
        heart1.innerHTML = '<img src="heart_blue_filled.png" height="18" width="18" margin-right: 3px" />'
        heart2.innerHTML = '<img src="heart_blue_filled.png" height="18" width="18" margin-right: 3px" />'
        heart3.innerHTML = '<img src="heart_blue_empty.png" height="18" width="18" margin-right: 3px" />'
        heart4.innerHTML = '<img src="heart_blue_empty.png" height="18" width="18" margin-right: 3px" />'
        heart5.innerHTML = '<img src="heart_blue_empty.png" height="18" width="18" margin-right: 3px" />'
    }

    if (score == 1) {
        moodOption1.style.display = "none";
        moodOption2.style.display = "none";
        moodOption3.style.display = "none";
        moodOption4.style.display = "none";
        moodOption5.style.display = "flex";
        moodOptionHint.style.display = "flex";
        moodHeartsRow.style.display = "flex";
        heart1.innerHTML = '<img src="heart_blue_filled.png" height="18" width="18" margin-right: 3px" />'
        heart2.innerHTML = '<img src="heart_blue_empty.png" height="18" width="18" margin-right: 3px" />'
        heart3.innerHTML = '<img src="heart_blue_empty.png" height="18" width="18" margin-right: 3px" />'
        heart4.innerHTML = '<img src="heart_blue_empty.png" height="18" width="18" margin-right: 3px" />'
        heart5.innerHTML = '<img src="heart_blue_empty.png" height="18" width="18" margin-right: 3px" />'
    }
}

var yearRow = document.createElement("div");
// yearRow.innerHTML = year;
yearRow.style = "display: flex; flex-direction: row; height: 15px; align-items: center; margin-bottom: 2px; margin-top: 15px";

var currentYear = document.createElement("div");
currentYear.innerHTML = year;

var prevYear = document.createElement("div");
prevYear.style = "width: 50px; text-align: center; cursor: pointer"
prevYear.innerHTML = "<";
prevYear.addEventListener("click", function (event) {
    year = parseInt(currentYear.innerHTML) - 1
    currentYear.innerHTML = year;
    selectedDate = undefined;
    // diaryEntry.value = "";
    leftSection.style.visibility = "hidden";
    updateSelection();
    updateMoodTable();
});

var nextYear = document.createElement("div");
nextYear.style = "width: 50px; text-align: center; cursor: pointer"
nextYear.innerHTML = ">";
nextYear.addEventListener("click", function (event) {
    year = parseInt(currentYear.innerHTML) + 1
    currentYear.innerHTML = year;
    selectedDate = undefined;
    leftSection.style.visibility = "hidden";
    // diaryEntry.value = "";
    updateSelection();
    updateMoodTable();
});

yearRow.appendChild(prevYear);
yearRow.appendChild(currentYear);
yearRow.appendChild(nextYear);

rightSection.appendChild(yearRow);

var row = document.createElement("div");
row.style = "display: flex; flex-direction: row; height: 15px; align-items: center; margin-bottom: 2px";
rightSection.appendChild(row);

var headerRow = document.createElement("div");
headerRow.style = "display: flex; flex-direction: row; height: 15px; align-items: center; margin-bottom: 2px; margin-left: 20px";
for (var i = 0; i < months.length; i++) {
    var item = document.createElement("div");
    item.style = "width: 15px; height: 15px; align-items: center; margin-right: 2px; text-align: center; color: #97CDB5; font-weight: bold";
    
    item.innerHTML = months[i];
    headerRow.appendChild(item);
}
rightSection.appendChild(headerRow);

for (var i = 0; i < 31; i++) {
    var row = document.createElement("div");
    row.style = "display: flex; flex-direction: row; height: 15px; align-items: center; margin-bottom: 2px";
    rightSection.appendChild(row);

    var item = document.createElement("div");
    item.style = "width: 15px; height: 15px; align-items: center; margin-right: 5px; text-align: center; color: #97CDB5; font-weight: bold";
    item.innerHTML = i + 1;
    row.appendChild(item);

    for (var j = 0; j < 12; j++) {
        var item = document.createElement("div");
        item.style = "display: flex; flex-direction: row; width: 15px; height: 15px; align-items: center; \\\
        background-color: #E6F8F0; margin-right: 2px; border-radius: 3px;  cursor: pointer";
        row.appendChild(item);
        item.setAttribute("id", monthNumbers[j] + "-" + days[i])
        item.addEventListener("click", function (event) {
            if (isInvalidDay(year, parseInt(event.target.id.split("-")[0]), parseInt(event.target.id.split("-")[1])) ) {
                return;
            }
            // return;
            var key = year + "-" + event.target.id;
            if (selectedDate == event.target.id){
                if(moodData[key] != undefined) {
                    if (moodData[key]["mood_score"] == undefined) {
                        moodData[key]["mood_score"] = 5
                    }
                    else{
                        moodData[key]["mood_score"] = moodData[key]["mood_score"] - 1
                        if (moodData[key]["mood_score"] < 1) {
                            delete moodData[key]["mood_score"]
                        }
                    }
                }
                else {
                    moodData[key] = {
                        "mood_score": 5
                    }
                }
                updateSelection(moodData[key]["mood_score"]);
            }
            else {
                selectedDate = event.target.id;
                line1.innerHTML = event.target.id.replace("-", "/");

                leftSection.style.visibility = "visible";

                if (key == (year + "-" + monthNumbers[today_month] + "-" + days[today_day - 1])) {
                    line1.innerHTML = monthNumbers[today_month] + "/" + today_day + "<br>How are you today?";
                }
                
                diaryEntry.value = "";
                if(moodData[key] != undefined) {
                    updateSelection(moodData[key]["mood_score"]);
                    if(moodData[key]["entry"] != undefined) {
                        diaryEntry.value = moodData[key]["entry"];
                    }                    
                }
                else {
                    updateSelection();
                }
            }
            updateMoodTable();
        });
    }
}

function isInvalidDay(year, month, day) {
    if ( month == 2 || month == 4 || month == 6 || month == 9 || month == 11 ) {
        if (day == 31) return true;
    }
    if ( month == 2 ) {
        if ( year % 4 == 0 ) {
            if ( day > 29) return true;
        }
        else {
            if ( day > 28) return true;
        }
    }

    if (today_year < year){
        return true;
    }
    else if (today_year == year){
        if (month > (today_month + 1)) {
            return true;
        }
        if (month == (today_month + 1)) {
            if (day > today_day) {
                return true;
            }
        }
    }
    return false;
}

function updateMoodTable () {    
    for (var i = 0; i < 31; i++) {
        for (var j = 0; j < 12; j++) {
            if (selectedDate == (monthNumbers[j] + "-" + days[i])){
                document.getElementById(monthNumbers[j] + "-" + days[i]).style.borderStyle = "solid";
                document.getElementById(monthNumbers[j] + "-" + days[i]).style.borderWidth = "2px";
                document.getElementById(monthNumbers[j] + "-" + days[i]).style.borderColor = "#55ACEE";
                document.getElementById(monthNumbers[j] + "-" + days[i]).style.boxSizing = "border-box";
            }
            else{
                document.getElementById(monthNumbers[j] + "-" + days[i]).style.borderStyle = "none";
            }

            document.getElementById(monthNumbers[j] + "-" + days[i]).style.backgroundColor = "#E6F8F0";
            document.getElementById(monthNumbers[j] + "-" + days[i]).style.cursor = "pointer";

            if (isInvalidDay(year, monthNumbers[j], days[i])) {
                document.getElementById(monthNumbers[j] + "-" + days[i]).style.backgroundColor = "#F3FCF7";
                document.getElementById(monthNumbers[j] + "-" + days[i]).style.cursor = "default";
            }

            var key = year + "-" + monthNumbers[j] + "-" + days[i]
            if(moodData[key] != undefined) {
                if (moodData[key]["mood_score"] == 5) {
                    document.getElementById(monthNumbers[j] + "-" + days[i]).style.backgroundColor = "#65D29E";
                }
                if (moodData[key]["mood_score"] == 4) {
                    document.getElementById(monthNumbers[j] + "-" + days[i]).style.backgroundColor = "#A5E3C5";
                }
                if (moodData[key]["mood_score"] == 3) {
                    document.getElementById(monthNumbers[j] + "-" + days[i]).style.backgroundColor = "#FFF1B6";
                }
                if (moodData[key]["mood_score"] == 2) {
                    document.getElementById(monthNumbers[j] + "-" + days[i]).style.backgroundColor = "#FFD394";
                }
                if (moodData[key]["mood_score"] == 1) {
                    document.getElementById(monthNumbers[j] + "-" + days[i]).style.backgroundColor = "#A98C79";
                }
            }
        }
    }
    if (Object.keys(moodData).length > 0){
        chrome.storage.local.set({ "mood_data": moodData });
    }
}

var moodGreetingPage = document.createElement('div');
moodGreetingPage.setAttribute("class", "bg");
moodGreetingPage.style.backgroundColor = "#E6F8F0";
moodGreetingPage.style.height = "2000px";
moodGreetingPage.style.display = "none";
moodGreetingPage.style.justifyContent = "flex-start";
moodGreetingPage.style.paddingTop = "50px";
document.body.appendChild(moodGreetingPage);

var closeBtn2 = document.createElement("button");
closeBtn2.innerHTML = "X";
closeBtn2.setAttribute("class", "actionButton");
closeBtn2.style.backgroundColor = "#97CDB5";
closeBtn2.style.width = "40px";
closeBtn2.style.position = "absolute";
closeBtn2.style.top = "10px";
closeBtn2.style.left = "490px";
closeBtn2.addEventListener("click", function (event) {
    moodPageBg.style.display = "none";
    moodGreetingPage.style.display = "none";
});
moodGreetingPage.appendChild(closeBtn2);

var moodPageGreeting = document.createElement('h1');
moodPageGreeting.innerHTML = "How are you today?";

var petDiv = document.createElement('div');
// petDiv.style="position: absolute; top: 180px;"
petDiv.style.transform = "scale(0.75)"

var shadow = document.createElement('div');
shadow.innerHTML = '<svg width="200" height="240" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse id="ellip" cx="100.5" cy="193.5" rx="93.5" ry="32.5" fill="#A5E3C5" /></svg>'
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

// var moodPageGreeting2 = document.createElement('h3');
// moodPageGreeting2.innerHTML = "Choose today's mood:";
moodGreetingPage.appendChild(petDiv)
moodGreetingPage.appendChild(moodPageGreeting);


// moodGreetingPage.appendChild(moodPageGreeting2);

var moodGreetingPageDiv = document.createElement('div');
moodGreetingPageDiv.style = "display: flex; flex-direction: column; align-items: left"

moodOption1Clone = moodOption1.cloneNode(true);
moodOption1Clone.addEventListener("click", function (event) {
    todayMoodOptionClicked(5)
});

moodOption2Clone = moodOption2.cloneNode(true);
moodOption2Clone.addEventListener("click", function (event) {
    todayMoodOptionClicked(4)
});

moodOption3Clone = moodOption3.cloneNode(true);
moodOption3Clone.addEventListener("click", function (event) {
    todayMoodOptionClicked(3)
});

moodOption4Clone = moodOption4.cloneNode(true);
moodOption4Clone.addEventListener("click", function (event) {
    todayMoodOptionClicked(2)
});

moodOption5Clone = moodOption5.cloneNode(true);
moodOption5Clone.addEventListener("click", function (event) {
    todayMoodOptionClicked(1)
});

function todayMoodOptionClicked (score) {
    moodGreetingPage.setAttribute("class", "flash");
    setTimeout(() => {
        moodGreetingPage.style.display = "none";
    }, "1000")

    var key = year + "-" + selectedDate;
    if (moodData[key] == undefined) {
        moodData[key] = {"mood_score": score}
        updateSelection(score);
    }
    else {
        moodData[key]["mood_score"] = score;
        updateSelection(score);
    }
    updateMoodTable();
}

moodGreetingPageDiv.appendChild(moodOption1Clone);
moodGreetingPageDiv.appendChild(moodOption2Clone);
moodGreetingPageDiv.appendChild(moodOption3Clone);
moodGreetingPageDiv.appendChild(moodOption4Clone);
moodGreetingPageDiv.appendChild(moodOption5Clone);
moodGreetingPage.appendChild(moodGreetingPageDiv);

