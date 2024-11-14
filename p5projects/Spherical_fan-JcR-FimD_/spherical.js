class Spherical {
  constructor(_px, _py, _a, _r, _rot, _c) {
    this.px = _px;
    this.py = _py;
    this.a = _a;
    this.r = _r;
    this.points = [];
    this.rot = _rot;
    this.st = 1;
    this.c = _c;
    this.col = color(this.c);
  }

  // 1440 
  // We need to loop through curve once before creating object
  oneCurve() {
    let p;
    for (let theta = 0; theta < 800; theta += 1) {
      // Equations for spherical curve from mathworld
      const x = this.r * sin(theta / pow(this.a, 2)) * cos(this.a * theta);
      const y = this.r * sin(theta / pow(this.a, 2)) * sin(this.a * theta);
      const z = this.r * cos(theta / pow(this.a, 2));
      if (theta % 8 == 0)
      {p = createVector(x, y, z);}
      //console.log(p);
        if (this.points.length < 800) {
          this.points[theta] = p;
        } else {
          break;
        }
    }
  }

  show() {
    push();
    noFill();
    translate(this.px, this.py);
    rotate(this.rot);
    beginShape();
    for (let v of this.points) {
      strokeWeight(this.st);
      stroke(this.col);
      vertex(v.x, v.y, v.z);
    }
    endShape();
    pop();
  }
}
