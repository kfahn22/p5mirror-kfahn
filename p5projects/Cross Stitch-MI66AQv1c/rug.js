class PersianRug {
  constructor(x, y, n) {
    this.x = x;
    this.y = y;
    this.n = n;
    this.rows = pow(2, this.n) + 1;
    this.w = this.rows * 2;
    this.sqLeft = 1;
    this.sqTop = 1;
    // this.sqRight = this.w;
    // this.sqBot = this.w;
    this.sqRight = this.rows;
    this.sqBot = this.rows;
    //   this.r = floor(random(1, 360));
  }
  addRug() {
    let r = floor(random(1, 360));
    stroke(r);
    strokeWeight(2);
    stroke(r, 255, 255, 255);

    push();
    translate(this.x, this.y);
    // Draw border
    line(
      this.sqLeft,
      this.sqTop,
      this.sqRight,
      this.sqTop
    );
    line(
      this.sqLeft,
      this.sqBot,
      this.sqRight,
      this.sqBot
    );
    line(
      this.sqLeft,
      this.sqTop,
      this.sqLeft,
      this.sqBot
    );
    line(
      this.sqRight,
      this.sqTop,
      this.sqRight,
      this.sqBot
    );
    this.chooseColor(
      this.sqLeft,
      this.sqRight,
      this.sqTop,
      this.sqBot
    );
   pop();
  }

  chooseColor(left, right, top, bot) {
    let midcol, midrow;
    if (left < right - 1) {
      midcol = int((left + right) / 2);
      
      midrow = int((top + bot) / 2);
      //console.log(midcol, midrow)
      // Add lines in middle row and column
      //push();
      strokeWeight(1);
      let r = this.getRandomColor(left, right, top, bot);
      stroke(r, 255, 255, 255);
      line(left + 1, midrow, right - 1, midrow);
      line(midcol, top + 1, midcol, bot - 1);
     // pop();

      this.chooseColor(left, midcol, top, midrow);
      this.chooseColor(midcol, right, top, midrow);
      this.chooseColor(left, midcol, midrow, bot);
      this.chooseColor(midcol, right, midrow, bot);
    }
  }

  // When r = 300 get an boring pattern
  // c0[0]=c1[0]=c2[0]=c3[0]=255
  getRandomColor(left, right, top, bot) {
    let r;

    let c0 = get(this.x + left, this.y + top);
    let c1 = get(this.x + right, this.y + top);
    let c2 = get(this.x + left, this.y + bot);
    let c3 = get(this.x + right, this.y + bot);
    //console.log(c0[0], c1[0], c2[0], c3[0]);

    // Take % 360 b/c we want values to stay in range of (0,360)
    r = floor((c0[0] + c1[0] + c2[0] + c3[0]) % 360);

    // I added a hack to exclude the case where r = 300 because it was consistently yielding a boring pattern.
    if (r != 300) {
      return r;
    } else {
      return r - 2;
    }
  }
}