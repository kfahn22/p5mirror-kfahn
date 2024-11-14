// Generic tesselation algorithm
// Note that the sketch does not respond well to dynamic changes in the parameters, especially shear angle

let tiles = [];
let sc = 50;
let num = 15;
// scX and scY need to be equal for tesselation
// let scX = 100;
// let scY = 100;
let col;
let a = 0.05,
  b = 0.25,
  c = 0.45,
  d = 0.1;
let sh;

function mousePressed() {
  save("tess.jpg");
}

function setup() {
  let canvas = createCanvas(450, 450);
  canvas.position(25, 25);
  rectMode(CENTER);
  // shearAngle only works with 0 or PI/2
  // doesn't translate properly with other angles
  sh = 0;
  sc = width / num;
  for (let i = 0; i < num - 1; i++) {
    for (let j = 0; j < num - 1; j++) {
      col = color(random(255), 0, random(255));
      tiles.push(new Tile(i * sc, j * sc, sc, sc, a, b, c, d, col, sh));
    }
  }
}

function draw() {
  background(0);

  translate(sc / 2, sc / 2);

  for (let i = 0; i < tiles.length; i++) {
    tiles[i].basic();
  }
}
