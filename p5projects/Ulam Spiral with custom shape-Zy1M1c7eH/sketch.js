// The Prime Spiral (aka Ulam Spiral)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/167-prime-spiral.html
// https://youtu.be/a35KWEjRvc0

// Prime Spiral: https://editor.p5js.org/codingtrain/sketches/0Ud-XsaYb
// Number Spiral: https://editor.p5js.org/codingtrain/sketches/Zs65bV-Al
// Prime vs Random Spiral: https://editor.p5js.org/codingtrain/sketches/3np1hBlXD
// Shapes and Color: https://editor.p5js.org/codingtrain/sketches/mCvvSKpZ5
// Prime Spiral 3D: https://editor.p5js.org/codingtrain/sketches/-eX078HZ5

// Adding a custom shape for Ulam primes

let x, y;
let px, py;
let step = 1;
let stepSize = 20;
let numSteps = 1;
let state = 0;
let turnCounter = 1;
let totalSteps;
let shapeRotate;

function isPrime(value) {
  if (value == 1) return false;
  for (let i = 2; i <= sqrt(value); i++) {
    if (value % i == 0) {
      return false;
    }
  }
  return true;
}

function setup() {
  createCanvas(500, 500);

  const cols = width / stepSize;
  const rows = height / stepSize;
  totalSteps = cols * rows;

  x = width / 2;
  y = height / 2;
  px = x;
  py = y;
  background(65,34,52);
}

function draw() {
  angleMode(DEGREES);
  // textSize(stepSize);
  // textAlign(CENTER, CENTER);
  //text(step, x, y);
  noStroke();

  
  if (isPrime(step)) {
     fill(206,161,203);
    cross(step);
  }

  px = x;
  py = y;

  switch (state) {
    case 0:
      x += stepSize;
      break;
    case 1:
      y -= stepSize;
      break;
    case 2:
      x -= stepSize;
      break;
    case 3:
      y += stepSize;
      break;
  }

  if (step % numSteps == 0) {
    state = (state + 1) % 4;
    turnCounter++;
    if (turnCounter % 2 == 0) {
      numSteps++;
    }
  }
  step++;

  if (step > totalSteps) {
    noLoop();
   // saveCanvas("ulam_diagonal.png");
  }
}

  
function cross(step) {
    let r = stepSize * 0.5;
    push();
    translate(x, y);
    beginShape();
    vertex(-r, -r); //1
    vertex(-0.5*r, -r);
    vertex(0, -0.5*r); //3
    vertex(0.5*r, -r);
    vertex(r, -r); //5
    vertex(r, -0.5*r);
    vertex(0.5*r, 0); //7
     vertex(r, 0.5*r);
     vertex(r, r); //9
     vertex(0.5*r, r);
     vertex(0, 0.5*r); //11
    vertex(-0.5*r, r);
    vertex(-r, r);  //13
    vertex(-r, 0.5*r);
    vertex(-0.5*r, 0); //15
    vertex(-r, -0.5*r);
    vertex(-r,-r);
    endShape(CLOSE);
    pop();
}