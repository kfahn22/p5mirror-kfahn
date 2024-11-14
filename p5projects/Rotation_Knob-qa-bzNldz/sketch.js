// Code base from Daniel Shiffman's Heart Curve coding challenge

// Gear curve equation from Wolfram Alpha
// https://mathworld.wolfram.com/GearCurve.html

const gcurve = [];
// a and b are parameters that control the shape of the curve
// [1, 10] were suggested on Wolfram Alpha
let a = 1; // as a increase tends toward a circle
let b = 10; // as b decreases the spokes get longer and start to curve
let spokes = 6; // number of spokes between
let n = 35; // number of gears to draw
let sc = 30; // scale: 20
let angle = 0;
let sw = 1.5; // strokeweight

function setup() {
  createCanvas(600, 600);
  colorMode(RGB, 255);
  angleMode(DEGREES);
  for (let i = 0; i < n; i++) {
    let perc = (5 * i) / sc; // adjustment so distance between gears increases
    //let col = color(200, 100, 0 + 7 * i);
    sw = 0.1 + 0.1 * i;
    let col = color(146, 201, 177, 220 + i * 1);
    gcurve.push(
      new Gear(width / 2, height / 2, a, b, spokes, sc + perc * i, col, sw)
    );
  }
}

function draw() {
  background(87, 31, 78);
  translate(width / 2, height / 2);
  rotate(angle);
  for (let i = 0; i < gcurve.length; i++) {
    gcurve[i].oneCurve();
    gcurve[i].show();
  }
  angle += 0.5;
}

function mousePressed() {
  save("gear.jpg");
}
