// 3D approximation of Coding Train logo
// https://github.com/CodingTrain/Coding-Train-Logo

// For a reference on how to create a custom p5.Geometry see
// https://p5js.org/learn/getting-started-in-webgl-custom-geometry.html

const detail = 10;
const r = 40;
let myGeometry;
let angle = 0;
let frames = 60;

function keyPressed() {
  if (key == "s") {
    const options = {
      units: "frames",
      delay: 0,
    };
    saveGif("GIF/logo.gif", frames, options);
  }
}

function setup() {
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES);
  // add chimney
  myGeometry = new p5.Geometry(detail, detail, function () {
    for (let i = 0; i < detail + 1; i++) {
      // let lat = map(i, 0, detail, 0, PI);
      let lat = map(i, 0, 0.4 * detail, 40, 64);

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
  });
}

function draw() {
  rotateY(angle);
  //rotateY(225); // for static image
  background(255);
  fill(255);
  noStroke();

  // add train
  scale(0.8);
  train();
  angle -= 360 / frames;
}

// function mousePressed() {
//   saveCanvas("logo.jpg");
// }

function train() {
  // center
  push();
  translate(0, -5);
  fill("#F89E4F");
  box(10, 50, 70);
  pop();
  push();
  fill("#F89E4F");
  translate(30, -5);
  box(10, 50, 70);
  pop();
  push();
  fill("#F89E4F");
  translate(-30, -5);
  box(10, 50, 70);
  pop();
  push();
  fill("#F89E4F");
  translate(0, 30);
  rotateX(180);
  box(70, 10, 70);
  pop();

  // front wheels
  push();
  fill("#2DC5F4");
  translate(20, 65, 25);
  rotateY(180);
  torus(17, 6);
  pop();
  push();
  fill("#2DC5F4");
  translate(-20, 65, 25);
  rotateY(180);
  torus(17, 6);
  pop();
  push();
  fill("#2DC5F4");
  translate(20, 65, -25);
  rotateY(180);
  torus(17, 6);
  pop();
  push();
  fill("#2DC5F4");
  translate(-20, 65, -25);
  rotateY(180);
  torus(16, 6);
  pop();

  // back wheels
  push();
  fill("#70327E");
  translate(-85, 45, -25);
  rotateY(180);
  torus(38, 9);
  pop();
  push();
  fill("#70327E");
  translate(-85, 45, 25);
  rotateY(180);
  torus(38, 9);
  pop();

  // back of train
  push();
  fill("#70327E");
  translate(-85, -35, 0);
  box(80, 70, 70);
  pop();
  push();
  fill("#70327E");
  translate(-90, -70, 0);
  box(90, 20, 70);
  pop();

  // chimney
  push();
  scale(1.2);
  ambientLight(45, 197, 244);
  translate(0, -60, 0);
  rotateX(-90);
  model(myGeometry);
  pop();

  // front
  push();
  fill("#F063A4");
  translate(70, -30, 0);
  rotateZ(-30);
  box(10, 50, 50);
  pop();
  push();
  fill("#F063A4");
  translate(70, 10, 0);
  rotateZ(30);
  box(10, 50, 50);
  pop();
  push();
  fill("#F063A4");
  translate(70, 50, 0);
  rotateZ(-30);
  box(10, 50, 50);
  pop();
}
