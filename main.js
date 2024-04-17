// create elements for each body part
const hat = document.createElement('img');
const eyes = document.createElement('img');
const mouth = document.createElement('img');
const ears = document.createElement('img');
const arms = document.createElement('img');
const stache = document.createElement('img');
const shoes = document.createElement('img'); // Haven't uploaded image yet
const nose = document.createElement('img');

// set the source for each body part image
hat.src = 'images/blackhat.png';
eyes.src = 'images/eyes.png';
stache.src = 'images/stache.png';
mouth.src = 'images/mouth.png';
ears.src = 'images/ears.png';
arms.src = 'images/arms.png';
shoes.src = 'images/shoes.png';
nose.src = 'images/nose.png';

// create the main Mr. Potato Head image
const potatoHead = document.createElement('img');
potatoHead.src = 'images/MrPotatoOG.png(1).png';
potatoHead.classList.add('potato-head');

// append body parts and Mr. Potato Head image to the document body
document.body.appendChild(hat);
document.body.appendChild(eyes);
document.body.appendChild(stache);
document.body.appendChild(mouth);
document.body.appendChild(ears);
document.body.appendChild(arms);
document.body.appendChild(shoes);
document.body.appendChild(nose);
document.body.appendChild(potatoHead);

// make body parts draggable
const bodyParts = [hat, eyes, stache, mouth, ears, arms, shoes, nose];
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
