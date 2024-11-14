class Tile {
  constructor(_x, _y, _w, _h, _a, _b, _c, _d, _col, _angle) {
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
    this.a = _a;
    this.b = _b;
    this.c = _c;
    this.d = _d;
    this.col = _col;
    this.angle = _angle;
  }


  basic() {
        push();
        stroke(255);
        translate(this.x + this.w / 2, this.y + this.h / 2);
        shearX(this.angle);
        fill(this.col);
        beginShape();
        vertex(-0.5 * this.w, -this.h * 0.5);
        bezierVertex(-this.a * this.w, -this.b * this.h, this.a * this.w, -(0.5+this.b) * this.h, 0.5 * this.w, -this.h * 0.5);
        bezierVertex(this.c * this.w, -this.d * this.h, (this.c + 0.5) * this.w, this.d * this.h, 0.5 * this.w, this.h * 0.5);
        bezierVertex(this.a * this.w, (this.b) * this.h, -this.a* this.w, (this.b+0.5) * this.h, -0.5 * this.w, this.h * 0.5);
        bezierVertex(-this.c * this.w, this.d * this.h, -(this.c + 0.5) * this.w, -this.d * this.h, -0.5 * this.w, -this.h * 0.5);
        endShape(CLOSE);
        pop();
    }
}
