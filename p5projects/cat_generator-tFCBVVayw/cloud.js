class Cloud {
  constructor(x,y,r) {
    this.x = x;
    this.y = y;
   
    this.color = color(255,2655,255, 20);
  }
  
  show() {
    stroke(this.color)
    //draw cloud
    ellipse(100,50,30, 10);
    ellipse(125,45,50,35);
    ellipse(115,60,75, 25);
    // beginShape();
    // vertex(this.x* 0.1*width, this.y * 0.1*height);
    // bezierVertex(0.15*width, 0.1*height, 0.10* width, 0.1 * height,this.x* 0.2*width, this.y* 0.2*height);
    //  vertex(this.x* 0.1*width, this.y * 0.1*height);
    // bezierVertex(0.1*width, 0.15*height, 0.10* width, 0.1 * height,this.x* 0.15*width, this.y* 0.1*height);
    // endShape();
  }
  
}