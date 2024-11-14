// Formula for Seashell from https://mathworld.wolfram.com/Seashell.html
// The sea shell on mathworld has more rotations, but I am not sure why

// Instead of using beginShape(), endShape(), vertex() we use the p5.Geometry class to handle the vertices.

// Reference for how to use p5 geometry
// https://p5js.org/learn/getting-started-in-webgl-custom-geometry.html

let ang = 0;
let rotation = true;

const detail = 75; 
const sc = 90;

const e = 2.718281828459045;

let myGeometry;

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);

  myGeometry = new p5.Geometry(detail, detail, function () {
    for (let i = 0; i < detail+1; i++) {
      let lat = map(i, 0, detail, -2*PI, 0);
      
      for (let j = 0; j < detail+1 ; j++) {
      let lon = map(j, 1, detail-1, -PI, PI);
        
        let m = pow(e, (lat/6*PI));
        let x = sc * 2 * (1 - m)* cos(lat)*pow(cos(lon/2), 2);
        let y = sc * 2 * (-1 + m)* sin(lat)*pow(cos(lon/2), 2);
        let z = sc * (1 - pow(e, (lat/3*PI)) - sin(lon) + m * sin(lon));
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
  rotateY(ang);
  rotateZ(ang);

  stroke(76, 92, 104);
  
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
