// This sketch is a variation on CC 183 Marbling Challenge by Daniel Shiffman
// https://thecodingtrain.com/challenges/183-mathematical-marbling

//https://editor.p5js.org/codingtrain/sketches/fsw-rJrpr

// You can find more variations at
// https://github.com/kfahn22/marbling

let drops = [];
let theta = 0;
let a = 5;
let b = 30;

// Theta can be incremented by 1 every frameCount or by an additional amount
// Adding in an additional ammount will change the render
// You can experiment with different values ranging from 0, 64;
let inc = 0;

let palette;
function setup() {
  createCanvas(800, 800);

  // yellow and blue
  palette3 = [
    color(30, 150, 252),
    color(162, 214, 249),
    color(252, 243, 0),
    color(255, 198, 0),
  ];
}

let val = 4;

function draw() {
  background(7, 42, 200);
  let v = evolute(45, theta, a, b);
  // for landscrape mode
  //let v = evolute(28, theta, a, b);

  if (frameCount < 320) {
    let total = val / 2;
    for (let n = 0; n < total; n += 10) {
      let r = map(n, 0, total, 10, 2); // 10, 2
      addInk(v.x + width / 2, v.y + height / 2, r, random(palette3));
    }

    val += 0.2;
    theta += 1 + (inc * PI) / 64;
  } else {
    noLoop();
  }

  for (let drop of drops) {
    drop.show();
  }
}

function mousePressed() {
  save("marble.jpg");
}

function addInk(x, y, r, col) {
  let drop = new Drop(x, y, r, col);
  for (let other of drops) {
    other.marble(drop);
  }
  drops.push(drop);
}

// Formula for Hypocyloid Evolute from Wolfram MathWord
// https://mathworld.wolframrprypocycloidEvolute.html

function evolute(sc, theta, a, b) {
  let x =
    sc *
    (a / (a - 2 * b)) *
    ((a - b) * cos(theta) - b * cos(((a - b) / b) * theta));
  let y =
    sc *
    (a / (a - 2 * b)) *
    ((a - b) * sin(theta) - b * sin(((a - b) / b) * theta));
  return createVector(x, y);
}
