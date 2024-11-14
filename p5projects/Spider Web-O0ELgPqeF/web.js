let angles = { angles: [0, 45, 80, 100, 200, 250, 300, 360] };

class SpiderWeb {
  constructor(spokeLength) {
    this.angles = [];
    this.spokeLength = spokeLength;
    this.x = 0;
    this.y = 0;
    this.prevX = 0;
    this.prevY = 0;
    this.threadStartX = 0;
    this.threadStartY = 0;
    this.threadEndX = 0;
    this.threadEndY = 0;
  }

  setSpokeAngles() {
    this.angles[0] = 0;
    for (let i = 1; i < 8; i++) {
      this.angles[i] = this.angles[i - 1] + int(random(35, 60));
    }
    this.angles[8] = 360;
  }

  show() {
    stroke(255, 255, 255, 200);
    strokeWeight(2);
    noFill();
    for (let i = 1; i < 8; i++) {
      this.x = this.spokeLength * cos(radians(this.angles[i]));
      this.y = this.spokeLength * sin(radians(this.angles[i]));
      line(0, 0, this.x, this.y);
      for (let t = 0.2; t < 1; t += 0.2) {
        this.threadStartX = lerp(0, this.prevX, t);
        this.threadStartY = lerp(0, this.prevY, t);
        this.threadEndX = lerp(0, this.x, t);
        this.threadEndY = lerp(0, this.y, t);
        let p2X = lerp(this.threadStartX, this.threadEndX, 0.25);
        let p2Y = lerp(this.threadStartY, this.threadEndY, 0.25) + 20;
        let p3X = lerp(this.threadStartX, this.threadEndX, 0.75);
        let p3Y = lerp(this.threadStartY, this.threadEndY, 0.75) + 30;

        bezier(
          this.threadStartX,
          this.threadStartY,
          p2X,
          p2Y,
          p3X,
          p3Y,
          this.threadEndX,
          this.threadEndY
        );
      }
      this.prevX = this.x;
      this.prevY = this.y;
    }
  }
}
