// See https://github.com/kfahn22/gears for other gear curve sketches

// The spherical code is based on Daniel Shiffman's 3d-supershapes challenge
// https://thecodingtrain.com/challenges/26-3d-supershapes
// Reference for gear curve https://mathworld.wolfram.com/GearCurve.html
// Reference for hyperbolic functions
// https://byjus.com/maths/hyperbolic-function/
// https://help.tc2000.com/m/69445/l/755460-hyperbolic-functions-table

// Instead of using beginShape(), endShape(), vertex() we use the p5.Geometry class to handle the vertices.

// Reference for how to use p5 geometry
// https://p5js.org/learn/getting-started-in-webgl-custom-geometry.html

let ang = 0;
let rotation = true;

const detail = 75;
const sc = 25;
// gear curve parameters -- changing will yield different shapes
// a = 1, b = 10 were the values given on Mathworld
const a = 1; // keep this = 1
const b = 10;
// with odd number of spokes, color bands are offset,
// with even number, spokes are aligned.
const spokes = 11; // number of spokes
let myGeometry;

function setup() {
  //createCanvas(800, 450, WEBGL);
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);

  myGeometry = new p5.Geometry(detail, detail, function () {
    for (let i = 0; i < detail + 1; i++) {
      let lat = map(i, 0, detail, -PI/2, PI/2);

      let r2 = butterfly(lat);
      // let r2 = cassiniOval(lat, 0.7, 1);
      //let r2 = craniod(lat, 1, 2, 0);
      //let r2 = flower(lat, 1.5, 8);
      //let r2 = gear(lat, 1, 4);

      for (let j = 0; j < detail + 1; j++) {
        let lon = map(j, 1, detail - 1, -PI, PI);
        let r1 = butterfly(lon);
        //let r1 = cassiniOval(lon, 0.7, 1);
        // let r1 = craniod(lon, 1, 3, 0);
       // let r1 = flower(lon, 1.5, 8);
        //let r1 = gear(lon, 1, 10);

        let x = sc * r1 * cos(lon) * r2 * sin(lat);
        let y = sc * r1 * sin(lon) * r2 * sin(lat);
        let z = sc * (r2 * cos(lat));
        this.vertices.push(new p5.Vector(x, y, z));
      }
    }
    // this will attach all our vertices and create faces automatically
    this.computeFaces();
    // this will calculate the normals to help with lighting
    this.computeNormals();
    this.averageNormals();
    this.averagePoleNormals();
  });
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
//   directionalLight(128, 128, 128, 0, 0, -1);
//   directionalLight(128, 128, 128, 0, 0, 1);
  //ambientLight(79, 117, 155);
  // ambientMaterial(79, 117, 155);

//   // If we add different colors to each directional light, we get stripes
  directionalLight(92, 149, 255, 0, 0, -1);
  directionalLight(92, 149, 255, 0, 0, 1);
  push();
  // rotateY((cos(millis() / 1000) * PI) / 4);
  model(myGeometry);
  pop();

  if (rotation) {
    ang += 0.01;
  }
}

function hyperbolicTan(theta) {
  const e = 2.71828;
  let l = pow(e, 2 * theta);
  return (l - 1) / (l + 1);
}

// Function to calculate r1, r2
function gear(theta, a, b) {
  // Equation for the gear curve
  return a + (1 / b) * hyperbolicTan(b * sin(spokes * theta));
}

function cassiniOval(theta, a, b) {
  // for (let theta = 0; theta < TWO_PI; theta += 0.05) {
  let root = sqrt(pow(b / a, 4) - pow(sin(2 * theta), 2));
  return pow(a, 2) * (cos(2 * theta) + root);
}

function butterfly(theta) {
  const e = 2.71828;
  return (
    pow(e, sin(theta)) - 2 * cos(4 * theta) + pow(sin((2 * theta - PI) / 24), 5)
  );
}

function craniod(theta, a, b, m) {
  let p = 0.75;
  let q = 0.75;
  return (
    a * sin(theta) +
    b * sqrt(1 - p * pow(cos(theta), 2)) +
    m * sqrt(1 - q * pow(cos(theta), 2))
  );
}

function flower(theta, a, m) {
     return a + cos(m * theta);
}

// function mousePressed() {
//   save("3dshape.jpg");
// }
