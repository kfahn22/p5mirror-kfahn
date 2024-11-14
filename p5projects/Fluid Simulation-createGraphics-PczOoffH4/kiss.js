// https://mathcurve.com/courbes2d.gb/bouche/bouche.shtml

class KissCurve {
  constructor(r) {
    this.pg = createGraphics(400, 400);
    this.fluid = new Fluid(0.2, 0, 0.0000001);
    this.r = r;
    this.points = [];
  }

  calculatePoints() {
    for (let theta = 0; theta < TWO_PI; theta += 0.1) {
      let x = this.r * cos(theta);
      let y = this.r * pow(sin(theta), 3);
      this.points.push(createVector(x, y));
    }
  }

  addFluid() {
    let cx = int((0.5 * width) / SCALE);
    let cy = int((0.5 * height) / SCALE);
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        this.fluid.addDensity(cx + i, cy + j, random(50, 150));
      }
    }

    for (let i = 0; i < 5; i++) {
      let angle = noise(t) * TWO_PI * 2;
      let v = p5.Vector.fromAngle(angle);
      v.mult(0.2);
      t += 0.01;
      this.fluid.addVelocity(cx, cy, v.x, v.y);
    }
    this.fluid.step();

    // Render to the graphics buffer
    this.pg.clear();

    this.fluid.renderD(this.pg);
    
    image(this.pg, 0, 0);
  }

  show(x, y) {
    push();
    translate(x, y);
    noStroke();
    fill(image);
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape();
    pop();
  }
}
