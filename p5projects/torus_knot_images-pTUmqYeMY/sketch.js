let img1, img2;


function preload() {
   img1 = loadImage('8_9.jpg');
   img2 = loadImage('8_9_side.jpg');
}
function setup() {
  createCanvas(1600, 800);
}

function draw() {
  background(220);
  
  
  image(img1, 0, 0, 800, 800);
  image(img2, 800,0, 800, 800);
}

function mousePressed() {
  save('torus.jpg');
 }