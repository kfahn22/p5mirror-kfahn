class Thing {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.v = [];
    this.col = color(random(255), random(255), random(255));
    this.position = createVector(this.x, this.y);
    for (let i = 0; i < 100; i++) {
      let angle = map(i, 0, 100, 0, TWO_PI);
      this.v.push(createVector(this.r * cos(angle), this.r * sin(angle)));
    }
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    fill(this.col);
    noStroke();
    beginShape();
    for (let v of this.v) {
      vertex(v.x, v.y);
    }
    endShape();
    pop();
  }
}