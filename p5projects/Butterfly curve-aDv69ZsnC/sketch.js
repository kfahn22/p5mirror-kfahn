// Code base from Daniel Shiffman's Heart Curve coding challenge
// https://thecodingtrain.com/challenges/134-heart-curve
// https://youtu.be/oUBAi9xQ2X4

// Resources for butterfly equations
// Paul Bourke.net (also has 3d version)
// let u = a * 24 * PI / N;
// x = cos(u)*(pow(e, cos(u)) - 2 * cos(4*u) - pow(sin(u/12), 5)
// y = sin(u)*(pow(e, cos(u)) - 2 * cos(4*u) - pow(sin(u/12), 5)
// https://mathworld.wolfram.com/topics/PlaneCurves.html
// jwilson.coe.jga.edu
// r = pow(cos(5*theta), 2) + sin(3*theta) + 0.3
// r = sin(theta) + pow(sin(5/2*theta),3)
// paulmasson.github.io

const butterfly = [];
let a = 0;
const Y_AXIS = 1;
const X_AXIS = 2;
const e = 2.71828;

function setup() {
  createCanvas(800, 450);
}

function draw() {
  background(59);
  let c1 = color('#FECEF1');
  let c2 = color('#324998');
  let c3 = color('#F063A4');
  let col2 = setGradient(0, 0, 800, 450, c2, c1, Y_AXIS);
  
  translate(width / 2, height * 4.5/8);
  //stroke(255, 255, 255, 50);
  strokeWeight(1);
  noFill();

  // Equations for butterfly curve
  let sc = 50;
  let r = pow(e, sin(a)) - 2 * cos(4 * a) + pow(sin((2 * a - PI) / 24), 5);
  const x = sc * r * cos(a);
  const y = -sc * r * sin(a);
  butterfly.push(createVector(x, y));

  // So that it stops
  if (a > 8 * PI) {
    noLoop();
  }
  
  beginShape();
  for (let v of butterfly) {
    strokeWeight(2);
    stroke(255);
    vertex(v.x, v.y);
  }
  endShape();
  a += 0.01;
}

function mousePressed() {
  save('butterfly_curve.jpg');
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 0.7);
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
