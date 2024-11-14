let textureImg
let theShader;
let blob0;


// class Particle {
//   constructor(x,y) {
//     this.x = x;
//     this.y = y;
//     this.vx = random(-15,15);
//     this.vy = random(-15,15);
//   }
  
//   update() {
//     this.x += this.vx;
//     this.y += this.vy;
//     if (this.x > width || this.x < 0) this.vx *= -1;
//     if (this.y > height || this.y < 0) this.vy *= -1;
//   }
  
  
// }


function preload() {
  theShader = loadShader("starter.vert", "starter.frag");
  textureImg = loadImage("Assets/sunset.PNG");
}


function setup() {
  createCanvas(800, 800, WEBGL);
  pixelDensity(1);
  noStroke();
  //blob0 = new Particle(0, 0);
 
}


function draw() {
  background(220);
  theShader.setUniform("u_resolution", [width, height]);
  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iFrame", frameCount);
  theShader.setUniform("tex0", textureImg);
  //theShader.setUniform("u_blob0", [blob0.x,blob0.y]);
  
  shader(theShader);
  rect(0,0,width,height);
  
  //blob0.update();

}

