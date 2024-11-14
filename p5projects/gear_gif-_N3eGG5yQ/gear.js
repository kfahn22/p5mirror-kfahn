// https://mathworld.wolfram.com/GearCurve.html
// https://help.tc2000.com/m/69445/l/755460-hyperbolic-functions-table

class Gear {
  constructor(_px, _py, _a, _b, _sc, _c, _m) {
    this.px = _px;
    this.py = _py;
    this.a = _a;
    this.b = _b;
    this.m = _m;
    this.sc = _sc;
    this.points = [];
    this.c = _c;
    this.col = color(this.c);
  }

  hyperbolicTan(theta) {
    let e = 2.71828;
    let l = pow(e, 2 * theta);
    return (l - 1) / (l + 1);
  }

  hyperbolicSin(theta) {
    let e = 2.71828;
    let k = pow(e, theta);
    let l = pow(e, -theta);
    return (k - l) / 2;
  }

  hyperbolicCos(theta) {
    let e = 2.71828;
    let k = pow(e, theta);
    let l = pow(e, -theta);
    return (k + l) / 2;
  }

  // We need to loop through curve once before creating object
  // Changin hyperbolicTan to hyperbolicSin or hyperbolicCos yiels differnt animations
  oneCurve() {
    for (let theta = 0; theta < 361; theta += 1) {
      // Equationss for gear curve
      let r =
        this.a +
        (1 / this.b) * this.hyperbolicTan(this.b * sin(this.m * theta));
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
  reset() {
    this.points = [];
  }

  show() {
    push();
    noFill();
    beginShape();
    for (let v of this.points) {
      strokeWeight(3);
      stroke(this.col);
      vertex(v.x, v.y);
    }
    endShape();
    pop();
  }
}
