class Star {
  constructor(x, y, radius1, radius2, npoints) {
    this.x = x;
    this.y = y;
    this.radius1 = 10;
    this.radius2 = 10;
    this.npoints = npoints
    this.angle = 360 / npoints;
    this.halfAngle = angle/2.0;
    this.color = (243,66,19);
  }
  
  
  show() {
    stroke(this.color);
    fill(this.color);
    beginShape();
    for (let a = 0; a < 180; a += angle) {
      let sx = this.x + cos(a) * this.radius2;
      let  sy = this.y + sin(a) * this.radius2;
      vertex(sx, sy);
      sx = this.x + cos(a+this.halfAngle) * this.radius1;
      sy =this.y + sin(a+this.halfAngle) * this.radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

}