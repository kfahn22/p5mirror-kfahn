// https://mathcurve.com/courbes2d.gb/cornu/cornu.shtml

// https://virtualmathmuseum.org/Curves/clothoid/kappaCurve.html

class CornuSpiral {
  constructor(numPoints, maxT, r, angle) {
    this.numPoints = numPoints;
    this.maxT = maxT;
    this.r = r;
    this.n = 50;
    this.c = 0;
    this.angle = angle;
    this.points = [];
  }

  calculatePoints() {
    let points = [];
    for (let i = 0; i < this.numPoints; i++) {
      let t = map(i, 0, this.numPoints, -this.maxT, this.maxT);
      let x = this.c + this.r * this.fresnelC(t);
      let y = this.c + this.r * this.fresnelS(t);
      this.points.push(createVector(x, y));
    }
  }

  fresnelC(t) {
    let sum = 0;
    let dt = t / this.n;
    for (let i = 0; i < this.n; i++) {
      let u = i * dt;
      sum += cos(u * u / 2) * dt;
    }
    return sum;
  }

  fresnelS(t) {
    let sum = 0;
    let dt = t / this.n;
    for (let i = 0; i < this.n; i++) {
      let u = i * dt;
      sum += sin(u * u /2 ) * dt;
    }
    return sum;
  }

  show(x, y) {
    push();
    translate(x, y);
    rotate(this.angle);
    stroke(255);
    strokeWeight(1.2);
    noFill();
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape();
    pop();
  }
}
