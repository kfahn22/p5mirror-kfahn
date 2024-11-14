//https://editor.p5js.org/codingtrain/sketches/UtSMCB1zv
//https://thecodingtrain.com/challenges/85-the-game-of-life

// Color palette from
//https://supercolorpalette.com
let palette = {
  colors: {
    0: "#FFDA1F",
    1: "#FFC71F",
    2: "#FFB41F",
    3: "#FFA21F",
    4: "#1FB4FF",
    5: "#1FC7FF",
    6: "#1FDAFF",
    7: "#1FECFF",
    8: "#691FFF",
    9: "#571FFF",
    10: "#441FFF",
    11: "#311FFF",
  },
};

let palette1 = {
  colors: {
    0: "#1F6DFF",
    1: "#1F80FF",
    2: "#1F93FF",
    3: "#1FA5FF",
    //4: "#EC015A",
    4: "#1FB8FF",
    5: "#1FCBFF",
    6: "#1FDDFF",
    7: "#1FF0FF",
    8: "#1FFFFB",
    9: "#1FFFE9",
    10: "#1FFFD6",
    11: "#1FFFC3",
    12: "#1FFFB0",
    13: "#1FFF9E",
    14: "#1FFF8B",
    15: "#1FFF78",
  },
};

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let w;
let resolution = 10;

// Number of rows/columns are constrained pow(2, n) + 1: 9x9, 17x17, etc
let patches = [];
let n = 3;
let ncol = 12;
// Need to create an array of values!!
let shift = 4;
let newCol;

function setup() {
  let rows = pow(2, n) + 1;
  w = rows * resolution;
  createCanvas(w, w);
  background(255);

  grid = make2DArray(rows, rows);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = null;
    }
  }

  // Assign first color to border  squares;
  noStroke();
  let col = getHexColorByKey(0, palette);
  for (let i = 0; i < rows; i++) {
    let x = i * resolution;
    let y = 0;
    fill(col);
    rect(x, y, resolution, resolution);
    y = (rows - 1) * resolution;
    rect(x, y, resolution, resolution);
    x = 0;
    y = i * resolution;
    rect(x, y, resolution, resolution);
    x = (rows - 1) * resolution;
    y = i * resolution;
    rect(x, y, resolution, resolution);
  }

  patches.push(new PersianRug(0, 0, shift, resolution, grid, rows, ncol));
  patches[0].getCorners();
  patches[0].calculateColor();
  patches[0].show();

  let newR = ceil(rows / 2);
  patches.push(new PersianRug(0, 0, shift, resolution, grid, newR, ncol));
  patches[1].getCorners();
  patches[1].calculateColor();
  patches[1].show();

  let x = (newR - 1) * resolution; 
  let y = (newR - 1) * resolution;
  
  
  // Second, third, fourth are not adding new color
  // Second quad 
  patches.push(new PersianRug(x, 0, shift, resolution, grid, newR, ncol));
  patches[2].getCorners();
  //let c = patches[2].corners;
  patches[2].calculateColor();
  patches[2].show();
  
  
  // Third quad
   patches.push(new PersianRug(0, y, shift, resolution, grid, newR, ncol));
  patches[3].getCorners();
  let c = patches[3].corners;
  patches[3].calculateColor();
  patches[3].show();
  
  // Fourth quad
   patches.push(new PersianRug(x, y, shift, resolution, grid, newR, ncol));
  patches[4].getCorners();
  //let c = patches[3].corners;
  patches[4].calculateColor();
  patches[4].show();
  
  // fill(0)
  // rect(c[3].x, c[3].y, resolution, resolution)
}

function draw() {}

// Add recursion to Persian rug
// function drawSquare(x, y, shift, resolution, grid, rows) {
//   let rug = new PersianRug(x, y, shift, resolution, rows);
//   let newR = floor(rows * 0.5);
//   if (newR > 1) {
//     drawSquare(x, y, shift, resolution, grid, newR);
//     drawSquare(
//       x + (rows - 1) * resolution,
//       y + (rows - 1) * resolution,
//       shift,
//       resolution,
//       grid,
//       newR
//     );
//     drawSquare(x, y + (rows - 1) * resolution, shift, resolution, grid, newR);
//     drawSquare(
//       x + (rows - 1) * resolution,
//       y,
//       y + (rows - 1) * resolution,
//       shift,
//       resolution,
//       grid,
//       newR
//     );
//   }
// }

function fillBorder() {
      for (let i = 0; i < this.rows - 1; i++) {
        grid[i][0] = 0;
        grid[i][8] = 0;
        grid[0][i] = 0;
        grid[8][i] = 0;
        
      }
    console.log(grid)
}

function getHexColorByKey(key, palette) {
  if (key in palette.colors) {
    return palette.colors[key];
  } else {
    return null; // or handle the case where the key doesn't exist
  }
}

function getKeyByHexColor(hexColor, palette) {
  for (let key in palette.colors) {
    if (palette.colors[key].toLowerCase() === hexColor.toLowerCase()) {
      return key;
    }
  }
  return null; // Return null only after checking all keys
}
