// Particle system adapted from http://codingtrain.com / Daniel Shiffman
// https://thecodingtrain.com/challenges/78-simple-particle-system
// https://youtu.be/UcdigVaIYAk

// Curl noise code adapted from https://www.youtube.com/watch?v=gvMNixP1S5o / Robot Bobby


const w = 800;
const h = 400;
const timeMult = 0.009; // interesting effect when timeMult = 0.01
let particles = [];
let maxParticles = 500;

function setup() {
  createCanvas(w, h);
  angleMode(DEGREES);
  colorMode(HSL);
}

function draw() {
  // change alpha in background to leave trails
  background(0, 0, 0, 0.05);
  
  let angle = random(0, 360);
  let speed = random(0, 2);
  for (let i = 0; i < 1; i++) {
    
    let p = new Particle(w / 2 + i*10, h / 2 + i*10, random(360), random(1, 2));
    particles.push(p);
  }

  let f = frameCount;
  for (let i = 0; i < particles.length; i++) {
    particles[i].update(f*timeMult);
    particles[i].show(f*timeMult);
  }

  while (particles.length > maxParticles) {
    // remove this particle
    particles.shift();
  }
}

function mousePressed() {
  save('curl.jpg');
}
