// Sources:
// //https://github.com/therewasaguy/p5-music-viz/blob/master/demos/05a_fft_particle_system_color/sketch.js
// https://editor.p5js.org/Creativeguru97/collections/2MUw-LRW

// Note: there is no support for blur filter on Safari
let fft;
const layers = 3;
const smoothing = 0.8; // play with this, between 0 and .99
const binCount = 64; // size of resulting FFT array. Must be a power of 2 between 16 and 1024
const blurAmount = 8;
let particles = new Array(binCount);
let volume = 0.01; // initial starting volume of amplitude (necessary for p5.sound)
let amplitude;

function preload() {
  song = loadSound("seastar.mp3");
}

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

//let marbles = [];

function setup() {
 c = createCanvas(512, 512);
  noStroke();
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  button = createButton("toggle");
  button.mousePressed(toggleSong);
  //song.play();
// initialize the FFT, plug in our variables for smoothing and binCount
  fft = new p5.FFT(smoothing, binCount);
  //fft.setInput(song);
  //fft.setInput(song);

  amplitude = new p5.Amplitude();


  for (let i = 0; i < layers; i++) {
    let p = [];
    //let numLimit = 10 - i*4;
    for (let j = 0; j < particles.length; j++) {
      let pos = createVector(
        // x position corresponds with position in the frequency spectrum
        map(i, 0, binCount, 0, width * 0.5),
        random(0, height)
      );
      let sc = random(3.1, 3.5);
      p.push(new Particle(pos, sc));
    }
    particles.push(p);
    p = [];
  }
}

function draw() {
  background(0);
  // returns an array with [binCount] amplitude readings from lowest to highest frequencies
  let spectrum = fft.analyze(binCount);
  console.log(spectrum);
  // analyze the volume
  //amplitude.setInput(song);
  volume = amplitude.getLevel();

  //console.log(volume);

  let hue = map(volume, 0, 0.5, 180, 360);
  let sat = map(volume, 0, 0.5, 80, 100);
  let bri = map(volume, 0, 0.5, 80, 100);
  let alp = map(volume, 0, 0.5, 40, 80);
  // let alp = map(windowHeight, 0, 0.5, 60, 100);
  //console.log(alp);
  //background(hue, sat, bri, alp);
  //background(0);

  // update and draw all [binCount] particles!
  // Each particle gets a level that corresponds to
  // the level at one bin of the FFT spectrum.
  // This level is like amplitude, often called "energy."
  // It will be a number between 0-255.
  
  for (var i = 0; i < binCount; i++) {
    particles[i].addPoints(spectrum[i]);
    particles[i].update(spectrum[i]);
    shuffle(particles);
    particles[i].drawShape();
    particles[i].show(volume);
    particles[i].reset();
    // update x position (in case we change the bin count)
    particles[i].pos.x = map(i, 0, binCount, 0, width * 2);
  }
  // for (let i = 0; i < 1; i++) {
  //   for (let j = 0; j < binCount; j++) {
  //     // particles[i][j].show(particles.length * 3 - i * 4);
  //     // particles[i][j].ascend();
  //     // particles[i][j].reposition();
  //     particles[i][j].addPoints(volume);
  //     particles[i][j].update(spectrum[i]);
  //     shuffle(particles[i]);
  //     particles[i][j].drawShape();
  //     particles[i][j].show(volume);
  //     particles[i][j].reset();
  //     // update x position (in case we change the bin count)
  //     particles[i][j].pos.x = map(i, 0, binCount, 0, width * 2);
  //   }
  //}
  //console.log('Frame rate: '+frameRate());
}
