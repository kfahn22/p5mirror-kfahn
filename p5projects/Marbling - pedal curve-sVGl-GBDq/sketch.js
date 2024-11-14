// This sketch is a variation on CC 183 Marbling Challenge by Daniel Shiffman
// https://thecodingtrain.com/challenges/183-mathematical-marbling
// https://editor.p5js.org/codingtrain/sketches/fsw-rJrpr

// You can find more variations at https://github.com/kfahn22/marbling

let palette;
let drops = [];
let theta = 0;
let val = 4;

// Theta can be incremented by 1 every frameCount or by an additional amount
// Adding in an additional ammount will change the render
// You can experiment with different values ranging from 0, 1/64;
let inc = 1 / 32;

function setup() {
  createCanvas(640, 640);
  //createCanvas(800, 400);
  blue_palette = [
    color(64, 31, 62),
    color(63, 46, 86),
    color(69, 63, 120),
    color(117, 154, 171),
  ];
  
  pink_palette = [
     color(255,240,243),
    color(255,204,213),
    color(255,179,193),
    color(255,143,163),
    color(255, 117, 143),
    color(255,77,109),
    color(201,24,74),
    color(164,19,60),
    color(128,15,47),
  ];
}

function draw() {
  //background(250, 242, 161); // lt yellow (blue_palette)
  background(135,188,222) // lt blue ()
  let v = pedal(45, 7, theta);
  // for landscape mode
  //let v = pedal(27, 7, theta);

  // You can achieve different renders  by adjusting the mapping
  if (frameCount < 480) {
    let total = val / 2;
    for (let n = 0; n < total; n += 25) {
      let r = map(n, 0, total, 9, 2); //5,2 landscape
      addInk(v.x + width / 2, v.y + height / 2, r, random(pink_palette));
       addInk(v.x + width / 2, v.y + height / 2, r, random(palette));
    }

    val += 0.2;
    theta += 1 + inc * PI;
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

//mathworld.wolfram.com/HypocycloidPedalCurve.html

function hypocycloid(sc, n, theta) {
  let x = (sc / n) * ((n - 1) * cos(theta) + cos((n - 1) * theta));
  let y = (sc / n) * ((n - 1) * sin(theta) + sin((n - 1) * theta));
  return createVector(x, y);
}

function pedal(sc, n, theta) {
  let r = (n - 2) * sin((n / (n - 2)) * (theta + 0.5 * PI));
  let x = sc * r * cos(theta);
  let y = sc * r * sin(theta);
  return createVector(x, y);
}
