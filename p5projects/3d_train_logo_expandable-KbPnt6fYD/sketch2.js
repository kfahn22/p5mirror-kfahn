let angle = 0;
let b = [];
const detail = 10;
const r = 40;

let bz = 0;
let tz = 1;
let fz = 0;

// let frames = 120;
// let myGeometry;

function keyPressed() {
  if (key == "s") {
    const options = {
      units: "frames",
      delay: 0,
    };
    saveGif("GIF/sphere.gif", frames, options);
  }
}

function setup() {
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES);
  rectMode(CENTER);
  pixelDensity(1);
  b.push(new UpLine(0, 0, 0));
  
}

function draw() {
  background(255);
  rotateY(angle);
  noStroke();
  // lines
  
  push();
  fill('#F89E4F')
  box(8,35,bz);
  pop();
  push();
  fill('#F89E4F')
  translate(-12, 0,0);
  box(8,35,bz);
  pop();
  push();
  fill('#F89E4F')
  translate(12, 0,0);
  box(8,35,bz);
  pop();
  push();
  fill('#F89E4F')
  translate(0, 25,0);
  box(35,8,bz);
  pop();
  if (bz < 32)
  {bz += 0.1;}
  
  
//   stroke("#70327E");
//   circle(140, 235, 53 * 2);

//   strokeWeight(11.2);
//   stroke("#30C5F3");
//   circle(221, 270, 18 * 2);
//   circle(272, 270, 18 * 2);
  
  // back wheel
  
  push();
  fill('#70327E');
  translate(-50, 27, 15);
  rotateY(180);
  torus(27, tz);
  pop();
  push();
  fill('#70327E');
  translate(-50, 27, -15);
  rotateY(180);
  torus(27, tz);
  pop();
  
  // front wheels
  
  push();
  fill('#30C5F3');
  translate(10, 44, 13);
  rotateY(180);
  torus(10, tz);
  pop();
  push();
  fill('#30C5F3');
  translate(-10, 44, 13);
  rotateY(180);
  torus(10, tz);
  pop();
  push();
  fill('#30C5F3');
  translate(10, 44, -13);
  rotateY(180);
  torus(10, tz);
  pop();
  push();
  fill('#30C5F3');
  translate(-10, 44, -13);
  rotateY(180);
  torus(10, tz);
  pop();
  
  // front
  push();
  fill('#F063A4');
  translate(40, -20, 0);
  rotateZ(-30)
  box(10, 40, fz);
  pop();
  push();
  fill('#F063A4');
  translate(40, 10, 0);
  rotateZ(30)
  box(10, 40, fz);
  pop();
  push();
  fill('#F063A4');
  translate(40, 40, 0);
  rotateZ(-30)
  box(10, 40, fz);
  pop();
  
  // back of train - not right yet
  push();
  fill('#70327E');
  translate(-85, -35, 0);
  box(80, 70, bkz);
  pop();
  push();
  fill('#70327E');
  translate(-95, -70, 0);
  box(100, 20, bkz);
  pop();
 
  if (fz < 32) {
      fz += 0.05;
      }
  
  if (tz < 4)
  {tz += 0.05;}
  angle += 1;
}
