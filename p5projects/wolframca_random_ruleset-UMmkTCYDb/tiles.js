// From Coding Train Supershape challenge
// https://editor.p5js.org/codingtrain/sketches/_gTvNBjEu

class SuperShape {
  constructor(w) {
    this.w = w;
    this.sw = random(0.5, 2);
    this.colors = [
      [5,102,141],
      [66,122,161],
      [103,148,54],
      [165,190,0],
    ];
    // 1,2,1,4,1,1
    this.n1 = 1;
    this.n2 = 1;
    this.n3 = 1;
    this.m = 8;
    this.a = 1;
    this.b = 1;
  }

  supershape(theta) {
    let part1 = (1 / this.a) * cos((theta * this.m) / 4);
    part1 = abs(part1);
    part1 = pow(part1, this.n2);

    let part2 = (1 / this.b) * sin((theta * this.m) / 4);
    part2 = abs(part2);
    part2 = pow(part2, this.n3);

    let part3 = pow(part1 + part2, 1 / this.n1);

    if (part3 === 0) {
      return 0;
    }

    return 1 / part3;
  }

  show(x, y) {
    push();
    translate(x + this.w * 0.5, y + this.w * 0.5);
    let radius = 0.5*w;
    fill(random(this.colors))
    let total = 40;
    let increment = 360 / total;

    beginShape();
    for (let angle = 0; angle < 360; angle += increment) {
      let r = this.supershape(angle);
      let x = radius * r * cos(angle);
      let y = radius * r * sin(angle);

      vertex(x, y);
    }
    endShape(CLOSE);

    pop();
  }
}
