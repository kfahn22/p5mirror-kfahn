// 3D Knot
// Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/87-3d-knots
// https://youtu.be/r6YMKr1X0VA
// Javascript transcription: Chuck England

// Code from challenge: https://editor.p5js.org/codingtrain/sketches/fa1rAWng9

let angle = 0;

let vectors = [];
let j = 1.2;
let k = 1.6;
let l = 36;
let m = 0.4;
let n = 6;
let o = 0.05;
let sc;

let beta = 0;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
    background(0,50,73);
    rotateY(angle);
    angle += 0.03;
    sc = 0.1*windowHeight;
    let r = sc * (j + k * sin(l * beta));
    let theta = 2 * beta;
    let phi = m * PI * sin(n * beta);
    let x = r * cos(phi) * cos(theta);
    let y = r * cos(phi) * sin(theta);
    let z = r * sin(phi);
    stroke(255, r, 255);

    vectors.push(createVector(x, y, z));

    beta += o;

    noFill();
    strokeWeight(3);
    push();
    scale(0.6);
    beginShape();
    for (let i = 0; i < vectors.length; i++) {
        let v = vectors[i];
        stroke(204,219,220);
        vertex(v.x, v.y, v.z);
    }
    endShape();
    pop();
  push();
  rotate(PI/2);
  scale(1.2);
  beginShape();
  for (let i = 0; i < vectors.length; i++) {
     let v = vectors[i];
      stroke(128,206,215);
      vertex(v.x, v.y, v.z);
  }
  endShape();
  pop();
  //i += 1;
}
