// Body image (the potato)
var body = document.createElement("img");
body.src = "../images/potatobase.png";
document.getElementById("body").appendChild(body);
body.style.height = "100%";
body.style.width = "100%";

// Hat image
var hat = document.createElement("img");
hat.src = "../images/hat.png";
document.getElementById("hat").appendChild(hat);
hat.style.height = "100%";
hat.style.width = "100%";

// Eyes image
var eyes = document.createElement("img");
eyes.src = "../images/eyes.png";
document.getElementById("eyes").appendChild(eyes);
eyes.style.height = "100%";
eyes.style.width = "100%";

// Stache image
var stache = document.createElement("img");
stache.src = "../images/stache.png";
document.getElementById("stache").appendChild(stache);
stache.style.height = "100%";
stache.style.width = "100%";

// Nose image
var nose = document.createElement("img");
nose.src = "../images/nose.png";
document.getElementById("nose").appendChild(nose);
nose.style.height = "100%";
nose.style.width = "100%";

// Left Ear image
var leftEar = document.createElement("img");
leftEar.src = "../images/leftear.png";
document.getElementById("left-ear").appendChild(leftEar);
leftEar.style.height = "100%";
leftEar.style.width = "100%";

// Right Ear image
var rightEar = document.createElement("img");
rightEar.src = "../images/rightear.png";
document.getElementById("right-ear").appendChild(rightEar);
rightEar.style.height = "100%";
rightEar.style.width = "100%";

// Left Arm image
var leftArm = document.createElement("img");
leftArm.src = "../images/leftarm.png";
document.getElementById("left-arm").appendChild(leftArm);
leftArm.style.height = "100%";
leftArm.style.width = "100%";

// Right Arm image
var rightArm = document.createElement("img");
rightArm.src = "../images/rightarm.png";
document.getElementById("right-arm").appendChild(rightArm);
rightArm.style.height = "100%";
rightArm.style.width = "100%";

// Left Foot image
var leftFoot = document.createElement("img");
leftFoot.src = "../images/leftshoe.png";
document.getElementById("left-foot").appendChild(leftFoot);
leftFoot.style.height = "100%";
leftFoot.style.width = "100%";

// Right Foot image
var rightFoot = document.createElement("img");
rightFoot.src = "../images/rightshoe.png";
document.getElementById("right-foot").appendChild(rightFoot);
rightFoot.style.height = "100%";
rightFoot.style.width = "100%";

// make body parts draggable
const bodyParts = [
  body,
  hat,
  eyes,
  stache,
  nose,
  leftEar,
  rightEar,
  leftArm,
  rightArm,
  leftFoot,
  rightFoot,
];
bodyParts.forEach((part) => {
  part.addEventListener("mousedown", startDragging);
});

// dragging functionality
let isDragging = false;
let currentPart = null;
let offsetX = 0;
let offsetY = 0;

function startDragging(event) {
  isDragging = true;
  currentPart = event.target;
  offsetX = event.clientX - currentPart.offsetLeft;
  offsetY = event.clientY - currentPart.offsetTop;
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDragging);
}

function drag(event) {
  if (isDragging) {
    currentPart.style.left = event.clientX - offsetX + "px";
    currentPart.style.top = event.clientY - offsetY + "px";
  }
}

function stopDragging() {
  isDragging = false;
  currentPart = null;
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", stopDragging);
  savePositions();
  updatePotatoHead();
}

// update the Mr. Potato Head image based on missing body parts
function updatePotatoHead() {
  const missingParts = [];
  bodyParts.forEach((part) => {
    if (
      part.offsetLeft < potatoHead.offsetLeft ||
      part.offsetLeft > potatoHead.offsetLeft + potatoHead.width ||
      part.offsetTop < potatoHead.offsetTop ||
      part.offsetTop > potatoHead.offsetTop + potatoHead.height
    ) {
      missingParts.push(part.classList[0]);
    }
  });

  if (missingParts.length > 0) {
    potatoHead.src = `images/potato-head-${missingParts.join("-")}.png`;
  } else {
    potatoHead.src = "images/potato-head.png";
  }
}

// save body part positions
function savePositions() {
  const positions = {};
  bodyParts.forEach((part) => {
    positions[part.classList[0]] = {
      left: part.offsetLeft,
      top: part.offsetTop,
    };
  });
  chrome.storage.local.set({ positions });
}

// load saved positions
chrome.storage.local.get("positions", (data) => {
  if (data.positions) {
    Object.keys(data.positions).forEach((key) => {
      const part = document.querySelector(`.${key}`);
      part.style.left = data.positions[key].left + "px";
      part.style.top = data.positions[key].top + "px";
    });
    updatePotatoHead();
  }
});
