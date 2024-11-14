// Taken from here
// https://discourse.processing.org/t/tiling-repeating-shader-image-texture/21591
// Neat water effect

let theShader;
let tex;

function preload() {
  theShader = loadShader("basic.vert", "basic.frag");
  tex = loadImage("mussels.PNG");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  textureWrap(CLAMP);
  noStroke();
}

function draw() {
  shader(theShader);
  theShader.setUniform("iResolution", [width, height]);
  theShader.setUniform("iTime", frameCount * 0.01);
  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iChannel0", tex);

  rect(0, 0, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}