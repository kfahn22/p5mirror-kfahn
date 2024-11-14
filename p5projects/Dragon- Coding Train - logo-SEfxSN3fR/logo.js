
class Logo {
  constructor(x, y, r, angle, img) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.angle = angle;
    this.img = img;
    this.points = [];
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.img, 0, 0, this.r, this.r);
    pop();
  }
}
