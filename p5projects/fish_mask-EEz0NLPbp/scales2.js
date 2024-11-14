class TearScales {
  constructor(x, y, r, dir, palette) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dir = dir;
    this.palette = palette;
    this.points = [];
  }

  tear() {
    let points = [];
    let n = 4;
    for (let theta = 0; theta < TWO_PI; theta += 0.1) {
      let x = this.dir * this.r * cos(theta);
      let y = this.r * sin(theta) * pow(sin(theta / 2), 2);
      this.points.push(createVector(x, y));
    }
   
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
