class Superellipse {
  constructor(x, y, r, a, b, m) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.m = m;
    this.a = a;
    this.b = b;
    this.points = [];
  }
  
  sgn(val) {
    if (val == 0) {
      return 0;
    }
    return val / abs(val);
}

superellipse() {
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let na = 2 / this.m;
      let x = this.r * pow(abs(cos(theta)), na) * this.a * this.sgn(cos(theta));
      let y = this.r * pow(abs(sin(theta)), na) * this.b * this.sgn(sin(theta));
      this.points.push(createVector(x, y));
    }
  }

  show() {
    push();
    translate(this.x, this.y);
    fill(0);
    stroke(251, 234, 206, 255);
    strokeWeight(8)
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape();
    pop();
  }
}
