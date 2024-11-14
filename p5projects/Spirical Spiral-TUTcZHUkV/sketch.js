// Reference for how to use p5 geometry
// https://p5js.org/learn/getting-started-in-webgl-custom-geometry.html

// Spirical spiral curve equation from Wolfram Alpha
// https://mathworld.wolfram.com/SphericalSpiral.html

let myGeometry;
let ang = 0;
let rotation = true;

//const detail = 250; // use this for spiral w/o triangles
const detail = 80;
const sc = 90;

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);

  myGeometry = new p5.Geometry(detail, detail, function () {
    for (let i = 0; i < detail + 1; i++) {
      let lat = map(i, 0, detail, -12*PI, 12*PI);

      for (let j = 0; j < detail + 1; j++) {
        let lon = map(j, 1, detail - 1, -2*PI, 2*PI);
        let a = 0.2;
        let r = 100;

        let den = sqrt(pow(a, 2) * pow(lon, 2) + 1)
        let x = r * cos(lon) * cos(lat) / den;
        let y = (r * sin(lon) * cos(lat)) / den;
        let z = - a * r * lon / den;

        // spirical spiral - no triangles
        // let den = sqrt(pow(a, 2) * pow(lat, 2) + 1);
        // let x = (r * cos(lat)) / den;
        // let y = (r * sin(lat) ) / den;
        // let z = (-a * r * lat) / den;

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
  background(185, 214, 242);
  rotateX(ang);
  // rotateY(ang);
  // rotateZ(ang);

  stroke(0,53,89);
  strokeWeight(1)

  // orbitControl allows us to control shape with the mouse
  //https://p5js.org/reference/#/p5/orbitControl
  orbitControl();

  // We need two directional lights coming from opposite directions

  // If we add different colors to each directional light, we get a different color on bottom of spiral
  directionalLight(0,109, 170, 0, 0, 1);
  directionalLight(210,130,166, 0, 0, -1);
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
