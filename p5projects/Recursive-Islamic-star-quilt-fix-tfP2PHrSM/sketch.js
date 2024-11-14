// Recursive quilt built with random Islamic Star patterns

// Code based on the following two Coding Challenges by Daniel Shiffman
// https://thecodingtrain.com/challenges/54-islamic-star-patterns
// https://thecodingtrain.com/challenges/77-recursion

 // I have repeated colors in an attempt to get a nice mix of colors
  // Randomly selecting a color from palette resulted in adjacent squares with the same color
  // An improvement woulld be to add an algorithm to recurvely add squares with different colors when they are adjacent

let n = 0;
let val = 50;
let palette;
let len;
let graphics = [];

function setup() {
  createCanvas(800, 800);

  palette = [
    ["#004e61"],
    ["#c43138"],
    ["#3e909d"],
    ["#c43138"],
    ["#004e61"],
    ["#f5d7b0"],
    ["#d15b56"],
    ["#7ba8a3"],
  ];
  
  drawSquare(0, 0, width);
  noLoop();
}

function draw() {
  background(255);
  for (let g of graphics) {
    image(g.buffer, g.x, g.y, g.w, g.h);
  }
}

function drawSquare(x, y, d) {
  drawStar(x, y, d);
  let newD = d * 0.5;
  if (newD > val) {
    drawSquare(x, y, newD);
    drawSquare(x + newD, y + newD, newD);
    // Uncomment if you want each grid to be the same size
    // Adjacent squares colors will repeat colors
    // drawSquare(x, y + newD, newD);
    // drawSquare(x + newD, y, newD);
  }
}

function drawStar(x, y, w) {
  let buffer = createGraphics(w, w);
  let inc = w / 4;
  // I have chosen a square aspect ratio so that the grid remains centered in each square
  let pattern = new IslamicStarPattern(
    buffer,
    w,
    w,
    inc,
    random(10, 25),
    random(0, 90),
    //random(palette),
    palette[n],
    2
  );
  pattern.draw();
  graphics.push({
    buffer: buffer,
    x: x,
    y: y,
    w: w,
    h: w,
  });
  
  // This is my attempt at ensuring that adjacent squares are different colors
  len = palette.length;
  if (n < len - 1) {
    n += 1;
  } else {
    n = 1; // reset so that adjacent colors don't repeat
  }
}

function mousePressed() {
  save("image.jpg");
}
