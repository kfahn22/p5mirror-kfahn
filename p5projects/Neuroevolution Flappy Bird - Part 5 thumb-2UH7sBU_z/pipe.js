// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Neuro-Evolution Flappy Bird

class Pipe {

  constructor() {
    this.spacing = 10;
    //this.top = random(height / 6, 3 / 4 * height);
    this.top = random(height / 5, 2/3 * height);
    this.bottom = height - (this.top + this.spacing);
    //this.bottom = height  ;
    this.x = width;
    this.w = 850;
    this.speed = 6;
  }

  hits(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    return false;
  }

  show() {
   // fill(255);
    rectMode(CORNER);
    image(pimg, this.x, - 70, this.w, this.top*1.2);
    //image(pimg, this.x, height - 50, this.w, this.bottom);
    image(pimg, this.x, height - this.bottom  + 70, this.w, this.bottom);
   // rect(this.x, 0, this.w, this.top);
    // rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}
