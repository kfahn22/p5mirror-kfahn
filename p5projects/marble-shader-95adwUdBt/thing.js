class Thing {
  constructor(x, y, r) {
    this.v = [];
    this.col = color(random(100, 255), random(0, 50), random(100, 255));
    this.position = createVector(x, y);
    for (let i = 0; i < 100; i++) {
      let angle = map(i, 0, 100, 0, TWO_PI);
      this.v.push(createVector(r * cos(angle), r * sin(angle)));
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