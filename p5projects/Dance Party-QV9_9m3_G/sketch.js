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
  fft = new p5.FFT(0.8, 64);
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

  translate(width / 2, height / 2);
  rotate(ang);

  for (let i = 0; i < spectrum.length; i++) {
    angle = map(i, 0, spectrum.length, 0, 360);
    let amp = spectrum[i];
    let sc = map(amp, 0, 256, 5, 350);
    let l = map(amp, 0, 256, 20, 90);
    //let h = map(amp, 0, 256, 0, 60);  //orange and yellow
    let h = map(amp, 0, 256, 230, 360);
    let size = map(amp, 0, 256, 0, 6);
    let r = map(amp, 0, 256, 1, 3);
    let inset = map(amp, 0, 256, 1, 2);
    let x = sc * a * pow(cos(angle), 4); //2
    let y = sc * b * sin(angle);
    c = color(h, 100, l, 10);
    stroke(h, 100, l, 10);
    fill(c);
    // create kaleidescope effect
    push();
    for (let j = 0; j < 360; j += 45) {
      rotate(j);
      rect(0, 0, x, y, 10, 10, 10, 10);
      //rect(x, y, size, size, 20, 20, 20, 20);
      drawShape(x, y, r, inset, 5);
    }
    pop();
  }

  ang += 1;
}

function drawShape(x, y, radius, inset, n) {
  push();
  translate(x, y);
  beginShape();
  for (i = 0; i < n; i++) {
    rotate(180 / n);
    line(0, 0 - radius, -radius * inset, 0);
    rotate(180 / n);
    line(0, 0 - radius, -radius * inset, 0);
  }
  endShape();
  pop();
}
