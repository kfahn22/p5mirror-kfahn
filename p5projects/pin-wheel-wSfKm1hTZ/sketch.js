// The spherical code is based on Daniel Shiffman's 3d-supershapes challenge
// https://thecodingtrain.com/challenges/26-3d-supershapes

// Instead of using beginShape(), endShape(), vertex() we use the p5.Geometry class to handle the vertices.

// Reference for how to use p5 geometry
// https://p5js.org/learn/getting-started-in-webgl-custom-geometry.html


// Note that the sketch is getting this error
// p5.Geometry.prototype._getFaceNormal: face has colinear sides or a repeated vertex 

let angle = 0;

const detail = 74;
const r = 120;
const e = 2.71828;
let frames = 180;
let myGeometry;

// function keyPressed() {
//   if (key == "s") {
//     const options = {
//       units: "frames",
//       delay: 0,
//     };
//     saveGif("GIF/pinwheel.gif", frames, options);
//   }
// }

function setup() {
  createCanvas(800, 800, WEBGL);
  pixelDensity(1);

  myGeometry = new p5.Geometry(detail, detail, function () {
    for (let i = 0; i < detail + 1; i++) {
      let lat = map(i, 0, detail, 0, TWO_PI);

      for (let j = 0; j < detail + 1; j++) {
        let lon = map(j, 1, detail - 1, 0, TWO_PI);
        let x = r * sin(lat) * cos(lon);
        let y = r * sin(lat) * sin(lon) - abs(x);
        let z = (x / 2) * cos(4 * lat);
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
  background(0);
  // rotateX(angle);
  rotateY(angle);
  rotateZ(PI / 2);

  noStroke();

  // orbitControl allows us to control shape with the mouse
  //https://p5js.org/reference/#/p5/orbitControl
  orbitControl();

  // If we add different colors to each directional light, we get stripes
  ambientLight(153, 0, 204);
  //sphere(30);
  for (let i = 0; i < 8; i++) {
    push();
    rotateZ((cos(millis() / 1000) * PI) / 4);
    directionalLight(226, 160, 255, 0, 0, -1);
    directionalLight(226, 160, 255, 0, 0, 1);
    rotateZ((PI * i) / 4);
    model(myGeometry);
    pop();
  }

  angle += TWO_PI / frames;
}

// function mousePressed() {
//   save("pinwheel.jpg");
// }