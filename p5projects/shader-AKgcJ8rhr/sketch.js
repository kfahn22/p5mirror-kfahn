// a shader variable
let theShader;

function preload(){
  // load the shader
  theShader = loadShader('basic.vert', 'basic.frag');
}

function setup() {
  // disables scaling for retina screens which can create inconsistent scaling between displays
  pixelDensity(1);
  
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {  
  // send resolution of sketch into shader
  theShader.setUniform('u_resolution', [width, height]);

  // shader() sets the active shader with our shader
  shader(theShader);

  // rect gives us some geometry on the screen
  rect(0,0,width, height);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}fuenction setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}