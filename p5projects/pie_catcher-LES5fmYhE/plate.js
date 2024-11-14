class Plate {
  constructor (x,w) {
    this.x = x;
    this.w = w;
    this.h = 10;
    this.y = height - this.h;
  }
  
  catches(pie) {
    if (pie.y + pie.r >= this.y && pie.x > this.x-w/2 && pie.x < pie.x < this.x + w/2) {
    return true;
    } else {
      return false;
    }
  }
  
  show() {
    rectMode(CENTER);
    stroke(255,0,0);
    rect(this.x, this.y, this.w, this.h, 20, 20);
  }
}