// Starter code by Daniel Shiffman
// https://editor.p5js.org/codingtrain/sketches/egvieHyt0
// https://thecodingtrain.com/challenges/134-heart-curve
// https://youtu.be/oUBAi9xQ2X4

// Heart curve equations from http://www.mathematische-basteleien.de/heart.html
// https://mathworld.wolfram.com/HeartCurve.html

// Note that two and four render the slowest

let h1
let a = 0;
const e = 2.71828;
const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  h1 = new Heart1(width * 1 / 2, height * 3 / 4, windowHeight*0.018);
}

function draw() {
  background(0);
  noStroke();
  h1.show();
}

// function mousePressed() {
//   save('heart.jpg');
//  }

function setGradientL(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function setGradientR(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0.0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1.75);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}