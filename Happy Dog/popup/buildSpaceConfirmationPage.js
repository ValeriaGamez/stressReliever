var confirmEntranceBg = document.createElement('div');
confirmEntranceBg.setAttribute("class", "bg");
confirmEntranceBg.style.backgroundColor = "#FFC5DA";
var confirmText = document.createElement("h1");
confirmText.innerHTML = "You are about to enter an existing space:";

var confirmEntranceBtn = document.createElement("button");
confirmEntranceBtn.innerHTML = "Yes I want to enter this space";
confirmEntranceBtn.setAttribute("class", "formBtn");
confirmEntranceBtn.style.width = "90%";
confirmEntranceBtn.style.background = "#FF6499";
confirmEntranceBtn.style.marginTop = "50px";

var confirmBackBtn = document.createElement("button");
confirmBackBtn.innerHTML = "Go back to create a space with different name";
confirmBackBtn.setAttribute("class", "secondaryBtn");
confirmBackBtn.style.width = "90%";

var confirmSpaceName = document.createElement('div');
confirmSpaceName.setAttribute("class", "spaceName");
confirmSpaceName.innerHTML = "space";
confirmSpaceName.style.background = "#FFE0EB";
confirmSpaceName.style.height = "50px";
confirmSpaceName.style.width = "50%";
confirmSpaceName.style.textOverflow = "ellipsis";
confirmSpaceName.style.whiteSpace = "nowrap";
confirmSpaceName.style.overflow = "hidden";
confirmSpaceName.style.fontSize = "25px";
confirmSpaceName.style.lineHeight = "50px";

var confirmTextPplList = document.createElement("h3");
confirmTextPplList.innerHTML = "Checking members...";

confirmEntranceBg.appendChild(confirmText);
confirmEntranceBg.appendChild(confirmSpaceName);
confirmEntranceBg.appendChild(confirmTextPplList);
confirmEntranceBg.appendChild(confirmEntranceBtn);
confirmEntranceBg.appendChild(confirmBackBtn);