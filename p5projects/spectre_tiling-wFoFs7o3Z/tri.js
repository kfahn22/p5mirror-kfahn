class colorTriangle {
  constructor(_col, _x0, _y0, _x1, _y1, _x2, _y2) {
    this.x0 = _x0;
    this.y0 = _y0;
    //this.a = createVector(this.x0, this.y0);
    this.x1 = _x1;
    this.y1 = _y1;
   // this.b = createVector(this.x1, this.y1);
    this.x2 = _x2;
    this.y2 = _y2;
    this.color = _col; // boolean 0 == red; 1 = blue
  }

  show() {
    if (this.color === 0) {
      stroke(1, 0, 0);
    } else {
      stroke(0, 0, 1);
    }
    strokeWeight(3);
    triangle(this.x0, this.y0, this.x1, this.y1, this.x2, this.y2);
  }
}
