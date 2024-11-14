// Kathryn McGuiness 


// including ray casting code from Daniel Shiffman


let arches = [];
let img;
let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 10000;
let button;

function preload() {
  good = loadImage("garden.png");
  bad = loadImage("smoke.png");
}


function setup() {
  createCanvas(800, 800);
   
  button = createButton("save frame");
  button.mousePressed(saveWork);
  
   
  function saveWork() {
      saveCanvas("day25.png"); 
    }
  
  
   let w = width*0.06;
  let a = new Arch(0,0,  w);
  arches.push(a);
  
    // let x = (this.r  - this.w * 0.40) * cos(a);
    // let y = (this.r  - this.w * 0.40) * sin(a);
    // walls[i] = new Boundary(x1, y1, x2, y2);
 // }
  walls.push(new Boundary(width*0.275, height*0.55, width*0.275, height*0.975));
  walls.push(new Boundary(width*0.775, height*0.55, width*0.775, height*0.975));
  walls.push(new Boundary(width*0.275, height*0.975, width*0.775, height*0.975));

  
 
  walls.push(new Boundary(width*0.275, height*0.575, width*0.325, height*0.4055));
  walls.push(new Boundary(width*0.325, height*0.4055, width*0.45, height*0.345));
  walls.push(new Boundary(width*0.45, height*0.345, width*0.55, height*0.315));
  walls.push(new Boundary(width*0.55, height*0.315, width*0.625, height*0.355));
   walls.push(new Boundary(width*0.625, height*0.325, width*0.71, height*0.39));
  walls.push(new Boundary(width*0.665, height*0.39, width*0.69, height*0.405));
  walls.push(new Boundary(width*0.69, height*0.405, width*0.775, height*0.555));
 // walls.push(new Boundary(width*0.685, height*0.405, width*0.70, height*0.555));
  //walls.push(new Boundary(width*0.70, height*0.555, width*0.775, height*0.555));
  
  
  // walls.push(new Boundary(width, height, 0, height));
  // walls.push(new Boundary(0, height, 0, 0));
  particle = new Particle();
}

function draw() {
  background(0);
  rectMode(CORNER);
  let w = width*0.05;
  stroke(171,168,161);
    fill(171,168,161);
  
  scale(1.25);
  translate(-width*0.115, -height*0.225);
  push();
    for (let wall of walls) {
    wall.show();
    wall.arcShow();
  }
  particle.update(  width* 0.52,  height* 0.475);
  particle.show();
  particle.look(walls);

  xoff += 0.01;
  yoff += 0.01;
  
  
   //draw path
  push();
    stroke(162,77, 64);
    fill(226,109,90);
    translate(width*0.35, height*0.965);
   
//     rect(0,0,w*0.48, w*0.25);
//     for (let j = 0; j < 20; j ++) {
//       if (j === 0) {
//     // translate(this.w*0.24, 0);
//     for (let i = 0; i < 15 ; i++) {
//     rect(i*w*0.48,-j*w*0.25,w*0.48, w*0.25);
//     }
//     // } else if (j % 2 != 0) {
//     //      for (let i = 0; i < 15 ; i++) {
//     // rect(i*w*0.48,-j*w*0.25,w*0.48, w*0.25);
//     //   }
//     } else  {
//       //translate(w*0.24, 0);
//     for (let i = 0; i < 15  ; i++) {
//     rect(i*w*0.48,-j*w*0.25,w*0.48, w*0.25);
//     }
   
//   }
//     }
  
  pop();
  
  // draw destination
  push();
   
//    scale(0.2);
//       translate(width*0.40, height*0.5);
//    //rect(0,0, w*6, w*8, 20, 20);
//    //image(good, 0, 0, w*6, w*9, 20,20);
//   //translate(0, height*0.2);
//   rectMode(CORNER);
//   arches[0].show();
//   pop();
  
  push();
    translate(width*0.4650, height*0.445);
  scale(0.225);
  arches[0].show();
  pop();
  
  //  push();
  //  translate(width*0.425, height*0.5);
  // scale(0.4);
  // arches[0].show();
  // pop();
  
//   push();
//   translate(width*0.35, height*0.5);
//   scale(0.5);
//   arches[0].show();
//   pop();
  
   push();
   translate(width*0.43, height*0.455);
  scale(0.375);
  arches[0].show();
  pop();
  
//   push();
//   translate(width*0.3, height*0.5);
//   scale(0.7);
//   arches[0].show();
//   pop();
  
   push();
  translate(width*0.37, height*0.475);
  scale(0.625);
  arches[0].show();
  pop();
  
 push();
  translate(width*0.275, height*0.5);
  arches[0].show();
  pop();
  
  pop;
}


// function setup() {
//   createCanvas(400, 400);
//   for (let i = 0; i < 5; i++) {
//     let x1 = random(width);
//     let x2 = random(width);
//     let y1 = random(height);
//     let y2 = random(height);
//     walls[i] = new Boundary(x1, y1, x2, y2);
//   }
//   walls.push(new Boundary(0, 0, width, 0));
//   walls.push(new Boundary(width, 0, width, height));
//   walls.push(new Boundary(width, height, 0, height));
//   walls.push(new Boundary(0, height, 0, 0));
//   particle = new Particle();
// }

// function draw() {
//   background(0);
//   for (let wall of walls) {
//     wall.show();
//   }
//   particle.update(noise(xoff) * width, noise(yoff) * height);
//   particle.show();
//   particle.look(walls);

//   xoff += 0.01;
//   yoff += 0.01;
// }