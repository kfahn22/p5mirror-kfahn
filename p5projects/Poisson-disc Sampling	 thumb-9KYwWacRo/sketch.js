// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/flQgnCUxHlw

var r = 12; //4
var k = 30;
var grid = [];
var w = r / Math.sqrt(2);
var active = [];
var cols, rows;
var ordered = [];

const Y_AXIS = 1;
const X_AXIS = 2;



function mousePressed() {
 save('poisson.jpg');
}

function setup() {
  createCanvas(800, 450);
  background(0);
  strokeWeight(10);
  //colorMode(HSB);

  // STEP 0
  cols = floor(width / w);
  rows = floor(height / w);
  for (let i = 0; i < cols * rows; i++) {
    grid[i] = undefined;
  }

  // STEP 1
  var x = width / 2;
  var y = height / 2;
  var i = floor(x / w);
  var j = floor(y / w);
  var pos = createVector(x, y);
  grid[i + j * cols] = pos;
  active.push(pos);
  //frameRate(1);
}

function draw() {
   let c1 = color(112,50,126);
   let c2 = color(0);
   let  col2 = setGradientL(0, 0, 400, 450, c1, c2, X_AXIS);
  
  // made an adjustment to regular code to get nice black gradient on right side of canvas
  let  col3 = setGradientR(400, 0, 550, 450, c1, c2, X_AXIS);
  //  let c3 = color(102,211,52);
  // let  col2 = setGradientL(0, 0, 400, 450, c2, c3, X_AXIS);
  // let  col3 = setGradientR(400, 0, 450, 450, c3, c2, X_AXIS);
   // let  col2 = setGradientL(0, 0, 400, 450, c2, c3, X_AXIS);
  // let  col3 = setGradientR(400, 0, 450, 450, c3, c2, X_AXIS);
 // background(11,106,136);
  //noLoop();

  for (var total = 0; total < 25; total++) {
    if (active.length > 0) {
      var randIndex = floor(random(active.length));
      var pos = active[randIndex];
      var found = false;
      for (var n = 0; n < k; n++) {
        var sample = p5.Vector.random2D();
        var m = random(r, 2 * r);
        sample.setMag(m);
        sample.add(pos);

        let col = floor(sample.x / w);
        let row = floor(sample.y / w);

        if (col > -1 && row > -1 && col < cols && row < rows && !grid[col + row * cols]) {
          var ok = true;
          for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
              var index = (col + i) + (row + j) * cols;
              var neighbor = grid[index];
              if (neighbor) {
                var d = p5.Vector.dist(sample, neighbor);
                if (d < r) {
                  ok = false;
                }
              }
            }
          }
          if (ok) {
            found = true;
            grid[col + row * cols] = sample;
            active.push(sample);
            ordered.push(sample);
            // Should we break?
            break;
          }
        }
      }

      if (!found) {
        active.splice(randIndex, 1);
      }

    }
  }

  for (let i = 0; i < ordered.length; i++) {
    if (ordered[i]) {
      if (i % 360 <= 60)  {
        stroke(102,211,52);
      } 
      else if (i % 360 > 60 && i % 360 <= 120 ) {
         stroke(236,1,90);
      }
      else if  (i % 360 > 120 && i % 360 <= 180) {
        stroke(45,197,244);
      }
       else if (i % 360 > 180 && i % 360 <= 240) {
         stroke(252,238,33);
       }  
       else if (i % 360 > 240 && i % 360 <= 300) {
         stroke(248,158,79);
       }
       else if (i % 360 > 300 && i % 360 <= 360) {
         stroke(248,158,79);
       }
     // stroke(i % 360, 100, 100);
      strokeWeight(r * 0.5);
    point(ordered[i].x, ordered[i].y);
    }
  }


function setGradientL(x, y, w, h, c1, c2, axis) {
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
      let inter = map(i, x, x + w, 0.75, 0);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
  
function setGradientR(x, y, w, h, c1, c2, axis) {
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
  
  // for (var i = 0; i < active.length; i++) {
  //   stroke(255, 0, 255);
  //   strokeWeight(5);
  //   point(active[i].x, active[i].y);
  // }
  //console.log(active.length);
}