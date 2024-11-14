// https://mathworld.wolfram.com/GearCurve.html
// https://help.tc2000.com/m/69445/l/755460-hyperbolic-functions-table

class Gear {
  constructor(_px, _py, _a, _b, _spokes, _sc, _col, _sw) {
    this.px = _px;
    this.py = _py;
    this.a = _a;
    this.b = _b;
    this.sp = _spokes;
    this.sc = _sc;
    this.points = [];
    this.col = _col;
    this.sw = _sw;
  }

  hyperbolicTan(theta) {
    let e = 2.71828;
    let l = pow(e, 2 * theta);
    return (l - 1) / (l + 1);
  }
  // We need to loop through curve once before creating object
  oneCurve() {
    for (let theta = 0; theta < 361; theta += 1) {
      // Equations for Gear curve
      let r =
        this.a +
        (1 / this.b) * this.hyperbolicTan(this.b * sin(this.sp * theta));
      let x = this.sc * r * sin(theta);
      let y = this.sc * r * cos(theta);
      let p = createVector(x, y);

      if (this.points.length < 361) {
        this.points[theta] = p;
      } else {
        break;
      }
    }
  }

  show() {
    push();
    noFill();
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      // strokeWeight(0.5 + 0.005*i);
      // let col = color(200, 50, 200, 100 + i * 0.5)
      strokeWeight(this.sw);
      stroke(this.col);
      let v = this.points[i];
      vertex(v.x, v.y);
    }
    endShape();
    pop();
  }
}
