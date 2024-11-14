let theShader;
let vertSource, fragSource;

function preload() {
  vertSource = loadStrings("shader.vert");
  fragSource = loadStrings("shader.frag");
}

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
  vertSource = resolveLygia(vertSource);
  fragSource = resolveLygia(fragSource);
  // Hi There! this ^ two lines ^ use `resolveLygia( ... )` to resolve the LYGIA dependencies from the preloaded `shader.vert` and `shader.frag` files.
  // Check `index.html` to see how it's first added to the project.
  // And then, the `shader.frag` file to how it's used.

  theShader = createShader(vertSource, fragSource);
}
  
function draw() {   
  // The shader() function sets the active 
  // shader with our shader 
  shader(theShader); 
  
  // Setting the time and resolution of our shader 
  theShader.setUniform( 
    'resolution', [width, height] 
  ); 
  theShader.setUniform( 
    'time', frameCount * 0.05 
  ); 
    
  // Using rect() to give some  
  // geometry on the screen 
  rect(0, 0, width, height); 
} 
  
function windowResized() { 
  resizeCanvas(windowWidth, windowHeight); 
}