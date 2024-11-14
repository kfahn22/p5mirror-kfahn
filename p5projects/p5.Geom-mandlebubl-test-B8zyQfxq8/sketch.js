// https://github.com/CodingTrain/Coding-Challenges/blob/main/168_Mandelbulb/Processing/MandelBulb_Color/MandelBulb_Color.pde

// Instead of using beginShape(), endShape(), vertex() we use the p5.Geometry class to handle the vertices.

// Reference for how to use p5 geometry
// https://p5js.org/learn/getting-started-in-webgl-custom-geometry.html

// THIS DOESN'T WORK B/C of Z DIM!!!

let ang = 0;
let rotation = true;
let maxiterations = 2;
const detail = 32;
const sc = 50;
let myGeometry;

function setup() {
  //createCanvas(800, 450, WEBGL);
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);

  ///
  myGeometry = new p5.Geometry(detail, detail, function () {
    for (let i = 0; i < detail; i++) {
      for (let j = 0; j < detail; j++) {
        for (let k = 0; k < detail; k++) {
          let edge = false;
          let lastIteration = 0;
          let x = map(i, 0, detail, -1, 1);
          let y = map(j, 0, detail, -1, 1);
          let z = map(k, 0, detail, -1, 1);

          let zeta = createVector(0, 0, 0);
          let n = 8;
          let iteration = 0;
          while (true) {
            let c = spherical(zeta.x, zeta.y, zeta.z);
            let newx = pow(c.r, n) * sin(c.theta * n) * cos(c.phi * n);
            let newy = pow(c.r, n) * sin(c.theta * n) * sin(c.phi * n);
            let newz = pow(c.r, n) * cos(c.theta * n);
            zeta.x = newx + x;
            zeta.y = newy + y;
            zeta.z = newz + z;
            iteration++;

            if (c.r > 2) {
              lastIteration = iteration;
              if (edge) {
                edge = false;
              }
              break;
            }
            if (iteration > maxiterations) {
              if (!edge) {
                edge = true;
                this.vertices.push(new p5.Vector(zeta.x, zeta.y, zeta.z));
              }
            }
            break;
          }
        } // k
      } // j
    } // i

    // this will attach all our vertices and create faces automatically
    this.computeFaces();
    // this will calculate the normals to help with lighting
    //this.computeNormals();
    //this.averageNormals();
    // this.averagePoleNormals();
    }
}

function draw() {
  background(248, 117, 117);
  rotateX(ang);
  rotateY(ang);
  rotateZ(ang);

  noStroke();

  // orbitControl allows us to control shape with the mouse
  //https://p5js.org/reference/#/p5/orbitControl
  orbitControl();

  // We need two directional lights coming from opposite directions
  // View the shape with normal material and you will see that the normals change with each band
  //normalMaterial();

  // If we add different colors to each directional light, we get stripes
  directionalLight(185, 230, 255, 0, 0, -1);
  directionalLight(92, 149, 255, 0, 0, 1);
  push();
  // rotateY((cos(millis() / 1000) * PI) / 4);
  model(myGeometry);
  pop();

  if (rotation) {
    ang += 0.01;
  }
}

// function atan2(theta) {
//
//   return (l - 1) / (l + 1);
// }

// Function for spherical
function spherical(x, y, z) {
  let r = sqrt(x * x + y * y + z * z);
  //let theta = atan2( sqrt(x*x+y*y), z);
  let theta = atan(sqrt(x * x + y * y), z);
  let phi = atan2(y, x);
  // return new createVector(r, theta, phi);
  return new p5.Vector(r, theta, phi);
}

// function mousePressed() {
//   save("3dshape.jpg");
// }
