// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/AaGK-fj-BAM

var s;
var scl = 20;

var food;

function setup() {
 createCanvas(800, 450);
  s = new Snake();
  frameRate(2)
  pickLocation();

}

function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function mousePressed() {
  s.total++;
}

function draw() {
  background(45,197,244);

  // if (s.eat(food)) {
  //   pickLocation();
  // }
  // s.death();
  // s.update();
  // s.show();

  stroke(146,83,161);
  fill(146,83,161);
  rect(300, 500, 50, 50)
  //rect(food.x, food.y, scl, scl);
}

function keyTyped() {
  if (key === "u") {
    s.dir(0, -1);
  } else if (key === "d") {
    s.dir(0, 1);
  } else if (key === "r") {
    s.dir(1, 0);
  } else if (key === "l") {
    s.dir(-1, 0);
  }
}