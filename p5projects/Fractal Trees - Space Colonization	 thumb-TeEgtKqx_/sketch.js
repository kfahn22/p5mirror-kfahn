// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/kKT0v3qhIQY

var tree;
var max_dist = 100;
var min_dist = 10;

function setup() {
  createCanvas(800, 450);
  tree = new Tree();
}

function draw() {
  background(112,50,126);
  tree.show();
  tree.grow();
}
