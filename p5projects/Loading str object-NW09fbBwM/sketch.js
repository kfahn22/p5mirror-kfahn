let img; // Declare a variable for the image
let obj; 
// Bird obj file by vladhunter obtained from
// https://www.turbosquid.com/3d-models/3d-bird-1471880

function preload() {
  // Load your object

  obj = loadModel('cat_mesh.stl')
}

function setup() {
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  noStroke();
  
  // Rotate the canvas for a better view
  rotateY(frameCount * 1);
  rotateX(90);
  
  // Apply the image as a texture
  // texture(img);
  
  
  ambientLight(255, 0, 0);
  ambientMaterial(255, 0, 0);
  // Add bird obj
  scale(100.0);
  model(obj);
}

