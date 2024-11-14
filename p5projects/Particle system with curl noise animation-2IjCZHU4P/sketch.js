// Particle system adapted from http://codingtrain.com / Daniel Shiffman
// https://thecodingtrain.com/challenges/78-simple-particle-system
// https://youtu.be/UcdigVaIYAk

// Curl noise code adapted from https://www.youtube.com/watch?v=gvMNixP1S5o / Robot Bobby

const w = 400;
const h = 400;
let particles = [];
const maxParticles = 750; // you can get longer trails by increasing maxParticles
let adj = 0.01;
const frames = 60;
let inc = 0;
const n = 4; // number of spirals

function keyPressed() {
  if (key == "s") {
    const options = {
      units: "frames",
      delay: 0,
    };
    saveGif("GIF/swirl.gif", frames, options);
  }
}

function setup() {
  createCanvas(w, h);
  angleMode(DEGREES);
  colorMode(HSL);
}

function draw() {
  // add alpha to background to keep trail
  background(0, 0, 0, 0.1);

  for (let i = 0; i < n; i++) {
    particles.push(new Particle((w * i) / 4, 0, 190 + i * 5));
    particles.push(new Particle(0, (h * i) / 4, 190 + i * 5));
    particles.push(new Particle((w * i) / 4, h, 190 + i * 5));
    particles.push(new Particle(w, (h * i) / 4, 190 + i * 5));
  }

  let f = frameCount;
  for (let i = 0; i < particles.length; i++) {
    // uncomment for GIF
    // particles[i].update(adj);
    // particles[i].show(adj);
    particles[i].update(f * adj);
    particles[i].show(f * adj);
  }

  while (particles.length > maxParticles) {
    // remove this particle
    particles.shift();
  }
  // for GIF
  // inc += 360 / frames;
  // adj = map(sin(inc), -1, 1, 0.01, 0.61);
}

function mousePressed() {
  save("spiral_particles.jpg");
}
