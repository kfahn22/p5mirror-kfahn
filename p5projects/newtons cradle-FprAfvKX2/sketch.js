// This code is based on the Mandelbulb Coding Train Challenge by Daniel Shiffman
// See the basic.frag file for more information
// This code renders a static image of the mandelbulb using ray marching with phong illumination. 

// You can find the code for other versions that you can rotate in my github respository
// The code currently needs work to make it run faster and improve lighting
// https://github.com/kfahn22/mandelbulb


let img;

// a shader variable
let theShader;

function preload(){
  // load the shader
  img = loadImage("fish.jpeg");
  theShader = loadShader('basic.vert', 'sphere.frag');
}


function setup() {
  pixelDensity(1);
  // shaders require WEBGL mode to work
  createCanvas(800, 800, WEBGL);
  noStroke();
}

function draw() {  
  background(0);
  //texture(img);
  // send resolution of sketch into shader
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iFrame", frameCount);
  theShader.setUniform("iChannel0", loadImage("fish.jpeg"));
  
  // shader() sets the active shader with our shader
  shader(theShader);

  // rect gives us some geometry on the screen
  rect(0,0,width, height);
}
