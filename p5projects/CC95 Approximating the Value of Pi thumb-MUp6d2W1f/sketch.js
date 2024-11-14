// Daniel Shiffman
// http://codingtra.in

// Approximating Pi
// https://youtu.be/5cNnf_7e92Q
// https://thecodingtrain.com/CodingChallenges/095-approximating-pi.html

const r = 220;

let total = 0;
let circle = 0;

let recordPI = 0;

let resultP;

const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  createCanvas(802, 452);
  resultP = createP('Approximated Value:');
  let c3 = color('#0B6A88');
  let c4 = color('#F16164');
  let c5 = color(255);
  
  let  col2 = setGradientL(0, 0, 400, 450, c3, c4, X_AXIS);
  let  col3 = setGradientR(400, 0, 750, 450, c4, c3, X_AXIS);
  //background('#0B6A88');
  translate(width / 2, height / 2);
  // stroke(255);
  // strokeWeight(4);
  // noFill();
  // ellipse(0, 0, r * 2, r * 2);
  // rectMode(CENTER);
  // rect(0, 0, r * 2, r * 2);
  noLoop();
}

function draw() {
  translate(width / 2, height / 2);
  fill('#0B6A88');
  rectMode(CENTER);
  rect(0, 0, r * 2, r * 2);
  c1 = color('#701616');
  for (let i = 0; i < 250; i++) {
    const x = random(-r, r);
    const y = random(-r, r);
    total++;

    const d = x * x + y * y;
    if (d < r * r) {
      circle++;
      stroke('#F16164');
    } else {
     
      stroke(c1, 100);
    }
    strokeWeight(8);
    point(x, y);
    stroke(255);
  strokeWeight(4);
  noFill();
  ellipse(0, 0, r * 2, r * 2);
  rectMode(CENTER);
  rect(0, 0, r * 2, r * 2);
    const pi = 4 * (circle / total);
    let recordDiff = Math.abs(Math.PI - recordPI);
    let diff = Math.abs(Math.PI - pi);
    if (diff < recordDiff) {
      recordDiff = diff;
      recordPI = pi;
      resultP.html(`Approximated Value: ${recordPI}`);
    }
  }
}
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
      let inter = map(i, x, x + w, 0.2,1.0);
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
    let inter = map(i, y, y + h, 0.0, 1.0);
      
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0,1.6);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function mousePressed() {
 save('approx_pi.jpg');
}

