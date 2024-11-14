const {
  VerletPhysics2D,
  VerletParticle2D,
  VerletSpring2D
} = toxi.physics2d;

const {
  GravityBehavior
} = toxi.physics2d.behaviors;

const {
  Vec2D,
  Rect
} = toxi.geom;

let starColors = [
  [90, 135, 221, 150],
  [175, 194, 231, 150],
  [219, 226, 242, 150],
  [238, 242, 252, 150],
  [248, 243, 157, 150],
  [255, 213, 141, 150],
  [253, 157, 125, 150]
]

let physics;

let particles = [];
let p = [];
let stars = [];
let n = 30;

function setup() {
  createCanvas(512, 409);

  physics = new VerletPhysics2D();

  let bounds = new Rect(0, 0, width, height);
  physics.setWorldBounds(bounds);

  for (let i = 0; i < n; i++) {
    stars.push(new Star(i + random(10), i + random(10), random(25, 35), random(15, 20), random(starColors)));
  }
  for (let i = 0; i < stars.length; i++) {
    p = stars[i].addPoints();
    particles[i] = p;
    //console.log(particles[0]);
    stars[i].connectPoints();
  }

}

function draw() {
  background(9, 39, 96);

  physics.update();

  for (let i = 0; i < stars.length; i++) {
    stars[i].show();
  }

  if (mouseIsPressed) {
    for (let i = 0; i < particles.length; i++) {
      particles[i][0].lock();
      particles[i][0].x = mouseX;
      particles[i][0].y = mouseY;
      particles[i][0].unlock();
    }
  }
}