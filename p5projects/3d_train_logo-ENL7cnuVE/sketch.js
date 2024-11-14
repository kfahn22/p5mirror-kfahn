const detail = 10;
const r = 40;
let myGeometry;

function setup() {
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES);
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
  rotateY(millis() / 100);
  background(255)
  fill(255);
  noStroke();
  push()
  translate(0, -5)
  fill('#F89E4F');
  box(10, 50, 40);
  pop();
  push();
  fill('#F89E4F');
  translate(20, -5);
  box(10, 50, 40);
  pop();
  push();
  fill('#F89E4F');
  translate(-20, -5);
  box(10, 50, 40);
  pop();
  push();
  fill('#F89E4F');
  translate(0, 30);
  rotateX(180);
  box(50, 10, 40);
  pop();
  
  // add wheels
  push();
  fill('#2DC5F4');
  translate(20, 65, 15);
  rotateY(180)
  torus(16, 6);
  pop();
  push();
  fill('#2DC5F4');
  translate(-20, 65, 15);
  rotateY(180)
  torus(16, 6);
  pop();
  push();
  fill('#2DC5F4');
  translate(20, 65, -15);
  rotateY(180)
  torus(16, 6);
  pop();
  push();
  fill('#2DC5F4');
  translate(-20, 65, -15);
  rotateY(180)
  torus(16, 6);
  pop();
  
  // back wheels
  push();
  fill('#70327E');
  translate(-85, 45, -15);
  rotateY(180)
  torus(40, 10);
  pop();
  push();
  fill('#70327E');
  translate(-85, 45, 15);
  rotateY(180)
  torus(40, 10);
  pop();
  
  // back of train
  push();
  fill('#70327E');
  translate(-85, -35, 0);
  box(80, 70, 50);
  pop();
  push();
  fill('#70327E');
  translate(-95, -70, 0);
  box(100, 20, 50);
  pop();
  // chimney
  push();
  ambientLight(45, 197, 244);
  translate(0, -70, 0);
  rotateX(-90);
  model(myGeometry);
  pop();
  
  // front
  push();
  fill('#F063A4');
  translate(50, -20, 0);
  rotateZ(-30)
  box(10, 40, 40);
  pop();
  push();
  fill('#F063A4');
  translate(50, 10, 0);
  rotateZ(30)
  box(10, 40, 40);
  pop();
  push();
  fill('#F063A4');
  translate(50, 40, 0);
  rotateZ(-30)
  box(10, 40, 40);
  pop();
}

