// <script async src=http://p5js.org/assets/js/p5.min.js></script>

// <script>

/**
 * Bouncing Colorful Balls [Global Mode] (v1.2)
 * AllOneString & GoToLoop (2016-Jun-28)
 *
 * https://Forum.Processing.org/two/discussion/17306/
 * multiple-canvases-on-one-page#Item_12
 *
 * http://p5ide.HerokuApp.com/editor#?sketch=577310949e3f9603000ab5bc
 * http://CodePen.io/GoSubRoutine/pen/KaerGb/right/?editors=101
*/



const NUM = 15, balls = Array(NUM);
let bg;

function setup() {
  createCanvas(400, 400).mousePressed(restart);
  noStroke();
  bg = color(random(0xd0, 0x100), random(0xd0, 0x100), random(0xd0, 0x100));
  for (let i = 0; i < NUM; balls[i++] = new Ball);
}

function draw() {
  background(bg);
  for (const b of balls)  b.display().update();
}

function restart() {
  bg = color(random(0xd0, 0o400), random(0xd0, 0o400), random(0xd0, 0o400));
  for (const b of balls)  b.initBall();
}

// class Ball {
//   static get VEL() { delete this.VEL; return this.VEL = 2; }
//   static get MIN_RAD() { delete this.MIN_RAD; return this.MIN_RAD = 5; }
//   static get MAX_RAD() { delete this.MAX_RAD; return this.MAX_RAD = 30; }

//   constructor() {
//     this.pos = createVector(), this.vel = createVector();
//     this.initBall();
//   }

//   initBall() {
//     const r = this.rad = random(Ball.MIN_RAD, Ball.MAX_RAD), v = Ball.VEL;
//     this.pos.set(random(r, width - r), random(r, height - r));
//     this.vel.set(random(-v, v), random(-v, v));
//     this.c = color('#' + hex(~~random(0x1000), 3));
//     return this;
//   }

//   update() {
//     const { pos, rad } = this;
//     pos.add(this.vel);
//     pos.x > width  - rad | pos.x < rad && (this.vel.x *= -1);
//     pos.y > height - rad | pos.y < rad && (this.vel.y *= -1);
//     return this;
//   }

//   display() {
//     fill(this.c).ellipse(this.pos.x, this.pos.y, this.rad<<1);
//     return this;
//   }
// }



new p5(p => {
  const NUM = 15, balls = Array(NUM);
  let bg;

  p.setup = () => {
    p.createCanvas(400, 400);
    p.noStroke();
    for (let i = 0; i < NUM; balls[i++] = new Ball);
    bg = p.color(p.random(0xd0, 0x100), p.random(0xd0, 0x100), p.random(0xd0, 0x100));
  };

  p.draw = () => {
    p.background(bg);
    for (let b of balls)  b.display(), b.update();
  };

  p.mousePressed = () => {
    for (let b of balls)  b.initBall();
    bg = p.color(p.random(0xd0, 0o400), p.random(0xd0, 0o400), p.random(0xd0, 0o400));
  };

  class Ball {
    static get VEL() { return 2; }
    static get MIN_RAD() { return 5; }
    static get MAX_RAD() { return 30; }

    constructor () {
      this.pos = p.createVector(), this.vel = p.createVector();
      this.initBall();
    }

    initBall() {
      const r = this.rad = p.random(Ball.MIN_RAD, Ball.MAX_RAD), v = Ball.VEL;
      this.pos.set(p.random(r, p.width - r), p.random(r, p.height - r));
      this.vel.set(p.random(-v, v), p.random(-v, v));
      this.c = p.color('#' + p.hex(~~p.random(0x1000), 3));
    }

    update() {
      const {pos, rad} = this, {width: w, height: h} = p;
      pos.add(this.vel);
      pos.x > w - rad | pos.x < rad && (this.vel.x *= -1);
      pos.y > h - rad | pos.y < rad && (this.vel.y *= -1);
    }

    display() {
      p.fill(this.c).ellipse(this.pos.x, this.pos.y, this.rad<<1);
    }
  }
});

new p5(p => {
 

  const NUM = 15, balls = Array(NUM);
  let bg;

  p.setup = () => {
    p.createCanvas(530, 290);
    p.noStroke();
    for (let i = 0; i < NUM; balls[i++] = new Ball(p));
    bg = p.color(p.random(0xd0, 0x100), p.random(0xd0, 0x100), p.random(0xd0, 0x100));
  };

  p.draw = () => {
    p.background(bg);
    for (let b of balls)  b.display(), b.update();
  };

  p.mousePressed = () => {
    for (let b of balls)  b.initBall();
    bg = p.color(p.random(0xd0, 0o400), p.random(0xd0, 0o400), p.random(0xd0, 0o400));
  };
});



