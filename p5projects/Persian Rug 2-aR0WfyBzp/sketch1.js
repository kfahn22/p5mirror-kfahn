// https://p5js.org/reference/#Color

let palette = [
  [8, 7, 8],
  [55, 114, 255],
  [223, 41, 53],
  [253, 202, 64],
  [230, 232, 230],
];
let a = 1;
let b = 1;
let c = 1;
let d = 1;
let n = 8;
let w;
let done = false;
let corners = [];
let newCorners = [];
  

function setup() {
  w = pow(2, n) + 1;
  //console.log(w);
  createCanvas(w, w);
  background(255);
  // rectMode(CENTER);

  stroke(palette[3]);
  square(0, 0, w);
  stroke(palette[1]);
  line(w / 2, 0, w / 2, w);
  line(0, w / 2, w, w / 2);
}

function draw() {
 corners = [];
 corners.push(createVector(0, 0));
  //console.log(ceil(w / 2) - 1);
  // corners.push(createVector(ceil(w / 2) - 1, 0));
  // corners.push(createVector(0, ceil(w / 2) - 1));
  // corners.push(createVector(ceil(w / 2) - 1, ceil(w / 2) - 1));
  corners.push(createVector(ceil(w / 2) - 1, 0));
  corners.push(createVector(0, ceil(w / 2) - 1));
  corners.push(createVector(ceil(w / 2) - 1, ceil(w / 2) - 1));
  
  // corners.push(createVector(0, 0));
  // corners.push(createVector(w, 0));
  // corners.push(createVector(0, w));
  // corners.push(createVector(w, w));
  // for (let i = 0; i < 3; i++) {
  //   for (let j = 0; j < 3; j++) {
  //     corners.push(createVector(i, j));
  //     corners.push(createVector((ceil(w / 2) - 1) * i+1, j));
  //     corners.push(createVector(i, (ceil(w / 2) - 1+1) * j+1));
  //     corners.push(createVector((ceil(w / 2) - 1) * i+1, (ceil(w / 2) - 1) * j+1));
  //   }
  // console.log(corners)let newCorners = [];
  for (let i = 0; i < corners.length; i++) {
    persianRug(corners[i], w);
   // newCorners.push(getCorners(corners[i], w));
   // console.log(newCorners.length)
    // for (let j = 0; j < newCorners.length; j++) {
    //   persianRug(newCorners[0], w);
    // }
  }

  // let nextCorners = [];
  // for (let i = 0; i < corners.length; i++) {
  //   nextCorners.push(getCorners(corners[i], w));
  // }
  // console.log(nextCorners[corners.length - 1]);
  //     console.log(nextCorners.length)
  //       for (let i =0; i < nextCorners.length; i++) {
  //         persianRug(nextCorners[i], w);
  //       }

  if (w > 2) {
    w = w/2;
   // w = ceil(w/2)-1;
  }

  // Update the canvas.
  updatePixels();
}

// Function to divide square into fourths and return corners of the new square
function getCorners(p, w) {
  let corners = [];
  // Get corners
  corners.push(createVector(p.x, p.y));
  corners.push(createVector(p.x + ceil(w * 0.5) - 1, p.y));
  corners.push(createVector(p.x, p.y + ceil(w * 0.5) - 1));
  corners.push(createVector(p.x + ceil(w * 0.5) - 1, p.y + ceil(w * 0.5) - 1));

  // if (w > 2) {
  //   w = w / 2;
  //   for (i = 0; i < corners.length; i++) {
  //     getCorners(corners[i], w);
  //   }
  // }

  return corners;
}

// p1, p2, p3, p4 coordinates of the corners of square
function newColor(p0, p1, p2, p3) {
  //   let c1 = lerpColor(p0, p1, 0.5);
  //   let c2 = lerpColor(p2, p3, 0.5);
  //   return lerpColor(c1, c2, 0.5);
  return (a * p0 + b * p1 + c * p2 + d * p3) / 4;
}

function persianRug(p, w) {
  let c0 = get(p.x, p.y);
  let c1 = get(p.x + w, p.y);
  let c2 = get(p.x, p.y + w);
  let c3 = get(p.x + w, p.y + w);
  let c00 = lerpColor(color(c0), color(c1), 0.5);
  let c01 = lerpColor(color(c2), color(c3), 0.5);
  let c = lerpColor(color(c00), color(c01), 0.5);
  //console.log(c)

  stroke(c);
  line(p.x + w / 2, p.y, p.x + w / 2, p.y + w);
  line(p.x, p.y + w / 2, p.x + w, p.y + w / 2);
}
