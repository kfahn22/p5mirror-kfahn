//https://thecodingtrain.com/CodingChallenges/165-slide-puzzle.html
// https://youtu.be/uQZLzhrzEs4

// Tiles configuration
let w, h;
let tiles = [];
let shape = [];
let cols = 10;
let rows = 10;
let state;

// y-position
let y = 0;

let circles = [];

function mousePressed() {
  save("img.jpg");
}
function setup() {
  createCanvas(400, 400);
  //angleMode(DEGREES)
  w = width / cols;
  h = height / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      let index = i + j * cols;
      if (random(1) < 0.3) {
        state = 1;
      } else {
        state = 0;
      }
      tiles.push(new Tile(index, x, y, w, state));
      //shape.push(new D1(index, x, y, w, state));
      shape.push(new D1(index, x, y, w, state));
      
    }
  }
}

function draw() {
  background(12, 71, 103);
  // Draw each tile based on its state.
  for (let i = 0; i < shape.length; i++) {
    //noStroke();
    if (shape[i].state === 1) {
      
      
      shape[i].downward_squares();
    } else {
      shape[i].upward_squares();
    }
  }
  //tiles[0].show()
}
