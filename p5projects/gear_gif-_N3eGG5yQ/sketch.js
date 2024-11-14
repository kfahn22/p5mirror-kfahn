// Watch Daniel Shiffman's short to see how to create a perfect gif loop in p5.js https://www.youtube.com/shorts/CEnfKhs6wLg
// Watch  https://thecodingtrain.com/challenges/135-making-a-gif-loop-in-processing to learn more about GIF loops

// Base polar coordinate code https://thecodingtrain.com/challenges/134-heart-curve
// Code to implement grid from https://thecodingtrain.com/challenges/116-lissajous-curve-table
// Gear curve equation from Wolfram Alpha
// https://mathworld.wolfram.com/GearCurve.html

// Your can obtain different GIFS by adjusting b, m, and which function you use to calcualte r in the gear.js file

// You can find more gear curve sketches includig 3D versions @ https://github.com/kfahn22/gears

let gcurve = [];
// a, b are parameters to the function to calculate radius
const a = 1;
const b = 10;
let sc = 50; // scale
const m = 4; // number of spokes
const w = 50;
let cols;
let rows;
let inc = -1;
let frames = 120;

// for backgroundgradient
const Y_AXIS = 1;
const X_AXIS = 2;

function keyPressed() {
  if (key == "s") {
    const options = {
      units: "frames",
      delay: 0,
    };
    saveGif("GIF/tiling.gif", frames, options);
  }
}

function setup() {
  createCanvas(500, 500);
  cols = floor(width / w) - 1;
  rows = floor(height / w) - 1;
  angleMode(DEGREES);
}

function draw() {
  background(87, 31, 78);
  let c1 = color(146, 201, 177);
  let c2 = color(87, 31, 78);
  let col = color(146, 201, 177);

  // setGradientL(0, 0, 500, 500, c1, c2, X_AXIS);
  // setGradientR(500, 0, 500, 500, c2, c1, X_AXIS);

  let w = width / 5;

  for (let i = 0; i < 1; i++) {
    gcurve.push(new Gear(width / 2, height / 2, a, b, sc, col, 8));
  }

  noFill();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // let cx = -w + i * w;
      // let cy = -w + j * w;
      let cx = w*(i - 1);
      let cy = w*(j - 1);
      for (let i = 0; i < gcurve.length; i++) {
        push();
        translate(cx, cy);
        gcurve[i].oneCurve();
        gcurve[i].show();
        pop();
      }
    }
  }
  inc += 360 / frames;
  sc = map(sin(inc), -1, 1, 50, 150);
  gcurve = [];
}

function hyperbolicTan(theta) {
  let e = 2.71828;
  let l = pow(e, 2 * theta);
  return (l - 1) / (l + 1);
}

// function mousePressed() {
//   save("grid.jpg");
// }

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
      let inter = map(i, x, x + w, 0, 1);
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
      let inter = map(i, x, x + w, 0, 1.75);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
