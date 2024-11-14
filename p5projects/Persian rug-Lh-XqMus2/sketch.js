//

let colors = [];
let n = 3;

function setup() {
  createCanvas(600, 600);
  colors = [color(35,61,77), color(254, 127, 45), color(252,202,70), color(161,193,129), color(97,155,138)];
  drawRug(0, 0, width, height, n+1);  // Starting with 4 levels of recursion
}

function drawRug(x, y, w, h, level) {
  if (level == 0) {
    fill(random(colors));
    rect(x, y, w, h);
  } else {
    let w2 = w / n;
    let h2 = h / n;
    
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i == 1 && j == 1) {
          fill(random(colors));
          rect(x + w2, y + h2, w2, h2);
        } else {
          drawRug(x + i * w2, y + j * h2, w2, h2, level - 1);
        }
      }
    }
  }
}

function draw() {
  noLoop();  // Draw only once
}
