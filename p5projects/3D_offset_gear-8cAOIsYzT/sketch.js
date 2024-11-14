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
const sc = 150;
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
    for (let i = 0; i < detail+1; i++) {
      let lat = map(i, 0, detail, -PI, PI);
      // I had to play around with the values of b to get the middle band color consistent
      // if b >9, the color will be messed up
      let r2 = gear(lat, 1, 4);
      for (let j = 0; j < detail+1 ; j++) {
        let lon = map(j, 1, detail-1, -PI, PI);
        let r1 = gear(lon, 1, 10);
        
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
  background(248,117,117);
  rotateX(ang);
  rotateY(ang);
  rotateZ(ang);

  noStroke();
  
  // orbitControl allows us to control shape with the mouse
  //https://p5js.org/reference/#/p5/orbitControl
  orbitControl();
  
  // We need two directional lights coming from opposite directions
  // View the shape with normal material and you will see that the normals change with each band
  // normalMaterial();
  // directionalLight(128, 128, 128, 0, 0, -1);
  // directionalLight(128, 128, 128, 0, 0, 1);
  // ambientLight(79, 117, 155);
  // ambientMaterial(79, 117, 155);
  
  // If we add different colors to each directional light, we get stripes
  directionalLight(185,230,255, 0, 0, -1);
  directionalLight(92,149, 255, 0, 0, 1);
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

// function mousePressed() {
//   save("3dshape.jpg");
// }
