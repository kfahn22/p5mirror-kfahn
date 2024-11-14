
let img = [];

function preload() {
  for (let i = 0; i < 11; i++) {
  img[i] = loadImage(`${i}.jpg`);
  }
}

function setup() {
  createCanvas(800, 450);
}

function draw() {
  background('#0B6A88');
  for (let i = 0; i < 3; i++) {
    image(img[i+1],  40 + i * 225, 0, 225, 225);
    image(img[i+6],  40 + i * 225, 225, 225, 225);
  }
}
function mousePressed() {
  save('quickdraw.jpg');
}