// Code base from Daniel Shiffman's Heart Curve coding challenge

// Gear curve equation from Wolfram Alpha
// https://mathworld.wolfram.com/GearCurve.html

const gcurve = [];
let a = 1;
let b = 10;
let sc = 80;
let n = 100;
let angle = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  let c1 = color(239, 195, 245, 180);
  let c2 = color(250, 166, 255, 150);
  let c3 = color(115, 83, 186, 75);
  let c4 = color(47, 25, 95, 50);
  for (let i = 0; i < 0.15 * n; i++) {
    gcurve.push(
      new Gear(width / 2, height / 2, a, b, random(20, 150), 30, c1, 2)
    );
  }
  for (let i = 0.15 * n + 1; i < n * 0.4; i++) {
    gcurve.push(
      new Gear(width / 2, height / 2, a, b, random(20, 150), 30, c2, 2)
    );
  }
  for (let i = n * 0.4 + 1; i < n * 0.8; i++) {
    gcurve.push(
      new Gear(width / 2, height / 2, a, b, random(20, 150), 30, c3, 2)
    );
  }
  for (let i = n * 0.8 + 1; i < n; i++) {
    gcurve.push(
      new Gear(width / 2, height / 2, a, b, random(20, 120), 30, c4, 2)
    );
  }
}

function draw() {
  background(15, 16, 32);
  translate(width / 2, height / 2);
  rotate(angle);
  for (let i = 0; i < gcurve.length; i++) {
    gcurve[i].oneCurve();
    gcurve[i].show();
  }
  angle += 1;
}

function mousePressed() {
  save("gear.jpg");
}
