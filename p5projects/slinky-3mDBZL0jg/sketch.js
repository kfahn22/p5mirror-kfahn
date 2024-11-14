// Reference for how to use p5 geometry
// https://p5js.org/learn/getting-started-in-webgl-custom-geometry.html

// slinky curve equation from Wolfram Alpha
// https://mathworld.wolfram.com/Slinky.html

let myGeometry;
let ang = 0;
let rotation = true;
let num = 8; // number of rotations of slinky
let a = 0.5;
let R = 80;
let w = 1;
let h = 5;
const detail = 200; // a higher number leads to a smoother slinky
const sc = 90;

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);

  myGeometry = new p5.Geometry(detail, detail, function () {
    for (let i = 0; i < detail + 1; i++) {
      let lat = map(i, 0, detail, -num * PI, num * PI);

      for (let j = 0; j < detail + 1; j++) {
        let lon = map(j, 1, detail - 1, 0, TWO_PI);

        // let x = (R + a * cos(w * lat)) * cos(lat);
        // let y = (R + a * cos(w * lat)) * sin(lat);
        let x = (R + a * cos(w * lon)) * cos(lat);
        let y = (R + a * cos(w * lon)) * sin(lat);
        let z = h * lat + a * sin(w * lat);

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
  background(25, 133, 161);
  rotateX(ang);
  // rotateY(ang);
  // rotateZ(ang);

  stroke(76, 92, 104);
  strokeWeight(2);

  // orbitControl allows us to control shape with the mouse
  //https://p5js.org/reference/#/p5/orbitControl
  orbitControl();

  // We need two directional lights coming from opposite directions

  // If we add different colors to each directional light, we get stripes
  directionalLight(232, 199, 222, 0, 0, 1);
  directionalLight(203, 190, 179, 0, 0, -1);
  push();
  //translate(0, 50);  // to grab image
  model(myGeometry);
  pop();

  if (rotation) {
    ang += 0.01;
  }
}

function mousePressed() {
  save("3dshape.jpg");
}
