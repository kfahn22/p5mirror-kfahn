class Scales {
  constructor(x, y, r, a, n, palette) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.n = n;
    this.a = a;
    this.palette = palette;
    this.points = [];
  }

  zigzag() {
    for (let theta = -PI / 2; theta < this.a * PI; theta += 0.1) {
      let x = this.r * sin(theta);
      let y = ((this.r * pow(this.n, 2)) / 2) * (theta + sin(theta) * cos(theta));
      this.points.push(createVector(x, y));
    }
  }
  
  reverseZigzag() {
    for (let theta = -PI / 2; theta < this.a * PI; theta += 0.1) {
      let x = -this.r * sin(theta);
      let y = ((this.r * pow(this.n, 2)) / 2) * (theta + sin(theta) * cos(theta));
      this.points.push(createVector(x, y));
    }
  }
  tear() {
  let points = [];
    let n = 4;
    for (let theta = 0; theta < TWO_PI; theta += 0.1) {
      let x = this.r * cos(theta);
      let y = this.r * sin(theta) * pow(sin(theta / 2), n);
      points.push(createVector(x, y));
    }
  return points;
}

  show() {
    push();
    translate(this.x, this.y);
    let c = random(this.palette);
    stroke(c);
    c[3] = 150;
    fill(c);
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape();
    pop();
  }
}
