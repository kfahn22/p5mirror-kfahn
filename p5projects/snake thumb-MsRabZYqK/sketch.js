const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  createCanvas(800, 450);
}

function draw() {
  background(102,211,52);
  let c1 = color(252,238,33);
  let c2 = color(102,211,52);
 
 // let  col = setGradient(0, 0, 800, 450, c1, c2, Y_AXIS);
  
  stroke(112,50,126);
  strokeWeight(4);
  fill(146,83,161);
  
  rect(600, 50, 50, 50);
  rect(550, 50, 50, 50);
  rect(600, 100, 50, 50);
  rect(600, 150, 50, 50);
  rect(600, 200, 50, 50);
  rect(550, 200, 50, 50);
  rect(500, 200, 50, 50);
  rect(450, 200, 50, 50);
  rect(450, 250, 50, 50);
  rect(450, 300, 50, 50);
  rect(400, 300, 50, 50);
  rect(400, 300, 50, 50);
  rect(350, 300, 50, 50);
  rect(300, 300, 50, 50);
  rect(250, 300, 50, 50);
  rect(200, 300, 50, 50);
  rect(150, 300, 50, 50);
  rect(150, 250, 50, 50);
  rect(150, 200, 50, 50);
  stroke(236,1,90);
  fill(236,1,90);
  rect(300, 150, 50, 50);

}

function mousePressed() {
 save('snake.jpg');
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
