// createGraphics()
// Code! Programming with p5.js
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/beginners/p5js/beginners/p5js/2.6-create-graphics.html
// https://youtu.be/TaluaAD9MKA

// Main Sketch: https://editor.p5js.org/codingtrain/sketches/7RN7GFD-Y
// Stars Sketch: https://editor.p5js.org/codingtrain/sketches/0kQ9v-bhM

// If you find "let" confusing, you can learn more in this video: https://www.youtu.be/q8SHaDQdul0

let x = 400;
let y = 200;
let extraCanvas;
let c = color("#F16164");
function setup() {
  createCanvas(800, 450);
  extraCanvas = createGraphics(800, 450);
  extraCanvas.clear();
  background(0);
}

function draw() {
  
  // No trails!
  background("#F16164");
  x += random(-5, 5);
  y += random(-5, 5);
	
  // trails
  //if (mouseIsPressed) {
    extraCanvas.fill(255, 150);
    extraCanvas.noStroke();
    let starX = random(width);
    let starY = random(height);
    extraCanvas.ellipse(starX, starY, 30, 30);
    //extraCanvas.ellipse(mouseX, mouseY, 60, 60);
  //}
  
  image(extraCanvas, 0, 0);
  c1 = color("#0B6A88");
  fill(c1, 0, 0);
  stroke(c1);
  rectMode(CENTER);
  rect(x, y, 75, 75);

  
}