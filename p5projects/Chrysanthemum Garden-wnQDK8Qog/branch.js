class Branch {
  constructor(_px, _py, _sc) {
    this.px = _px;
    this.py = _py;
    this.sc = _sc;
    this.sp = 0.5;
    this.adj = 8;
    this.num = int(random(3,5));
    this.brnum = this.num ;
    this.ctnum = this.num;
    this.ran = random(-0.5,0.5);
  }

  wiggle(px, py, sc, num, sp, len, mX) {
    noFill();
    stroke(38,115,38, 180);
    strokeWeight(sc);
    push();
    translate(px, py);
    beginShape();
    for (let i = 0; i < num-1; i++) {
      if (i % 2 == 0) {
       vertex(mX * i *len + sp, - i * len);
      } else {
       vertex(mX * i * len - sp, - i * len);
      }
    }
    vertex(mX* num *len, -num * len);
    endShape();
    pop();
  }

  stem() {
    this.wiggle(this.px, this.py, this.sc, this.num, 1, 40, 0);
    return createVector(this.px, this.py - (this.num) * 40);
  }

  lfBranch(adj, len, mX, add) {
    let begin = this.stem();
    begin.y = begin.y + adj;
    this.wiggle(begin.x, begin.y, this.sc - 0.25, this.brnum, this.ran + add, len, mX);
    return createVector(begin.x -(this.brnum)*len, begin.y - (this.brnum) * len);
  }

  centerBranch() {
    let begin = this.stem(this.px, this.py);
    this.wiggle(begin.x, begin.y, this.sc - 0.25, this.ctnum, 1, 10, 0);
    return createVector(begin.x, begin.y - this.ctnum * 10);
  }

  rtBranch(adj, len, mX, add) {
    let begin = this.stem(this.px, this.py);
    begin.y = begin.y + adj;
    this.wiggle(begin.x, begin.y, this.sc - 0.25, this.brnum, this.ran + add, len, mX);
    return createVector(begin.x  + (this.brnum)* len, begin.y - (this.brnum) * len);
  }
  
  show() {
    stroke(38,115,38,180);
    this.stem();
  }
}