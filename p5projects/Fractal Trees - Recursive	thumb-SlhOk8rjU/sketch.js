// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/0jjeOYMjmDU

var angle = 0;
var slider;

const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  createCanvas(800, 450);
  slider = createSlider(0, TWO_PI, PI / 4, 0.01);
}

function draw() {
  let c1 = color(236,1,90);
  let c2 = color(102,211,5);
  
  
  let  col = setGradient(0, 0, 800, 450, c1, c2, Y_AXIS);
 //background(0);
  angle = slider.value();
  stroke(255);
  strokeWeight(4);
  translate(width*0.5, height);
  scale (1.5);
  branch(100);

}

function mousePressed() {
 save('recurse.jpg');
}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 4) {
    push();
    rotate(angle);
    branch(len * 0.67);
    pop();
    push();
    rotate(-angle);
    branch(len * 0.67);
    pop();
  }

  //line(0, 0, 0, -len * 0.67);
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
