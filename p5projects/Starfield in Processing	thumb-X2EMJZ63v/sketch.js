// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/17WoOqgXsRM

var stars = [];

var speed;
let dim;

const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  createCanvas(800, 450);
  for (var i = 0; i < 800; i++) {
    stars[i] = new Star();
  }
}

function draw() {
  
   let c1 = color(0);
  let c2 = color(112,50,126);

  let  col = setGradient(0, 0, 800, 450, c1, c2, Y_AXIS);
  speed = map(mouseX, 0, width, 0, 50);
 // background(112,50,126);
  translate(width / 2, height / 2);
  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
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
