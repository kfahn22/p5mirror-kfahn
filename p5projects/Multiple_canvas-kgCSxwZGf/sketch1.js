// create an array with a bunch of canvas
let divs = [];
let cvs = [];
let n = 3;

let s = function (p) {
  // p could be any variable name
  let x = 30;
  p.setup = function () {
    for (let i = 0; i < n; i++) {
      for (let j = 0; i < n; i++) {
        // let d = p.createDiv();
        // d.class("flex-container");
        // d.position(i * x, j * x);
        let c = p.createCanvas(x, x);
        //c.parent(d);
       // divs.push(d);
      }
    }
  };

  p.draw = function () {
    p.background(255);
  };
};
//cvs.push(new p5(s, `c${i}`));
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
  
  d.position(x*i, j*x);
  cvs.push(new p5(s, `c${i}`));
  cvs.parent(d);
  }
}
