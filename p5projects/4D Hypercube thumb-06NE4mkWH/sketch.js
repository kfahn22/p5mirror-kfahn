// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in
// JavaScript transcription: Chuck England

// Coding Challenge #113: 4D Hypercube
// https://youtu.be/XE3YDVdQSPo

// Matrix Multiplication
// https://youtu.be/tzsgS19RRc8

let angle = 0;

let points = [];

const Y_AXIS = 1;
const X_AXIS = 2;



function setup() {
  //let size = min(windowWidth, windowHeight);
  createCanvas(800, 450, WEBGL);
  points[0] = new P4Vector(-1, -1, -1, 1);
  points[1] = new P4Vector(1, -1, -1, 1);
  points[2] = new P4Vector(1, 1, -1, 1);
  points[3] = new P4Vector(-1, 1, -1, 1);
  points[4] = new P4Vector(-1, -1, 1, 1);
  points[5] = new P4Vector(1, -1, 1, 1);
  points[6] = new P4Vector(1, 1, 1, 1);
  points[7] = new P4Vector(-1, 1, 1, 1);
  points[8] = new P4Vector(-1, -1, -1, -1);
  points[9] = new P4Vector(1, -1, -1, -1);
  points[10] = new P4Vector(1, 1, -1, -1);
  points[11] = new P4Vector(-1, 1, -1, -1);
  points[12] = new P4Vector(-1, -1, 1, -1);
  points[13] = new P4Vector(1, -1, 1, -1);
  points[14] = new P4Vector(1, 1, 1, -1);
  points[15] = new P4Vector(-1, 1, 1, -1);
}

function mousePressed() {
  save('4dcube.jpg');
}

function draw() {
  //background(bimg);
  background('#F16164');
  let c1 = color('#F16164');
  let c2 = color('#9253A1');
  // let  col2 = setGradientL(-400, -400, 800, 900, c2, c1, X_AXIS);
  // let  col3 = setGradientR(800, 900, 1600, 900, c1, c2, X_AXIS);
  
  rotateX(-PI / 2);
  let projected3d = [];

 
  
  
  for (let i = 0; i < points.length; i++) {
    const v = points[i];

    const rotationXY = [
      [cos(angle), -sin(angle), 0, 0],
      [sin(angle), cos(angle), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];

    const rotationZW = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, cos(angle), -sin(angle)],
      [0, 0, sin(angle), cos(angle)]
    ];

    let rotated = matmul(rotationXY, v);
    //rotated = matmul(rotationZW, rotated);

    let distance = 1.9;
    let w = 1 / (distance - rotated.w);

    const projection = [
      [w, 0, 0, 0],
      [0, w, 0, 0],
      [0, 0, w, 0],
    ];

    let projected = matmul(projection, rotated);
    projected.mult(width / 8);
    projected3d[i] = projected;
    // let c4= color('#70327E');
    // stroke(c4, 200);
   stroke(255, 200);
    strokeWeight(20);
    noFill();

    point(projected.x, projected.y, projected.z);
  }
 
  // Connecting
  for (let i = 0; i < 4; i++) {
   // stroke(c2, 100);
    connectPoints(0, i, (i + 1) % 4, projected3d);
    connectPoints(0, i + 4, ((i + 1) % 4) + 4, projected3d);
    connectPoints(0, i, i + 4, projected3d);
  }

  for (let i = 0; i < 4; i++) {
    connectPoints(8, i, (i + 1) % 4, projected3d);
    connectPoints(8, i + 4, ((i + 1) % 4) + 4, projected3d);
    connectPoints(8, i, i + 4, projected3d);
  }

  for (let i = 0; i < 8; i++) {
    connectPoints(0, i, i + 8, projected3d);
  }
 
  //angle = map(mouseX, 0, width, 0, TWO_PI);
  angle += 0.02;
}

function connectPoints(offset, i, j, points) {
  strokeWeight(4);
  stroke(255);
  const a = points[i + offset];
  const b = points[j + offset];
  line(a.x, a.y, a.z, b.x, b.y, b.z);
}

// function setGradientL(x, y, w, h, c1, c2, axis) {
//   noFill();

//   if (axis === Y_AXIS) {
//     // Top to bottom gradient
//     for (let i = y; i <= y + h; i++) {
//       let inter = map(i, y, y + h, 0, 1);
//       let c = lerpColor(c1, c2, inter);
//       stroke(c);
//       line(x, i, x + w, i);
//     }
//   } else if (axis === X_AXIS) {
//     // Left to right gradient
//     for (let i = x; i <= x + w; i++) {
//       let inter = map(i, x, x + w, 0,1);
//       let c = lerpColor(c1, c2, inter);
//       stroke(c);
//       line(i, y, i, y + h);
//     }
//   }
// }

// function setGradientR(x, y, w, h, c1, c2, axis) {
//   noFill();

//   if (axis === Y_AXIS) {
//     // Top to bottom gradient
//     for (let i = y; i <= y + h; i++) {
//       let inter = map(i, y, y + h, 0.0, 1);
//       let c = lerpColor(c1, c2, inter);
//       stroke(c);
//       line(x, i, x + w, i);
//     }
//   } else if (axis === X_AXIS) {
//     // Left to right gradient
//     for (let i = x; i <= x + w; i++) {
//       let inter = map(i, x, x + w, 0,1.75);
//       let c = lerpColor(c1, c2, inter);
//       stroke(c);
//       line(i, y, i, y + h);
//     }
//   }
// }
