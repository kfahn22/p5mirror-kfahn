// https://mathcurve.com/courbes2d.gb/cornu/cornu.shtml
// https://virtualmathmuseum.org/Curves/clothoid/kappaCurve.html


class CornuSpiral {
  constructor(n, maxSpirals, r, angle) {
    this.n = n;
    this.maxSp = maxSpirals;
    this.r = r;
    this.m = 50;
    this.angle = angle;
    this.points = [];
  }

  calculatePoints() {
    for (let i = 0; i < this.n; i++) {
      let t = map(i, 0, this.n, -this.maxSp, this.maxSp);
      let x = this.r * this.fresnelC(t);
      let y = this.r * this.fresnelS(t);
      this.points.push(createVector(x, y));
    }
  }

  fresnelC(t) {
    let sum = 0;
    let dt = t / this.m;
    for (let i = 0; i < this.m; i++) {
      let u = i * dt;
      sum += cos(u * u / 2) * dt;
    }
    return sum;
  }

  fresnelS(t) {
    let sum = 0;
    let dt = t / this.m;
    for (let i = 0; i < this.m; i++) {
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
