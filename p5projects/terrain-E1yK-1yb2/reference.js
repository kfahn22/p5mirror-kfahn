let mountainShader;
let blob0;
let blob1;

class Particle {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.vx = random(-15,15);
    this.vy = random(-15,15);
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x > width || this.x < 0) this.vx *= -1;
    if (this.y > height || this.y < 0) this.vy *= -1;
  }
  
  
}


function preload() {
  rippleShader = loadShader("ripples.vert", "ripples.frag");
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(1);
  blob0 = new Particle(0, 0);
  blob1 = new Particle(100, 50);
}


function draw() {
  background(220);
  mountainShader.setUniform("u_resolution", [width, height]);
  mountainShader.setUniform("u_peak0", [peak0.x,peak0.y]);
 // mountainShader.setUniform("u_peak1", [blob1.x,blob1.y]);
  shader(moutainShader);
  rect(0,0,width,height);
  
  blob0.update();
  blob1.update();
}

