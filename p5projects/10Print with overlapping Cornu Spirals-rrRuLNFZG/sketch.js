// Based on code from Daniel Shiffman;s 10Print Coding Challenge
// https://thecodingtrain.com/challenges/76-10Print

// I adjusted the spacing of the spirals so that they would overlap.

let x = 0;
let y = 0;
let spacing = 30;
let r = spacing * 0.53;
let n = 200;
let maxSpirals; // determines # of spirals on each end of Cornu spiral
let cornu1;
let cornu2;

const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  // Calculations for width & height of canvas so spiral will stay w/n bounds of canvas
  // let w = pow(spacing, 2) + ceil(r);
  // let h = pow(spacing, 2) / 2 + ceil(r);
  // console.log(w)
  createCanvas(916, 466);

  // Add gradient to background
  let c1 = color(11, 3, 45);
  let c2= color(246, 126, 125);
  
  let col = setGradient(0, 0, 916, 466, c1, c2, Y_AXIS);

  maxSpirals = (12 / 8) * PI;
  cornu1 = new CornuSpiral(n, maxSpirals, r, 0);
  cornu1.calculatePoints();
  cornu2 = new CornuSpiral(n, maxSpirals, r, PI / 2);
  cornu2.calculatePoints();
}

// // I made a couple of slight adjustments because cornu spiral does not have a square aspect ratio
function draw() {
  translate(2, 2);
  if (random(1) < 0.2) {
    cornu2.show(x + spacing * 0.7, y + spacing * 0.7);
  } else {
    cornu1.show(x + spacing * 0.7, y + spacing * 0.7);
  }
  x = x + spacing;
  if (x > width) {
    x = 0;
    y = y + spacing;
  }
  if (y > height - spacing / 3) {
    noLoop();
  }
}

function setGradient(x, y, w, h, c1, c2, axis) {
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

function mousePressed() {
  save("img.jpg");
}
