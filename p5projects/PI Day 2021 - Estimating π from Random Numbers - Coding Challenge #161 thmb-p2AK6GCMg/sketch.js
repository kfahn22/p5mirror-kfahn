// Estimating π (from Random Numbers)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/161-pi-from-random.html
// https://youtu.be/

// from Random Numbers: https://editor.p5js.org/codingtrain/sketches/FiOG6uajS
// from Digits of π: https://editor.p5js.org/codingtrain/sketches/x0eikODKm

let data;
let coprimeCount = 0;
let total = 0;
let index = 0;
let randomSequence = [];

const Y_AXIS = 1;
const X_AXIS = 2;

function preload() {
  data = loadStrings('milliondigits.txt');
}


function mousePressed() {
 save('pi_random.jpg');
}


function setup() {
  createCanvas(800, 450);
  let digits = data[0];
  while (digits.length > 0) {
    let num = digits.slice(0, 5);
    digits = digits.slice(5);
    randomSequence.push(parseInt(num));
  }
}

function draw() {
  for (let n = 0; n < 500; n++) {
    let a = randomSequence[index] + 1;
    let b = randomSequence[index + 1] + 1;
    // console.log(a,b);
    if (gcd(a, b) == 1) {
      coprimeCount++;
    }
    total++;
    index += 2;
    if (index == randomSequence.length) {
      noLoop();
      console.log('complete');
      break;
    }
  }

  let pie = sqrt((6 * total) / coprimeCount);
   let c1 = color(45,197,244);
  let c2 = color(252,238,33);
 
  let  col = setGradient(0, 0, 800, 450, c1, c2, Y_AXIS);
  
 // background(248,158,79);
  textAlign(CENTER, CENTER);
  textSize(150);
  fill(0);
  textFont('Courier');
  text(nf(pie, 1, 5), width / 2, height / 2);

  let w = (width * index) / randomSequence.length;
  //stroke(255);
  fill(252,238,33);
  //noFill();
  rect(0, 20, width, 40);
  fill(0);
  rect(0, 20, w, 40);
}

function gcd(a, b) {
  if (b > a) {
    [b, a] = [a, b];
  }

  let r = a % b;
  if (r == 0) {
    return b;
  } else {
    return gcd(b, r);
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