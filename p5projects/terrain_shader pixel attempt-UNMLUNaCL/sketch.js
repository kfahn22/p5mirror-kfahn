// Created for https://github.com/Lumon-Industries/Macrodata-Refinement

// More shader resources can be found here https://github.com/kfahn22/Shader-Resources

let textureImg0;
// a shader variable
let theShader;

function preload(){
  // load the shader
  theShader = loadShader('starter.vert', 'starter.frag');
   textureImg0 = loadImage("Assets/stones.PNG");
}


function setup() {
  pixelDensity(1);
  // shaders require WEBGL mode to work
  createCanvas(800, 800, WEBGL);
  noStroke();
}


function draw() {  
  background(0);

  // send resolution of sketch into shader
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iFrame", frameCount);
  theShader.setUniform("iTime", millis()/1000.);
  theShader.setUniform("tex0", textureImg0);
  
  // shader() sets the active shader with our shader
  shader(theShader);
  //model(cubeObj);
  // rect gives us some geometry on the screen
  rect(0,0,width, height);
  
}

