let angle = 0;

const maxLevel = 4;
const branches = 2;
const sides = 7; // 8
const r = 50;
const sc = 0.66;

let gear;
let frames = 90;

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
  shadowColor = color(0, 0, 0, 70);
  shadowOffsetX = 10;
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
  //let a = int((255 * level) / maxLevel);
  let from = color(229, 83, 60, 200 - a);
  let to = color(166, 45, 64, 200 - a);
  // let from = color(188, 65, 72, 200 - a);
  // let to = color(311, 44, 33, 200 - a);
  let col = lerpColor(from, to, a);
  //stroke(col);
  for (let i = 1; i < branches; i++) {
    push();
    translate(r + (r / branches) * (i + 1), 0);
    scale(sc, sc);
    gear.show(col);
    push();
    rotate(angle);
    branch(level + 1);
    pop();

    push();
    rotate(-angle);
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
