// Adapted from Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/78-simple-particle-system
// https://youtu.be/UcdigVaIYAk

class Particle {
  constructor(_x, _y, _hue) {
    this.x = _x;
    this.y = _y;
    this.z = 0;
    this.pos = createVector(this.x, this.y);
    this.size = 4;
    this.noiseForce = 10;
    this.noiseScale = 0.005; // inverse effect on arcs
    this.fadeRate = 0.005;
    this.particles = [];
    this.hue = _hue;
    this.curl = createVector();
    this.alpha = 1;
    this.lightness = 100;
    this.noise = new OpenSimplexNoise();
    this.timeMult = 0.0002;
  }

  getCurl(x, y, f) {
    const delta = 0.01;
    let n1 = this.noise.noise3D(x + delta, y, f);
    let n2 = this.noise.noise3D(x - delta, y, f);
    const cy = -(n1 - n2) / (delta * 2);

    n1 = this.noise.noise3D(x, y + delta, f);
    n2 = this.noise.noise3D(x, y - delta, f);
    const cx = (n1 - n2) / (delta * 2);

    return createVector(cx, cy);
  }

  update(f) {
    let curl = this.getCurl(
      this.pos.x * this.noiseScale,
      this.pos.y * this.noiseScale,
      f
    );
    this.pos.add(curl.mult(this.noiseForce));
    this.alpha -= this.fadeRate;
    this.lightness -= this.fadeRate * 100;
  }

  show(f) {
    noStroke();
    let curl = this.getCurl(f, 0, 0);
    //let col = color(int(random(200, 250) * curl.x), 100, this.lightness, this.alpha);
    let col = color(this.hue, 100, this.lightness, this.alpha);
    fill(col);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
    //rect(this.pos.x, this.pos.y, 4*this.size, this.size);
    //arc(this.pos.x, this.pos.y, 2 * this.size, this.size, 0, 90, PIE);
  }
}
