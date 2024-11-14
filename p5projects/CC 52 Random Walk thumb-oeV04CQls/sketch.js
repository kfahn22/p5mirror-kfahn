// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/l__fEY1xanY
// https://thecodingtrain.com/CodingChallenges/052-random-walk.html

let x;
let y;

const Y_AXIS = 1;
const X_AXIS = 2;

let gradient1;

function setup() {
  createCanvas(800, 450);
  x = width / 2;
  y = height / 2;
  
  //background(45,197,244);
  let c1 = color(112,50,126);
  let c3= color(241,97,100); // rose
  let c2 = color(248,158,79); // orange
  //col = setGradient(0, 0, 800, 450, c1, c2, Y_AXIS);
  // create a linear gradient that's angled at 0 radians, and is 200px wide
  gradient1 = createLinearGradient(0, 800);
  // add some colors
  // at 0% make it aqua, then at 50% make it pink, and at 100% make it orange
 // gradient1.colors(0, c1, 0.5, c2, 1, c3);
  gradient1.colors(0, c1, 0.5, c3, 1, c1);
  //translate(width/2, height/2);
  gradient2 = createRadialGradient(0, 225);
  gradient2.colors(0,  c3, 1, c1);
  
  // fillGradient(gradient2);
  // push();
  // translate(width/2, height/2);
  // ellipse(0, 0, 1000, 1000)
  // pop();
 
 backgroundGradient(gradient1);
 // backgroundGradient(gradient2);
  
  
}


function mousePressed() {
 save('random.jpg');
}


function draw()  {
 
  stroke(252,238,33,50);
  strokeWeight(6);
  point(x, y);
  
 
  const r = floor(random(4));
  switch (r) {
    case 0:
      x = x + 4;
      break;
    case 1:
      x = x - 4;
      break;
    case 2:
      y = y + 4;
      break;
    case 3:
      y = y - 4;
      break;
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

function reAppear(x,y) {
  if (x => 800) {
    x = 0;
    y = y;
  } else if (x < 0) {
    x = 799;
    y = y;
  }
  else if (y < 0) {
    y = 449;
    x = x;
  }
  else if (y => 450) {
    y = 0;
    x = x;
  }
}