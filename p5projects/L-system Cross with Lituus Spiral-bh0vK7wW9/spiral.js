// https://mathcurve.com/courbes2d.gb/archimede/archimede.shtml

// n = 1 Archimedian Spiral
// n = -1 Hyperbolic Spiral
// n = 1/2 Fermat spiral
// n = -1/2 Lituus spiral
// n = 2 Galilean spiral

class Spiral {
  constructor(x, y, dir, sc, a, n, angle) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.sc = sc;
    this.a = a;
    this.points = [];
    this.n = n;
    this.angle = angle;
    this.maxRot = 4; // 4
    this.c = 5; // adjust to extend line
  }

  calculatePoints() {
    for (let theta = 0; theta < this.maxRot * PI; theta += 0.1) {
      let r = this.dir * this.a * pow(theta, this.n);
      let x = this.sc * r * cos(theta) - this.c;
      let y = this.sc * r * sin(theta) + this.c;
      this.points.push(createVector(x, y));
    }
  }

  show(i, rl) {
    push();
    translate(this.x, this.y);
    let amt = map(i, 0, rl, 0, 1);
    let c1 = color(255,149,140);
    let c2 = color(238,133,181);
    let c = lerpColor(c1, c2, amt);
    stroke(c);
    rotate(this.angle);
    strokeWeight(1.5);
    noFill();
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape();
    pop();
  }
}