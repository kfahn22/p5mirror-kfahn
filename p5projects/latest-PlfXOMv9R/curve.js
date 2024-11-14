class Curve {
  constructor(x,y,w,h) {
    this.x = 0;
    this.y = 0;
    // this.w = w;
    // this.h = h;
    this.color = 255;
  }


  show(w,h) {
      // draw two ellipses and set fill to background color
      //ellipse(this.x,this.y, this.w, this.h);
      ellipse(this.x,this.y, w, h);
      noStroke();
      fill(this.color, 80);
      ellipse(this.x,this.y, w*2/3, h*19/20);
      translate(0,-h/2);
      rect(this.x,this.y, w*2/3, h);
  }
  
  
}