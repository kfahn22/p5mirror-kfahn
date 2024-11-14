// Spherical Geometry
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/025-spheregeometry.html
// https://youtu.be/RkuBWEkBrZA
// https://editor.p5js.org/codingtrain/sketches/qVs1hxtc

const globe = [];
const r = 200;
const total = 25;
let angleX = 0;
let angleY = 0;

function setup() {
  createCanvas(800, 450, WEBGL);
  
  noFill();
  strokeWeight(3);
  stroke(255);

  for (let i = 0; i < total + 1; i++) {
    globe[i] = [];
    const lat = map(i, 0, total, 0, PI);
    for (let j = 0; j < total + 1; j++) {
      const lon = map(j, 0, total, 0, TWO_PI);
      const x = r * sin(lat) * cos(lon);
      const y = r * sin(lat) * sin(lon);
      const z = r * cos(lat);
      globe[i][j] = createVector(x, y, z);
    }
  }
}

function draw() {
  background(164,41,99);
  scale(0.9);
  rotateX(angleX);
  rotateY(angleY);
  stroke(0);
  fill(255);
  for (let i = 0; i < total; i++) {
    beginShape(TRIANGLE_STRIP);
    for (let j = 0; j < total + 1; j++) {
      const v1 = globe[i][j];
      vertex(v1.x, v1.y, v1.z);
      const v2 = globe[i + 1][j];
      vertex(v2.x, v2.y, v2.z);
    }
    endShape();
  }

  angleX += 0.005;
  angleY += 0.006;
}