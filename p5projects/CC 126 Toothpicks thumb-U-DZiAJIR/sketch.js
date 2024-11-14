// Toothpicks
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/126-toothpicks.html
// https://youtu.be/-OL_sw2MiYw

let picks = [];

let len = 63;

let minX;
let maxX;

const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  createCanvas(800, 450);
  minX = -width / 2;
  maxX = width / 2;
  picks.push(new Toothpick(0, 0, 1));
}

function mousePressed() {
 save('toothpick.jpg');
}

function draw() {
  //background('#66D334');
  let c2 = color('#A42963');
  let c1 = color('#70327E');
  //background(160,223,247);
  let  col2 = setGradientL(0, 0, 400, 450, c2, c1, X_AXIS);
  let  col3 = setGradientR(400, 0, 750, 450, c1, c2, X_AXIS);
  //background(col);
  translate(width / 2, height / 2);
  //let factor = float(width) / (maxX - minX);
  let factor = 1;
  //scale(factor);
  for (let t of picks) {
    t.show(factor);
    minX = min(t.ax, -375);
    maxX = max(t.ax, 375);
    // minX = min(t.ax, minX);
    // maxX = max(t.ax, maxX);
  }

  let next = [];
  for (let t of picks) {
    if (t.newPick) {
      let nextA = t.createA(picks);
      let nextB = t.createB(picks);
      if (nextA != null) {
        next.push(nextA);
      }
      if (nextB != null) {
        next.push(nextB);
      }
      t.newPick = false;
    }
  }

  picks = picks.concat(next);
  if (frameCount > 12) {
    noLoop(); 
  }
}

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
      let inter = map(i, x, x + w, 0.0, 1);
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
      let inter = map(i, x, x + w, 0,1.75);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

