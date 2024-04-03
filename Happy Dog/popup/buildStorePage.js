var storePageBg = document.createElement('div');
storePageBg.setAttribute("class", "bg");
storePageBg.style.backgroundColor = "#CEEFFF";
storePageBg.style.height = "10000px";
storePageBg.style.display = "none";
storePageBg.style.justifyContent = "flex-start";
document.body.appendChild(storePageBg);

var storeTitleRow = document.createElement('div');
storeTitleRow.setAttribute("class", "row");
storeTitleRow.style.justifyContent = "space-between";
storeTitleRow.style.alignItems = "center";
storeTitleRow.style.width = "450px";

var storeTitle = document.createElement("h1");
storeTitle.innerHTML = "Goodie Store";

var closeBtn = document.createElement("button");
closeBtn.innerHTML = "X";
closeBtn.setAttribute("class", "actionButton");
closeBtn.style.backgroundColor = "#FF9ABD";
closeBtn.style.width = "40px";
closeBtn.addEventListener("click", function (event) {
    storePageBg.style.display = "none";
});

storeTitleRow.appendChild(storeTitle);
storeTitleRow.appendChild(closeBtn);
storePageBg.appendChild(storeTitleRow);

var starCountLine = document.createElement("div");
starCountLine.style = "font-size: 18px";
starCountLine.innerHTML = 'Your have ' + document.getElementById("xp").innerHTML + ' <img src="star.png" height="18" width="18" style="margin-left: 3px" />';
storePageBg.appendChild(starCountLine);

var buyStarButton = document.createElement("button");
buyStarButton.style = "padding: 5px 10px; background-color: #F9C319; border-radius: 50px; border-width: 0px; color: white; cursor: pointer; margin-left: 10px;";
buyStarButton.innerHTML = "Get more";

starCountLine.appendChild(buyStarButton);

var storeCatalog = document.createElement("div");
storeCatalog.style="width: 100%; flex-wrap: wrap; display: flex; flex-direction: row; justify-content: center; margin-top: 30px";

var purchaseBtn = document.createElement("button");
purchaseBtn.style="position: fixed; top: 500px; padding: 15px 20px; background-color: #F9C319; border-radius: 50px; border-width: 0px; color: white; cursor: pointer; font-size: 20px; box-shadow: 0px 0px 10px gray;";
purchaseBtn.style.display = "none";
purchaseBtn.innerHTML = "Get it!";
purchaseBtn.onclick = () => {
    console.log(storeSelectItem);
    showLoader();
    window.scrollTo(0, 0);
    purchaseBtn.style.backgroundColor = "#DBDBDB";
    purchaseBtn.disabled = true;
    purchaseBtn.innerHTML = "Getting the goodie...";
    
    let purchaseRequest = {...request};
    purchaseRequest["id"] = storeSelectItem["goodie_id"];
    purchaseRequest["type"] = "purchase";
    
    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/redeemGoodie-v2";
    const options = {
        method: 'POST',
        body: JSON.stringify(purchaseRequest),
        headers: { 'Content-Type': 'application/json' }
    };
    fetch(endpoint_url, options).then((response) => { 
        hideLoader();
        location.reload();
    })
}
storePageBg.appendChild(purchaseBtn);

var storeSelectItem = {"goodie_id": 0, "price": 200};
var storeList = [];
document.getElementById("openStore").addEventListener("click", function (event) {
    starCountLine.innerHTML = 'Your have ' + document.getElementById("xp").innerHTML + ' <img src="star.png" height="12" width="12" style="margin-left: 3px" />';
    storePageBg.style.display = "flex";
    window.scrollTo(0, 0);
    for (var i = 0; i < goodies_owned.length; i++) {
        try{
            document.getElementById("store_goodie_price" + goodies_owned[i]["id"]).innerHTML = "owned";
        }catch (error) {
            console.error(error);
        }
    }
});

function updateStoreSelection(select_id) {
    for (var i = 0; i < goodies_owned.length; i++) {
        if (goodies_owned[i]["id"] == parseInt(select_id.replace("store_goodie", ""))){
            return;
        }
    }

    for (var i = 0; i < storeList.length; i++) {
        document.getElementById("store_goodie" + storeList[i]["goodie_id"]).style.backgroundColor = "#F1FCFF";
        document.getElementById("store_goodie" + storeList[i]["goodie_id"]).style.borderColor = "white";

        if (select_id == ("store_goodie" + storeList[i]["goodie_id"])){
            document.getElementById(select_id).style.backgroundColor = "LemonChiffon";
            document.getElementById(select_id).style.borderColor = "#F9C319";

            if(parseInt(document.getElementById("xp").innerHTML) >= parseInt(storeList[i]["price"])) {
                purchaseBtn.style.display = "flex";
                purchaseBtn.style.backgroundColor = "#F9C319";
                purchaseBtn.disabled = false;
                purchaseBtn.innerHTML = "Get it!";
            }
            else{
                purchaseBtn.style.display = "flex";
                purchaseBtn.style.backgroundColor = "#DBDBDB";
                purchaseBtn.disabled = true;
                purchaseBtn.innerHTML = "Not enough"+'<img src="star.png" height="22" width="22" style="margin-left: 5px" />';
            }
            storeSelectItem = storeList[i];
        }
    }
}

function addItem2Store(goodie_id, price) {
    var itemContainer = document.createElement("div");
    itemContainer.style = "margin: 5px; align-items: center; display: flex; flex-direction: column";

    var div = document.createElement("div");
    div.style = "height: 80px; width: 80px; border-radius: 10px; cursor: pointer; background-size: 80px 80px; background-color: #F1FCFF; border-style: solid; border-width: 2px; border-color: white; margin-bottom: 3px"
    div.setAttribute("id", "store_goodie" + goodie_id);
    div.addEventListener("click", function (event) {
        updateStoreSelection(event.target.id);
    });

    if (goodie_id == 0) {
        div.style.backgroundImage = "url('dice.png')";
    }
    else {
        div.style.backgroundImage = "url('https://storage.googleapis.com/office-pets/goodies/" + goodie_id + ".png')";
    }

    var itemPrice = document.createElement("div");
    itemPrice.innerHTML = price + '<img src="star.png" height="12" width="12" style="margin-left: 1px" />';
    itemPrice.setAttribute("id", "store_goodie_price" + goodie_id)
    itemContainer.appendChild(div)
    itemContainer.appendChild(itemPrice);
    storeCatalog.appendChild(itemContainer);
}

var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/redeemGoodie-v2";
const options = {
    method: 'POST',
    body: JSON.stringify({"type": "get_info"}),
    headers: { 'Content-Type': 'application/json' }
};
fetch(endpoint_url, options)
    .then((response) => { return response.json(); })
    .then((myJson) => {
        console.log(myJson);
        storeList = [...myJson];
        storeList.unshift({"goodie_id": 0, "price": 200});

        storeList.sort(function(a, b) {
            var keyA = new Date(a.goodie_id),
                keyB = new Date(b.goodie_id);
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });

        // addItem2Store(0, 200);
        for (var i = 0; i < storeList.length; i++) {
            addItem2Store(storeList[i]["goodie_id"], storeList[i]["price"]);
        }
    });

storePageBg.appendChild(storeCatalog);
