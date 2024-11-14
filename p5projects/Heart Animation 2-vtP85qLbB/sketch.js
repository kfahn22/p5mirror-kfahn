// This sketch draws a heart curve using a shader.  
// I started with formulas from Daniel Shiffman (explained n frag file) but
// had to edit quite a bit to get a nice heart shape

// a shader variable
let theShader;

function preload(){
  // load the shader
  theShader = loadShader('heart.vert', 'heart.frag');
}

function setup() {
  pixelDensity(1);
  // shaders require WEBGL mode to work
  createCanvas(800, 450, WEBGL);
  noStroke();
}

function draw() {  
  background(0);
  let rand = randomGaussian(0.0, 1.0);
  // send resolution of sketch into shader
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iFrame", frameCount);
  theShader.setUniform("iTime", millis()/1000.);
  theShader.setUniform("rand", rand);
 
  // shader() sets the active shader with our shader
  shader(theShader);
  //model(cubeObj);
  // rect gives us some geometry on the screen
  rect(0,0,width, height);
}

