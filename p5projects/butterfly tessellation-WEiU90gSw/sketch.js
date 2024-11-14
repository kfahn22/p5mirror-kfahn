// p5.patgrad library https://github.com/antiboredom/p5.patgrad
// https://editor.p5js.org/kfahn/sketches/xgXgKTU9u

let butterflies = [];
let sc = 100;
let col1, col2, col3, col4, col5;

function mousePressed() {
  save('butterfly.jpg');
}

function setup() {
  createCanvas(450, 450);
  rectMode(CENTER);

  // need an odd number!!
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (i % 2 == 0) {
        butterflies.push(new Tile(i * sc, j * sc, sc, sc));
      } else if (i % 2 != 0) {
        butterflies.push(new Tile(i * sc, j * sc, sc, sc));
      }
    }
  }
}

function draw() {
  let colA = createRadialGradient(0, (2 / 3) * sc);
  let colB = createRadialGradient(0, (2 / 3) * sc);
  col1 = color(203, 239, 67); //green
  col2 = color(143, 149, 211); //lavender
  col3 = color(67, 58, 63); //dk gray
  col4 = color(165, 117, 72); // brown
  colA.colors(0, col1, 0.7, col2);
  colB.colors(0.4, col2, 1, col1);
  col5 = lerpColor(col1, col2, 0.33);

  for (let i = 0; i < butterflies.length; i++) {
    if (i % 2 == 0) {
      butterflies[i].tile(0, sc, colA, col1, col2, col3, col4, col5);
      for (let j = 0; j < 4; j++) {
        butterflies[i].addSpots(0, j, sc, 0.06 * sc, -1);
      }
    } else {
      butterflies[i].tile(PI / 2, sc, colB, col2, col1, col3, col4);

      for (let j = 0; j < 4; j++) {
        butterflies[i].addSpots(PI / 2, j, sc, 0.06 * sc, -1);
      }
    }
  }
}
