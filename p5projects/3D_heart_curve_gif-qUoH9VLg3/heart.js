class Heart {
  constructor(_px, _py, _pz) {
    this.px = _px;
    this.py = _py;
    this.pz = _pz;
    this.points = [];
  }

  ctHeart(_r) {
    for (let beta = 0; beta < 361; beta += 1) {
      const x = _r * 16 * pow(sin(beta), 3);
      const y = -_r * (13 * cos(beta) - 5 * cos(2 * beta) - 2 * cos(3 * beta) - cos(4 * beta));
      const z = this.pz;
      if (this.points.length < 361) {
        this.points[beta] = createVector(x, y, z);
      } else {
        break;
      }
    }
  }

  show(k, num) {
    let per = map(k, 0, num/2, 1, 3);
    //let from = color(217,102,255);
   // let from = color(255,102,163);
   let from = color(255,179,179);
    let to = color(134,0,179);
    let col1 = lerpColor(from, to, k/num);
    let col2 = lerpColor(to, from, k/num);
    strokeWeight(per);
    if (k < num/2)
   {
     stroke(col1, 100);
   } else {
     stroke(col2, 100);
   }
    if (k == 0 || k == num/2 || k == num) {
      fill(col1);
    }
    push();
    translate(this.px, this.py);
    beginShape();
    for (let v of this.points) {
      vertex(v.x, v.y, v.z);
    }
    endShape();
    pop();
  }
}