// Variables to store shader programs
let dropCircleShader;
let drawTineLineShader;
 let count = 1; // Change this value as needed
  let interpolation = 'nearest'; // Change this value as needed
  let method = 'I'; // Change this value as needed

function preload() {
  // Load shader files
  dropCircleShader = loadShader('dropCircle.vert', 'dropCircle.frag');
  //drawTineLineShader = loadShader('drawTineLine.vert', 'drawTineLine.frag');
}

function setup() {
  // Define your canvas size
  createCanvas(400, 300, WEBGL);
  noStroke();

  // Pass the size of the canvas to the shaders
  dropCircleShader.setUniform('u_resolution', [width, height]);
 // drawTineLineShader.setUniform('u_resolution', [width, height]);

}

function draw() {
  if (method == 'I') {
    dropCircleShader.setUniform('u_count', count);
    dropCircleShader.setUniform('u_interpolation', interpolation === 'nearest' ? 0 : 1);
    shader(dropCircleShader);
  } else if (method == 'T') {
    drawTineLineShader.setUniform('u_count', count);
   // drawTineLineShader.setUniform('u_interpolation', interpolation === 'nearest' ? 0 : 1);
    shader(drawTineLineShader);
  }

  // Draw a full-screen rectangle to apply the shader
  rect(-width / 2, -height / 2, width, height);

  // Save the canvas as an image
  //saveCanvas(now.getTime(), 'png');
}
