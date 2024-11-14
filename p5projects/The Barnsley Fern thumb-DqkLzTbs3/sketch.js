let x = 0;
let y = 0;
let alph = 255;

const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  createCanvas(800, 450);
   let c1 = color(146,83,161);
   let c2 = color(0);
   let c3 = color(45,197,244);
   let c4 = color(11, 106, 136);
 
  let  col2 = setGradient(0, 0, 800, 450, c1, c2, X_AXIS);
 // background(0);
}

function draw() {
 
  strokeWeight(2);
 // stroke(102,211,52,alph);
  
  for (let i = 0; i < 300; i++) {
    drawPoint(i);
    nextPoint();
  }
 
}

function drawPoint(index) {
  // colorMode(HSB, 1.0);
 
  // stroke(y/9.9983,255,255);
  strokeWeight(2);
  alph = map(index, 0, 300, 30, 50);
  let px = map(x, -2.1820, 2.6558, 50, width-50);
  let py = map(y, 0, 9.9983, height-10, 10);
  
  let adjx = (abs(width/2 - 1.0* px)/(width/2));

  let adjy = (height/2 - py)/(height/2);
  
 
  let adj = adjx/ max(adjx);
  let from = color(11, 106, 136, alph); //teal
  let to = color(102, 211, 52, alph); // green
  
   interA = lerpColor(to, from, ( 1.05* adjx - 0.1*adjx ));
  
   stroke(interA);
  
   point(px, py);


}

function nextPoint() {
  let nextX;
  let nextY;
  let r = random(1);

  if (r < 0.01) {
    nextY = 0.16 * y;
    nextX = 0;
  } else if (r < 0.86) {
    nextX = 0.85 * x + 0.04 * y;
    nextY = -0.04 * x + 0.85 * y + 1.6;
  } else if (r < 0.93) {
    nextX = 0.2 * x + -0.26 * y;
    nextY = 0.23 * x + 0.22 * y + 1.6;
  } else {
    nextX = -0.15 * x + 0.28 * y;
    nextY = 0.26 * x + 0.24 * y + 0.44;
  }
  x = nextX;
  y = nextY;
}


function mousePressed() {
 save('barnsley.jpg');
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
      let inter = map(i, x, x + w, 0,1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
