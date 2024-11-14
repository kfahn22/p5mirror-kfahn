// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/hacZU523FyM

var ship;
var asteroids = [];
var lasers = [];

const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  createCanvas(800, 450);
  ship = new Ship();
  for (var i = 0; i < 6; i++) {
    asteroids.push(new Asteroid());
  }
}

function mousePressed() {
  save('asteroids.jpg');
}

function draw() {
  background(0);
  let c1 = color(0);
  let c2 = color('#70327E');
 
  let  col = setGradient(0, -5, 800, 450, c1, c2, Y_AXIS);
  
  for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      console.log('ooops!');
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  for (var i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (var j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          if (asteroids[j].r > 10) {
            var newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }

  console.log(lasers.length);

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
  stroke(255);
  strokeWeight(5);
  point(425, 241);
  point(397, 210);
  point(360, 167);
  point(316, 122);
  // point(395, 109);
  // point(378, 70);
 //console.log(mouseX, mouseY);

}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() {
  if (key == ' ') {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.boosting(true);
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
