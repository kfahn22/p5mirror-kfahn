// https://supercolorpalette.com/?scp=G0-hsl-FFDA1F-FFC71F-FFB41F-1F4DFF-1F60FF-1F75FF-1F87FF-1F9AFF

let palette = {
  colors: {
    0: "#FFDA1F",
    1: "#FFC71F",
    2: "#FFB41F",
    3: "#FFA21F",
    4: "#1F4DFF",
    5: "#1F60FF",
    6: "#1F75FF",
    7: "#1F87FF",
    8: "#1F9AFF",
  },
};

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows).fill(0); // Initialize with 11 directly
  }
  return arr;
}

let grid;
let w;
let resolution = 20;

let n = 2;
let rows;
let ncol = 9;
let shift = [0, 1, 2, 3, 4, 5, 6, 7];
let pg, buffer;

function setup() {
  rows = pow(2, n) + 1;
  w = rows * resolution;
  let sh = int(random(shift));
  createCanvas(w, w);
  pg = createGraphics(w, w);
  pg.background(255);

  buffer = createGraphics(w, w);
  buffer.background(255);

  grid = make2DArray(rows, rows);
  fillBorder(grid);

  buffer.noStroke();
  let col = getHexColorByKey(0, palette);
  drawBorders(col);

  let stack = [{ x: 0, y: 0, squareS: rows }];

  while (stack.length > 0) {
    let current = stack.pop();
    let x = current.x;
    let y = current.y;
    let squareS = current.squareS;

    if (squareS > resolution) {
      let rug = new PersianRug(
        x,
        y,
        sh,
        resolution,
        grid,
        squareS,
        rows,
        ncol,
        buffer
      );
      rug.calculateColor();
      rug.show();

      let newSize = floor(squareS / 2) + 1;

      stack.push({ x: x, y: y, squareS: newSize });
      stack.push({ x: x + (newSize - 1) * resolution, y: y, squareS: newSize });
      stack.push({ x: x, y: y + (newSize - 1) * resolution, squareS: newSize });
      stack.push({
        x: x + (newSize - 1) * resolution,
        y: y + (newSize - 1) * resolution,
        squareS: newSize,
      });
    }
  }

  pg.image(buffer, 0, 0);
  image(pg, 0, 0);
}

function draw() {}

function fillBorder(grid) {
  for (let i = 0; i < rows; i++) {
    grid[i][0] = 0;
    grid[i][rows - 1] = 0;
    grid[0][i] = 0;
    grid[rows - 1][i] = 0;
  }
}

function drawBorders(col) {
  for (let i = 0; i < rows; i++) {
    let x = i * resolution;
    buffer.fill(col);
    buffer.rect(x, 0, resolution, resolution);
    buffer.rect(x, (rows - 1) * resolution, resolution, resolution);
    buffer.rect(0, i * resolution, resolution, resolution);
    buffer.rect((rows - 1) * resolution, i * resolution, resolution, resolution);
  }
}

function getHexColorByKey(key, palette) {
  return palette.colors[key] || null;
}

function getKeyByHexColor(hexColor, palette) {
  for (let key in palette.colors) {
    if (palette.colors[key].toLowerCase() === hexColor.toLowerCase()) {
      return key;
    }
  }
  return null;
}

function mousePressed() {
  save("rug.jpg");
}