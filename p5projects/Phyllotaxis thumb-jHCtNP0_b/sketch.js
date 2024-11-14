// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/KWoJgHFYWxY

var n = 0;
var c = 6;
//var c = 4;

var points = [];

var start = 0;
const Y_AXIS = 1;
const X_AXIS = 2;

let dim;

function setup() {
  createCanvas(800, 450);
  dim = width / 2;
  angleMode(DEGREES);
  colorMode(HSB);
}

function draw() {
  let b2 = color(0);
  let b1 = color(194,82,96);
  // setGradientL(0, 0, width / 2, height, b1, b2, X_AXIS);
  // setGradientR(width / 2, 0, width / 2, height, b2, b1, X_AXIS);
  background(194,82,96);
  //drawGradient(width/2, height/2, b1);
  translate(width / 2, height / 2);
  //rotate(n * 0.3);
 // rotate(n * 0.6);
  fill(0);
  ellipse(0,0, 400, 400);
  for (var i = 0; i < n; i++) {
    var a = i * 137.5;
    var r = c * sqrt(i);
    var x = r * cos(a);
    var y = r * sin(a);
    //var hu = sin(start + i );
     var hu = sin(start + i * 0.2);
    //var hu = sin(start + i * 0.1);
    hu = map(hu, -1, 1, 0, 180);
    fill(hu, 255, 255);
    noStroke();
   
    //ellipse(x, y,  c + int(i/200), c + (int(i/200)));
  ellipse(x, y, c+1, c+1);
  }
  n += 1;
  start += 0.1;
  
}


function mousePressed() {
 save('phyll.jpg');
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
      let inter = map(i, x, x + w, 0.4, 1);
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
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 0.6);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function drawGradient(x, y, b1) {
  let radius = 300;
 // let radius = dim / 2;
  let h = random(0, 360);
        for (let r = radius; r < 400; r++) {
        //for (let r = radius; r > 200; --r) {
          noFill();
          stroke(b1);
          strokeWeight(10);
          ellipse(x, y, r, r);
      //h = (h + 1) % 360;
   }
}