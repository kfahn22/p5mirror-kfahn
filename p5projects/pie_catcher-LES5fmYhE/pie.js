class Pie{
  
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.r = 16;
    this.yspeed = 0;
    this.digit = floor(random(10));
    this.angle = random(2*PI);
  }
  
  show() {
    push();
    translate(this.x, this.y);
    stroke(255);
    strokeWeight(2);
    fill(177,176,180);
    circle(0, 0, this.r*2);
    fill(0);
    let a = TWO_PI / 2;
    let d = this.r * 2;
    fill(0, 0, 255);
    stroke(255);
    for (let i = 0; i < this.digit; i++) {
    arc(this.x, this.y, d, d, i*a, (i+1)*a);
    pop();
    }
    // textSize(32);
    // textAlign(CENTER,CENTER);
    // text(this.digit, this.x, this.y);
  }
  
  update() {
    this.y = this.y + this.yspeed;
    this.yspeed = this.yspeed + 0.2;
  }
  
}