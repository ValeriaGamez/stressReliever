var purchasePageBg = document.createElement('div');
purchasePageBg.setAttribute("class", "bg");
purchasePageBg.setAttribute("id", "purchasePage");
purchasePageBg.style = "display: none; flex-direction: column; justify-content: flex-start; height: 2000px";
purchasePageBg.style.backgroundColor = "#E5F9FF";
purchasePageBg.style.zIndex = "10000"
document.body.appendChild(purchasePageBg);

var purchaseTitleRow = document.createElement('div');
purchaseTitleRow.setAttribute("class", "row");
purchaseTitleRow.style.justifyContent = "space-between";
purchaseTitleRow.style.alignItems = "center";
purchaseTitleRow.style.width = "450px";

var purchaseTitle = document.createElement("h1");
purchaseTitle.style = "display: flex; flex-direction: row; align-items: center;";
purchaseTitle.innerHTML = 'How to get more <img src="star.png" height="24" width="24" style="margin-left: 10px; margin-right: 10px" /> ?';

var closeBtn = document.createElement("button");
closeBtn.innerHTML = "X";
closeBtn.setAttribute("class", "actionButton");
closeBtn.style.backgroundColor = "#72C6F5";
closeBtn.style.width = "40px";
closeBtn.addEventListener("click", function (event) {
    purchasePageBg.style.display = "none";
});

purchaseTitleRow.appendChild(purchaseTitle);
purchaseTitleRow.appendChild(closeBtn);
purchasePageBg.appendChild(purchaseTitleRow);

var container = document.createElement("div");
container.style = "display: flex; flex-direction: column; align-items: flex-start; width: 450px; justify-content: space-between; margin-top: 100px; font-size: 16px"; 
purchasePageBg.appendChild(container);

var option4= document.createElement("div");
option4.style = "cursor: pointer";
option4.innerHTML = '<h3><u>Purchase for $1</u></h3>'
container.appendChild(option4);

// var option5 = document.createElement("div");
// option5.style = "cursor: pointer; margin-top: 10px";
// option5.innerHTML = '<h3>Or <u>get for free by watching an ad</u></h3>'
// container.appendChild(option5);

var option1 = document.createElement("div");
option1.innerHTML = '<h3>Or get for free by playing: </h3>1. Get 1 everytime you play, feed, or pet your dog'
container.appendChild(option1);

var option2 = document.createElement("div");
option2.style = "cursor: pointer; margin-top: 10px";
option2.innerHTML = '2. Help keep <u>Dog Park</u> clean'
container.appendChild(option2);

var option3 = document.createElement("div");
option3.style = "cursor: pointer; margin-top: 10px";
option3.innerHTML = '3. Help take care of other dogs in <u>Daycare</u>'
container.appendChild(option3);

option2.addEventListener("click", function (event) {                    
    if (request.pet_id){
        window.open("https://www.gethappydog.com/park/?id=" + request.pet_id + "&breed=" + request.breed, "_blank");
    }
});

option3.addEventListener("click", function (event) {                    
    if (request.pet_id){
        window.open("https://www.gethappydog.com/daycare/?id=" + request.pet_id, "_blank")
    }
});

option4.addEventListener("click", function (event) {                    
    if (request.pet_id){
        var checkout_link = "https://buy.stripe.com/9AQ02xgbE0sYc5W000" + "?client_reference_id=" + request.pet_id;        
        window.open(checkout_link, "_blank");
    }
});

// option5.addEventListener("click", function (event) {                    
//     if (request.ad_reward_id){
//         window.open("https://www.gethappydog.com/ads/?id=" + request.ad_reward_id, "_blank")
//     }
// });

document.getElementById("buyMoreStars").addEventListener("click", function (event) {                    
    document.getElementById("purchasePage").style.display = "flex";
});
