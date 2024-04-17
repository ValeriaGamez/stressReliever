// create elements for each body part
const hat = document.createElement('img');
const leftEye = document.createElement('img');
const rightEye = document.createElement('img');
const mustache = document.createElement('img');
const mouth = document.createElement('img');
const leftEar = document.createElement('img');
const rightEar = document.createElement('img');
const leftArm = document.createElement('img');
const rightArm = document.createElement('img');
const leftLeg = document.createElement('img');
const rightLeg = document.createElement('img');

// set the source for each body part image
hat.src = 'images/hat.png';
leftEye.src = 'images/left-eye.png';
rightEye.src = 'images/right-eye.png';
mustache.src = 'images/mustache.png';
mouth.src = 'images/mouth.png';
leftEar.src = 'images/left-ear.png';
rightEar.src = 'images/right-ear.png';
leftArm.src = 'images/left-arm.png';
rightArm.src = 'images/right-arm.png';
leftLeg.src = 'images/left-leg.png';
rightLeg.src = 'images/right-leg.png';

// create the main Mr. Potato Head image
const potatoHead = document.createElement('img');
potatoHead.src = 'images/potato-head.png';
potatoHead.classList.add('potato-head');

// append body parts and Mr. Potato Head image to the document body
document.body.appendChild(hat);
document.body.appendChild(leftEye);
document.body.appendChild(rightEye);
document.body.appendChild(mustache);
document.body.appendChild(mouth);
document.body.appendChild(leftEar);
document.body.appendChild(rightEar);
document.body.appendChild(leftArm);
document.body.appendChild(rightArm);
document.body.appendChild(leftLeg);
document.body.appendChild(rightLeg);
document.body.appendChild(potatoHead);

// make body parts draggable
const bodyParts = [hat, leftEye, rightEye, mustache, mouth, leftEar, rightEar, leftArm, rightArm, leftLeg, rightLeg];
bodyParts.forEach(part => {
  part.addEventListener('mousedown', startDragging);
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
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDragging);
}

function drag(event) {
  if (isDragging) {
    currentPart.style.left = event.clientX - offsetX + 'px';
    currentPart.style.top = event.clientY - offsetY + 'px';
  }
}

function stopDragging() {
  isDragging = false;
  currentPart = null;
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDragging);
  savePositions();
  updatePotatoHead();
}

// update the Mr. Potato Head image based on missing body parts
function updatePotatoHead() {
  const missingParts = [];
  bodyParts.forEach(part => {
    if (part.offsetLeft < potatoHead.offsetLeft || part.offsetLeft > potatoHead.offsetLeft + potatoHead.width ||
        part.offsetTop < potatoHead.offsetTop || part.offsetTop > potatoHead.offsetTop + potatoHead.height) {
      missingParts.push(part.classList[0]);
    }
  });
  
  if (missingParts.length > 0) {
    potatoHead.src = `images/potato-head-${missingParts.join('-')}.png`;
  } else {
    potatoHead.src = 'images/potato-head.png';
  }
}

// save body part positions
function savePositions() {
  const positions = {};
  bodyParts.forEach(part => {
    positions[part.classList[0]] = {
      left: part.offsetLeft,
      top: part.offsetTop
    };
  });
  chrome.storage.local.set({ positions });
}

// load saved positions
chrome.storage.local.get('positions', data => {
  if (data.positions) {
    Object.keys(data.positions).forEach(key => {
      const part = document.querySelector(`.${key}`);
      part.style.left = data.positions[key].left + 'px';
      part.style.top = data.positions[key].top + 'px';
    });
    updatePotatoHead();
  }
});