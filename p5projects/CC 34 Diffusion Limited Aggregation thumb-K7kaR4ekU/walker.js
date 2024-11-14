// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/034-dla

class Walker {
  constructor(x, y, i) {
    if (arguments.length == 2) {
      this.pos = createVector(x, y);
      this.stuck = true;
    } else {
      this.pos = randomPoint();
      this.stuck = false;
      this.col = colorOptions[1];
    }
    this.r = radius;
  }

  walk() {
    var vel = p5.Vector.random2D();
    // var vel = createVector(random(-1, 1), random(-0.5, 1));
    this.pos.add(vel);
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }


  checkStuck(others) {
    for (var i = 0; i < others.length; i++) {
      let d = distSq(this.pos, others[i].pos);
      if (d < (this.r * this.r + others[i].r * others[i].r + 2 * others[i].r * this.r)) {
        //if (random(1) < 0.1) {
        this.stuck = true;
        return true;
      }
    }
    return false;
  }

  setColor(i) {
    
            if ((i % 2 === 0) && (i % 4 != 0)) {
              this.col = colorOptions[5];
            } 
            else if (i % 3 === 0) {
               this.col = colorOptions[2];
            }
            else if  (i % 4 === 0) {
             this.col = colorOptions[3];
            }
             else if (i % 5 === 0) {
               this.col = colorOptions[4];
             }
              else if (i % 7 === 0) {
               this.col = colorOptions[1];
             }
              else if ((i % 9 === 0) && (i % 3 != 0)) {
               this.col = colorOptions[0];
            }
       
   //return this.col;
  }

  show() {
    noStroke();
    if (this.stuck && typeof this.hu !== 'undefined') {
   
      fill(0);
    } else {
     fill(this.col);
    }
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  }


}

function randomPoint() {
  var i = floor(random(4));

  if (i === 0) {
    let x = random(width);
    return createVector(x, 0);
  } else if (i === 1) {
    let x = random(width);
    return createVector(x, height);
  } else if (i === 2) {
    let y = random(height);
    return createVector(0, y);
  } else {
    let y = random(height);
    return createVector(width, y);
  }
}



function distSq(a, b) {
  var dx = b.x - a.x;
  var dy = b.y - a.y;
  return dx * dx + dy * dy;
}