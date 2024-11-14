class Swirl {
  constructor(x,y, color) {
    this.x = x;
    this.y = y;
    this.color = 0;
  }


  show(w,h, start, end) {
      stroke(255,0,0);
      strokeWeight(6);
      arc(this.x,this.y, w, h, start, stop);
      
  }

  
  draw(a=10) {
    stroke(this.color);
    fill(this.color);
    beginShape();
    vertex(0,0);
    bezierVertex(0.5*a,0, 2*a, 0.5*a, 10*a,0);
    bezierVertex(3*a, a, 0.5*a, a, 0,a);
    endShape(CLOSE);
  }

  
}