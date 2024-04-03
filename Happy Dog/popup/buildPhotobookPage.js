const default_photos_preshuffled = [
    {name: 'Fox', imageUri: 'https://storage.googleapis.com/office-pets/photobook/AB13BB145548.png', like_count: 1, photoId: 'AB13BB145548'},
    {name: 'perry', imageUri: 'https://storage.googleapis.com/office-pets/photobook/4FC84C62CB80.png', like_count: 5, photoId: '4FC84C62CB80'},
    {name: 'rover', imageUri: 'https://storage.googleapis.com/office-pets/photobook/85001C53A8D7.png', like_count: 2, photoId: '85001C53A8D7'},
    {name: 'caquita rica', imageUri: 'https://storage.googleapis.com/office-pets/photobook/906FBBB809BB.png', like_count: 3, photoId: '906FBBB809BB'},
    {name: 'Nala', imageUri: 'https://storage.googleapis.com/office-pets/photobook/80F96E979BC3.png', like_count: 2, photoId: '80F96E979BC3'},
    {name: 'rose', imageUri: 'https://storage.googleapis.com/office-pets/photobook/B3F0745FF082.png', like_count: 4, photoId: 'B3F0745FF082'},
    {name: 'coco', imageUri: 'https://storage.googleapis.com/office-pets/photobook/7E250A74419D.png', like_count: 8, photoId: '7E250A74419D'},
    {name: 'Lollie', imageUri: 'https://storage.googleapis.com/office-pets/photobook/69436212F50C.png', like_count: 5, photoId: '69436212F50C'},
    {name: 'George', imageUri: 'https://storage.googleapis.com/office-pets/photobook/D3EE6A3A09BC.png', like_count: 2, photoId: 'D3EE6A3A09BC'},
    {name: 'Lucky', imageUri: 'https://storage.googleapis.com/office-pets/photobook/65863B2F6D13.png', like_count: 6, photoId: '65863B2F6D13'},
    {name: 'Flow', imageUri: 'https://storage.googleapis.com/office-pets/photobook/20117FC3E54D.png', like_count: 9, photoId: '20117FC3E54D'},
    {name: 'Corgi', imageUri: 'https://storage.googleapis.com/office-pets/photobook/7F4299DD5CE0.png', like_count: 3, photoId: '7F4299DD5CE0'},
    {name: 'dog', imageUri: 'https://storage.googleapis.com/office-pets/photobook/BB6182AA8A00.png', like_count: 5, photoId: 'BB6182AA8A00'},
    {name: 'Chunky Carbonara', imageUri: 'https://storage.googleapis.com/office-pets/photobook/FD28D178A9CA.png', like_count: 11, photoId: 'FD28D178A9CA'},
    {name: 'happy', imageUri: 'https://storage.googleapis.com/office-pets/photobook/1B5B68EDB710.png', like_count: 4, photoId: '1B5B68EDB710'},
    {name: 'cookie', imageUri: 'https://storage.googleapis.com/office-pets/photobook/604EE4D0698E.png', like_count: 7, photoId: '604EE4D0698E'},
    {name: 'cookie', imageUri: 'https://storage.googleapis.com/office-pets/photobook/1A656A83FB22.png', like_count: 4, photoId: '1A656A83FB22'},
    {name: '', imageUri: 'https://storage.googleapis.com/office-pets/photobook/8A9FB0A51FA5.png', like_count: 6, photoId: '8A9FB0A51FA5'},
    {name: 'Flow', imageUri: 'https://storage.googleapis.com/office-pets/photobook/FEDCB3730859.png', like_count: 5, photoId: 'FEDCB3730859'},
    {name: 'Sunny', imageUri: 'https://storage.googleapis.com/office-pets/photobook/71BB3EDA438B.png', like_count: 10, photoId: '71BB3EDA438B'},
    {name: 'Max', imageUri: 'https://storage.googleapis.com/office-pets/photobook/14B04C930DF2.png', like_count: 2, photoId: '14B04C930DF2'},
    {name: 'Lucky', imageUri: 'https://storage.googleapis.com/office-pets/photobook/C29736D7EA8B.png', like_count: 4, photoId: 'C29736D7EA8B'},
    {name: 'Peach', imageUri: 'https://storage.googleapis.com/office-pets/photobook/D991A734A331.png', like_count: 6, photoId: 'D991A734A331'},
    {name: 'Corgi', imageUri: 'https://storage.googleapis.com/office-pets/photobook/7F4299DD5CE0.png', like_count: 7, photoId: '7F4299DD5CE0'},
];
const default_photos = default_photos_preshuffled.sort((a, b) => 0.5 - Math.random());

