//.This sketch is a variation of CC 183 Marbling Challenge by Daniel Shiffman
// https://thecodingtrain.com/challenges/183-mathematical-marbling

// You can find more variations at https://github.com/kfahn22/marbling
let drops = [];
let theta = 0;
let a = 5;
let b = 10;
let h = 20;

let palette;
function setup() {
  createCanvas(600, 600);
  //createCanvas(800, 400);
  palette = [
    color(24, 49, 79),
    color(56, 78, 119),
    color(230, 249, 175),
    color(13, 6, 48),
    //color(255, 255, 255)
  ];
}

//let start;
let val = 4;

function draw() {
  background(139, 190, 178);

  let v = swirl(24, theta, 5, 10, 20);
  // landscape
 //let v = swirl(16, theta, 5, 10, 20);

  if (frameCount < 270) {
    let total = val / 2;
    for (let n = 0; n < total; n += 14) {
      let r = map(n, 0, total, 12, 4); // 9, 4, landscape
      addInk(v.x + width * 0.47, v.y + height / 2, r, random(palette));
    }

    val += 0.2;
    theta += 1;
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

// Swirl
// I got this equation for the Epitrochoid Evolute from Walfram Mathworld
// https://mathworld.wolfram.com/EpitrochoidEvolute.html
// I don't think it is implmented correctly, but I think I still looks cool.  Happy Accident!

function swirl(sc, theta, a, b, h) {
  let c1 = h - b * cos((a / b) * theta);
  let c2 = b - h * cos((a / b) * theta);
  let denominator =
    pow(b, 3) +
    (a + b) * pow(h, 2) -
    b * (a + 2 * b) * h * cos((a / b) * theta);
  let x =
    (sc *
      (a * h * (a + b) * c1 * cos(theta) +
        b * c2 * cos(((a + b) / b) * theta))) /
    denominator;

  let y =
    (sc *
      (a * h * (a + b) * c1 * sin(theta) +
        b * c2 * sin(((a + b) / b) * theta))) /
    denominator;
  return createVector(x, y);
}