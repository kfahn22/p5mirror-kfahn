// Code base from Daniel Shiffman's p5.Sound Tutorials

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
  fft = new p5.FFT(0.8, 256);
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
  //let spectrum = fft.analyze();
  fft.analyze();
  let bands = fft.getOctaveBands(1, 15.625);
  let spectrum = fft.logAverages(bands);
  translate(width / 2, height / 2);
  rotate(ang);
  let sl = spectrum.length;
  for (let i = 0; i < sl; i++) {
    angle = map(i, 0, sl, 0, 360);

    let amp = spectrum[i];
    let sc = map(amp, 0, 256, 5, 375);
    let l = map(amp, 0, 256, 20, 90);
    let ht = map(amp, 0, 256, 180, 360); //height of arc
    let h = map(amp, 0, 256, 100, 330);
    let alpha = map(amp, 0, 256, 1.0, 0.5)
    //let h = map(amp, 0, 256, 230, 360);
    let size = map(amp, 0, 256, 0, 6);
    let x = sc * a * pow(cos(angle), 2); //2
    let y = sc * b * sin(angle);
    c = color(h, 100, l, 10);
    stroke(h, 100, l, alpha);
    noFill();
    let sw = 3 * (1 - i / sl);
    strokeWeight(sw);
    
    // create kaleidescope effect
    push();
    for (let j = 0; j < 360; j += 45) {
      rotate(j);
      arc(0, 0, x, y, 0, ht, OPEN);
    }
    pop();
  }

  ang += 1;
}