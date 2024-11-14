let img;
let angle = 0;

function preload() {
  img = loadImage('bella.jpeg');
}

function setup() {
  createCanvas(400, 300, WEBGL);
  describe('plane with a texture from an image');
}

function draw() {
  background(0);

  rotateX(angle);
  rotateY(angle * 1.3);
  rotateZ(angle * 0.7);
  
  // fill(255);
  texture(img);
  // You must now add textureMode(normal) to add texture
  textureMode(NORMAL);
  translate(-50,-50);
  
  // create a custom plane
  beginShape();
  vertex(0, 0, 0, 0, 0);
  vertex(100, 0, 0, 1, 0);
  vertex(100, 100, 0, 1, 1);
  vertex(0, 100, 0, 0, 1);
  endShape(CLOSE);
  
  angle += 0.03;
}