class Particle {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.vx = random(-5,5);
    this.vy = random(-5,5);
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x > width || this.x < 0) this.vx *= -1;
    if (this.y > height || this.y < 0) this.vy *= -1;
  }
  
  
}