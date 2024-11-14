// GIF Loop
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/135-gif-loop.html
// https://youtu.be/nBKwCCtWlUg

const totalFrames = 120;
let counter = 0;
const record = false;

function setup() {
  createCanvas(800, 450);
  //background('#EC015A');
}

function draw() {
  let percent = 0;
  if (record) {
    percent = float(counter) / totalFrames;
  } else {
    percent = float(counter % totalFrames) / totalFrames;
  }
  render(percent);
  if (record) {
    save("output/gif-" + nf(counter, 3) + ".png");
    if (counter == totalFrames - 1) {
      noLoop();
    }
  }
  counter++;
}

function mousePressed() {
  save('gif.jpg');
}

function render(percent) {
  let angle = map(percent, 0, 1, 0, TWO_PI);
  background('#EC015A');
  translate(width / 2, height / 2);
  rotate(angle);
  let m = map(percent, 0, 1, 0, 255);
  let c = color('#FCEE21');
  stroke(c, percent);
  strokeWeight(4);
  noFill();
  rectMode(CENTER);
  square(0, 0, 200);
  
}