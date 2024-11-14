// https://github.com/CodingTrain/Coding-Challenges/blob/main/168_Mandelbulb/Processing/MandelBulb_Color/MandelBulb_Color.pde

// int DIM = 256;
// PeasyCam cam;
// ArrayList<MandelPoint> mandelbulb = new ArrayList<MandelPoint>();
// StringList points = new StringList();
// int maxiterations = 20;

class MandelPoint {
  //PVector v;
  //float i;

  Constructor( _v, _i) {
    this.v = v;
    this.i = i;
    this.dim = 256;
    this.points = [];
  }
}

// void setup() {
//   size(600, 600, P3D);
//   cam = new PeasyCam(this, 600);

  for (int i = 0; i < this.dim; i++) {
    for (int j = 0; j < this.dim; j++) {

      let edge = false;
      let lastIteration = 0;
      let z = map(k, 0, this.dim, -1, 1);

        let zeta = createVector(0, 0, 0);
        let n = 8;
        let iteration = 0;
        while (true) {
          let c = spherical(zeta.x, zeta.y, zeta.z);
          let newx = pow(c.r, n) * sin(c.theta*n) * cos(c.phi*n);
          let newy = pow(c.r, n) * sin(c.theta*n) * sin(c.phi*n);
          let newz = pow(c.r, n) * cos(c.theta*n);
          zeta.x = newx + x;
          zeta.y = newy + y;
          zeta.z = newz + z;
          iteration++;

          if (c.r > 2) {
            lastIteration = iteration;
            if (edge) {
              edge = false;
            }
            break;
          }
          if (iteration > maxiterations) {
            if (!edge) {
              edge = true;
              mandelbulb.add(new MandelPoint(new createVector(x*200, y*200, z*200), lastIteration));
              points.append(x + " " + y + " " + z);
            }
            break;
          }
        }
      }
    }
  }
 
  //saveStrings("mandelbulb.txt", output);
}

// function spherical(r, theta, phi) {
//   let r, theta, phi;
//   // Spherical(float r, float theta, float phi) {
//     r = r;
//     theta = theta;
//     phi = phi;
//  // }
// }

function spherical(_x, _y, _z) {
  let r = sqrt(x*x + y*y + z*z);
  let theta = atan2( sqrt(x*x+y*y), z);
  let phi = atan2(y, x);
  return new createVector(r, theta, phi);
}

// void draw() {
//   background(0);
//   rotateX(PI/4);
//   rotateY(-PI/3);
//   colorMode(HSB, 255);
//   for (MandelPoint m : mandelbulb) {
//     stroke(map(m.i, 0, maxiterations, 255, 0), 255, 255);
//     strokeWeight(1);
//     point(m.v.x, m.v.y, m.v.z);
//   }
// }