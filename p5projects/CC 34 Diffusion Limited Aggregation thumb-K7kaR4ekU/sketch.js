// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/034-dla

let tree = [];
let walkers = [];
//var r = 4;
let maxWalkers = 50;
let iterations = 1000;
let radius = 12;
//let hu = 0;
let shrink = 0.995;

const Y_AXIS = 1;
const X_AXIS = 2;

let colorOptions = [
  [ 102,211,52 ],
  [ 236,1,90 ],
  [ 45,197,244 ],
  [ 252,238,33 ],
  [ 248,158,79 ],
  [ 102,211,52 ]
]

function setup() {
  createCanvas(800, 450);
  //colorMode(HSB);

  tree[0] = new Walker(width / 2, height / 2);
  tree[0].setColor(0);
  radius *= shrink;
  for (var i = 0; i < maxWalkers; i++) {
    walkers[i] = new Walker();
    radius *= shrink;
  }
}


function mousePressed() {
 save('diffusion.jpg');
}

function draw() {
   let c1 = color(112,50,126);
   let c2 = color(0);
 
  let  col2 = setGradientL(0, 0, 400, 450, c1, c2, X_AXIS);
  let  col3 = setGradientR(400, 0, 800, 450, c2, c1, X_AXIS);
  //background(0);

  for (let i = 0; i < tree.length; i++) {
    tree[i].show();
  }

  for (let i = 0; i < walkers.length; i++) {
    walkers[i].show();
  }

  for (let n = 0; n < iterations; n++) {
    for (let i = walkers.length - 1; i >= 0; i--) {
      walkers[i].walk();
      if (walkers[i].checkStuck(tree)) {
        walkers[i].setColor(n);
        tree.push(walkers[i]);
        walkers.splice(i, 1);
      }
    }
  }

  var r = walkers[walkers.length - 1].r;
  while (walkers.length < maxWalkers && radius > 1) {
    radius *= shrink;
    walkers.push(new Walker());
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
      let inter = map(i, x, x + w, 0.6, 1);
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
      let inter = map(i, x, x + w, 0, 0.7);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}