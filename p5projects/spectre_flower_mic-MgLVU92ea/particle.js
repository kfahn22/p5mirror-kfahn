class Particle {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2,2);
    this.vy = random(-2,2);
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x > width || this.x < 0) this.vx *= -1;
    if (this.y > height || this.y < 0) this.vy *= -1;
  }
  
  
}