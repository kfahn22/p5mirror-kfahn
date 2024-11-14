// Heart Curve
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/134-heart-curve.html
// https://youtu.be/oUBAi9xQ2X4
// I <3 you

const heart = [];
let a = 0;
const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  createCanvas(800, 450, WEBGL);
}


function draw() {
  //background(0);
  let c1 = color(146,83,161);
  let c2 = color('#F063A4');
  let  col2 = setGradientL(-400, -225, 400, 450, c1, c2, X_AXIS);
  let  col3 = setGradientR(0, -225, 750, 450, c2, c1, X_AXIS);
  
  //translate(width/2, height* 2.15/5);
  strokeWeight(2);
  let c3 = color('#70327E');
  stroke(c3);
  fill(c3);
  beginShape();
  for (let v of heart) {
    vertex(v.x, v.y);
  }
  endShape();
  
  const r = height/35;
  const x = r * 16 * pow(sin(a), 3);
  const y = -r*(13 * cos(a) - 5*cos(2*a) - 2*cos(3*a)- cos(4*a));
  heart.push(createVector(x, y));
  
  // So that it stops
  if (a > TWO_PI) {
    noLoop();
  }
  a += 0.1;
}

function mousePressed() {
 save('heart.jpg');
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
      let inter = map(i, x, x + w, 0,1);
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
      let inter = map(i, x, x + w, 0,1.75);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
