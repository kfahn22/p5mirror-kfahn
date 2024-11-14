// https://nasa3d.arc.nasa.gov/detail/jpl-vtad-dsn34
let obj; 
let stars = [];
let speed;

function preload() {
  // Load your obj
  obj = loadModel('34M_17.stl', true)
}

function setup() {
  createCanvas(400, 400, WEBGL);
  
  for (var i = 0; i < 100; i++) {
    stars[i] = new Star();
  }
  
  angleMode(DEGREES);
}

function draw() {
  background(0);
  
  speed = map(mouseX, 0, width, 0, 50);
  push();
  //translate(width / 2, height / 2);
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
  pop();

  // Add a spaceship
  // Rotate the canvas for a better view
  rotateY(frameCount * 1);
  rotateX(frameCount * 1);
  
  ambientLight(60);
  // add point light to showcase specular material
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  pointLight(255, 255, 255, locX, locY, 50);
  //specularMaterial(50, 100);
  //emissiveMaterial(100, 100, 100);
  
  specularMaterial(150);
  shininess(10);
  
  push()
  noStroke();
  // Add obj
  model(obj);
  pop()
  
}
