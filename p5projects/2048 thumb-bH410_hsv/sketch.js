// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// 2048
// https://youtu.be/JSn-DJU8qf0
// https://youtu.be/8f8P1i0W26E
// https://youtu.be/3iYvT8TBIro
// https://youtu.be/vtMKeEGpMI4

let grid;
let grid_new;
let score = 0;

function setup() {
  createCanvas(450, 450);
  noLoop();
  grid = blankGrid();
  grid_new = blankGrid();
  // console.table(grid);
  addNumber();
  addNumber();
  updateCanvas();
}

// One "move"
function keyPressed() {
  let flipped = false;
  let rotated = false;
  let played = true;
  switch (keyCode) {
    case DOWN_ARROW:
      // do nothing
      break;
    case UP_ARROW:
      grid = flipGrid(grid);
      flipped = true;
      break;
    case RIGHT_ARROW:
      grid = transposeGrid(grid);
      rotated = true;
      break;
    case LEFT_ARROW:
      grid = transposeGrid(grid);
      grid = flipGrid(grid);
      rotated = true;
      flipped = true;
      break;
    default:
      played = false;
  }

  if (played) {
    let past = copyGrid(grid);
    for (let i = 0; i < 4; i++) {
      grid[i] = operate(grid[i]);
    }
    let changed = compare(past, grid);
    if (flipped) {
      grid = flipGrid(grid);
    }
    if (rotated) {
      grid = transposeGrid(grid);
    }
    if (changed) {
      addNumber();
    }
    updateCanvas();

    let gameover = isGameOver();
    if (gameover) {
      console.log("GAME OVER");
    }

    let gamewon = isGameWon();
    if (gamewon) {
      console.log("GAME WON");
    }

  }
}

function updateCanvas() {
  background(255);
  drawGrid();
  createP('SCORE').position(610, 100)
  select('#score').html(score).position(660, 200);
  
}

function drawGrid() {
  let w = 100;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      noFill();
      strokeWeight(2);
      let val = grid[i][j];
      let s = val.toString();
      if (grid_new[i][j] === 1) {
        stroke('#EC015A');
        strokeWeight(12);
        grid_new[i][j] = 0;
      } else {
        strokeWeight(4);
        stroke(0);
      }

      if (val != 0) {
        fill(colorsSizes[s].color);
      } else {
        noFill();
      }
      let padding = 10;
      rect(i * w + 30, j * w + 30, w-10, w-10, 30);
      if (val !== 0) {
        textAlign(CENTER, CENTER);
        noStroke();
        fill(255);
        textSize(colorsSizes[s].size);
        text(val, i * w + w / 2 + 25, j * w + w / 2 + 25);
      }
    }
  }
}
