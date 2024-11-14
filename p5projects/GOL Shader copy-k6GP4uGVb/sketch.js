let golShader;

let prevFrame;

function preload() {
  golShader = loadShader('gol.vert', 'gol.frag');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
  noSmooth();
  
  prevFrame = createGraphics(width, height, WEBGL);
  prevFrame.pixelDensity(1);
  prevFrame.noSmooth();
  
  background(0);
  stroke(255);
  shader(golShader);
  golShader.setUniform("normalRes", [1.0/width, 1.0/height]);
}

function draw() {
  if(mouseIsPressed) {
    line(
      pmouseX-width/2,
      pmouseY-height/2,
      mouseX-width/2,
      mouseY-height/2
    );
  }  
  
  // Copy the rendered image into our prevFrame image
  prevFrame.image(get(), 0, 0);  
  // Set the image of the previous frame into our shader
  golShader.setUniform('tex', prevFrame);
  
  // Give the shader a surface to draw on
  rect(-width/2,-height/2,width,height);
}