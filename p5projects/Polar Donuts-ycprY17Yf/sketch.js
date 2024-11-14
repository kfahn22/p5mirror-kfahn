// Mathematical Roses
// The Coding Train / Daniel Shiffman 
// https://thecodingtrain.com/challenges/55-mathematical-rose-patterns
// Video: https://youtu.be/f5QBExMNB1I
// Code from challenge:  https://editor.p5js.org/codingtrain/sketches/3kanFIcHd
// Based on: https://en.wikipedia.org/wiki/Rose_(mathematics)

// My version: https://editor.p5js.org/kfahn/sketches/ycprY17Yf
// https://github.com/kfahn22/torus_knots

let d = 2;
let n = 7;
let c;
let sliderD;
let sliderN;
let sliderC;

function setup() {
  createCanvas(600, 600);
  //createCanvas(800, 400);
  divD = createDiv().position(10, 620);
  labelD = createP('d').parent(divD);
  sliderD = createSlider(1, 20, 2, 1).parent(divD); //9 
  divN = createDiv().position(225, 620);
  labelN = createP('n').parent(divN);
  sliderN = createSlider(1, 20, 7, 1).parent(divN); //8
  divC = createDiv().position(440, 620);
  labelC = createP('c').parent(divC);
  sliderC = createSlider(1, 5, 1.25, 0.1).parent(divC); // 3
  sliderD.input(draw);
  sliderN.input(draw);
  sliderC.input(draw);
}

function draw() {
  d = sliderD.value();
  n = sliderN.value();
  c = sliderC.value();
  let k = n / d;
  background('#66D334');
  push();
  translate(width / 2, height / 2);

  beginShape();
  stroke(255);
  stroke('#A42963');
  strokeWeight(4);
  noFill();
  for (var a = 0; a < TWO_PI * reduceDenominator(n, d); a += 0.02) {
    let r = 70 * (c + cos(k * a));
    let x = r * cos(a);
    let y = r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
  noLoop();
}

function reduceDenominator(numerator, denominator) {
    function rec(a, b) {
        return b ? rec(b, a % b) : a;
    }
    return denominator / rec(numerator, denominator);
}

// function mousePressed() {
//   save('polar_rose.jpg');
// }