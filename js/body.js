// Image List
// Body image (the potato)
var body = document.createElement("img");
body.src = "../images/potatobase.png";
document.getElementById("body").appendChild(body);
body.position = ("0px", "20px"); // Position is in x, y format. Origin is center of container
body.style.height = "500px";
body.style.width = "500px";
body.parentElement.style.left = body.position[0];
body.parentElement.style.bottom = body.position[1];

// Hat image
var hat = document.createElement("img");
hat.src = "../images/hat.png";
document.getElementById("hat").appendChild(hat);
hat.position = ("0px", "50px");

// Eyes image
var eyes = document.createElement("img");
eyes.src = "../images/eyes.png";
document.getElementById("eyes").appendChild(eyes);
eyes.position = ("0px", "50px");

// Stache image
var stache = document.createElement("img");
stache.src = "../images/mouth.png";
document.getElementById("stache").appendChild(stache);
stache.position = ("0px", "50px");

// Nose image
var nose = document.createElement("img");
nose.src = "../images/nose.png";
document.getElementById("nose").appendChild(nose);
nose.position = ("0px", "50px");

// Left Ear image
var leftEar = document.createElement("img");
leftEar.src = "../images/leftear.png";
document.getElementById("left-ear").appendChild(leftEar);
leftEar.position = ("0px", "50px");

// Right Ear image
var rightEar = document.createElement("img");
rightEar.src = "../images/rightear.png";
document.getElementById("right-ear").appendChild(rightEar);
rightEar.position = ("0px", "50px");

// Left Arm image
var leftArm = document.createElement("img");
leftArm.src = "../images/leftarm.png";
document.getElementById("left-arm").appendChild(leftArm);
leftArm.position = ("0px", "50px");

// Right Arm image
var rightArm = document.createElement("img");
rightArm.src = "../images/rightarm.png";
document.getElementById("right-arm").appendChild(rightArm);
rightArm.position = ("0px", "50px");

// Left Foot image
var leftFoot = document.createElement("img");
leftFoot.src = "../images/leftshoe.png";
document.getElementById("left-foot").appendChild(leftFoot);
leftFoot.position = ("0px", "50px");

// Right Foot image
var rightFoot = document.createElement("img");
rightFoot.src = "../images/rightshoe.png";
document.getElementById("right-foot").appendChild(rightFoot);
rightFoot.position = ("0px", "50px");

const bodyParts = [
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
  // Styling & setting positions
  part.style.height = "500px";
  part.style.width = "500px";
  part.parentElement.style.left = part.position[0];
  part.parentElement.style.bottom = part.position[1];
});



/*
// updating image and positions (Broken)
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
*/