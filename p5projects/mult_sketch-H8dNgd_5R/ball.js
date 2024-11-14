class Ball {
  static get VEL() { return 2; }
  static get MIN_RAD() { return 5; }
  static get MAX_RAD() { return 30; }

  constructor (p) {
    this.p = p;
    this.pos = p.createVector(), this.vel = p.createVector();
    this.initBall();
  }

  initBall() {
    const p = this.p,
          r = this.rad = p.random(Ball.MIN_RAD, Ball.MAX_RAD),
          v = Ball.VEL;
    this.pos.set(p.random(r, p.width - r), p.random(r, p.height - r));
    this.vel.set(p.random(-v, v), p.random(-v, v));
    this.c = p.color('#' + p.hex(~~p.random(0x1000), 3));
  }

  update() {
    const {pos, rad} = this, {width: w, height: h} = this.p;
    pos.add(this.vel);
    pos.x > w - rad | pos.x < rad && (this.vel.x *= -1);
    pos.y > h - rad | pos.y < rad && (this.vel.y *= -1);
  }

  display() {
    this.p.fill(this.c).ellipse(this.pos.x, this.pos.y, this.rad<<1);
  }
}
