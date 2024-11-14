const Y_AXIS = 1;
const X_AXIS = 2;
let img;
let gradient1;
let gradient2;
let gradient3;

function preload() {
  img = loadImage('xor.jpg');
}

function setup() {
  createCanvas(800, 450);
  c1 = color(241, 97, 100);
  c2 = color(11, 106, 136);
  c3 = color(255);
  // create a linear gradient that's angled at 0 radians, and is 200px wide
  gradient1 = createLinearGradient(45, 800);
  // add some colors
  // at 0% make it lightblue, then at 50% make it pink, and at 100% make it magenta
  gradient1.colors(0.25, c1, 0.35, c2, 0.85, c1);
  
}

function draw() {
  
  // set the background to gradient3
  backgroundGradient(gradient1);
 
  // let  col1 = setGradientL(0, 0, 400, 450, c1, c2, X_AXIS);
  // let  col2 = setGradientR(400, 0, 800, 450, c2, c1, X_AXIS);
  translate(200,25);
  image(img, 0, 0, 400, 400);
 
  noFill();
  rect(0,0,400,400);
  
}



function setGradientL(x, y, w, h, c1, c2, axis) {
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
      let inter = map(i, x, x + w, 0,1);
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
      let inter = map(i, y, y + h, 0.0, 1.75);
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
