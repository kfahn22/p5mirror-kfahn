class Craniod {
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
  
  // https://mathworld.wolfram.com/Cranioid.html
  craniod() {
    let p = 0.75;
    let q = 0.75;
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let r =
        this.a * sin(theta) +
        this.b * sqrt(1 - p * pow(cos(theta), 2)) +
        this.m * sqrt(1 - q * pow(cos(theta), 2));
      let x = this.r * r * cos(theta);
      let y = this.r * r * sin(theta);
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
