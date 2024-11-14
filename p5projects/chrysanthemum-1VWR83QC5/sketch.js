// Code base from Daniel Shiffman's Heart Curve coding challenge
// https://thecodingtrain.com/challenges/134-heart-curve
// https://youtu.be/oUBAi9xQ2X4

// Resources for butterfly equations
// Paul Bourke.net (also has 3d version)



// http://paulbourke.net/geometry/chrysanthemum/

//r = 5 (1 + sin(11 u / 5)) - 4 sin4(17 u / 3) sin8(2 cos(3 u) - 28 u)  . . . where 0 <= u <= 21 pi
// and in Cartesian coordinates


const flower = [];
const col = [];
let a = 0;
const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  createCanvas(800, 450);
}

function draw() {
  background(59);
  // let c1 = color('#FECEF1');
  // let c2 = color('#324998');
  // let col = setGradient(0, 0, 800, 450, c2, c1, Y_AXIS);
  
  translate(width / 2, height /2);
  noFill();
 
  // Equations for chrysanthemum curve
  let sc = 10;
  let r = 5 * (1 +sin(11 * a / 5)) - 4 * pow(sin(17 * a / 3), 4) + pow(sin(2 *cos(3 * a) - 28 * a), 8)
  const x = sc * r * cos(a);
  const y = -sc * r * sin(a);
  flower.push(createVector(x, y));

  // So that it stops
  if (a > 21 * PI) {
    noLoop();
  }
  
  beginShape();
  for (let v of flower) {
    strokeWeight(1);
    //stroke(255);
    let d = dist(v.x, v.y, 0, 0);
    //console.log(d);
    let c = map(d, 0, 100, 239, 50);
    col[v].push(color(c, 156, 218));
    stroke(col[v]);
    vertex(v.x, v.y);
  }
  endShape();
  a += 0.01;
}

function mousePressed() {
  save('chysanthemum.jpg');
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
