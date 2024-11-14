let fish;

var inc = 0.1;
var scl = 10;



var fr;

var particles = [];






function setup() {
 
}
function setup() {
  pixelDensity(1);
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  fish = new Fish(width,height/2);

}

function draw() {
  background(145,251,255);

  scale(0.6);
  fish.show();

}




