// This code is based on the Mandelbulb Coding Train Challenge by Daniel Shiffman
// See the starter.frag file for more information
// This code renders an image of the mandelbulb using ray marching. 

// You can find the code for other versions in my github respository
// https://github.com/kfahn22/mandelbulb

// a shader variable
let theShader;
let radio, radioB;
let angle, frames;

function preload(){
  // load the shader
  theShader = loadShader('starter.vert', 'starter.frag');
}

function keyPressed() {
  if (key === 's') {
    saveGif('mandelbulb.jpg', 1);
  }
}

function setup() {
  pixelDensity(1);
  // shaders require WEBGL mode to work
  //createCanvas(800, 450, WEBGL);
  para = createP("Mandelbulb with different color options");
  para.position(50, 10)
  canvas = createCanvas(1200, 800, WEBGL);
  //canvas = createCanvas(1280, 640, WEBGL);
  canvas.position(50,100);
  noStroke();
  noCursor();
  divAr =createDiv();
  divAr. position(880, 100);
  //divAr. position(1280, 100);
  paraA = createP("Choose mandelbulb color");
  paraA.parent(divAr);
  radio = createRadio();
  radio.parent(divAr);
  radio.option('0', 'pink, purple, fushia');
  radio.option('1', 'aqua and blue');
  radio.option('2', 'green and purple');
  radio.option('3', 'raspberry and cream');
  radio.option('4', 'bright colors');
  radio.option('5', 'pink and blue');
  radio.option('6', 'aqua and rose');
  radio.option('7', 'purple');
  radio.option('8', 'multi-colored');
  radio.option('9', 'multi-colored');
  //radio.option('10', 'green and yellow');
  radio.selected('0');
}


function draw() {  
  background(0);
  let choice = radio.value();
   let mm = map(sin(angle),-1.0, 1.0, 0.25, 0.75);
  // send resolution of sketch into shader
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iFrame", frameCount);
  theShader.setUniform('mm', mm);
  theShader.setUniform("choice", choice);
  
  // shader() sets the active shader with our shader
  shader(theShader);
  //model(cubeObj);
  // rect gives us some geometry on the screen
  rect(0,0,width, height);
  angle += TWO_PI/frames;
}

// function mousePressed() {
//  save('mandelbulb.jpg');
// }

