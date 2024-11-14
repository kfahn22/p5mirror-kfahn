const arrowWidth = 10;
let orderSlider;
let modeButton;
let mode = 0;

function setup() {
  createCanvas(500, 500);
  colorMode(HSB);
  
  orderSlider = createSlider(1, 4, 2);
  modeButton = createButton("Toggle mode");
  modeButton.mousePressed(() => {mode = 1 - mode;});
}

function draw() {
  background(220);
  if (mode == 0) {
    peano(createVector(0, 0), createVector(width, height), 0, 255, 0);
  }
  if (mode == 1) {
    peano(createVector(width / 2, height / 2), createVector(mouseX, mouseY), 0, 255, 0);
  }
}

function peano(v1, v2, c1, c2, n) {
  if (n == orderSlider.value()) {
    line(v1.x, v1.y, v2.x, v2.y);
    arrowHead(v1, v2);
    return;
  }
  
  let dv = p5.Vector.sub(v2, v1);
  dv.div(3);
  const tv = createVector(-dv.y, dv.x);
  
  const diffs = [[1, 0], [0, 1], [1, 0], [0, -1], [-1, 0], [0, -1], [1, 0], [0, 1], [1, 0]];
  let point = v1;
  let newPoint;
  
  let dHue = (c2 - c1) / diffs.length;
  
  let diff;
  diffs.map((diff, m) => {
    
    const dp = p5.Vector.mult(dv, diff[0]);
    const tp = p5.Vector.mult(tv, diff[1]);
    
    newPoint = p5.Vector.add(p5.Vector.add(point, dp), tp);
    
    let hue1 = c1 + m * dHue;
    let hue2 = hue1 + dHue;
    stroke(hue1, 255, 255);
    peano(point, newPoint, hue1, hue2, n + 1);
    
    point = newPoint;
  });
}

function arrowHead(v1, v2) {
  line(v1.x, v1.y, v2.x, v2.y);
  dx = (v2.x - v1.x) / 3;
  dy = (v2.y - v1.y) / 3;
  tx = - dy / arrowWidth;
  ty = dx / arrowWidth;
  
  triangle(v1.x + 2 * dx, v1.y + 2 * dy, v1.x + dx + tx, v1.y + dy + ty, v1.x + dx - tx, v1.y + dy - ty);
}

