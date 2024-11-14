class Swirl {
  constructor(w) {
    this.w = w;
   // this.col = random(colors);
    this.sw = random(0.5, 1.5);
    this.n = 20;
    this.colors = [
      [12, 71, 103],
      [86, 110, 61],
      [185, 164, 76],
      [254, 153, 32],
      [250, 121, 33],
    ];
    this.col = random(this.colors);
  }

  swirl(w) {
    //translate(width / 2, height / 2);
    for (let i = 0; i < this.n; i++) {
      stroke(random(this.colors));
      strokeWeight(this.sw);
      noFill();
      let x = random(2);
      let y = random(2);
      let r = random(w)
      circle(x, y, r);
    }
  }
  
  show(x,y) {
    push()
    translate(x,y);
    this.swirl();
    pop()
  }
}
