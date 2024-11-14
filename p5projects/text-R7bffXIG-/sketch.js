let font;

  function preload() {
  font = loadFont('Facile Sans.otf');
}


function setup() {
createCanvas(800, 80);
textFont(font);
textSize(50);

//let gap = 52;
let margin = 100;
noLoop;
}

function draw() {
  //background(255);
background(0);
// stroke(0);
// fill(0);
fill(255);
  textAlign(LEFT, CENTER);
  // text aligns to left edge of x value (50)
  // top edge alligns to y value
  text('I  AM  LOSING  MY  MARBLES!', 50, 40);
  saveCanvas("blackmarble.png");
}