var photobookBg = document.createElement('div');
photobookBg.setAttribute("class", "bg");
photobookBg.style.backgroundColor = "#CEEFFF";
photobookBg.style.height = "2800px";
photobookBg.style.display = "none";
photobookBg.style.justifyContent = "flex-start";
document.body.appendChild(photobookBg);

var page = 0;
document.getElementById("photobook").addEventListener("click", function (event) {                    
    photobookBg.style.display = "flex";
    page = 0;
    changePhoto();
});

var photobookTitleRow = document.createElement('div');
photobookTitleRow.setAttribute("class", "row");
photobookTitleRow.style.justifyContent = "space-between";
photobookTitleRow.style.alignItems = "center";
photobookTitleRow.style.width = "450px";

var photobookTitle = document.createElement("h1");
photobookTitle.innerHTML = "Photobook";

var closeBtn = document.createElement("button");
closeBtn.innerHTML = "X";
closeBtn.setAttribute("class", "actionButton");
closeBtn.style.backgroundColor = "#FF9ABD";
closeBtn.style.width = "40px";
closeBtn.addEventListener("click", function (event) {
    photobookBg.style.display = "none";
    page = 0;
});
photobookBg.appendChild(closeBtn);

photobookTitleRow.appendChild(photobookTitle);
photobookTitleRow.appendChild(closeBtn);
photobookBg.appendChild(photobookTitleRow);

var photoshootPrompt = document.createElement("div");
photoshootPrompt.style.marginBottom = "15px";
photoshootPrompt.innerHTML = '<div style="display: flex; flex-direction: row; align-items: center; justify-content: space-evenly; width: 430px;"> Use the <img src="camera.png" height="26" width="26"/> button to capture your favorite moments and share with us</div>';
photobookBg.appendChild(photoshootPrompt);

var picturesPage = document.createElement("div");
picturesPage.style = "display: flex; flex-direction: column; width: 450px; height: 2610px; align-items: center";
photobookBg.appendChild(picturesPage);

// constructing photobook pages

// to keep track of the index of buttons
var likeButtons = [];
var likedCollection = [];

chrome.storage.local.get('likedPhotos', function (data) {
    likedCollection = data.likedPhotos;
    console.log(data);
    if(typeof data.likedPhotos === 'undefined'){
        likedCollection = [];
        chrome.storage.local.set({'likedPhotos': likedCollection});
    }
});

