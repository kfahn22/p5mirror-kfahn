// Coding Challenge 129: Koch Snowflake
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/129-koch-snowflake.html
// https://youtu.be/X8bXDKqMsXE

let segments = [];

let w = 1600;
let h1 = 100;
const Y_AXIS = 1;
const X_AXIS = 2;


function addAll(arr, list) {
  for (let s of arr) {
    list.push(s);
  }
}

function setup() {
  createCanvas(w, 900);
  let a = createVector(500, h1);
  let b = createVector(1100, h1);
  let s1 = new Segment(a, b);

  let len = p5.Vector.dist(a, b);
  let h = len * sqrt(3) / 2;
  let c = createVector(w/2 , h1+h);
  
  let s2 = new Segment(b, c);
  let s3 = new Segment(c, a);
  segments.push(s1);
  segments.push(s2);
  segments.push(s3);
  
  let o = createVector(width/2,height/2);
  let inner = p5.Vector.dist(c, o);
  //println(children);
}

function mousePressed() {
  let nextGeneration = [];

  for (let s of segments) {
    let children = s.generate();
    addAll(children, nextGeneration);
  }
  segments = nextGeneration;
}


function draw() {
  c1 = color('#F16164');
  c2 = color('#0B6A88');
  //let  col2 = setGradientL(0, 0, 800, 900, c1, c2, X_AXIS);
//let  col3 = setGradientR(800, 0, 1600, 900, c2, c1, X_AXIS);
  background('#F16164');
  translate(0, 175);

  stroke(255);
  for (let s of segments) {
    s.show();
  }
}

function setGradientL(x, y, w, h, c1, c2, axis) {
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
