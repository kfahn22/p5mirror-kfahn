class Star {
  constructor(img) {
    this.particles = [];
    this.springs = [];
    this.eyes = [];
    this.trail = [];
    this.img = img;
  }

  addPoints() {
    this.particles.push(new Particle(234, 187, 0, img)); //0
    this.particles.push(new Particle(261, 201, 0, img));
    this.particles.push(new Particle(276, 228, 0, img));
    this.particles.push(new Particle(298, 206, 0, img));
    this.particles.push(new Particle(328, 200, 0, img)); //right leg
    this.particles.push(new Particle(314, 172, 0, img));
    this.particles.push(new Particle(317, 142, 0, img)); // left leg
    this.particles.push(new Particle(287, 146, 0, img));
    this.particles.push(new Particle(259, 134, 0, img));
    this.particles.push(new Particle(254, 164, 0, img));

    // add eyes
    this.eyes.push(new Particle(273, 182, 1, img));
    this.eyes.push(new Particle(292, 172, 1, img));

    // left trail
    this.trail.push(new Particle(335, 175, 2, img));
    this.trail.push(new Particle(365, 200, 2, img));
    this.trail.push(new Particle(390, 230, 2, img));
    this.trail.push(new Particle(410, 260, 2, img));

    // right trail
    this.trail.push(new Particle(380, 190, 2, img));
    this.trail.push(new Particle(420, 210, 2, img));
    this.trail.push(new Particle(460, 245, 2, img));

    console.log(this.trail.length);

    return this.particles[0];
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
    for (let particle of this.particles) {
      this.springs.push(new Spring(particle, this.eyes[0], 0.01));
      this.springs.push(new Spring(particle, this.eyes[1], 0.01));
      this.springs.push(new Spring(particle, this.trail[0], 0.01));
      this.springs.push(new Spring(particle, this.trail[1], 0.01));
      this.springs.push(new Spring(particle, this.trail[4], 0.01));
    }
    this.springs.push(new Spring(this.eyes[0], this.eyes[1], 0.01));

    for (let i = 0; i < this.trail.length - 1; i++) {
      let particle_i = this.trail[i];
      for (let j = i + 1; j < this.trail.length; j++) {
        let particle_j = this.trail[j];
        // A Spring needs two particles, a resting length, and a strength
        this.springs.push(new Spring(particle_i, particle_j, 0.01));
      }
    }
  }

  show() {
    fill(255, 255, 107);
    stroke(255, 255, 107);
    beginShape();
    for (let particle of this.particles) {
      vertex(particle.x, particle.y);
    }

    endShape(CLOSE);

    this.eyes[0].show();
    this.eyes[1].show();
    for (let i = 0; i < this.trail.length; i++) {
      this.trail[i].show();
    }
  }
}
