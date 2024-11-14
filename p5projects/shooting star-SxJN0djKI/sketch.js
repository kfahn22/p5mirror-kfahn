// Sketch based on //The Coding Train / Daniel Shiffman Soft Body Character coding challenge
// https://thecodingtrain.com/challenges/177-soft-body-character

const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;

const { GravityBehavior } = toxi.physics2d.behaviors;

const { Vec2D, Rect } = toxi.geom;

let physics;

let star;

let particle;

function preload() {
  img = loadImage("star.png");
}

function setup() {
  createCanvas(800, 600);

  physics = new VerletPhysics2D();

  let bounds = new Rect(0, 0, width, height);
  physics.setWorldBounds(bounds);

  // Add main star character
  star = new Star(img);
  particle = star.addPoints();
  star.connectPoints();
}

function draw() {
  background(23, 36, 65);

  physics.update();

  fill(255, 255, 107, 200);
  stroke(255, 255, 107);

  star.show();

  if (mouseIsPressed) {
    particle.lock();
    particle.x = mouseX;
    particle.y = mouseY;
    particle.unlock();
  }
}
