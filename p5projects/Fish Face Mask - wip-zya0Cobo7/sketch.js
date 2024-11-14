let video;
let faceMesh;
let faces = [];
let triangles;
let uvCoords;
let img;
let yoff = 0;
const particles = [];
let silhouette = [
  10,
  338,
  297,
  332,
  284,
  251,
  389,
  356,
  454,
  323,
  361,
  288,
  397,
  365,
  379,
  378,
  400,
  377,
  152,
  148,
  176,
  149,
  150,
  136,
  172,
  58,
  132,
  93,
  234,
  127,
  162,
  21,
  54,
  103,
  67,
  109,
];

// // Lower outer.
//     61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291,
//     // Upper outer(excluding corners).
//     185, 40, 39, 37, 0, 267, 269, 270, 409,
//     // Lower inner.
//     78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308,
//     // Upper inner(excluding corners).
//     191, 80, 81, 82, 13, 312, 311, 310, 415,
//

let upperlip = [
  61,
  185,
  40,
  39,
  37,
  0,
  267,
  269,
  270,
  409,
  287,
  415,
  310,
  311,
  312,
  13,
  82,
  81,
  80,
  191,
];

let lowerlip = [
  61,
  76,
  62,
  78,
  95,
  88,
  178,
  87,
  14,
  317,
  402,
  318,
  324,
  308,
  291,
  287,
  375,
  321,
  405,
  314,
  17,
  84,
  181,
  181,
  91,
  146,
];

// Thank you Jack B. Du for these lists!
// Define the exterior lip landmark indices for drawing the outer lip contour
let lipsExterior = [
  267,
  269,
  270,
  409,
  291, // rt corner
  375,
  321,
  405,
  314,
  17,
  84,
  181,
  91,
  146,
  61, // left corner
  185,
  40,
  39,
  37,
  0,
];

// Define the interior lip landmark indices for drawing the inner lip contour
let lipsInterior = [
  13,
  312,
  311,
  310,
  415,
  308,
  324,
  318,
  402,
  317,
  14,
  87,
  178,
  88,
  95,
  78,
  191,
  80,
  81,
  82,
];

function preload() {
  faceMesh = ml5.faceMesh({ maxFaces: 1, flipped: true });
  img = loadImage("img-170.jpg");
}

function mousePressed() {
  console.log(faces);
}

function gotFaces(results) {
  faces = results;
}

function setup() {
  createCanvas(640, 480, WEBGL);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  faceMesh.detectStart(video, gotFaces);
  triangles = faceMesh.getTriangles();
  uvCoords = faceMesh.getUVCoords();
  //console.log(uvCoords);
}

function draw() {
  orbitControl();
  translate(-width / 2, -height / 2);
  //background(0);
  background(34, 42, 104);
  //image(video, 0, 0);

  let dx = 0.01;
  let xoff = 0;

  if (faces.length > 0) {
    let face = faces[0];
    // push()
    texture(img);
    textureMode(NORMAL);
    noStroke();
    beginShape(TRIANGLES);
    for (let i = 0; i < triangles.length; i++) {
      let tri = triangles[i];
      let [a, b, c] = tri;
      let pointA = face.keypoints[a];
      let pointB = face.keypoints[b];
      let pointC = face.keypoints[c];
      let uvA = uvCoords[a];
      let uvB = uvCoords[b];
      let uvC = uvCoords[c];

      vertex(pointA.x, pointA.y, pointA.z, uvA[0], uvA[1]);
      vertex(pointB.x, pointB.y, pointB.z, uvB[0], uvB[1]);
      vertex(pointC.x, pointC.y, pointC.z, uvC[0], uvC[1]);
    }
    endShape();

//     let lips = face.lips;
//     beginShape();
//     for (let i = 0; i < upperlip.length; i++) {
//       let index = upperlip[i];
//       let keypoint = face.keypoints[index];
//       stroke(243, 191, 207);
//       fill(243, 191, 207);
//       vertex(keypoint.x, keypoint.y);
//     }
//     endShape(CLOSE);

//     beginShape();
//     for (let i = 0; i < lowerlip.length; i++) {
//       let index = lowerlip[i];
//       let keypoint = face.keypoints[index];
//       //  stroke(255, 0, 0);
//       // fill(0, 0, 255);
//       strokeWeight(3);
//       vertex(keypoint.x, keypoint.y);
//     }
//     endShape(CLOSE);

    // left side 162, 127, 234, 93
    let p1 = face.keypoints[162]; // left side
    let p2 = face.keypoints[127];
    // right side 356, 454, 323, 361
    let p3 = face.keypoints[356];
    let p4 = face.keypoints[454];

    //fishFin(p1, p2, p3, p4, 40);

    //  fishFins(p1.x + 0.12 * width, p1.y + 0.12 * height, radians(105), 1, xoff, dx);
    // fishFins(p3.x -  0.12 * width, p3.y + 0.12 * height, radians(-120), -1, xoff, dx);
  }
}

function fishFin(p1, p2, p3, p4, l) {
  let points = [];
  points.push(createVector(0, 0));
  //points.push(createVector(l, -l/4));
  for (let theta = PI; theta < 2* PI; theta-= 0.1) {
    let x = l + (l / 4) * cos(theta);
    let y = - l/4*(1 - sin(theta));
    //let y = -l/4 + (l / 4) * sin(theta);
    points.push(createVector(x, y));
   // points.push(createVector(p2.x, p2.y));
  }
  strokeWeight(3)
  stroke(255, 0 ,0);
  noFill()
   push();
    translate(p3.x, p3.y);
    //rotate(this.angle);
    beginShape();
    for (let p of points) {
      vertex(p.x, p.y);
    }
    endShape(OPEN);
    pop();
  
  console.log(points)
}
// function fishfin(p1, p2, p3, p4, l) {
//   let d = abs(p3.x - p1.x);
//   // Start building the p5.Geometry object.
//   //beginGeometry();
//   stroke(255, 0, 0);
//   noFill()
//   line(p1.x, p1.y, p1.x - l, p1.y);
//   arc(p1.x - l, p1.y + d/16, d/8, d/8, 1.5 * PI, 2.5* PI, OPEN);
//   //line(p2.x, p2.y, p2.x + l, p2.y);
//   // Stop building the p5.Geometry object.
//  // shape = endGeometry();
// }

function fishFins(x, y, angle, dir, xoff) {
  let dx = 0.01;
  push();
  translate(x, y);
  rotate(angle);
  stroke(255, 169, 31, 90);
  fill(255, 169, 31, 70);
  strokeWeight(1);
  beginShape();
  for (let theta = 0; theta < 0.8 * PI; theta += 0.01) {
    let n = noise(xoff, yoff);
    let s = map(n, 0, 1, 10, 15);
    let r = 5 + cos(9 * theta);
    let x = dir * s * r * cos(theta);
    let y = s * r * 2.5 * sin(theta);
    if (theta < 0.4 * PI) {
      xoff += dx;
    } else {
      xoff -= dx;
    }
    vertex(x, y);
  }
  endShape();
  yoff += 0.01;
  pop();
}

// https://editor.p5js.org/codingtrain/sketches/D4ty3DgZB
function addBubbles() {
  for (let i = 0; i < 5; i++) {
    let p = new Particle();
    particles.push(p);
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      // remove this particle
      particles.splice(i, 1);
    }
  }
}
