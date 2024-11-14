// Polar coordinate code base from Daniel Shiffman's Heart Curve coding challenge

// Gear curve equation from Wolfram Alpha
// https://mathworld.wolfram.com/GearCurve.html
// Hyperbolic tan function from
// https://help.tc2000.com/m/69445/l/755460-hyperbolic-functions-table

// To get tradition square spokes use b = 10;  I am using 
// random values of b which is why some of the spokes are rounded

const knobs = [];
const num = 10;
let angle = 0;
const spokes = 8; // number of spokes on the gears
const sc = 30;
let colors = [
  [93,81,121],
  [79,117,155],
  [146,201,177],
  [162, 250, 163]
]
function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  colorMode(RGB);
  for (let i = 0; i < num; i++) {
    knobs.push(
      new Gear(
        width / 2,
        height / 2,
        random(2),
        random(10),
        spokes,
        sc + 10 * i,
        random(colors)
      )
    );
  }
}

function draw() {
  background(97,31,78);
  rotate(angle);
  for (let i = 0; i < knobs.length; i++) {
    knobs[i].oneCurve();
    knobs[i].show(angle);
  }
  angle += 0.5;
}

function mousePressed() {
  save("gear.jpg");
}
