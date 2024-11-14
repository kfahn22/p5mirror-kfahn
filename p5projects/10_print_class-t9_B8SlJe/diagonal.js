class D1 {
  constructor(index, x, y, s, state) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.s = s;
    this.state = state;
    this.diag = pow(2 * pow(this.sp, 2), 0.5);
    this.colors = [
      [86, 110, 61],
      [185, 164, 76],
      [254, 153, 32],
      [250, 121, 33],
    ];
    this.col = random(this.colors);
    //this.swirl = new Swirl(this.s)
  }

  downward_ellipse() {
    stroke(255);
    fill(255);
    push();
    translate(this.x + this.s * 0.5, this.y + this.s * 0.5);
    rotate(45);
    ellipse(0, 0, 0.25 * this.s, this.diag);
    pop();
  }
  upward_ellipse() {
    stroke(255);
    fill(255);
    push();
    translate(this.x + this.s * 0.5, this.y + this.s * 0.5);
    rotate(-45);
    ellipse(0, 0, 0.3 * this.s, this.diag);
    pop();
  }

  upward_squares() {
    fill(this.colors[0]);
    let new_size = this.s * 0.25;
    square(this.x, this.y + 3 * new_size, new_size);
    fill(this.colors[3])
    square(this.x + new_size, this.y + 2 * new_size, new_size);
    fill(this.colors[1]);
    square(this.x + 2 * new_size, this.y + 1 * new_size, new_size);
    fill(this.colors[2]);
    square(this.x + 3 * new_size, this.y + 0 * new_size, new_size);
  }
  
  downward_squares() {
    fill(this.colors[3]);
    noStroke()
    let new_size = this.s * 0.25;
    square(this.x, this.y, new_size);
    fill(this.colors[0]);
    square(this.x + new_size, this.y + new_size, new_size);
    fill(this.colors[1]);
    square(this.x + 2 * new_size, this.y + 2 * new_size, new_size);
    fill(this.colors[2]);
    square(this.x + 3 * new_size, this.y + 3 * new_size, new_size);
  }
}
