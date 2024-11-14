// Code base from Daniel Shiffman

// Music by Snabisch CC BY-3.0
// https://opengameart.org/content/sea-star


let song;
let amp;

let button;
let angle = 0;
let ang = 0;
let a = 0.5;
let b = 1;
let c;
const sc = 80;

function preload() {
  song = loadSound("seastar.mp3");
}

function setup() {
  createCanvas(512, 512);
  angleMode(DEGREES);
  rectMode(CENTER);
  colorMode(HSL);
  
  button = createButton("toggle");
  button.mousePressed(toggleSong);
  song.play();

  // Reduce bins to 64
  fft = new p5.FFT(0.8, 128);
}

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function draw() {
  background(0);
  let spectrum = fft.analyze();
  noStroke();

  translate(width / 2, height / 2);
  fill(330, 100, 50, 50);
  drawShape(0, 0, 5, 3, 8);
  rotate(ang);
  let sl = spectrum.length;
  for (let i = 0; i < sl; i++) {
    angle = map(i, 0, sl, 0, 360);
    let amp = spectrum[i];
    let sc = map(amp, 0, 256, 90, 300);
    let l = map(amp, 0, 256, 20, 90);
    //let h = map(amp, 0, 256, 0, 60);  //orange and yellow
    let h = map(amp, 0, 256, 220, 360);
    let r = map(amp, 0, 256, 3, 5);
    let inset = map(amp, 0, 256, 1, 2);
    let n = map(amp, 0, 256, 7, 9);
    let alpha = map(amp, 0, 256, 10, 90);
    let x = sc * a * cos(angle);
    let y = sc * b * sin(angle);
    c = color(h, 100, l, alpha);
    stroke(h, 100, l, alpha);
    strokeWeight((sl - i) / sl);
    // strokeWeight(3);
    fill(c);
    // create kaleidescope effect

    push();
    for (let j = 0; j < 360; j += 45) {
      rotate(j);
      //ellipse(0, 0, x, y);
      line(0,0,x,y);
      rect(0, 0, x, y);
      //drawShape(x, y, r, inset, n);
    }
    pop();
  }
  
  // Add center
  push();
  stroke(310, 100, 70, 80);
  strokeWeight(2);
  drawShape(0, 0, 4, 4, 8);
  pop();
  ang += 1;
}

function drawShape(x, y, radius, inset, n) {
  //strokeWeight(1);
  push();
  translate(x, y);
  beginShape();
  for (i = 0; i < n; i++) {
    //push();
    rotate(180 / n);
    line(0, 0 - inset * radius, -radius * inset, 0);
    // pop();
    rotate(180 / n);
    line(-radius * inset, 0, 0, 0 - radius * inset);
  }
  endShape();
  pop();
}

function drawShape2(x, y, radius, inset, n) {
  //strokeWeight(1);
  push();
  translate(x, y);
  beginShape();
  for (i = 0; i < n; i++) {
    rotate(180 / n);
    line(0, 0 - radius, -radius * inset, 0);
    rotate(180 / n);
    line(0, 0, 0 - radius, -radius * inset, 0);
  }
  endShape();
  pop();
}
function drawShape3(x, y, radius, inset, n) {
  //strokeWeight(1);
  push();
  translate(x, y);
  beginShape();
  for (i = 0; i < n; i++) {
    rotate(180 / n);
    line(0, 0 - radius, -radius * inset, 0);
    rotate(180 / n);
    line(0, 0, 0 - radius, -radius * inset, 0);
  }
  endShape();
  pop();
}
