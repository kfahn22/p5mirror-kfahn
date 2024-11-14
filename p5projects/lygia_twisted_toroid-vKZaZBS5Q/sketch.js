// Port of Twisted Torus Shader by The Art of Code
// https://www.youtube.com/watch?v=rA9NmBRqfjI

// a shader variable
let theShader;
let vertSource, fragSource;

function preload() {
  vertSource = loadStrings('starter.vert');
  fragSource = loadStrings('starter.frag');
}

function setup() {
  pixelDensity(1);
  // shaders require WEBGL mode to work
  createCanvas(800, 800, WEBGL);
  noStroke();
  vertSource = resolveLygia(vertSource);
  fragSource = resolveLygia(fragSource);
  // Hi There! this ^ two lines ^ use `resolveLygia( ... )` to resolve the LYGIA dependencies from the preloaded `shader.vert` and `shader.frag` files. 
  // Check `index.html` to see how it's first added to the project. 
  // And then, the `shader.frag` file to how it's used.
  
  theShader = createShader(vertSource, fragSource);
}

function draw() {  
  background(0);

  // send resolution of sketch into shader
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iFrame", frameCount);
  theShader.setUniform("iTime", millis()/1000.); 
  
  // shader() sets the active shader with our shader
  shader(theShader);
  // rect gives us some geometry on the screen
  rect(0,0,width, height);
}