function renderPhotoItems(items) {
    var likeButtons = [];
    var reportButtons = [];
    console.log(items);

    for (var i = 0; i < 18; i++) {
        
        if(i%2==0){
            var row = document.createElement("div");
            row.style = "display: flex; flex-direction: row; width: 450px; height: 280px; align-items: center";
            row.style.marginBottom = "10px";
            picturesPage.appendChild(row);
        }

        var pictureFrame = document.createElement("div");
        pictureFrame.style = "display: flex; flex-direction: column; width: 220px; height: 280px; align-items: center;";
        pictureFrame.style.marginLeft = "5px";
        pictureFrame.style.marginRight = "5px";
        pictureFrame.style.backgroundColor = "white";

        var displayUsername = document.createElement("div");
        displayUsername.style = "width: 200px; margin: 10px; margin-bottom: 3px";
        if (items[i]["userName"]) {
            displayUsername.innerHTML = "From: <span style='color: #967ADA'>" + items[i]["userName"] + "</span>";
        }

        var dogNameLine = document.createElement("div");
        dogNameLine.style = "display: flex; flex-direction: row; width: 90%; justify-content: flex-start; align-items: center;";

        var dogNameIcon = document.createElement("div");
        dogNameIcon.innerHTML = '<img src="paw.png" width="17" height="17" alt="submit" />'

        var dogName = document.createElement("div");
        dogName.style = "width: 90%; height: 15px; font-size: 12px; padding-left: 10px";
        dogName.style.textOverflow = "ellipsis";
        dogName.style.whiteSpace = "nowrap";
        dogName.style.overflow = "hidden";
        dogName.style.textAlign = "left";
        dogName.innerHTML = items[i]["name"];

        dogNameLine.appendChild(dogNameIcon);
        dogNameLine.appendChild(dogName);

        var picture = document.createElement("div");
        picture.style = "display: flex; flex-direction: row; width: 200px; height: 200px; align-items: center; background-size: contain;";
        picture.style.margin = "5px";
        picture.style.marginTop = "0px";
        picture.style.backgroundImage = "url('" + items[i]["imageUri"] + "')";

        var likeSection = document.createElement("div");
        likeSection.style = "width: 90%; height: 15px; align-items: center; font-size: 12px; display: flex; justify-content:  space-between";
        
        var likeButtonAndCount = document.createElement("div");
        likeButtonAndCount.style = "display: flex; flex-direction: row; align-items: center;";
        likeSection.appendChild(likeButtonAndCount);

        let likeButton = document.createElement('div');
        likeButtons.push(likeButton);
        likeButton.innerHTML = '<img src="like.png" width="20" height="20" alt="submit" />';
        likeButton.style.cursor = "pointer";
        likeButtonAndCount.appendChild(likeButton);

        if(likedCollection.includes(items[i]['imageUri'])){
            likeButton.innerHTML = '<img src="unlike.png" width="20" height="20" alt="submit" />';
        }

        let likeNumberSection = document.createElement("div");
        likeNumberSection.style =  "height: 15px; font-size: 12px; margin-left: 5px";
        likeNumberSection.innerHTML = items[i]["like_count"];
        likeButtonAndCount.appendChild(likeNumberSection);

        likeButton.addEventListener("click", function (event) {
            if (token) {
                if(likedCollection.includes(items[likeButtons.indexOf(likeButton)]["imageUri"]) == false){
                    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/likePhoto";
                    const options = {
                        method: 'POST',
                        body: JSON.stringify({'photoId': items[likeButtons.indexOf(likeButton)]['photoId']}),
                        headers: { 'Content-Type': 'application/json' }
                    };
                
                    fetch(endpoint_url, options).then(console.log("successfully liked a photo"));

                    likeButton.innerHTML = '<img src="unlike.png" width="20" height="20" alt="submit" />';
                    likeNumberSection.innerHTML = parseInt(likeNumberSection.innerHTML) + 1;
                    likedCollection.push(items[likeButtons.indexOf(likeButton)]["imageUri"])
                    console.log(likedCollection);
                    chrome.storage.local.set({'likedPhotos': likedCollection});
                }
                else {
                    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/unlikePhoto";
                    const options = {
                        method: 'POST',
                        body: JSON.stringify({'photoId': items[likeButtons.indexOf(likeButton)]['photoId']}),
                        headers: { 'Content-Type': 'application/json' }
                    };
                
                    fetch(endpoint_url, options).then(console.log("successfully unliked a photo"));

                    likeButton.innerHTML = '<img src="like.png" width="20" height="20" alt="submit" />';
                    likeNumberSection.innerHTML = parseInt(likeNumberSection.innerHTML) - 1;
                    var imageUri = items[likeButtons.indexOf(likeButton)]["imageUri"];
                    likedCollection.splice(likedCollection.indexOf(imageUri), 1);
                    chrome.storage.local.set({'likedPhotos': likedCollection});
                }
            }
            else {
                photobookBg.appendChild(loginPromptDiv);
                loginPrompt.innerHTML = "To like a photo, please login first";
                loginPromptDiv.style.display = "block";
            }
        });

        let reportButton = document.createElement('div');
        reportButtons.push(reportButton);
        reportButton.innerHTML = 'Report';
        reportButton.style.cursor = "pointer";
        likeSection.appendChild(reportButton);
        reportButton.addEventListener("click", function (event) {
            alert("Thank you for reporting it. We will investigate and take it down if it's inappropriate.")
            var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/reportPhoto";
                const options = {
                    method: 'POST',
                    body: JSON.stringify({'photoId': items[reportButtons.indexOf(reportButton)]["photoId"]}),
                    headers: { 'Content-Type': 'application/json' }
                };
            
                fetch(endpoint_url, options).then(console.log("successfully reported a photo"));
        });

        pictureFrame.appendChild(displayUsername);
        pictureFrame.appendChild(dogNameLine);
        pictureFrame.appendChild(picture);
        pictureFrame.appendChild(likeSection);
        row.appendChild(pictureFrame);
    }
}

