// Sketch is inspired by several sources:

// Wolfram Elementary CA
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/179-wolfram-ca
// https://youtu.be/Ggxt06qSAe4

// Images from here:
//https://editor.p5js.org/kfahn/sketches/cas-a479b

// Design inspired by https://www.wolframscience.com/gallery-of-art/Sunny-Image-of-Rule-110.html

// Rulesets
// https://mathworld.wolfram.com/ElementaryCellularAutomaton.html

// Array to store the state of each cell.
let cells = [];
// Rule value
// 57, 109, 181, 182
let ruleValue = 57;
// The ruleset string
let ruleSet;
// Width of each cell in pixels
let w = 20;
// y-position
let y = 0;

// Images
let imgData = [];

function preload() {
  for (let i = 0; i < 3; i++) {
    const path = "assets";
    imgData[i] = loadImage(`${path}/${i}.png`);
 
  }
}

function setup() {
  //createCanvas(windowWidth, windowHeight);
  createCanvas(780, 400);
  // Convert the rule value to a binary string.
  ruleSet = ruleValue.toString(2).padStart(8, "0");

  // Calculate the total number of cells based on canvas width.-
  let total = width / w;
  // Initialize all cells to state 0 (inactive).
  for (let i = 0; i < total; i++) {
    cells[i] = 0;
    // Set the middle cell to state 1 (active) as the initial condition.
    cells[floor(total / 2)] = 1;
    
   // let g = int(0.412*255);
   // background(255, g, 0);
    background(0);
  }
}

function draw() {
  // Draw each cell based on its state.
  for (let i = 0; i < cells.length; i++) {
    let x = i * w;
    noStroke();
    if (cells[i] === 1) {
      image(random(imgData), x, y, w, w);
    }
  }

  // Move to the next row.
  y += w;

  // Prepare an array for the next generation of cells.
  let nextCells = [];

  // Iterate over each cell to calculate its next state.
  let len = cells.length;
  for (let i = 0; i < len; i++) {
    // Calculate the states of neighboring cells
    let left = cells[(i - 1 + len) % len];
    let right = cells[(i + 1) % len];
    let state = cells[i];
    // Set the new state based on the current state and neighbors.
    let newState = calculateState(left, state, right);
    nextCells[i] = newState;
  }

  // Update the cells array for the next generation.
  cells = nextCells;
 
}

function calculateState(a, b, c) {
  // Create a string representing the state of the cell and its neighbors.
  let neighborhood = "" + a + b + c;
  // Convert the string to a binary number
  let value = 7 - parseInt(neighborhood, 2);
  // Return the new state based on the ruleset.
  return parseInt(ruleSet[value]);
}
