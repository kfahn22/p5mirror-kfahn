class Bubble {
  constructor(x,y,r, img) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = 0;
  }
  
  clicked(x,y) {
    let d = dist(mouseX,mouseY, this.x, this.y);
    if (d < this.r) {
      this.color = 255;
      this.r = 2*this.r;
    }
  }
  
  
  move() {
    this.x = this.x + random(-.01,.01);
    this.y = this.y + random(-.01,.01);
  }
  
  show() {
    stroke(255);
    strokeWeight(4);
    fill(this.color);
    ellipse(this.x, this.y, this.r*2);
 
  }
}