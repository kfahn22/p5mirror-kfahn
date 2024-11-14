// 3D approximation of Coding Train logo
// https://github.com/CodingTrain/Coding-Train-Logo

// For a reference on how to create a custom p5.Geometry see
// https://p5js.org/learn/getting-started-in-webgl-custom-geometry.html

// params for spider leg
const p = 9;
const q = 8;
const r = 5; // will determine scale of knot
const h = 180;

const detail = 80;
let myGeometry;
let angle = 0;
let frames = 60;

// function keyPressed() {
//   if (key == "s") {
//     const options = {
//       units: "frames",
//       delay: 0,
//     };
//     saveGif("GIF/spider.gif", frames, options);
//   }
// }

function setup() {
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES);
  // add chimney
  myGeometry = new p5.Geometry(detail, detail, function () {
    for (let i = 0; i < detail+1; i++) {
      // let lat = map(i, 0, detail, 0, PI);
      let lat = map(i, 0, 0.4 * detail, 0, 180);

      for (let j = 0; j < h/2; j++) {
        //let lon = map(j, 0, detail, 0, 360);
        let x = r * sin(lat) * cos(j);
        let y = j;
        // let y = r * sin(lat) * sin(h + lon);
        // let x = r * sin(lat) * cos(lon);
        let z = r * cos(lat);
        this.vertices.push(new p5.Vector(x, y, z));
      }
      for (let j = 0; j < h/2; j--) {
        let x = r * sin(lat) * cos(j);
        let y = j;
        // let y = r * sin(lat) * sin(h + lon);
        // let x = r * sin(lat) * cos(lon);
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
  background('#F89E4F')
  fill(255);
  noStroke();

  // add spider
  scale(0.8);
  spider();
  //angle -= 360 / frames;
  angle -= 1;
}

// function mousePressed() {
//   saveCanvas("logo.jpg");
// }

function spider() {
  // center
  // push();
  // fill(0);
  // ellipsoid(50, 40, 40);
  // pop();
  // // eyes
  // push();
  // fill("#FCEE21");
  // translate(30, -40);
  // ellipsoid(5, 5, 5);
  // pop();
  // push();
  // fill("#FCEE21");
  // translate(-30, -40);
  // ellipsoid(5, 5, 5);
  // pop();
  
  // legs
  push();
  scale(2);
  ambientLight(25, 0, 100);
  translate(40, 20, 20);
  rotateX(45);
  model(myGeometry);
  pop();
}
