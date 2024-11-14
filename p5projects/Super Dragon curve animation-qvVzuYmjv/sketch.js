// L-system dragon rule from Paul Bourke
// https://paulbourke.net/fractals/lsys/

// Basic code from:
// https://natureofcode.com/fractals/
// https://thecodingtrain.com/challenges/16-l-system-fractal-trees

// You can find additional information about code at https://github.com/kfahn22/L-System-Pattern-Generator

let level = 0; // fractal level
let length = 250; // step length
let axiom;
let sentence;
let fractal;
let shapeAngle = 0;
let amt;
let palette;
let dragon;

// supershape parameters
let a = 1;
let b = 0.5;
let m = 6;
let n1 = 0.75;
let n2 = 0.75;
let n3 = 0.75;

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
// Amount to adjust translation
let wadj = 0.5;
let hadj = 0.5;

// Shape parameters
let shapeScale = 0.5; //0.2;

url = "https://supercolorpalette.com/?scp=G0-hsl-FFDA1F-FFB41F-1F57FF-1F7CFF"

function setup() {
  createCanvas(800, 600);

  palette = createPaletteFromURL(url);

  //amt = PI / 4;
}

function draw() {
  background(0);
  fractal = lsystem.dragon;
  setRule(fractal);
  selectedShape = new Supershape(
    0,
    0,
    length * shapeScale,
    a,
    b,
    n1,
    n2,
    n3,
    m,
    radians(shapeAngle)
  );
  selectedShape.addPoints();
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
    //noLoop() // use to determine centering of dragon
    // Reset animation
    level = 0;
    length = 250;
    wadj = 0.5;
    hadj = 0.5;
    sw = 5;
    shapeAngle = 0;
    // int(PI / 4)
  } else if (frameCount % 60 === 1) {
    shapeAngle = 0;
    level += 1;
    length = length / sqrt(2);
    sw = map(length, 0, 200, 0.5, 5);
    adjustPosition();
  }
  shapeAngle += PI/2;
  // shapeAngle += PI / 4;
}

function adjustPosition() {
  if (level === 1) {
    wadj = 0.6;
    hadj = 0.33;
  } else if (level === 2) {
    wadj = 0.66;
    hadj = 0.4;
  } else if (level === 3) {
    wadj = 0.6;
    hadj = 0.6;
  } else if (level === 4) {
    wadj = 0.56;
    hadj = 0.66;
  } else if (level === 5) {
    wadj = 0.4;
    hadj = 0.66;
  } else if (level === 6) {
    wadj = 0.36;
    hadj = 0.55;
  } else if (level === 7) {
    wadj = 0.4;
    hadj = 0.4;
  } else if (level === 8) {
    wadj = 0.43;
    hadj = 0.33;
  } else if (level === 9) {
    wadj = 0.56;
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
      strokeWeight(sw);
      let c = palette[2];
      //c[3] = 255;
      stroke(c);
      noFill();
      // fill(c);
      // noStroke();
      selectedShape.show();

      translate(length, 0);
    } else if (current === "f") {
      translate(length, 0);
    } else if (current === "+") {
      strokeWeight(sw);
      let c = palette[1];
      //c[3] = 255;
      noFill();
      stroke(c);
      // fill(c);
      // noStroke();
      rotate(angle);
      selectedShape.show();
      amt += 0.1;
    } else if (current === "-") {
      let c = palette[0];
      //c[3] = 255;
      noFill();
      stroke(c);
      // fill(c);
      // noStroke();
      rotate(-angle);
      selectedShape.show();
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
      // noStroke();
      // let c = color(4, 150, 255, alpha);
      // let c1 = color(144, 85, 162, alpha);
      // fill(c1);
      endShape();
    }
  }
}

// Helper functions to convert the url string to the palette array from chatGPT
function createPaletteFromURL(url) {
  // Extract the color codes from the URL using a regular expression
  let regex = /[0-9A-F]{6}/gi;
  let matches = url.match(regex);

  // Convert HEX codes to RGB and create the palette array
  let palette = matches.map((hex) => hexToRgb(hex));

  return palette;
}

// Helper function to convert HEX to RGB
function hexToRgb(hex) {
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);
  let a = 255;
  return [r, g, b, a];
}

function mousePressed() {
  save("dragon_img.jpg");
}
