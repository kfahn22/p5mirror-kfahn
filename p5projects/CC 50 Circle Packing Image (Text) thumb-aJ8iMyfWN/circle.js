// Circle Packing
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/050.1-circlepackinganimated.html
// https://thecodingtrain.com/CodingChallenges/050.2-circlepackingimage.html

// Basic: https://editor.p5js.org/codingtrain/sketches/2_4gyDD_9
// Image (Text): https://editor.p5js.org/codingtrain/sketches/wxGRAd4I-
// Image (Kitten): https://editor.p5js.org/codingtrain/sketches/tRpryH_um

class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 1;
    this.growing = true;
    this.color = color(random(colorsCT));
  }

  grow() {
    if (this.growing) {
      this.r += 1;
    }
  }

  show() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  edges() {
    return (
      this.x + this.r >= width ||
      this.x - this.r <= 0 ||
      this.y + this.r >= height ||
      this.y - this.r <= 0
    )
  }
}
