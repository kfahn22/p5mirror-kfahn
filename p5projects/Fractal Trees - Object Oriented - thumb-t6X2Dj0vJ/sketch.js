// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/fcdNSZ9IzJM

let tree = [];
let leaves = [];

let count = 0;

const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  createCanvas(800, 450);
  strokeWeight(5);
  let a = createVector(width / 2, height);
  let b = createVector(width / 2, height - 140);
  let root = new Branch(a, b);

  tree[0] = root;
  
  for (let i = 0; i < 6; i++) generate();
}

function generate() {
  for (let i = tree.length - 1; i >= 0; i--) {
    if (!tree[i].finished) {
      tree.push(tree[i].branchA());
      tree.push(tree[i].branchB());
    }
    tree[i].finished = true;
  }
  count++;

  if (count === 6) {
    for (var i = 0; i < tree.length; i++) {
      if (!tree[i].finished) {
        let leaf = tree[i].end.copy();
        leaves.push(leaf);
      }
    }
  }

}

function mousePressed() {
 save('tree.jpg');
}

function draw() {
   let c1 = color(0);
  let c2 = color(112,50,126);
 
  let  col = setGradient(0, 0, 800, 450, c1, c2, Y_AXIS);
  
  //background(27,10,31);

    strokeWeight(6);
  for (var i = 0; i < tree.length; i++) {
    tree[i].show();
    // tree[i].jitter();
  }

  for (var i = 0; i < leaves.length; i++) {
    fill(236,1,90, 100);
    noStroke();
    ellipse(leaves[i].x, leaves[i].y, 20, 20);
    // leaves[i].y += random(0, 2);
  }

}


function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 0.5);
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