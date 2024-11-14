class Tile {
  constructor(index, x, y, s, state) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.s = s;
    this.state = state;
    //     this.index = i;
    //     this.img = img;
  }
  show() {
    stroke(255);
    fill(255);
    square(this.x, this.y, this.s);
  }
}
