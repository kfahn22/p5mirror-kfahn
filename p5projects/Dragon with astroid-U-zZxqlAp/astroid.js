// https://mathcurve.com/courbes2d.gb/astroid/astroid.shtml
// https://mathworld.wolfram.com/Astroid.html

class Astroid {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.points = [];
  }

  addPoints() {
    for (let theta = 0; theta < TWO_PI; theta += 0.1) {
      let x = this.r * pow(cos(theta), 3);
      let y = this.r * pow(sin(theta), 3);
      this.points.push(createVector(x, y));
    }
  }

  show() {
    push();
    translate(this.x, this.y);
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
    pop();
  }
}
