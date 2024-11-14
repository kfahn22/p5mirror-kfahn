class Superellipse {
  constructor(x, y, r, a, b, m, angle, palette) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.m = m;
    this.a = a;
    this.b = b;
    this.palette = palette;
    this.angle = angle;
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

  show(sw) {
    push();
    translate(this.x, this.y);
    fill(0);
    //noFill()
    rotate(radians(this.angle));
    let c = this.palette[0];
    c[3] = 200;
    //stroke(c);
    stroke(251, 234, 206, 230);
    strokeWeight(sw)
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape();
    pop();
  }
}
