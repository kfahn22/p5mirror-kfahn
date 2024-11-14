class sine {
  constructor(x,y, l) {
    this.x = x
    this.y = y
    this.l = l
  }
  
  show() {
    //translate(this.x, this.y);
    for (let x = 0; x <= this.l; x += 2) {
        let y = sin(angle); // Adjust the amplitude as needed
        vertex(x - this.s / 2, y);
        angle += 2; // Adjust the frequency as needed
    }
    endShape();
  }
}