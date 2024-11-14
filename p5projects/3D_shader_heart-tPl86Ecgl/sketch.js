// This sketch draws a 3D heart  using a shader.  
// I started with formulas from Inigo Quilez and edited a bit
// The code is not quite right--while it looks semi-OK static, when you add rotation with the curser the render is wierd.

let theShader;

function preload(){
  // load the shader
  theShader = loadShader('heart.vert', 'heart.frag');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
 
}

function keyPressed() {
  // This is approximately the number of seconds for a full cycle of the animation
  if (key === 's') {
    saveGif('3dheart', 6);
  }
}

function draw() { 
      background(0);
     
      // send resolution of sketch into shader
      theShader.setUniform('u_resolution', [width, height]);
      theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
      theShader.setUniform("iFrame", frameCount);
      theShader.setUniform("iTime", millis()/1000.0);

      // shader() sets the active shader with our shader
      shader(theShader);

      // rect gives us some geometry on the screen
      rect(0,0,width, height);
}