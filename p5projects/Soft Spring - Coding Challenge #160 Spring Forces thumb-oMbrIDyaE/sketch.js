// Spring Forces (Soft Spring)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/160-spring-forces.html
// https://youtu.be/Rr-5HiXquhw

// Simple Spring: https://editor.p5js.org/codingtrain/sketches/dcd6-2mWa
// Spring Vector: https://editor.p5js.org/codingtrain/sketches/_A2pm_SSg
// Spring OOP: https://editor.p5js.org/codingtrain/sketches/9BAoEn4Po
// Soft Spring: https://editor.p5js.org/codingtrain/sketches/S5dY7qjxP

let particles = [];
let springs = [];
let spacing = 50;
let k = 0.1;
//let center = createVector(550, 550);
let cx = 850;
let cy = 300;
let gravity;


function mousePressed() {
 save('spring.jpg');
}
function setup() {
  createCanvas(1280, 720);
  
}

function draw() {
  angleMode(DEGREES);
 
  background(248,158,79);
  let c1 = color(236,1,90, 50);   // raspberry
  let c2 = color(146,83,161, 10);  // purple
  let c3 = color(45,197,244, 150); // aqua
  let c4 = color(102,211,52, 120); // green
  let c5 = color(252,238,33, 60); // yellow
  let c6 = color(248,158,79); // orange
  let c7 = color(112, 22, 22, 50);  // red
  let c8 = color(255);
 
  let gradient1 = createLinearGradient(168, 200);
  gradient1.colors(0, c6, 1, c8);
  
  let gradient2 = createLinearGradient(165, 200);
  gradient1.colors(0, c6, 1, c8);
  
  
   
  translate(450,0);
  
  // find length of string
  v2 = createVector(300, 400);
  let d = v2.mag();
  let angle = 75;
  let nx = d*cos(angle);
  let ny = d*sin(angle);
  let mx = d*cos(angle+10);
  let my = d*sin(angle+10);
 
  
  push();
  noStroke();
  fillGradient(gradient1);
  circle(nx, ny, 200);
  fillGradient(gradient2);
  circle(mx, my, 200);
  pop();
  // push();
  // fillGradient(3);
  
  // translate(mx, my);
  // circle(0,0, 200);
  // pop();
   strokeWeight(14);
  //translate(v.x, v.y);
  stroke(146,83,161);
  fill(45,197,244);
  line(0, 0, v2.x, v2.y);
  ellipse(v2.x, v2.y, 200);
 
//   push();
//   translate(cx, cy);
//   noFill();
//   strokeWeight(8);
//   stroke(146,83,16, 200);
 
//   strokeWeight(8);
 
  // stroke(255, 180);
  // //arc(0, 0, 290, 290, 25, 55);
  // pop();
  // noFill();
  // strokeWeight(2);
  // point(cx,cy);
  // circle(400,0, 1350);
}
