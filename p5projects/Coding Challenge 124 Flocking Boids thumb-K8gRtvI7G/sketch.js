// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM

const flock = [];

let alignSlider, cohesionSlider, separationSlider;

const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  createCanvas(800, 450);
  alignSlider = createSlider(0, 2, 1.5, 0.1);
  cohesionSlider = createSlider(0, 2, 1, 0.1);
  separationSlider = createSlider(0, 2, 2, 0.1);
  for (let i = 0; i < 200; i++) {
    flock.push(new Boid());
  }

}

function mousePressed() {
 save('boids.jpg');
}

function draw() {
  let c1 = color(45,197,244);
  let c2 = color(241,97,100);
 
  let  col = setGradient(0, 0, 800, 450, c1, c2, Y_AXIS);
  
  for (let boid of flock) {
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show();
  }  
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
