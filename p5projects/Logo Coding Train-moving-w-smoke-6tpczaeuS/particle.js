// I had to play around with the velocity ranges to get the particle system looking normal

class Particle {

  constructor(_x,_y) {
    this.x = _x;
    this.y = _y;
    this.vx = random(5,15);
    this.vy = random(-40, -5);
    this.alpha = 100;
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }

  show() {
    noStroke();
    fill(240, 99, 164, this.alpha);
    ellipse(this.x, this.y, 10);
  }

}