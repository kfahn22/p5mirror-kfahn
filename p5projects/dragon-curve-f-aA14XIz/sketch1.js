let length = 10; // Length of each segment
let iterations = 5; // Number of iterations to generate the curve

function setup() {
  createCanvas(800, 800);
  background(255);
  stroke(0);
  translate(width / 2, height / 2);

  // Draw the initial line
  line(0, 0, length, 0);
  translate(length, 0);

  // Draw the dragon curve
  dragonCurve(iterations, true);
}

function draw() {
  // No continuous drawing required
  noLoop();
}

function dragonCurve(level, direction) {
  if (level === 0) {
    return;
  }

  // Rotate and draw according to the direction
  if (direction) {
    rotate(HALF_PI);
    line(0, 0, length, 0);
    translate(length, 0);
    dragonCurve(level - 1, true);
  //   rotate(-HALF_PI);
  //   line(0, 0, length, 0);
  //   translate(length, 0);
  //   dragonCurve(level - 1, false);
  //   rotate(-HALF_PI);
  // } else {
  //   rotate(-HALF_PI);
  //   line(0, 0, length, 0);
  //   translate(length, 0);
  //   dragonCurve(level - 1, true);
  //   rotate(HALF_PI);
  //   line(0, 0, length, 0);
  //   translate(length, 0);
  //   dragonCurve(level - 1, false);
  //   rotate(HALF_PI);
 }
}
