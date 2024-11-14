class Star {
  constructor(_x, _y, _r1, _r2, _col) {
    this.x = _x;
    this.y = _y;
    // this.v = createVector(_x, _y);
    this.r1 = _r1;
    this.r2 = _r2;
    this.col = _col;
    this.adj = 10;
    this.points = [];
    this.particles = [];
    this.springs = [];
  }

  // change to TWO_PI to 360 get fish-like shape??
  addPoints() {
    for (let i = 0; i < 10; i++) {
      let angle = (TWO_PI * i) / 5;
      let x = cos(angle) * this.r1;
      let y = sin(angle) * this.r1;
      this.points.push(createVector(x, y));
      this.particles.push(new Particle(this.points[i].x, this.points[i].y));
      angle += TWO_PI / this.adj;
      x = cos(angle) * this.r2;
      y = sin(angle) * this.r2;
      this.points.push(createVector(x, y));
      this.particles.push(new Particle(this.points[i].x, this.points[i].y));
    }
    return this.particles;
  }

  connectPoints() {
    for (let i = 0; i < this.particles.length - 1; i++) {
      let particle_i = this.particles[i];
      for (let j = i + 1; j < this.particles.length; j++) {
        let particle_j = this.particles[j];
        // A Spring needs two particles, a resting length, and a strength
        this.springs.push(new Spring(particle_i, particle_j, 0.01));
      }
    }
  }

  //TODO:
  // Add boundaries

  show() {
    push();
    translate(this.x, this.y);
    fill(this.col);
    noStroke();
    //stroke(237, 230, 13);
    beginShape();
    for (let particle of this.particles) {
      vertex(particle.x, particle.y);
    }
    endShape(CLOSE);
    pop();
  }
}
