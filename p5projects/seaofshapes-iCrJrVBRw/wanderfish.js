// Wander (Perlin Noise)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/ujsR2vcJlLk
// https://thecodingtrain.com/learning/nature-of-code/5.5-wander.html

// Main: https://editor.p5js.org/codingtrain/sketches/LVtVlS52Q
// With Sliders: https://editor.p5js.org/codingtrain/sketches/uxemh7FGc
// Deleting Positions: https://editor.p5js.org/codingtrain/sketches/EWHjy--Os
// 3D: https://editor.p5js.org/codingtrain/sketches/t6sFXmVrk
// Displacement: https://editor.p5js.org/codingtrain/sketches/VdHUvgHkm
// Perlin Noise: https://editor.p5js.org/codingtrain/sketches/XH2DtikuI

class Jelly {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(1, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 1;
    this.maxForce = 0.02;
    this.r = 5;
    this.color = color(255,46,204);
    this.wanderTheta = 10;
    this.xoff = 0;
    
    this.currentPath = [];
    this.paths = [this.currentPath];
    
  }

  wander() {
    let angle = noise(this.xoff) * TWO_PI * 2;
    let steer = p5.Vector.fromAngle(angle);
    steer.setMag(this.maxForce);
    this.applyForce(steer);
    this.xoff += 0.001;
  }

  evade(vehicle) {
    let pursuit = this.pursue(vehicle);
    pursuit.mult(-1);
    return pursuit;
  }

  pursue(vehicle) {
    let target = vehicle.pos.copy();
    let prediction = vehicle.vel.copy();
    prediction.mult(10);
    target.add(prediction);
    fill(0, 255, 0);
    circle(target.x, target.y, 5);
    return this.seek(target);
  }

  arrive(target) {
    // 2nd argument true enables the arrival behavior
    return this.seek(target, true);
  }

  flee(target) {
    return this.seek(target).mult(-1);
  }

  seek(target, arrival = false) {
    let force = p5.Vector.sub(target, this.pos);
    let desiredSpeed = this.maxSpeed;
    if (arrival) {
      let slowRadius = 500;
      let distance = force.mag();
      if (distance < slowRadius) {
        desiredSpeed = map(distance, 0, slowRadius, 0, this.maxSpeed);
      }
    }
    force.setMag(desiredSpeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    return force;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    this.currentPath.push(this.pos.copy());

    // Count positions
    let total = 0;
    for (let path of this.paths) {
      total += path.length;
    }

    if (total > 200 || (total > 10 && millis() > 3000)) {
      this.paths[0].shift();
      if (this.paths[0].length === 0) {
        this.paths.shift();
      }
    }
  }
 
  
  //original code
  show() {
    stroke(201,177,189);
    strokeWeight(2);
    fill(201,177,189);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    ellipse(-this.r, -this.r / 2, 20, 10);
    // triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    pop();

    for (let path of this.paths) {
      beginShape();
      noFill();
      for (let v of path) {
        vertex(v.x, v.y);
      }
      endShape();
    }
 }

  edges() {
    let hitEdge = false;
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
      hitEdge = true;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
      hitEdge = true;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
      hitEdge = true;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
      hitEdge = true;
    }

    if (hitEdge) {
      this.currentPath = [];
      this.paths.push(this.currentPath);
    }
  }
}

class Target extends Jelly {
  constructor(x, y) {
    super(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(3);
    this.color = 0;
  }

  // show() {
  //   stroke(2201,177,189);
  //   strokeWeight(2);
  //   fill(201,177,189);
  //   push();
  //   translate(this.pos.x, this.pos.y);
  //   circle(0, 0, this.r/4);
  //   circle(10,10, this.r/4);
  //  // circle(4,4, this.r/4);
  //   pop();
  // }
}