class Heart1 {
constructor(_px, _py, _sc) {
    this.px = _px;
    this.py = _py;
    this.sc = _sc;
    this.color = color('#9253A1');
    this.heart1 = [];
}

show() {
    translate(this.px,this.py);
    noStroke(255);
    strokeWeight(2);
    fill(this.color);
  
    // We draw shape and then draw its reflection across Y axis.
    push()
    beginShape();
    for (let v of this.heart1) {
      vertex(v.x, v.y);
    }
    endShape();
    beginShape();
    for (let v of this.heart1) {
      vertex(-v.x, v.y);
    }
    endShape();
    pop();
    // gives 1/2 of the heart curve
    const r = this.sc * pow(sin(a), 7) * pow(e, 2 * a)
    const x = r * cos(a);
    const y = -r * abs(sin(a));
    this.heart1.push(createVector(x, y));
  
    // So that it stops
    if (a > PI) {
      noLoop();
    }
    a += 0.01;
  }
}