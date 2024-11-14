// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Binary Tree
// Part 1: https://youtu.be/ZNH0MuQ51m4
// Part 2: https://youtu.be/KFEvF_ymuzY

var tree;

function setup() {
  createCanvas(800, 450);
  background('#66D334');
  tree = new Tree();
  for (var i = 0; i < 10; i++) {
    tree.addValue(floor(random(0, 20)));
  }
  console.log(tree);
  tree.traverse();

  //var result = tree.search(10);
  // if (result == null) {
  //   console.log('not found');
  // } else {
  //   console.log(result);
  // }
}

function mousePressed() {
 save('binary.jpg');
}