// Coding Challenge 128: SketchRNN Snowflakes
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/128-sketchrnn-snowflakes.html
// https://youtu.be/pdaNttb7Mr8

let model;
let strokePath = null;

let x, y, k;
let pen = "down";

const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  createCanvas(800, 450);
   
   let c1 = color(0);
  let c2 = color(112,50,126);

  let  col = setGradient(0, 0, 800, 450, c1, c2, Y_AXIS);
  x = random(-width / 2, width / 2);
  y = random(-height / 2, height / 2);
  model = ml5.sketchRNN("snowflake", modelReady);
  //background(11, 106, 136);
}

function modelReady() {
  console.log("model ready");
  model.reset();
  model.generate(gotSketch);
}

function draw() {
  translate(width / 2, height / 2);
  if (strokePath != null) {
    let sc = map(k, 0, 255, 0.075, 0.175);
    let newX = x + strokePath.dx * sc;
    let newY = y + strokePath.dy * sc;
    if (pen == "down") {
      stroke(255, k);
      strokeWeight(4);
      line(x, y, newX, newY);
    }
    pen = strokePath.pen;
    strokePath = null;
    x = newX;
    y = newY;

    if (pen !== "end") {
      model.generate(gotSketch);
    } else {
      console.log("drawing complete");
      model.reset();
      model.generate(gotSketch);
      x = random(-width / 2, width / 2);
      y = random(-height / 2, height / 2);
      k = int(random(255));
    }
  }
}


function mousePressed() {
 save('snowflake.jpg');
}

function gotSketch(error, s) {
  if (error) {
    console.error(error);
  } else {
    strokePath = s;
    //console.log(strokePath);
  }
}


function setGradient(x, y, w, h, c1, c2, axis) {
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

