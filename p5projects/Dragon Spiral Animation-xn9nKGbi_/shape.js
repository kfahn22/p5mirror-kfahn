class DragonShape {
  constructor(buffer, x, y, length, angle) {
    this.buffer = buffer;
    this.x = x;
    this.y = y;
    this.length = length;
    this.angle = angle;
    this.points = [];
  }

  // https://mathcurve.com/courbes2d.gb/archimede/archimede.shtml
  archimedesSpiral(sc, n) {
    let a = 0.1;
    let dir = -1;
    for (let theta = 0; theta < 4 * PI; theta += 0.05) {
      let r = dir * a * pow(theta, 1);
      let x = this.length * sc * r * cos(theta);
      let y = this.length * sc * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  show(palette) {
    let c = random(palette);
    this.buffer.stroke(c);
    this.buffer.push();
    this.buffer.translate(this.x, this.y);
    this.buffer.rotate(this.angle);
    this.buffer.beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    this.buffer.endShape(CLOSE);
    this.buffer.pop();
  }

  openShow(palette) {
    let c = random(palette);
    this.buffer.stroke(c);
    this.buffer.push();
    this.buffer.translate(this.x, this.y);
    this.buffer.rotate(this.angle);
    this.buffer.beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    this.buffer.endShape();
    this.buffer.pop();
  }
}
