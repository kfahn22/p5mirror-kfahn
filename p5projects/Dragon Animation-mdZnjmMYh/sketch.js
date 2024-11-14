// L-system rules mostly from Paul Bourke
// https://paulbourke.net/fractals/lsys/

let level; // fractal level
let length; // step length
let axiom;
let sentence;
let rules = {};
let fractals = {};
let currentFractal;
let lsystem; // rules data
let lf; // length adjustment factor
let fractal; // rendered fractal

let dragon1;
let dragon2;

// let rule = {"dragon1": {
//     "axiom": "FX",
//     "rules": {
//       "X": "X+YF+",
//       "Y": "-{FZXZ}-Y",
//       "Z": "*",
//       "length_factor": "1"
//     },
//     "angle": "90",
//     "length_factor": "1"
//   }
// }

let sw; // strokeweight
let currentAlpha; // alpha of color
let angle; // angle of rotation

let saveButton; // Save image
let wadj = 0.5; // amount to to translate in x direction
let hadj = 0.5; // amount to to translate in y direction
let shapeScale; //variable to adjust size of shapes

// Shape parameters
let shapeAngle;
let a;
let b;
let m;
let n;
let n1, n2, n3;

// Drop downs to select rule, pattern, and colors
// let colorDropdown;
let shapeDropdown;
// let ruleDropdown;

let data;
let frames = 120;

function keyPressed() {
  if (key == "s") {
    const options = {
      units: "frames",
      delay: 0,
    };
    saveGif("GIF/dragon.gif", frames, options);
  }
}

function preload() {
  data = loadJSON("rules.json");
}

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.position(0, 50);

  currentFractal = "dragon2";
  angle = 0;
  currentAlpha = 200;
  a = 1;
  b = 1;
  m = 4;
  n = 0.5;
  angle = 0;
  shapeScale = 0.2;
  shapeAngle = 0;
  // n1 = 1;
  // n2 = 1;
  // n3 = 1;
  length = 250;
  level = 0;
  sw = 5;
  noFill();
  pickRule(data);
  addShapes();
  pickShape();
}

function draw() {
  background(10, 16, 69);

  pickRule(data);
  addShapes();
  pickShape();
  wadj = 0.5;
  hadj = 0.5;
  adjustPosition();
  push();
  translate(width * wadj, height * hadj);
  rotate(angle);
  for (let i = 0; i < level; i++) {
    generate();
  }
  turtle();
  pop();

  if (a < 3) {
    a += 0.1;
  } else if (int(a) === 3) {
    a = 1;
  }
  if (b < 3) {
    b += 0.1;
  } else if (b === 3) {
    b = 1;
  }
  if (level === 9) {
    noLoop();
  } else if (int(a) === 3) {
    level += 1;
    length = length / sqrt(2);
    sw = map(length, 0, 200, 0.5, 5);
    adjustPosition();
  }
}

function adjustPosition() {
  if (level === 2) {
    wadj = 0.666;
    hadj = 0.333;
  } else if (level === 3) {
    wadj = 0.666;
    hadj = 0.6;
  } else if (level === 4) {
    wadj = 0.6;
    hadj = 0.71;
  } else if (level === 5) {
    wadj = 0.36;
    hadj = 0.71;
  } else if (level === 6) {
    wadj = 0.25;
    hadj = 0.6;
  } else if (level === 7) {
    wadj = 0.3;
    hadj = 0.36;
  } else if (level === 8) {
    wadj = 0.43;
    hadj = 0.33;
  } else if (level === 9) {
    wadj = 0.66;
    hadj = 0.33;
  }
}

function setRule(pattern) {
  axiom = pattern.axiom;
  rules = pattern.rules;
  angle = radians(pattern.angle);
  lf = pattern.length_factor;
  sentence = axiom;
}

function pickRule(data) {
  lsystem = data;

  dragon1 = lsystem.dragon1; // some shapes have fill
  dragon2 = lsystem.dragon2; // unfilled
  

  currentFractal = "dragon1";

  switch (currentFractal) {
    case "dragon1":
      currentFractal = dragon1;
      break;
    case "dragon2":
      currentFractal = dragon2;
      break;
  }
  setRule(currentFractal);
}


function addShapes() {
  shapeDropdown = createSelect();
  shapeDropdown.position(180, 5);
  shapeDropdown.option("cross");
  shapeDropdown.option("eight");
  shapeDropdown.option("gear");
  shapeDropdown.option("quadrilateral");
  shapeDropdown.option("superellipse");
  shapeDropdown.option("supershape");
  // Set initial value of the dropdown
  shapeDropdown.selected("superellipse");
}

function pickShape() {
  let selected = shapeDropdown.value();
  switch (selected) {
   
    case "cross":
      //     // 1 quadrifolium
      //     // gets longer and more rounded as a increases
      selectedShape = new MalteseCross(0, 0, length * shapeScale, a, b);
      selectedShape.addPoints();
      break;
    case "eight":
      selectedShape = new Eight(0, 0, length * shapeScale);
      selectedShape.addPoints();
      break;
    case "gear":
      selectedShape = new Gear(0, 0, length * shapeScale, b, m);
      selectedShape.addPoints();
      break;
    
    // case "quadrilateral":
    //   selectedShape = new Quadrilateral(
    //     0,
    //     0,
    //     length * shapeScale,
    //     m,
    //     shapeAngle
    //   );
    //   selectedShape.addPoints();
    //   break;
   
    case "superellipse":
      selectedShape = new Superellipse(0, 0, length * shapeScale, a, b, n);
      selectedShape.addPoints();
      break;
    case "supershape":
      selectedShape = new Supershape(
        0,
        0,
        length * shapeScale,
        a,
        b,
        n1,
        n2,
        n3,
        m
      );
      selectedShape.addPoints();
      break;
  }
  shapeDropdown.changed(pickShape);
}

// Function to save the canvas as an image when 's' key is pressed
function keyPressed() {
  if (key === "s" || key === "S") {
    save("img.jpg");
  }
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
    let alpha = 150;
    let amt = 0;
    let current = sentence.charAt(i);
    if (current === "F") {
      if (selectedShape) {
        noFill();
        strokeWeight(sw);
        stroke(255, 136, 17, currentAlpha);
        selectedShape.show();
      } else {
        stroke(palette[2]);
        noFill();
        strokeWeight(sw);
        line(0, 0, length, 0);
      }
      translate(length, 0);
    } else if (current === "f") {
      translate(length, 0);
    } else if (current === "+") {
      rotate(angle);
      amt += 0.1
    } else if (current === "-") {
      rotate(-angle);
      amt += 0.2
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    } else if (current == ">") {
      push();
      if (ruleDropdown === "line") {
        length = length * lf;
      } else {
        length = length * lf;
        pickShape();
      }
      pop();
    } else if (current == "<") {
      push();
      if (ruleDropdown === "line") {
        length = length / lf;
      } else {
        length = length / lf;
        pickShape();
      }
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
      let c1 = color(4, 150, 255, alpha);
      let c2 = color(244,208,111, alpha);
      let c = lerpColor(c2, c1, amt);
      fill(c1);
      endShape();
    }
  }
}
