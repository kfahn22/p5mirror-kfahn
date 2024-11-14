// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/ksRoh-10lak

var slider;

// var n1 = 0.1;
// var n2 = 1.7;
// var n3 = 1.7;
// var n1 = 40;
// var n2 = 35;
// var n3 = 10;
var n1 = 0.3;
var n2 = 0.3;
var n3 = 0.3;
var m = 5;
var a = 1;
var b = 1;
//var m = 8;

var osc = 0;

const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  createCanvas(800, 450);
  slider = createSlider(0, 10, 5, 1);
}

function supershape(theta) {

  var part1 = (1 / a) * cos(theta * m / 4);
  part1 = abs(part1);
  part1 = pow(part1, n2);

  var part2 = (1 / b) * sin(theta * m / 4);
  part2 = abs(part2);
  part2 = pow(part2, n3);

  var part3 = pow(part1 + part2, 1 / n1);

  if (part3 === 0) {
    return 0;
  }

  return (1 / part3);
}

mousePressed = () => {
  save('superShape.jpg');
}

function draw() {
  let c1 = color(146,83,161);
  let c2 = color(102, 211, 52);
  setGradient(0, 0, 400, 450, c1, c2, X_AXIS);
  setGradient(400, 0, 800, 450, c2, c1, X_AXIS);
  m = map(cos(osc), -1, 1, 5, 6); //slider.value();
  // m = slider.value(); 
  osc += 0.002;

  //background(102, 211, 52);
  translate(width / 2, height / 2);

  stroke(146,83,161);
  strokeWeight(10);
  noFill();

  //radious scales the shape
  var radius = 250;

  var total = 200;
  var increment = TWO_PI / total;

  beginShape();
  for (var angle = 0; angle < TWO_PI; angle += increment) {
    var r = supershape(angle);
    var x = radius * r * cos(angle);
    var y = radius * r * sin(angle);

    vertex(x, y);
  }
  endShape(CLOSE);


}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0.0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0,1.75);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function setGradientR(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0.0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0,1.75);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
