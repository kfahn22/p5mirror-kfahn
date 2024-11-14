// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/KWoJgHFYWxY

let n = 0;
let c = 6;
//var c = 4;

let points = [];

let start = 0;

const Y_AXIS = 1;
const X_AXIS = 2;

let dim;

function setup() {
  createCanvas(800, 450);
  dim = width / 2;
  angleMode(DEGREES);
  //colorMode(HSB);
}

function draw() {
   background(45,197,244);
//    let c1 = color(146,83,161);
//    let c2 = color(0);
//    let c3 = color(45,197,244);
 
//   let  col2 = setGradientL(0, 0, 400, 450, c3, c2, X_AXIS);
//   let  col3 = setGradientR(400, 0, 750, 450, c2, c3, X_AXIS);

 
  //drawGradient(width/2, height/2, b1);
  translate(width / 2, height / 2);
  //rotate(n * 0.3);
 // rotate(n * 0.6);
  noStroke();
  fill(0);
  ellipse(0, 0, 400, 400);
  for (let i = 0; i < 1100; i++) {
    for (let j = 0; j < 7; j++) {
    let a = i * 137.5;
    let r = c * sqrt(i);
    let x = r * cos(a);
    let y = r * sin(a);
    let index = i*7 + j;
      if (index % 360 <= 50)  {
        fill(236,1,90);
      } 
      else if (index % 360 > 50 && index % 360 <= 100 ) {
         fill(146,83,161);
      }
      else if  (index % 360 > 100 && index % 360 <= 150) {
        fill(45,197,244);
      }
       else if (index % 360 > 150 && index  % 360 <= 200) {
         fill(102,211,52);
       }  
       else if (index % 360 > 200 && index % 360 <= 250) {
         fill(252,238,33);
       }
       else if (index % 360 > 250 && index % 360 <= 300) {
         fill(248,158,79);
       }
      else if (index % 360 > 300 && index % 360 <= 360) {
         fill(112, 22, 22);
       }
     // stroke(i % 360, 100, 100);
  
    //ellipse(x, y,  c + int(i/200), c + (int(i/200)));
  ellipse(x, y, c+1, c+1);
    }
  }
  //n += 1;
  start += 0.1;
  
}


function mousePressed() {
 save('phyll.jpg');
}

function setGradientL(x, y, w, h, c1, c2, axis) {
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

function drawGradient(x, y, b1) {
  let radius = 300;
 // let radius = dim / 2;
  let h = random(0, 360);
        for (let r = radius; r < 400; r++) {
        //for (let r = radius; r > 200; --r) {
          noFill();
          stroke(b1);
          strokeWeight(10);
          ellipse(x, y, r, r);
      //h = (h + 1) % 360;
   }
}