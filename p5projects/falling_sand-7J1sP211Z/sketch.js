// Idea from:
// https://web.archive.org/web/20160418004149/http://freespace.virgin.net/hugo.elias/graphics/x_water.htm

// Coding Train Videos:
// Stream: https://www.youtube.com/watch?v=5lIl5F1hpTE
// Challenge: https://www.youtube.com/watch?v=BZUdGqeOD0w

let sandShader;

// need two buffers
let currBuff, prevBuff;

const damping = 0.99;
// Create a 2D array
// Sorry if you are used to matrix math!
// How would you do this with a
// higher order function????

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    // Fill the array with 0s
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

// The grid
let grid;
// How big is each square?
let w = 5;
let cols, rows;
let hueValue = 200;

// Check if a row is within the bounds
function withinCols(i) {
  return i >= 0 && i <= cols - 1;
}

// Check if a column is within the bounds
function withinRows(j) {
  return j >= 0 && j <= rows - 1;
}
function mouseDragged() {
  let mouseCol = floor(mouseX / w);
  let mouseRow = floor(mouseY / w);
  
  // Randomly add an area of sand particles
  let matrix = 5;
  let extent = floor(matrix / 2);
  for (let i = -extent; i <= extent; i++) {
    for (let j = -extent; j <= extent; j++) {
      if (random(1) < 0.75) {
        let col = mouseCol + i;
        let row = mouseRow + j;
        if (withinCols(col) && withinRows(row)) {
          grid[col][row] = hueValue;
        }
      }
    }
  }
  // Change the color of the sand over time
  hueValue += 1;
  if (hueValue > 360) {
    hueValue = 1;
  }
}

function preload() {
  sandShader = loadShader('sand.vert', 'sand.frag');
}

function setup() {
  createCanvas(600, 600, WEBGL); 
  pixelDensity(1);
  noSmooth();
  
  // create buffers
  currBuff = createGraphics(width, height);
  currBuff.pixelDensity(1);
  currBuff.noSmooth();
  
  prevBuff = createGraphics(width, height);
  prevBuff.pixelDensity(1);
  prevBuff.noSmooth();
  
  // set the shader
  shader(sandShader);
  
  rippleShader.setUniform("damping", damping);
  rippleShader.setUniform("res", [width, height]);
}

function draw() {
  
  // add ripple at mouse
  stroke(255);
  if(mouseIsPressed) {
    point(mouseX - width/2, mouseY - height/2);
  }
  
  // add rain drop
  stroke(random(255));
  point(random(width) - width/2, random(height) - height/2);
  
  // update buffers
  prevBuff.image(currBuff, 0, 0);
  currBuff.image(get(), 0, 0);
  
  // set the buffers inside the shader
  rippleShader.setUniform('currBuff', currBuff);
  rippleShader.setUniform('prevBuff', prevBuff);
  
  // give shader geometry to draw on
  rect(-width/2, -height/2, width, height);
}