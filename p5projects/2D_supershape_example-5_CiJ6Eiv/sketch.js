// The supershape code is based on Daniel Shiffman's 2d-supershapes challenge
// https://thecodingtrain.com/challenges/23-2d-supershapes

// a shader variable
let theShader;
// supershape params
let m = 8.0;
let a = 1.0;
let b = 1.0;
let n1 = 2.0;
let n2 = 1.0;
let n3 = 1.0;
let s = 0.2; // size

function preload() {
  // load the shader
  theShader = loadShader("super.vert", "super.frag");
}

function setup() {
  let can = createCanvas(600, 600, WEBGL);
  pixelDensity(1);
}

function draw() {
  background(0);

  // send resolution of sketch into shader
  theShader.setUniform("u_resolution", [width, height]);
  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iFrame", frameCount);
  theShader.setUniform("iTime", millis() / 1000.0);
  theShader.setUniform("a", a);
  theShader.setUniform("b", b);
  theShader.setUniform("s", s);
  theShader.setUniform("m", m);
  theShader.setUniform("n1", n1);
  theShader.setUniform("n2", n2);
  theShader.setUniform("n3", n3);

  // shader() sets the active shader with our shader
  shader(theShader);

  // rect gives us some geometry on the screen
  rect(0, 0, width, height);
}
