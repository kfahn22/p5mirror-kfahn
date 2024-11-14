// p5.js implementation of Persian rug algorithm described in https://archive.bridgesmathart.org/2005/bridges2005-9.pdf

let n = 5;
let rugs = [];

function setup() {
  let rows = pow(2, n) + 1;
  let w = rows + 2;
  //createCanvas(513, 513);
  createCanvas(500, 500);
  colorMode(HSB);
 for (let i = 0; i < 14; i++) {
   for (let j = 0; j < 14; j++) {
    rugs.push(new PersianRug(i*w, j*w, n))
  }
 }
  
  for (let r of rugs) {
    r.addRug();
  }
  //pop()
}

// function draw() {
//   background(255);
//   for (let g of graphics) {
//     image(g.buffer, g.x, g.y, g.w, g.h);
//   }
// }

// function drawSquare(x, y, d) {
//   addRug(x, y, d);
//   let newD = d * 0.5;
//   if (newD > 100) {
//     drawSquare(x, y, newD);
//     drawSquare(x + newD, y + newD, newD);
//     // Uncomment if you want each grid to be the same size
//     // Adjacent squares colors will repeat colors
//     // drawSquare(x, y + newD, newD);
//     // drawSquare(x + newD, y, newD);
//   }
// }

// function addRug(x, y, w) {
//   let buffer = createGraphics(w, w);
//   //let inc = w / 4;
//   let sw = map(w, width/8, width, 0.5, 3);
//   // Alternate way to choose color of squares

//   let pattern = new PersianRug(
//     buffer,
//     x,
//     y,
//     w,
//     //sw
//   );
//   pattern.addRug();
//   graphics.push({
//     buffer: buffer,
//     x: x,
//     y: y,
//     w: w,
//     h: w,
//   });
// }

function mousePressed() {
  save("image.jpg");
}
