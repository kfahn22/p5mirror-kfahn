function preload() {
  img1 = loadImage('bkg.png');
 // img2 = loadImage('');
}

function setup() {
  createCanvas(512, 512);
 // rectMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  // uncomment if you want to see layout in Blender 
  // backgroundTemplate();
  
  // Add images
  // Z axis blue
  push();
  square(0,0,256);
  image(img1, 0, 0, 256, 256);
  pop();
  // - X axis red
  push()
  translate(256, 512);
  scale(-1,1);
  rotate(-180);
  image(img1, -256, 0, 256, 256);
  
  //image(img1, 0, 0, 256, 256);
  pop();
  // Y axis green
  push();
  translate(256, 512);
  // Have to rotate image to have it rightside up in background in Blender
  rotate(-90);
  //scale(-1, 1);
  image(img1, 0, 0, 256, 256);
  pop();

 }

function backgroundTemplate() {
  textSize(100);
  rectMode(CENTER);
  // Z axis blue
  push()
  translate(128, 128);
  fill(0, 0, 255)
  square(0,0,256);
  fill(0);
  text('Z', -25, 25)
  pop()
  // - X axis red
  push()
  translate(128,384 )
  fill(255, 0,0)
  square(0,0,256);
  fill(0);
  text('-X', -25, 25)
  pop();
  // Y axis green
  push()
  translate(384, 384);
  rotate(-90);
  fill(0, 255, 0)
  square(0,0,256);
  fill(0);
  text('Y', -25, 25)
  pop();
}

function mousePressed() {
  save('background.jpg');
}
