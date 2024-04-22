document.getElementById("hat-button").addEventListener("click", function() {
    var part = document.getElementById("hat").firstChild;
    if (part.style.display != "none") {
        disablePart(part);
        angerPotatoMan();
    }
    else {
        enablePart(part);
    }
});

document.getElementById("eyes-button").addEventListener("click", function() { 
    var part = document.getElementById("eyes").firstChild;
    if (part.style.display != "none") {
        disablePart(part);
        angerPotatoMan();
    }
    else {
        enablePart(part);
    }
});

document.getElementById("mouth-button").addEventListener("click", function() { 
    var part = document.getElementById("stache").firstChild;
    if (part.style.display != "none") {
        disablePart(part);
        angerPotatoMan();
    }
    else {
        enablePart(part);
    }
});

document.getElementById("ears-button").addEventListener("click", function() { 
    if (document.getElementById("left-ear").firstChild.style.display != "none") {
        disablePart(document.getElementById("left-ear").firstChild);
        disablePart(document.getElementById("right-ear").firstChild);
        angerPotatoMan();
    }
    else {
        enablePart(document.getElementById("left-ear").firstChild);
        enablePart(document.getElementById("right-ear").firstChild);
    }
});

document.getElementById("arms-button").addEventListener("click", function() { 
    if (document.getElementById("left-arm").firstChild.style.display != "none") {
        disablePart(document.getElementById("left-arm").firstChild);
        disablePart(document.getElementById("right-arm").firstChild);
        angerPotatoMan();
    }
    else {
        enablePart(document.getElementById("left-arm").firstChild);
        enablePart(document.getElementById("right-arm").firstChild);
    }
});

document.getElementById("shoes-button").addEventListener("click", function() { 
    if (document.getElementById("left-foot").firstChild.style.display != "none") {
        disablePart(document.getElementById("left-foot").firstChild);
        disablePart(document.getElementById("right-foot").firstChild);
        angerPotatoMan();
    }
    else {
        enablePart(document.getElementById("left-foot").firstChild);
        enablePart(document.getElementById("right-foot").firstChild);
    }
});



// Enabling and Disabling Body Parts
function enablePart(part) {
    part.style.display = "inline";
}

function disablePart(part) {
    part.style.display = "none";
}

// Angry Text
var angryText = document.createElement("img");
angryText.src = "../images/fucku.png";
document.getElementById("angry-text").appendChild(angryText);
angryText.style.height = "250px";
angryText.style.width = "250px";
angryText.parentElement.style.left = "300px";
angryText.parentElement.style.bottom = "125px";
angryText.style.display = "none";

// Pops up "Fuck You" for a few seconds
function angerPotatoMan() {
    angryText.style.display = "inline";
    setTimeout(disableAngryText, 1000); // Execute the function after 3 seconds
}
function disableAngryText() {
    angryText.style.display = "none";
}

/*
// Dragging Functionality (Broken)
bodyParts.forEach((part) => {
    part.addEventListener("mousedown", startDragging);
});

let isDragging = false;
let currentPart = null;
let offsetX = 0;
let offsetY = 0;

function drag(event) {
    if (isDragging) {
      currentPart.style.left = event.clientX - offsetX + "px";
      currentPart.style.top = event.clientY - offsetY + "px";
    }
}

function startDragging(event) {
  isDragging = true;
  currentPart = event.target;
  offsetX = event.clientX - currentPart.offsetLeft;
  offsetY = event.clientY - currentPart.offsetTop;
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDragging);
}

function stopDragging() {
  isDragging = false;
  currentPart = null;
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", stopDragging);
  savePositions();
  updatePotatoHead();
}
*/