// L-system dragon rule from Paul Bourke
// https://paulbourke.net/fractals/lsys/
// https://thecodingtrain.com/challenges/16-l-system-fractal-trees

let level = 6; // fractal level
let length = 40; // step length
let axiom;
let sentence;
let currentFractal;
let fractal; // rendered fractal
let shapeAngle = 0;
let amt;

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

let sw = 5; // strokeweight
let currentAlpha = 255; // alpha of color
// Amount to adjust translation
let wadj = 0.33;
let hadj = 0.6;

// Shape parameters
let shapeScale = 0.6; 

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(206,54,153);
  fractal = lsystem.dragon;
  setRule(fractal);
  selectedShape = new addWord(0, 0, length * shapeScale, radians(shapeAngle));
  push();
  translate(width * wadj, height * hadj);
  rotate(angle);
  for (let i = 0; i < level; i++) {
    generate();
  }
  turtle();
  pop();
}

function setRule(pattern) {
  axiom = pattern.axiom;
  rules = pattern.rules;
  angle = radians(pattern.angle);
  lf = pattern.length_factor;
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
      noStroke();
      let c = color(4, 150, 255, alpha);
      let c1 = color(144, 85, 162, alpha);
      fill(c1);
      endShape();
    }
  }
}

function mousePressed() {
  save("dragon_img.jpg");
}
