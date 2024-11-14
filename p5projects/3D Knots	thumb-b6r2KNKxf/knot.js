class Knot {
  constructor( x, y, z, col) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.col = col;
  }
  
  show() {
        stroke(this.col)
        translate(this.x, this.y, this.z);
        sphere(8);
  }
}