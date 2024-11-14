// See https://github.com/kfahn22/hearts for other heart curve sketches

// The spherical code is based on Daniel Shiffman's 3d-supershapes challenge
// https://thecodingtrain.com/challenges/26-3d-supershapes

// Instead of using beginShape(), endShape(), vertex() we use the p5.Geometry class to handle the vertices.

// Reference for how to use p5 geometry
// https://p5js.org/learn/getting-started-in-webgl-custom-geometry.html

let ang = 0;
let rotation = true;

const detail = 99;

const sc = 30;

let myGeometry;

function setup() {
  //createCanvas(800, 450, WEBGL);
  createCanvas(800, 450, WEBGL);
  pixelDensity(1);

  myGeometry = new p5.Geometry(detail, detail, function () {
    const e = 2.71828;

    for (let i = 0; i < detail + 1; i++) {
      let lat = map(i, 0, detail, -PI, PI);

      for (let j = 0; j < detail + 1; j++) {
        let lon = map(j, 1, detail - 1, -PI, PI);
        let r =
          2 -
          2 * sin(lat) +
          sin(lat) * (pow(abs(cos(lat)), 0.5) / (sin(lat) + 2.0));

        let y = -sc * r * sin(lon) * sin(lat);
        let x = sc * r * cos(lon) * sin(lat) - abs(y);
        let z = constrain(y * cos(lat), -60, 60);

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
  background(255,179,179);
  //rotateX(90);
  rotateY(ang);
  rotateZ(PI / 2);

  noStroke();

  // orbitControl allows us to control shape with the mouse
  //https://p5js.org/reference/#/p5/orbitControl
  orbitControl();

  // We need two directional lights coming from opposite directions
  // View the shape with normal material and you will see that the normals are different on each half of the heart
 // normalMaterial();
  directionalLight(134,0,179, 0, 0, -1);
  directionalLight(134,0,179, 0, 0, 1);
  
  push();
  model(myGeometry);
  pop();

  if (rotation) {
    ang += 0.01;
  }
}

// function mousePressed() {
//   save("3dheart.jpg");
// }
