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

function setup() {
  createCanvas(800, 450);
  extraCanvas = createGraphics(800, 450);
  extraCanvas.clear();
  background('#OB6A88');
}

function draw() {
  
  // No trails!
  background('#0B6A88');
  x += random(-5, 5);
  y += random(-5, 5);
	
  // trails
  if (mouseIsPressed) {
    extraCanvas.fill(255, 150);
    extraCanvas.noStroke();
    extraCanvas.ellipse(mouseX, mouseY, 100, 100);
  }
  
  image(extraCanvas, 0, 0);
  c = color('#F16164');
    fill(c, 0, 0);
  stroke('#F16164');
  rectMode(CENTER);
  rect(x, y, 75, 75);

  
}