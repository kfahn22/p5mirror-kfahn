let fishies = [];
let goldfishies = [];
let turtles = [];
let seahorses = [];
let crabs = [];
const Y_AXIS = 1;
const X_AXIS = 2;
let b1, b2, c1, c2;

let colorOptions = [
  [241,80,37], //orange
  [20,89,29],//green
  [239,214,172], //sand
  [77,161,169], //turquoise
  [89,17,77], //purple
  [243,6,6] // red
]

function setup() {
    createCanvas(600,600);
  
    // Define colors
  b1 = color(255);
  b2 = color(0);
  c1 = color(204, 102, 0);
  c2 = color(0, 102, 153);
  
  let tx = -50;
  let ty = 0; 
 for (let i=0; i < 3; i++) {
   
 let f = new Fish(0, 0, 15, colorOptions[4], tx, ty);
  fishies.push(f);
   if (i % 2 === 0) {
    tx += 30;
    ty -= 50;
      }
      else {
      tx += 30;
        ty +=50;
      }
  
 }
   let s = new Seahorse(0, 0, 20, colorOptions[2], 250, -100);
    seahorses.push(s);
  
    let gx = 200;
  let gy = 100;
  for (let i = 0; i < 4; i++) {
   
    let g = new Goldfish(10,0,15, colorOptions[0], gx, gy);
  goldfishies.push(g);
  if (i % 2 === 0) {
    gx += 30;
    gy -= 30;
      }
      else {
      gx += 30;
        gy +=40;
      }
  }
 // first parameter is controlling size ??
 let tl = new Turtle(30,0,15, colorOptions[1], 0, -200);
  turtles.push(tl);
   let c = new Crab(10,0,15, colorOptions[5], 0, 250);
                       crabs.push(c);
}


function draw() {
   // Background
   let c1 = color(102,215,209);
   let c2 = color(64,61,88);
 
  setGradient(0, 0, 600, 600, c1, c2, Y_AXIS);
 
 
 //translate(width*0.25, height*0.5);
 stroke(0);
  strokeWeight(1)
 fill(249,0,147);
  translate(width*0.5, height*0.5);
  for (let i = 0; i < 3; i++) {
     fishies[i].show();
     fishies[i].move();
    
  }
//   for (let i = 0; i < 4; i++) {
//      goldfishies[i].show();
//   }
//   turtles[0].show();
//   seahorses[0].show();
//   crabs[0].show();
 
}



// function setup() {
//   createCanvas(710, 400);

//   // Define colors
//   b1 = color(255);
//   b2 = color(0);
//   c1 = color(204, 102, 0);
//   c2 = color(0, 102, 153);

//   noLoop();
// }

// function draw() {
//   // Background
//   setGradient(0, 0, width / 2, height, b1, b2, X_AXIS);
//   setGradient(width / 2, 0, width / 2, height, b2, b1, X_AXIS);
//   // Foreground
//   setGradient(50, 90, 540, 80, c1, c2, Y_AXIS);
//   setGradient(50, 190, 540, 80, c2, c1, X_AXIS);
// }

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}