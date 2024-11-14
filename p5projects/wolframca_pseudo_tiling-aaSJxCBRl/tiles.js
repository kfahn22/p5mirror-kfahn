// Inspiration for CairoTile class is from: 
// The Art of Code
// https://www.youtube.com/watch?v=51LwM2R_e_o

class CairoTile {
  constructor(w, theta) {
    this.w = w;
    this.sw = random(0.5, 2);
    this.colors = [
      [244, 185, 66],
      [239, 242, 241],
      [151, 216, 196],
      [64, 89, 173],
    ];
    this.theta = theta;
  }

  splitSquare() {
    stroke(this.colors[3]);
    strokeWeight(3);
    let m = 0.5 * this.w;
    let y1m = -0.3 * this.w;
    let y2m = 0.3 * this.w;

    line(-m, -m, 0, y1m);
    line(0, y1m, m, -m);
    line(0, y1m, 0, y2m);
    line(-m, m, 0, y2m);
    line(0, y2m, m, m);
  }

  show(x, y) {
    push();
    translate(x + this.w * 0.5, y + this.w * 0.5);
    rotate(this.theta);
    this.splitSquare();
    pop();
  }
}
