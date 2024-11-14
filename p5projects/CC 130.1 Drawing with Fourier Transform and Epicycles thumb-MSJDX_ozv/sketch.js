// Coding Challenge 130.1: Drawing with Fourier Transform and Epicycles
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/130-fourier-transform-drawing.html
// https://youtu.be/MY4luNgGfms


let x = [];
let y = [];
let fourierX;
let fourierY;
let time = 0;
let path = [];

function setup() {
  createCanvas(800, 450);
  const skip = 8;
  for (let i = 0; i < drawing.length; i += skip) {
    x.push(drawing[i].x);
    y.push(drawing[i].y);
  }
  fourierX = dft(x);
  fourierY = dft(y);

  fourierX.sort((a, b) => b.amp - a.amp);
  fourierY.sort((a, b) => b.amp - a.amp);
}

function epiCycles(x, y, rotation, fourier) {
  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;
    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;
    x += 0.8*radius * cos(freq * time + phase + rotation);
    y += 0.8*radius * sin(freq * time + phase + rotation);
    c1 = color('#FCEE21');
    stroke(c1, 100);
    strokeWeight(4);
    noFill();
    ellipse(prevx, prevy, radius * 1.75);
    stroke(c1);
    line(prevx, prevy, x, y);
  }
  return createVector(x, y);
}

function mousePressed() {
  save('fourier.jpg');
}

function draw() {
  background('#9253A1');
  //let vx = epiCycles(width / 2 + 100, 50, 0, fourierX);
  // let vy = epiCycles(100, height / 2+ 50, HALF_PI, fourierY);
  let vx = epiCycles(width / 2 + 150, 50, 0, fourierX);
  let vy = epiCycles(150, height / 2+ 50, HALF_PI, fourierY);
  let v = createVector(vx.x, vy.y);
  path.unshift(v);
  line(vx.x, vx.y, v.x, v.y);
  line(vy.x, vy.y, v.x, v.y);

  beginShape();
  noFill();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
  }
  endShape();

  const dt = TWO_PI / fourierY.length;
  time += dt;

  // if (time > TWO_PI) {
  //   time = 0;
  //   path = [];
 // }

}



