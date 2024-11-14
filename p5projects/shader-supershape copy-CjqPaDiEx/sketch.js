// The supershape code is based on Daniel Shiffman's 3d-supershapes challenge
// https://thecodingtrain.com/challenges/26-3d-supershapes

// a shader variable
let theShader;


function preload(){
  // load the shader
  theShader = loadShader('super.vert', 'super.frag');
}

function setup() {
  createCanvas(800, 800, WEBGL);
  pixelDensity(1);
  noCursor();
}

function draw() { 
      background(0);
     
      // Pass the values from the sliders back to the shader
  
    
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