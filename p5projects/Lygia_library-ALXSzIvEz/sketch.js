//References:
//https://github.com/therewasaguy/p5-music-viz/blob/master/demos/05a_fft_particle_system_color/sketch.js
// https://github.com/neundex/AudioBasedImageDistortion/blob/master/shaders/d1.frag
// Example sketches by Patricio Gonzalez Vivo demonstrating use of new Lygia library
// https://editor.p5js.org/patriciogonzalezvivo/sketches

let theShader;
let fft;
const smoothing = 0.8; // play with this, between 0 and .99
const binCount = 64; // size of resulting FFT array. Must be a power of 2 between 16 and 1024
//const blurAmount = 4;
let particles = new Array(binCount);
let volume = 0.01; // initial starting volume of amplitude (necessary for p5.sound)
let amplitude;
let song;
let img;
let shdr;
let vertSource, fragSource;

function preload() {
  img = loadImage("charlie.jpeg");
  //song = loadSound("seastar.mp3");
  vertSource = loadStrings("super.vert");
  fragSource = loadStrings("koch.frag");
}

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
  noCursor();
  vertSource = resolveLygia(vertSource);
  fragSource = resolveLygia(fragSource);
  // Hi There! this ^ two lines ^ use `resolveLygia( ... )` to resolve the LYGIA dependencies from the preloaded `shader.vert` and `shader.frag` files.
  // Check `index.html` to see how it's first added to the project.
  // And then, the `shader.frag` file to how it's used.

  theShader = createShader(vertSource, fragSource);

//   button = createButton("toggle");
//   button.mousePressed(toggleSong);
//   song.play();

//   // initialize the FFT, plug in our variables for smoothing and binCount
//   fft = new p5.FFT(smoothing, binCount);
//   //fft.setInput(song);

//   amplitude = new p5.Amplitude();
}

function draw() {
  background(0);
//   let spectrum = fft.analyze(binCount);
//   volume = amplitude.getLevel();
//   let bass = fft.getEnergy("bass") * 0.2;
//   const treble = fft.getEnergy("treble");
//   const mid = fft.getEnergy("mid");
//   //console.log(volume);

//   // theShader.setUniform("u_time", p.frameCount / 20);
//   theShader.setUniform("u_vol", map(volume, 0, 0.51, 0.0, 10.0));
//   // theShader.setUniform("u_bass", map(bass, 0, 255, 0.0, 0.5));
//   theShader.setUniform("u_bass", bass);
//   theShader.setUniform("u_tremble", map(treble, 0, 255, 0.0, 10.0));
//   theShader.setUniform("u_mid", map(mid, 0, 255, 0.0, 10.0));
  theShader.setUniform("u_resolution", [width, height]);
  theShader.setUniform("u_texture", img);
  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iFrame", frameCount / 20);
  theShader.setUniform("iTime", millis() / 1000.0);

  shader(theShader);

  // rect gives us some geometry on the screen
  rect(0, 0, width, height);
}

// function mousePressed() {
//   save("shape.jpg");
// }
