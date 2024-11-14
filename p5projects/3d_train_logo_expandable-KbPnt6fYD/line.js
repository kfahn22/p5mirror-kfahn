class UpLine {
  constructor(_x, _y, _z, _w, _h, _l) {
    this.x = _x;
    this.y = _y;
    this.z = _z;
    this.w = 20;
    this.h = 35;
    this.l = 20;
  }

  addBox() {
    strokeWeight(11.2);
    stroke('#F89E4F');
    let w = this.w/2;
    let h = this.h/2;
    let l = 0;
          beginShape();
          vertex(this.x - w, this.y - h, l);
          vertex(this.x + w, this.y - h, l);
          vertex(this.x + w, this.y + h, l);
          vertex(this.x - w, this.y - h, l);
          endShape();
  }
}
