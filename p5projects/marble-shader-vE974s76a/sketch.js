//https://glitch.com/edit/#!/marbled-paper?path=src%2Fmain.js%3A1%3A0

// https://www.shadertoy.com/view/tssXR8

let textureImg;
// Smoothing value for animating drops when they are created.
const viscosity = 5

// This needs to match MAX_OPS in marble.frag
const maxOperations = 32

// a shader variable
let theShader;

function preload(){
  // load the shader
  
  theShader = loadShader('marble.vert', 'marble.frag');
}


function setup() {
  pixelDensity(1);
  // shaders require WEBGL mode to work
  createCanvas(800, 450, WEBGL);
  noStroke();
}

mousePressed = () => {
  save('stars.jpg');
}


function draw() {  
  background(0);

  // send resolution of sketch into shader
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iFrame", frameCount);
  theShader.setUniform("iTime", millis()/1000.);
  theShader.setUniform("tex0", textureImg);
  
  // shader() sets the active shader with our shader
  shader(theShader);
  //model(cubeObj);
  // rect gives us some geometry on the screen
  rect(0,0,width, height);
  
}

/*
  Replace the oldest operation with a new blank one, and draw the old one to the background.
*/
function shiftOperations() {
  
  // Cycle operations.
  const op = operations.pop()
  operations.unshift(op)

  // Swap framebuffers.
  const previous = framebuffers[framebufferIndex]
  const next = framebuffers[framebufferIndex ^= 1]
  
  // Draw the old operation to the background.
  next.bind()
  shader.uniforms.backgroundTexture = previous.color[0].bind()
  shader.uniforms.operationCount = 1
  shader.uniforms.operations = operations
  drawTriangle(gl)

  return op
}

