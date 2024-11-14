// For original implementation in Processing see
// https://thecodingtrain.com/challenges/26-3d-supershapes

// For a reference on how to create a custom p5.Geometry see
// https://p5js.org/learn/getting-started-in-webgl-custom-geometry.html

// FAIL!!

let ang = 0;
// const a = 1;
// const b = 1;
// let m = 5; //m = 0 yields a sphere
const DIM = 128;
// const detailX = 75; 
// const detailY = 75;
let rotation = true;
let geoSize;
let myGeometry;

function setup() {
  //createCanvas(500, 500, WEBGL);
  createCanvas(600, 600, WEBGL);
  noFill();
  strokeWeight(2);
  stroke(200);
  myGeometry = new p5.Geometry(DIM, DIM, function () {
    // for (let i = 0; i < detailX + 1; i++) {
    //   let lat = map(i, 0, detailX, -PI/2, PI/2);
    //   // 0.2, 1.7, 1.7
    //   let r2 = supershape(lat, m, 0.2, 1.7, 1.7);
    //   for (let j = 0; j < detailY + 1; j++) {
    //     let lon = map(j, 0, detailY, -PI, PI);
    //     let r1 = supershape(lon, m, 0.2, 1.7, 1.7);
    //     //let r1 = supershape(lon, m, 7.0, 5.0, 5.0);
    //     let x = r1 * cos(lon) * r2 * cos(lat);
    //     let y = r1 * sin(lon) * r2 * cos(lat);
    //     let z = r2 * sin(lat);
    //     this.vertices.push(new p5.Vector(x, y, z));
    //   }
    // }
    
    for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
      let edge = false;
      for (let k = 0; k < DIM; k++) {
        let x = map(i, 0, DIM, -1, 1);
        let y = map(j, 0, DIM, -1, 1);
        let z = map(k, 0, DIM, -1, 1);
        let zeta = createVector(0, 0, 0);
        let n = 8;
        let maxiterations = 20;
        let iteration = 0;
        while (true) {
          let c = new Spherical(zeta.x, zeta.y, zeta.z);
          let newx = pow(c.r, n) * sin(c.theta*n) * cos(c.phi*n);
          let newy = pow(c.r, n) * sin(c.theta*n) * sin(c.phi*n);
          let newz = pow(c.r, n) * cos(c.theta*n);
          zeta.x = newx + x;
          zeta.y = newy + y;
          zeta.z = newz + z;
          iteration++;
          if (c.r > 2) {
            if (edge) {
              edge = false;
            }
            break;
          }
          if (iteration > maxiterations) {
            if (!edge) {
              edge = true;
             // mandelbulb.add(createVector(x, y, z));
              this.vertices.push(new p5.Vector(x, y, z));
            }
            break;
          }
        }
      }
    }
  }
    // this will calculate the normals to help with lighting
    // this will attach all our vertices and create faces automatically
    this.computeFaces();
    this.computeNormals();
  });
}

function draw() {
  background(87,31,78);
  rotateX(ang);
  // rotateY(ang);
  // rotateZ(ang);

  // Uncomment if you want to see the wireframe
  noStroke();

  orbitControl();
  lights();
  ambientMaterial(79,117,155);

  push();
  // Use scale instead of r to size the supershape
  geoSize = width /5;
  scale(geoSize);
  rotateY((cos(millis() / 1000) * PI) / 4);
  model(myGeometry);
  pop();

  if (rotation) {
    ang += 0.01;
  }
}

// function supershape(theta, m, n1, n2, n3) {
//   let t1 = abs((1 / a) * cos((m * theta) / 4));
//   t1 = pow(t1, n2);

//   let t2 = abs((1 / b) * sin((m * theta) / 4));
//   t2 = pow(t2, n3);

//   t3 = t1 + t2;
//   let r = pow(t3, -1 / n1);
//   return r;
// }
