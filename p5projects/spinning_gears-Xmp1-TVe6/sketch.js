// Franks Laboratory Learn Creative Coding Fractals

let angle = 0;
const maxLevel = 4;
const branches = 2;
let gear;

let sides = 7; // 8
let r = 50;
let sc = 0.66;

let frames = 120;

function keyPressed() {
  if (key == "s") {
    const options = {
      units: "frames",
      delay: 0,
    };
    saveGif("GIF/fractalgear.gif", frames, options);
  }
}

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  colorMode(HSL, 360, 100, 100, 100);
  // Add a shadow
  shadowColor = color(248, 31, 23, 70);
  shadowOffsetX = 5;
  shadowOffsetY = 5;
  shadowBlur = 10;
  //Apply the shadow
  shadow(shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor);
}

function draw() {
  background(358, 89, 7);

  translate(width * 0.5, height * 0.5);
  rotate(angle);
  let c = color(166, 45, 64, 100);

  gear = new Gear(0, 0, 1, 10, 51);
  gear.oneCurve();
  gear.show(c);
  push();
  translate(-width * 0.5, -height * 0.5);
  drawFractal(1);
  pop();
  angle += 360 / frames;
}

function branch(level) {
  if (level > maxLevel) return;
  let a = level / maxLevel;
  let from = color(229, 83, 60, 200 - a);
  let to = color(166, 45, 64, 200 - a);
  let col = lerpColor(from, to, a);
  for (let i = 1; i < branches; i++) {
    push();
    translate(r + (r / branches) * (i + 1), 0);
    scale(sc, sc);
    gear.show(col);
    push();
    rotate(angle);
    branch(level + 1);
    pop();

    pop();
  }
}
function drawFractal() {
  push();
  translate(width / 2, height / 2);
  for (let i = 0; i < sides; i++) {
    rotate(360 / sides);
    branch(0);
  }
  pop();
}

function mousePressed() {
  save("fractal.jpg");
}
