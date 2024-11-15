// https://mathcurve.com/courbes2d.gb/deltoid/deltoid.shtml

class Quadrifolium {
  constructor(x, y, r, a, angle) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.a = 1;
    this.angle = angle;
    this.points = [];
  }

  addPoints() {
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let x = this.r * (2 * this.a * pow(sin(theta), 2) * cos(theta));
      let y = this.r * (2 * this.a * pow(cos(theta), 2) * sin(theta));
      this.points.push(createVector(x, y));
    }
  }
  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape();
    pop();
  }
}
