class Thing {
  constructor(x, y, r) {
    this.r = r;
    this.v = [];
    this.col = color(random(255), random(255), random(255));
    this.position = createVector(x, y);
    // for (let i = 0; i < 100; i++) {
    //   let angle = map(i, 0, 100, 0, TWO_PI);
    //   this.v.push(createVector(r * cos(angle), r * sin(angle)));
    // }
  }

  add() {
    for (let i = 0; i < 100; i++) {
      let angle = map(i, 0, 100, 0, TWO_PI);
      this.v.push(createVector(this.r * cos(angle), this.r * sin(angle)));
    }
 }
  
  show() {
    push();
    translate(this.position.x, this.position.y);
    fill(this.col);
    noStroke(this.col);
    beginShape();
    for (let v of this.v) {
      vertex(v.x, v.y);
    }
    endShape();
    pop();
  }
//}

// let things = [];

// function addInk(x, y) {
//   let r = random(10, 50);
//   let t = new Thing(x, y, r);

//   for (let thing of things) {
//     for (let i = 0; i < thing.v.length; i++) {
//       let v = thing.v[i];
//       let p = p5.Vector.add(v, thing.position);
//       p.sub(t.position);
//       let d = p.mag();
//       p.mult(sqrt(1 + (r * r) / (d * d)));
//       p.add(t.position);
//       p.sub(thing.position);
//       thing.v[i] = p;
//     }
//   }

  //things.push(t);
}