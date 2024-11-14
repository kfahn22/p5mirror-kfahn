// L-system dragon rule from Paul Bourke
// https://paulbourke.net/fractals/lsys/

// Basic code from:
// https://natureofcode.com/fractals/
// https://thecodingtrain.com/challenges/16-l-system-fractal-trees

let level = 0; // fractal level
let length = 200; // step length
let axiom;
let sentence;
let fractal; // rendered fractal
let shapeAngle = 0;
let dragon;

let lsystem = {
  dragon: {
    axiom: "FX",
    rules: {
      X: "X+YF+",
      Y: "-FX-Y",
    },
    angle: "90",
  },
};

// Amount to adjust translation
let wadj = 0.5;
let hadj = 0.5;

// Shape parameters
let shapeScale = 0.5;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(206, 54, 153);
  fractal = lsystem.dragon;
  setRule(fractal);
  let s = length * shapeScale;
  selectedShape = new addWord(0, 0, s, radians(shapeAngle));
  adjustPosition();
  push();
  translate(width * wadj, height * hadj);
  rotate(angle);
  for (let i = 0; i < level; i++) {
    generate();
  }
  turtle();
  pop();
  if (level === 9) {
    noLoop();
    push();
    background(206, 54, 153);
    textSize(50);
    textAlign(CENTER, CENTER);
    fill(255);
    text("PAGE NOT FOUND", width / 2, height / 2);
    pop();
  } else if (frameCount % 60 === 1) {
    shapeAngle = 0;
    level += 1;
    length = length / sqrt(2);
    sw = map(length, 0, 200, 0.5, 5);
    adjustPosition();
  }
  shapeAngle += PI / 2;
}

function adjustPosition() {
  if (level === 1) {
    wadj = 0.5;
    hadj = 0.4;
  } else if (level === 2) {
    wadj = 0.56;
    hadj = 0.4;
  } else if (level === 3) {
    wadj = 0.6;
    hadj = 0.55;
  } else if (level === 4) {
    wadj = 0.5;
    hadj = 0.6;
  } else if (level === 5) {
    wadj = 0.45;
    hadj = 0.6;
  } else if (level === 6) {
    wadj = 0.4;
    hadj = 0.55;
  } else if (level === 7) {
    wadj = 0.4;
    hadj = 0.45;
  } else if (level === 8) {
    wadj = 0.45;
    hadj = 0.36;
  } else if (level === 9) {
    wadj = 0.55;
    hadj = 0.4;
  }
}

function setRule(pattern) {
  axiom = pattern.axiom;
  rules = pattern.rules;
  angle = radians(pattern.angle);
  sentence = axiom;
}

function generate() {
  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (let key in rules) {
      if (current === key) {
        found = true;
        nextSentence += rules[key];

        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
}

function turtle() {
  for (let i = 0; i < sentence.length; i++) {
    let amt = 0;
    let current = sentence.charAt(i);
    if (current === "F") {
      fill(255);
      noStroke();
      selectedShape.show();
      translate(length, 0);
    } else if (current === "f") {
      translate(length, 0);
    } else if (current === "+") {
      rotate(angle);
      amt += 0.1;
    } else if (current === "-") {
      rotate(-angle);
      amt += 0.2;
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    } else if (current == ">") {
      push();
      length = length * lf;
      pickShape();
      pop();
    } else if (current == "<") {
      push();
      length = length / lf;
      pickShape();
      pop();
    } else if (current == "(") {
      angle -= radians(0.1);
    } else if (current == ")") {
      angle += radians(0.1);
    } else if (current == "*") {
      alpha -= 50;
    } else if (current == "{") {
      beginShape();
    } else if (current == "}") {
      //noStroke();
      // let c = color(4, 150, 255, alpha);
      // let c1 = color(144, 85, 162, alpha);
      // fill(c1);
      endShape();
    }
  }
}

// function mousePressed() {
//   save("dragon_img.jpg");
// }
