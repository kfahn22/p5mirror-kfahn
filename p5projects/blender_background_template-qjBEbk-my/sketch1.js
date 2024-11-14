let img;

function preload() {
  // Load your image here
  img = loadImage('background.png');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  // Draw the original image
  image(img, 0, 0);

  // Mirror the image horizontally
  push();
  scale(-1, 1);
  image(img, -img.width, 0);
  pop();
}
