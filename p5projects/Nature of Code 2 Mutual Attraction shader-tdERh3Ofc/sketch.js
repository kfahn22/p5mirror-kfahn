// Mutual Attract// The Nature of Code

let movers = [];
let sun;
let originalGraphics;

function preload() {
  attractShader = loadShader("attract.vert", "attract.frag");
}

function setup() {
  
  createCanvas(600, 600, WEBGL);
  originalGraphics = createGraphics(600,600);
  originalGraphics.push();
      // for (let i = 0; i < 2; i++) {
      //   let pos = p5.Vector.random2D();
      //   let vel = pos.copy();
      //   vel.setMag(random(10, 15));
      //   pos.setMag(random(100, 150));
      //   vel.rotate(PI / 2);
      //   let m = random(10, 15);
      //   movers[i] = new Mover(pos.x, pos.y, vel.x, vel.y, m);
      // }
      movers.push(new Mover(300, 300, 0, 0, 500));
      movers.push(new Mover(300, 200, 0, 5, 10));
      movers.push(new Mover(100, 200, 0, -5, 10));
      // movers[0] = new Mover(300, 200, 0, 5, 10);
      // movers[1] = new Mover(100, 200, 0, -5, 10);
  originalGraphics.pop();
  // movers[2] = new Mover(200, 300, -5, 0, 10);
  // movers[3] = new Mover(200, 100, 5, 0, 10);
 // background(0);
}

function draw() {
  background(0, 20);
  translate(width / 2, height / 2);
  //background(220);
  attractShader.setUniform("u_resolution", [width, height]);
  attractShader.setUniform("u_sun", [movers[0].x, movers[0].y]);
  attractShader.setUniform("u_mover0", [movers[1].x, movers[1].y]);
  attractShader.setUniform("u_mover1", [movers[2].x, movers[2].y]);
  attractShader.setUniform('u_tex', originalGraphics);
  shader(attractShader);
  rect(0,0,width,height);
  
  originalGraphics.push();
      for (let mover of movers) {
        movers[0].attract(mover);
        for (let other of movers) {
          if (mover !== other) {
            mover.attract(other);
            // stroke(255);
            // line(mover.pos.x, mover.pos.y, other.pos.x, other.pos.y);
          }
        }
      }
       movers[0].update();
       movers[1].update();
       movers[2].update();
    originalGraphics.pop();

    // movers[0].update();
    // movers[1].update();
    
    //mover.show();
  
  //sun.show();
}
