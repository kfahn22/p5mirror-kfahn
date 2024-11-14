// This code is based on the Mandelbulb Coding Train Challenge by Daniel Shiffman
// See the starter.frag file for more information
// This code renders an image of the mandelbulb using ray marching. 

// You can find the code for other versions in my github respository
// https://github.com/kfahn22/mandelbulb

// a shader variable
let shdr;
let vertSource, fragSource;

function preload(){
  vertSource = loadStrings('starter.vert');
  fragSource = loadStrings('starter.frag');
}


function setup() {
  pixelDensity(1);
  // shaders require WEBGL mode to work
  //createCanvas(800, 450, WEBGL);
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  vertSource = resolveLygia(vertSource);
  fragSource = resolveLygia(fragSource);
  // Hi There! this ^ two lines ^ use `resolveLygia( ... )` to resolve the LYGIA dependencies from the preloaded `shader.vert` and `shader.frag` files. 
  // Check `index.html` to see how it's first added to the project. 
  // And then, the `shader.frag` file to how it's used.
  
  shdr = createShader(vertSource, fragSource);
}


function draw() {  
  background(0);

  // send resolution of sketch into shader
  shdr.setUniform('u_resolution', [width, height]);
  shdr.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  shdr.setUniform("iFrame", frameCount);
  
  // shader() sets the active shader with our shader
  shader(shdr);
  //model(cubeObj);
  // rect gives us some geometry on the screen
  rect(0,0,width, height);
  
}

function mousePressed() {
 save('mandelbulb.jpg');
}

