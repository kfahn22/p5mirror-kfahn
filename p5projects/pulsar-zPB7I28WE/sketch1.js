//https://github.com/therewasaguy/p5-music-viz/blob/master/demos/05a_fft_particle_system_color/sketch.js

/*
  Analyze the frequency spectrum with FFT (Fast Fourier Transform)
  Draw a 1024 particles system that represents bins of the FFT frequency spectrum. 

  Example by Jason Sigal and Michelle Chandra
 */

//var mic, soundFile; // input sources, press T to toggleInput()

let fft;
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

function setup() {
  c = createCanvas(512, 512);
  noStroke();
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  button = createButton("toggle");
  button.mousePressed(toggleSong);
  song.play();

  // soundFile = createAudio('seastar.mp3')
  // soundFile.play();
  //mic = new p5.AudioIn();

  // initialize the FFT, plug in our variables for smoothing and binCount
  fft = new p5.FFT(smoothing, binCount);
  fft.setInput(song);
  //fft.setInput(song);

  amplitude = new p5.Amplitude();

  // instantiate the particles.
  // for(let i = 0; i < 3; i++){
  //   let m = [];
  //   let numLimit = 10 - i*4;
  //   for(let j = 0; j < numLimit; j++){
  //     m.push(new Marble(30+50*i, 50+55*i, 20-i*10));
  //   }
  //   marbles.push(m);
  //   m = [];
  for (let i = 0; i < particles.length; i++) {
    let pos = createVector(
      // x position corresponds with position in the frequency spectrum
      map(i, 0, binCount, 0, width*0.5),
      random(0, height)
    );
  //  let pos = createVector(
  //    // x position corresponds with position in the frequency spectrum
  //    map(i, 0, binCount, 0, width * 2),
  //    random(0, height)
  //  );
    let sc = random(3.1, 3.5);
    //let sc = 3.0
    particles[i] = new Particle(pos, sc);
    
    // particles[i] = new Particle(pos, volume);
  }
}

function draw() {
  // returns an array with [binCount] amplitude readings from lowest to highest frequencies
  let spectrum = fft.analyze(binCount);

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
  background(0);
  
  // update and draw all [binCount] particles!
  // Each particle gets a level that corresponds to
  // the level at one bin of the FFT spectrum.
  // This level is like amplitude, often called "energy."
  // It will be a number between 0-255.
  for (var i = 0; i < binCount; i++) {
    particles[i].addPoints(volume);
    particles[i].update(spectrum[i]);
    shuffle(particles);
    particles[i].drawShape();
    particles[i].show(volume, blurAmount);
    particles[i].reset();
    // update x position (in case we change the bin count)
    particles[i].pos.x = map(i, 0, binCount, 0, width * 2);
  }
}

// ================
// Helper Functions
// ================

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

function keyPressed() {
  if (key == "T") {
    toggleInput();
  }
}

// To prevent feedback, mic doesnt send its output.
// So we need to tell fft to listen to the mic, and then switch back.
function toggleInput() {
  if (soundFile.isPlaying()) {
    soundFile.pause();
    mic.start();
    amplitude.setInput(mic);
    fft.setInput(mic);
  } else {
    soundFile.play();
    mic.stop();
    amplitude.setInput(soundFile);
    fft.setInput(soundFile);
  }
}
