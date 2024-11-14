class CairoTile {
  constructor(w) {
    this.w = w;
    // this.col = random(colors);
    this.sw = random(0.5, 1.5);
    this.n = 20;
    this.colors = [
      // [12, 71, 103],
      [86, 110, 61],
      [185, 164, 76],
      [254, 153, 32],
      [250, 121, 33],
    ];
    this.col = random(this.colors);
  }

  splitSquare() {
    //translate(width / 2, height / 2);
    for (let i = 0; i < this.n; i++) {
      //noStroke();
      stroke(random(this.colors));
      strokeWeight(1.2);
      noFill();
      //fill(random(this.colors));
      let m = 0.5 * this.w;

      let y1m = -0.3 * this.w;
      let y2m = 0.3 * this.w;

      line(0, y1m, 0, y2m);
      triangle(-m, -m, m, -m, 0, y1m);
      triangle(-m, m, m, m, 0, y2m);
      // line(xm,y1m, xm, y2m);
      // triangle(0, 0, this.w, 0, xm, y1m);
      // triangle(0, this.w, this.w, this.w, xm, y2m);
    }
  }

  show(x, y) {
    push();
    translate(x + this.w * 0.5, y + this.w * 0.5);
    let r = random(1);
    if (r > 0.5) {
      rotate(90);
    }
    this.splitSquare();
    pop();
  }
  //  show(x,y) {
  //   push()
  //   let r = random(1)
  //   if (r > 0.5) {
  //      translate(x+this.w * 0.5,y+ this.w * 0.5);
  //     rotate(90);
  //   } else {
  //     translate(x,y);
  //   }
  //   this.splitSquare();
  //   pop()
  // }
}
