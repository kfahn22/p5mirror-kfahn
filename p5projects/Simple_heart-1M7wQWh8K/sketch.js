function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(0);
  fill('#F063A4')
  stroke(255);
  strokeWeight(2);
  translate(width/2, height/2);
  rectMode(CENTER);
  push();
  circle(-28.28, -28.28, 80);
  circle(28.28, -28.28, 80);
  rotate(PI/4);
  rect(0, 0, 80, 80);
  
  pop();
  
}