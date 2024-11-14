//https://stackoverflow.com/questions/60179313/how-to-fill-p5-js-shape-with-an-image

let img;
let shape;
let r1 = 200;
let r2 = 400;
let spacing = 15;
let points = [];

function preload() {
  img = loadImage("smiley_face.jpg");
}

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  // Create new p5 graphics object
  mask1 = createGraphics(width, height);

  background(255,0,0);

  
  points = addPoints();
 
  //mask.fill(0);
  mask1.beginShape();
  for (let i = 0; i < points.length; i++) {
    for (let p of points) {
      mask1.vertex(p.x, p.y);
    }
    mask1.endShape();
  }

  //    mask1.beginShape();
  // mask1.curveVertex(84, 91);
  // mask1.curveVertex(84, 91);
  // mask1.curveVertex(68, 19);
  // mask1.curveVertex(21, 17);
  // mask1.curveVertex(32, 91);
  // mask1.curveVertex(32, 91);
  // mask1.endShape(CLOSE);
  img.mask(mask1);

  image(img, 0, 0);
}

function polarToCartesian(r, angle) {
  return createVector(r * cos(angle), r * sin(angle));
}

function addPoints() {
  let cv;
  let x = width/2;
  let y = height/2;
  for (let a = 0; a < 360; a += spacing) {
    if (a % 2 == 0) {
      cv = polarToCartesian(r1, a);
    } else {
      cv = polarToCartesian(r2, a);
    }
    points.push(createVector(x + cv.x, y + cv.y));
  }
  return points;
}

function mousePressed() {
  save('badsun.jpg');
}