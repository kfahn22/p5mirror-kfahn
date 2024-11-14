// Daniel Shiffman
// http://codingtra.in

// Simple Particle System
// https://youtu.be/UcdigVaIYAk

const particles = [];

let colorsCT = ['#0B6A88', '#2DC5F4', '#70327E', '#9253A1', '#A42963',
  '#EC015A', '#F063A4', '#F16164', '#F89E4F', '#FCEE21'
];

function setup() {
  createCanvas(1280, 720);
}

function mousePressed() {
  save('particle.jpg');
}

function draw() {
  background('#2DC5F4');
  
  for (let i = 0; i < 5; i++) {
    let p = new Particle();
    particles.push(p);
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      // remove this particle
      particles.splice(i, 1);
    }
  }
}

class Particle {

  constructor() {
    this.x = 640;
    this.y = 700;
    this.vx = random(-1, 1);
    this.vy = random(-5, -1);
    this.alpha = 255;
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 2;
  }

  show() {
    noStroke();
    //translate(width/2, height/2)
    //stroke(255);
    fill(255, this.alpha);
    ellipse(this.x-320, this.y, 20);
    ellipse(this.x, this.y, 20);
    ellipse(this.x+320, this.y, 20);
  }

}