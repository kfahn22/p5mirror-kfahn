// Created for https://github.com/Lumon-Industries/Macrodata-Refinement

// a shader variable
let completeShader;

function preload(){
  // load the shader
  completeShader = loadShader('completeShader.vert', 'completeShader.frag');
}


function setup() {
  pixelDensity(1);
  // shaders require WEBGL mode to work
  createCanvas(500, 500, WEBGL);
  noStroke();
}


function draw() {  
  background(0);

  // send resolution of sketch into shader
  completeShader.setUniform('u_resolution', [width, height]);
  completeShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  completeShader.setUniform("iFrame", frameCount);
  completeShader.setUniform("iTime", millis()/1000.);
  
  // shader() sets the active shader with our shader
  shader(completeShader);
  //model(cubeObj);
  // rect gives us some geometry on the screen
  rect(0,0,width, height);
  
}