function changePhoto(){
    picturesPage.innerHTML = "";
    var endpoint_url = "https://us-central1-office-pets.cloudfunctions.net/getPhotobook-1";
    const options = {
        method: 'POST',
        body: JSON.stringify({'page': page}),
        headers: { 'Content-Type': 'application/json' }
    };

    fetch(endpoint_url, options)
        .then((response) => { return response.json(); })
        .then((items) => {
            console.log(items);
            renderPhotoItems(items);
    });
}

renderPhotoItems(default_photos);

var LoadMoreBtn = document.createElement("button");
LoadMoreBtn.innerHTML = "Load More";
LoadMoreBtn.setAttribute("class", "actionButton");
LoadMoreBtn.style.backgroundColor = "#FF9ABD";
LoadMoreBtn.style.width = "120px";
LoadMoreBtn.style.margin = "15px 0px 20px 0px";
LoadMoreBtn.addEventListener("click", function (event) {
    window.scrollTo(0, 0);
    page++;
    changePhoto();
});
    
photobookBg.appendChild(LoadMoreBtn);

var loginPromptDiv = document.createElement("div");
loginPromptDiv.style="display: none; position: fixed; top: 160px; width: 300px; height: 200px; padding: 30px; background-color: white; border-radius: 50px; border-width: 0px; font-size: 16px; box-shadow: 0px 0px 10px gray;";
var loginPrompt = document.createElement("h1");
loginPrompt.innerHTML = "To like a photo, please login first";

var loginPromptBtn = document.createElement("button");
loginPromptBtn.setAttribute("class", "actionButton");
loginPromptBtn.style = "background-color: #72C6F5; width: 70px"
loginPromptBtn.innerHTML = "Login";
loginPromptBtn.addEventListener("click", function (event) {
    loginPromptDiv.style.display = "none";
    accountPageBg.style.display = "flex";
});

var loginPromptDismiss = document.createElement("button");
loginPromptDismiss.setAttribute("class", "actionButton");
loginPromptDismiss.style = "background-color: gray; width: 70px";
loginPromptDismiss.innerHTML = "Cancel";
loginPromptDismiss.addEventListener("click", function (event) {
    loginPromptDiv.style.display = "none";
});

loginPromptDiv.appendChild(loginPrompt);
loginPromptDiv.appendChild(loginPromptBtn);
loginPromptDiv.appendChild(loginPromptDismiss);

photobookBg.appendChild(loginPromptDiv);