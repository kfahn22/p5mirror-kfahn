function preload() {
  myFont = loadFont('RRegular-vmqW9.ttf');
}

function setup() {
  createCanvas(200, 60);
}

function draw() {
  background(220);
  textFont(myFont);
  textSize(50);
  text('The Sybyline', 20, 45);
}

function mousePressed() {
  save("syb.svg");
}