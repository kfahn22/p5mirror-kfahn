// Base polar coordinate code https://thecodingtrain.com/challenges/134-heart-curve
// Code to implement grid from https://thecodingtrain.com/challenges/116-lissajous-curve-table
// Gear curve equation from Wolfram Alpha
// https://mathworld.wolfram.com/GearCurve.html

// I am using the patgrad library to create the background gradient
const gcurve = [];
// a, b are parameters to the function to calculate radius
const a = 1;
const b = 1;
const m = 10; // number of spokes
let sc;
let angle = 0;
const w = 50;
let cols;
let rows;

function setup() {
  createCanvas(500, 500);
  cols = floor(width / w) - 1;
  rows = floor(height / w) - 1;
  angleMode(DEGREES);
  let col = color(255);
  for (let i = 0; i < 1; i++) {
    gcurve.push(new Gear(width / 2, height / 2, 1, 10, random(50, 250), 30, col, m));
  }
}

function draw() {
  let c1 = color(87, 31, 78);
  let c2 = color(146, 201, 177);
  gradient = createLinearGradient(45, 700);
  gradient.colors(0, c1, 1, c2);
  backgroundGradient(gradient);

  let w = width / 5;
  noFill();

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let cx = w * (i - 1.5);
      let cy = w * (j - 1.5);
      for (let i = 0; i < gcurve.length; i++) {
        push();
        translate(cx, cy);
        gcurve[i].oneCurve();
        gcurve[i].show();
        pop();
      }
    }
  }
}

function hyperbolicTan(theta) {
  let e = 2.71828;
  let l = pow(e, 2 * theta);
  return (l - 1) / (l + 1);
}

function mousePressed() {
  save("tile.jpg");
}
