let img1, img2, img3, img4, img5, im6;


function preload() {
  img1 = loadImage('heart_1.jpg');
   img2 = loadImage('heart_2.jpg');
   img3 = loadImage('heart_3.jpg');
   img4 = loadImage('heart_4.jpg');
  img5 = loadImage('heart_shader.jpg');
   img6 = loadImage('heart_6.jpg');
}
function setup() {
  createCanvas(1280, 640);
}

function draw() {
  background('#F063A4');
  
  
  image(img1, 0, 0, 640, 320);
  image(img3, 640,0, 640, 320);
  image(img5, 0, 320, 640, 320);
  // // image(img4, 600, 250, 400, 250);
   image(img4, 640, 320, 640, 320);
  // image(img6, 1000, 250, 400, 250);
}

function mousePressed() {
  save('heart_images.jpg');
 }