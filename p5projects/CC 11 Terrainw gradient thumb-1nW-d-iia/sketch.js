// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/IKB1hWWedMk
// https://thecodingtrain.com/CodingChallenges/011-perlinnoiseterrain.html

// Edited by SacrificeProductions

var cols, rows;
var scl = 15;//20
var w = 1400;
var h = 1000;

let flying = 0;

let terrain = [];
let c1,c2,c3,c4;

const Y_AXIS = 1;
const X_AXIS = 2;


function setup() {
  createCanvas(800, 450, WEBGL);
  
  cols = w / scl;
  rows = h / scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}

function draw() {
   let c1 = color(45,197,244);
   let c2 = color(240,99,164);
 
   let  col = setGradient(-w/2, -h/2, w, h, c1, c2, Y_AXIS);
  

  setAttributes('antialias',true);
  setAttributes('perPixelLighting',true);
  ambientLight(146,83,161, 255);
  noCursor();
  // let locX = mouseX - height / 2;
  // let locY = mouseY - width / 2;
  let locX = mouseX - height / 2;
  let locY = mouseY - width / 2;
  //lights();
  pointLight(200,200,200, locX, locY, 125); 
  ambientMaterial(146,83,161);  // green
 
  
  //spotLight(0, 250, 0, locX, locY, 100, 0, 0, -1, Math.PI / 16);
  flying -= 0.1;
  var yoff = flying;
  for (let y = 0; y < rows; y++) {
    var xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -65, 65);
     // terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.1;
  }
  
 // background(45,197,244);
  push();
  translate(0, -75);
  rotateX(PI / 3);
  stroke(75,33,84);
  strokeWeight(1);
  
  translate(-w / 2, -h / 2);
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
  pop();
 
}

function mousePressed() {
 save('terrain.jpg');
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

function addSun() {
  
  // trying to add sun
  push();
  translate(w*3/4, -h / 3);
  stroke(252,238,33);
  fill(252,238,33);
  circle(width* 0.8, -height/2, 200);
  pop();
  
}

function gradientRect(theX, theY, theW, theH, theColors) {
  push();
  translate(theX, theY);
  beginShape(TRIANGLE_STRIP);
  // 1. point 
  fill(c1);
  vertex(0,0);
  // 2. point
  fill(c2);
  vertex(theW,0);
  
  // 3. point
  fill(c3);
  vertex(theW,theH);
  
  // 4. point
  vertex(theW,theH);
  
  // 5. point
  fill(c4);
  vertex(0,theH);
  
  // 6. point
  fill(theColors[0]);
  vertex(0,0);
  endShape();
  pop();
}