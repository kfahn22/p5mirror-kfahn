// Daniel Shiffman
// Mathematical Roses
// Video: https://youtu.be/f5QBExMNB1I
// Based on: https://en.wikipedia.org/wiki/Rose_(mathematics)
// https://thecodingtrain.com/CodingChallenges/055-roses.html

var d = 8;
var n = 5;
var sliderD;
var sliderN;
let w = 450;

function setup() {
  createCanvas(800, 450);
  sliderD = createSlider(1, 20, 10, 1);
  sliderN = createSlider(1, 20, 10, 1);
  sliderD.input(draw);
  sliderN.input(draw);
}

function draw() {
  d = sliderD.value();
  n = sliderN.value();
  var k = n / d;
  background(240,99,164);
  push();
  translate(400, height / 2);

  beginShape();
  stroke(255);
  noFill();
  strokeWeight(6);
  for (var a = 0; a < TWO_PI * reduceDenominator(n, d); a += 0.02) {
    var r = 200 * cos(k * a);
    var x = r * cos(a);
    var y = r * sin(a);
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