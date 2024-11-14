class InkBlob {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.n = 2;
    this.r = r;
    this.col = color(random(255), random(255), random(255));
    this.v = [];
    this.position = createVector(this.x,this.y);
    this.things = [];
  }

  addBlob() {
    this.things.push(new Thing(this.x, this.y, this.r));
  }
  
  showInk() {
    for (let thing of this.things) {
      thing.show();
    }
  }

  update() {
    for (let thing of this.things) {
      for (let i = 0; i < thing.v.length; i++) {
        let v = thing.v[i];
        let p = p5.Vector.add(v, this.position);
        p.sub(this.position);
        let d = p.mag();
        p.mult(sqrt(1 + (this.r * this.r) / (d * d)));
        p.add(this.position);
        p.sub(this.position);
        thing.v[i] = p;
      }
    }
  }
}
