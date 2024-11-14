// For reference, Daniel Shiffman's spherical Coding Challenge
// https://thecodingtrain.com/challenges/25-spherical-geometry
// https://editor.p5js.org/codingtrain/sketches/qVs1hxtc

// There is a "face has colinear sides or a repeated vertex" warning if the original mapping is used.  If the mapping is changed to (-PI, PI), the warning goes away and the longitudinal stripes show.

let angle = 0;
let b = [];
const detail = 10;
const r = 40;

let frames = 120;
let myGeometry;

function keyPressed() {
  if (key == "s") {
    const options = {
      units: "frames",
      delay: 0,
    };
    saveGif("GIF/sphere.gif", frames, options);
  }
}

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES)
  pixelDensity(1);
  b.push(new UpLine(0, 0, 0));
  myGeometry = new p5.Geometry(detail, detail, function () {
    for (let i = 0; i < detail + 1; i++) {
      // let lat = map(i, 0, detail, 0, PI);
      let lat = map(i, 0, 0.4*detail, 40, 65);

      for (let j = 0; j < detail + 1; j++) {
        let lon = map(j, 0, detail, 0, 360);
      // let lon = map(j, 0, detail, 0, TWO_PI);
        let x = r * sin(lat) * cos(lon);
        let y = r * sin(lat) * sin(lon);
        let z = r * cos(lat);
        this.vertices.push(new p5.Vector(x, y, z));
      }
    }
    // this will attach all our vertices and create faces automatically
    this.computeFaces();
    // this will calculate the normals to help with lighting
    this.computeNormals();
    // this.averageNormals();
    // this.averagePoleNormals();
  });
}

function draw() {
  background(173, 215, 246);
  //rotateX(angle);
  rotateX(-90);
  //rotateY(angle);
 // rotateZ(angle);

  stroke(255, 184, 222);

  // orbitControl allows us to control shape with the mouse
  //https://p5js.org/reference/#/p5/orbitControl
  orbitControl();

  ambientLight(255, 54, 171);
  
  // If we add different colors to each directional light, we get stripes
  directionalLight(38, 103, 255, 0, 0, -1);
  directionalLight(38, 103, 255, 0, 0, -1);
  // push();
  // model(myGeometry);
  // pop();

  //angle += TWO_PI / frames;
  
  b[0].addBox(0,0,0);
}
