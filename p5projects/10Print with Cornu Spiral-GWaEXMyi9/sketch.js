// https://thecodingtrain.com/challenges/76-10Print

let x = 0;
let y = 0;
let spacing = 30;
let r = spacing * 0.38; 
let numPoints = 200;
let maxT;
let cornu1;
let cornu2;

const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  createCanvas(902, 453);
  
  // Add gradient to background  
  let c1 = color(246,126,125);
  let c2 = color(11,3,45);
  let col = setGradient(0, 0, 902, 453, c1, c2, Y_AXIS);

  maxT = 2 * PI;
  cornu1 = new CornuSpiral(numPoints, maxT, r, 0);
  cornu1.calculatePoints();
  cornu2 = new CornuSpiral(numPoints, maxT, r, PI/2);
  cornu2.calculatePoints();
}

function draw() {
  stroke(255);
  if (random(1) < 0.2) {
    // I made a slight adjustment because cornu spiral does not have a square aspect ratio
    cornu2.show(x + spacing / 2 + 2, y + spacing / 2 + 2);
  } else {
    cornu1.show(x + spacing / 2 + 2, y + spacing / 2 + 2);
  }
  x = x + spacing;
  if (x > width) {
    x = 0;
    y = y + spacing;
  }
  if (y > height-spacing/4) {
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
  save('img.jpg');
}
