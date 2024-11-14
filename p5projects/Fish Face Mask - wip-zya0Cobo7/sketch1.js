let points = [];

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(0);
  stroke(0);
  fill(100, 150, 255); // Light blue for the fin

  //deltoid(30)
  clover(30, 2, 4);

  push();
  translate(width / 2, height / 2);
  //rotate(angle);
  beginShape();
  for (let p of points) {
    vertex(p.x, p.y);
  }
  endShape(CLOSE);
  pop();
}

// d = 5; m = 4

// clover() {
//     for (let theta = 0; theta < TWO_PI; theta += 0.05) {
//       let r = 1 + cos(this.m * theta) + pow(sin(this.m * theta), 2);
//       let x = this.r * r * cos(theta);
//       let y = this.r * r * sin(theta);
//       this.points.push(createVector(x, y));
//     }
//   }

function fishfin(x1, y1, x2, y2, l) {
  let d = abs(x2 - x1);
  line(x1, y1, l);
  arc(x1 + l, y1, d, d, 0, PI / 3, OPEN);
  line(x2, y2, l);
}

function clover(sc, d, m) {
  for (let theta = 0; theta < TWO_PI; theta += 0.05) {
    let r = 1 + pow(cos(m * theta), 2) + pow(sin(m * theta), 2);
    let x = sc * r * cos(theta);
    let y = sc * r * sin(theta);
    points.push(createVector(x, y));
  }
}

function deltoid(sc) {
  let a = 2;
  for (let theta = 0; theta < TWO_PI; theta += 0.05) {
    let r = 4 * a * pow(cos(theta / 2), 2) - 0 * cos(theta);
    let x = sc * r * (cos(theta) - a);
    //let y = sc * (2 * a * pow(sin(theta / 2), 2) * sin(theta));
    let y = sc * r * sin(theta);
    points.push(createVector(x, y));
  }
}
