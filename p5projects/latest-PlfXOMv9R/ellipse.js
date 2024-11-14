class eLoop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = (0);
  }

  show () {
    stroke(this.color);
    fill(255, 0, 0);
    ellipse(0,0, 20, 20);
    ellipse(0,0, 10,10);
    
  }
}