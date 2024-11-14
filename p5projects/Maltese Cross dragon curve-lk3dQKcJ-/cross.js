// https://mathcurve.com/courbes2d.gb/croixdemalte/croixdemalte.shtml

class MalteseCross {
  constructor(r) {
    this.r = r;
    this.a = 3;
    this.points = [];
  }

  calculatePoints() {

    for (let theta = 0; theta < TWO_PI; theta += 0.1) {
      let x = this.r *  + cos(theta) * (pow(cos(theta), 2) - this.a)
      let y = this.r *  + sin(theta) * pow(cos(theta), 2)
      this.points.push(createVector(x, y));
    }
  }

  show(x, y) {
    push();
    translate(x, y);
    stroke(135,92,116)
    strokeWeight(2);
    fill(135,92,116);
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape();
    pop();
  }
}
