// See https://github.com/kfahn22/gears for other gear curve sketches

// The spherical code is based on Daniel Shiffman's 3d-supershapes challenge
// https://thecodingtrain.com/challenges/26-3d-supershapes
// Reference for gear curve https://mathworld.wolfram.com/GearCurve.html
// Reference for hyperbolic functions
// https://byjus.com/maths/hyperbolic-function/
// https://help.tc2000.com/m/69445/l/755460-hyperbolic-functions-table
// Reference for how to create p5 geometry
// https://p5js.org/learn/getting-started-in-webgl-custom-geometry.html



let ang = 0;
let rotation = true;
let num;
const sc = 3;
const sp = 8; // number of spokes
let myGeometry;
const detailX = 16;
const detailY = 16;

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
  myGeometry = new p5.Geometry(detailX, detailY, function () {
    for (let i = 0; i < detailX + 1; i++) {
      let lat = map(i, 0, detailX, -PI, PI);
      let r2 = gear(lat);
      for (let j = 0; j < detailY + 1; j++) {
        let lon = map(j, 0, detailY, -PI, PI);
        let r1 = gear(lon);
        let r = gear(lat + lon);
        let x = sc * r1 * cos(lon) * r2 * sin(lat);
        let y = sc * r1 * sin(lon) * r2 * sin(lat);
        let z = r + sc * (r1 * cos(lon));
        this.vertices.push(createVector(x, y, z));
      }
    } // this will attach all our vertices and create faces automatically
    this.computeFaces();
    // this will calculate the normals to help with lighting
    this.computeNormals();
  });
}

function draw() {
  background(22, 16, 50);
  rotateX(ang);
  rotateY(ang);
  rotateZ(ang);

  noStroke();

  orbitControl();
  directionalLight(128, 128, 128, 0, 0, -1);
  directionalLight(128, 128, 128, 0, 0, 1);
  ambientLight(255, 197, 58);
  ambientMaterial(255, 197, 58);

  //normalMaterial();
  push();

  rotateY((cos(millis() / 1000) * PI) / 4);

  model(myGeometry);
  pop();

  if (rotation) {
    ang += 0.01;
  }
}

function hyperbolicTan(theta) {
  let e = 2.71828;
  let l = pow(e, 2 * theta);
  return (l - 1) / (l + 1);
}

function hyperbolicCot(theta) {
  let e = 2.71828;
  let k = pow(e, theta);
  let l = pow(e, -theta);
  return (k + l) / (k - l);
}

function hyperbolicSin(theta) {
  let e = 2.71828;
  let k = pow(e, theta);
  let l = pow(e, -theta);
  return (k - l) / 2;
}
function hyperbolicCos(theta) {
  let e = 2.71828;
  let k = pow(e, theta);
  let l = pow(e, -theta);
  return (k + l) / 2;
}

// Function to calculate r1, r2
function gear(theta) {
  let a = 1;
  let b = 4; // changing this value yields a very different shape

  // Equation for the radius

  //return a + (1 / b) * hyperbolicTan(b * cos(sp * theta));
  return a + (1 / b) * hyperbolicSin(b * cos(sp * theta));
  // return a + (1 / b) * hyperbolicCot(b * cos(sp * theta));
}

function mousePressed() {
  save("3dshape.jpg");
}
