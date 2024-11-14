class Body {
  static get BASE_RAD() { return 30; }

  constructor (sketch, orbit, rate, radius) {
    this.p = sketch;
    this.orb = orbit, this.spd = rate, this.rad = radius;
    this.initBody();
  }

  initBody() {
    const {random, hex, TAU} = this.p;
    this.rot = random(TAU);
    this.c = this.p.color('#' + hex(~~random(0x1000), 3));
  }

  update() { this.rot += this.spd; }

  display() {
    this.p.rotate(this.rot).translate(this.orb, 0);
    this.p.fill(this.c).ellipse(0, 0, this.rad<<1);
  }
}
