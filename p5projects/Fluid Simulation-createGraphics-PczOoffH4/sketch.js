// Fluid Simulation
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/132-fluid-simulation.html
// https://youtu.be/alhpH6ECFvQ

// This would not be possible without:
// Real-Time Fluid Dynamics for Games by Jos Stam
// http://www.dgp.toronto.edu/people/stam/reality/Research/pdf/GDC03.pdf
// Fluid Simulation for Dummies by Mike Ash
// https://mikeash.com/pyblog/fluid-simulation-for-dummies.html

let fluid;
let pg

function setup() {
  createCanvas(600, 600);
  frameRate(22);
  pg = createGraphics(width, height);
  fluid = new Fluid(0.2, 0, 0.0000001);
  
}

function draw() {
  background(255); // Clear the canvas
  stroke(51);
  strokeWeight(2);

  let cx = int((0.5 * width) / SCALE);
  let cy = int((0.5 * height) / SCALE);
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      fluid.addDensity(cx + i, cy + j, random(50, 150));
    }
  }

  for (let i = 0; i < 5; i++) {
    let angle = noise(t) * TWO_PI * 2;
    let v = p5.Vector.fromAngle(angle);
    v.mult(0.2);
    t += 0.01;
    fluid.addVelocity(cx, cy, v.x, v.y);
  }
  fluid.step();

  // Render to the graphics buffer
  pg.clear();
  
  fluid.renderD(pg);

  // Display the graphics buffer on the main canvas
  image(pg, 0, 0);
}