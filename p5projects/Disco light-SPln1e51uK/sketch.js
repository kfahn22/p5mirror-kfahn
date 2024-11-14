// Daniel Shiffman
// Coding Train Live:  Shaders and Autoencoders
// https://youtu.be/kTVUvfp5og8

let basicShader;

function preload() {
  basicShader = loadShader("disco.vert", 
  "disco.frag");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(1);
}

function draw() {
  basicShader.setUniform('u_resolution', [width, height]);
  basicShader.setUniform('u_mouse', [mouseX, height-mouseY]);
  basicShader.setUniform('u_frames', frameCount);
  
  background(0);
  shader(basicShader);
  rect(0,0,width, height);

}
