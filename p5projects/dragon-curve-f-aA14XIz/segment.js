class Segment {
  constructor(a, b, origin) {
    this.startA = a;
    this.startB = b;
    this.a = a.copy();
    this.b = b.copy();
    this.completed = false;
    this.angle = 0;
    this.origin = origin.copy();
  }

  show() {
    stroke(0);
    strokeWeight(2);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }

  duplicate(origin) {
    return new Segment(this.a.copy(), this.b.copy(), origin);
  }

  update() {
    this.angle = HALF_PI;
    let va = p5.Vector.sub(this.startA, this.origin);
    let vb = p5.Vector.sub(this.startB, this.origin);
    va.rotate(-this.angle);
    vb.rotate(-this.angle);
    this.a = p5.Vector.add(this.origin, va);
    this.b = p5.Vector.add(this.origin, vb);
  }
}
