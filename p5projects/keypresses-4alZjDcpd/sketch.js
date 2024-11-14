let tomato = 0;

// function setup() {
//   createCanvas(300,300);
// }

function draw() {
 // background(255,0,0);
  fill(tomato);
  rect(25, 25, 100, 100);
}

function keyPressed() {
  if (keyCode === 'l') {
    tomato = 255;
  } else if (keyCode === 'k') {
    tomato = 0;
  }
  return false;
}

