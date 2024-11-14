// Base code from Daniel Shiffman's coding challenge // https://thecodingtrain.com/challenges/16-l-system-fractal-trees

// Formula for cross by Paul Bourke
// https://paulbourke.net/fractals/lsys/

// I have included the parameters for  different spirals, but I like the Lituus spiral best.

// I have not found a way to optimize the translation of the fractal and have hard coded the values to get the cross centered with the chosen length and level.

let axiom = "F+F+F+F";

let sentence = axiom;
let rules = [];
let length = 20; // 20
let angle;
let level = 4; // 4
let c;
let maxSpirals;
let a, n, r;
let dir = 1;
// Amount to translate for square aspect ratio
let tr = 0.19;

// Archimedes Spiral
// a = 0.1;
// n = 1;
// r = length * 0.4;

// Fermat Spiral
// a = 0.2;
// n = 0.5;
// r = length * 0.66;

//Lituus Spiral
n = -0.5;
r = length;
a = 0.5;
dir = -1;

// Hyperbolic Spiral
// n = -1;
// a = 0.2;
// r = length*0.75;
// dir = -1

function setup() {
  //createCanvas(1280, 720);
  createCanvas(800, 800);
  c = new Spiral(0, 0, r, dir, a, n, (PI * 10) / 8);
  c.calculatePoints();
  angle = PI / 2;
  
  // Cross
  rules[0] = {
    a: "F",
    b: "F+F-F+F+F",
  };

  for (let i = 0; i < level; i++) {
    // Increase the number of iterations for more complexity
    generate();
  }
  // console.log(sentence);
}

function draw() {
  background(30,50,49);
  // For landscape mode and length = 19
  //translate(width * 0.33, height * 0.19);
  // For square aspect ratio
  translate(width * tr, height * tr);
  let rl = sentence.length % 2;
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);

    if (current === "F") {
      c.show(i%5, rl);
      translate(length, 0);
    } else if (current === "+") {
      rotate(angle);
    } else if (current === "-") {
      rotate(-angle);
    }
  }
  noLoop();
}

function generate() {
  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (let j = 0; j < rules.length; j++) {
      if (current === rules[j].a) {
        nextSentence += rules[j].b;
        found = true;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
}

function mousePressed() {
  save("lituus.jpg");
}
