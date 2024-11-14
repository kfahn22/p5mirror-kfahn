// L-system dragon rule from Paul Bourke
// https://paulbourke.net/fractals/lsys/

// Basic code from:
// https://natureofcode.com/fractals/
// https://thecodingtrain.com/challenges/16-l-system-fractal-trees

// You can find additional information about code at https://github.com/kfahn22/L-System-Pattern-Generator

let level = 0; // fractal level
let length = 175; // step length
let axiom;
let sentence;
let fractal;
let shapeAngle = 0;
let palette;

// Maltese cross parameters (see cross.js)
let a = 2;
let b = 2.5;

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
let wadj = 0.5;
let hadj = 0.5;

// Shape parameters
let shapeScale = 0.45; 

// purples
// let url =
//   "https://supercolorpalette.com/?scp=G0-hsl-F41FFF-E11FFF-CE1FFF-BC1FFF-A91FFF-961FFF-841FFF-711FFF";

// blue-yellow
let url =
  "https://supercolorpalette.com/?scp=G0-hsl-FFDA1F-FFC71F-FFB41F-FFA21F-1F44FF-1F57FF-1F69FF-1F7CFF";

function setup() {
  createCanvas(640, 360);
  
  // Using a helper function to convert the url from supercolorpalette.com to a array of colors
  palette = createPaletteFromURL(url);
}

function draw() {
  background(0);
  let s = length * shapeScale;
  fractal = lsystem.dragon;
  setRule(fractal);
  selectedShape = new MalteseCross(0, 0, s, a, b, radians(shapeAngle));
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
    // Reset animation
    level = 0;
    length = 175;
    wadj = 0.5;
    hadj = 0.5;
    sw = 5;
    shapeAngle = 0;
  } else if (frameCount % 108 === 0) {
    shapeAngle = 0;
    level += 1;
    length = length / sqrt(2);
    sw = map(length, 0, 200, 0.5, 5);
    adjustPosition();
  }
  shapeAngle += PI / 4;
}

// Adjust the starting position of the dragon curve depending on the level
function adjustPosition() {
  if (level === 1) {
    wadj = 0.6;
    hadj = 0.36;
  } else if (level === 2) {
    wadj = 0.66;
    hadj = 0.4;
  } else if (level === 3) {
    wadj = 0.6;
    hadj = 0.56;
  } else if (level === 4) {
    wadj = 0.53;
    hadj = 0.63;
  } else if (level === 5) {
    wadj = 0.4;
    hadj = 0.66;
  } else if (level === 6) {
    wadj = 0.36;
    hadj = 0.56;
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
      if (level < 10) {
        noFill();
        strokeWeight(sw);
        let c = palette[7];
        c[3] = 200;
        stroke(c);
        selectedShape.show();
      }
      translate(length, 0);
    } else if (current === "f") {
      translate(length, 0);
    } else if (current === "+") {
      noFill();
      strokeWeight(sw);
      let c = palette[5];
      c[3] = 200;
      stroke(c);
      selectedShape.show();
      rotate(angle);
      amt += 0.1;
    } else if (current === "-") {
      noFill();
      strokeWeight(sw);
      let c = palette[3];
      c[3] = 200;
      stroke(c);
      selectedShape.show();
      rotate(-angle);
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
