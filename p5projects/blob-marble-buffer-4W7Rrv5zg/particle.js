class Particle {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2,2);
    this.vy = random(-2,2);
    this.col = color(random(255), random(255), random(255));
  }
  
  
  show() {
    stroke(this.col);
    fill(this.col);
    //square(this.x - width/2, this.y - height/2, 50);
    line(this.x, this.y, this.x - width/2, this.y - height/2);
    //point(this.x - width/2, this.y - height/2);
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x > width || this.x < 0) this.vx *= -1;
    if (this.y > height || this.y < 0) this.vy *= -1;
  }
  
  
}
