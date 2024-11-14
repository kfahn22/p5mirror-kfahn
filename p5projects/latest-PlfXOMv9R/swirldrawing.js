class SwirlDrawing {
  constructor(x,y,w, h, img) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.bit = img;
  }

show() {
    stroke(255);
    strokeWeight(1);
    noFill();
    rect(this.x, this.y, this.w, this.h);
    image(swirlDrawing, this.x, this.y, this.w, this.h);
  }
}