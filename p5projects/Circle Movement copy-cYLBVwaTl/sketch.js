let theShader;
let gl;

function preload(){
  // load the shader
  theShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  gl = this.drawingContext;
}

function draw() {  
  shader(theShader);

  theShader.setUniform("iResolution", [width, height]);
  theShader.setUniform("iFrame", frameCount);
  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iTime", millis()/1000);

  rect(0,0,width, height);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}