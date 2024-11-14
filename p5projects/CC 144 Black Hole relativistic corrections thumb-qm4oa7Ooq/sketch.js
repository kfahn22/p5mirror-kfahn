// Daniel Shiffman
// https://thecodingtrain.com/
// https://youtu.be/Iaz9TqYWUmA

// Thanks to Veritasium
// https://youtu.be/zUyH3XhpLTo
// and Chris Orban / STEM Coding
// https://www.asc.ohio-state.edu/orban.14/stemcoding/blackhole.html

// Newtonian version:
// https://editor.p5js.org/codingtrain/sketches/2zZqSkxtj

const c = 30;
const G = 3.54;
const dt = 0.1;

let m87;

const particles = [];
let start, end;

const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  createCanvas(800, 450);
  //m87 = new Blackhole(width / 2, height / 2, 10000);
  m87 = new Blackhole(width / 2, height / 2, 5500);

  start = height / 2;
  end = height / 2 - m87.rs * 2.6;

  for (let y = 0; y < start; y += 10) {
    particles.push(new Photon(width - 20, y));
  }
}

function draw() {
  let c1 = color('#000000')
  let c2 = color('#70327E');
 
  let  col = setGradient(0, 0, 800, 450, c1, c2, Y_AXIS);
  //background(255);

  stroke(0);
  strokeWeight(3);
  line(0, start, width, start);
  line(0, end, width, end);

  for (let p of particles) {
    m87.pull(p);
    p.update();
    p.show();
  }
  m87.show();
}

function mousePressed() {
  save("blackhole.jpg");
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
