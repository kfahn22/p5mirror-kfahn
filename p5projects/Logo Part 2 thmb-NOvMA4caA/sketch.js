// Logo Part 2
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/121.2-logo-interpreter.html
// https://youtu.be/i-k04yzfMpw

let editor;
let turtle;

const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  createCanvas(800, 450);
  
  angleMode(DEGREES);
  background(0);
  scale(2.5);
  turtle = new Turtle(160, 96, 0);
  editor = select("#code");
  editor.input(goTurtle);
  goTurtle();
}

function execute(commands) {
  for (let command of commands) {
    let name = command.name;
    let arg = command.arg;
    if (name === "repeat") {
      for (let i = 0; i < arg; i++) {
        execute(command.commands);
      }
    } else {
      commandLookUp[name](arg);
    }
  }
}

function goTurtle() {
  let c3 = color('#0B6A88');
  let c4 = color('#EC015A');
  let  col2 = setGradientL(0, 0, 400, 450, c3, c4, X_AXIS);
  let  col3 = setGradientR(400, 0, 750, 450, c4, c3, X_AXIS);
  push();
  turtle.reset();
  let code = editor.value();
  let parser = new Parser(code);
  let commands = parser.parse();
  console.log(commands);
  execute(commands);
  pop();
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
      let inter = map(i, x, x + w, 0,1);
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

function mousePressed() {
 save('cartiod.jpg');
}
