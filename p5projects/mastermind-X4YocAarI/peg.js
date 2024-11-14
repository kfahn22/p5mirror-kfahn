 
class Peg {
  constructor(x, y, r,h) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.h = h;
}
  
 
  show(color) {
    fill(color);
    cylinder(this.r, this.h);
  }
}
  
