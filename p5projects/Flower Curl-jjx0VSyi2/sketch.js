// Designed for "Every Good Thing" by River Valley Worship

let theShader;
let fft;
const smoothing = 0.8; // play with this, between 0 and .99
const binCount = 64; // size of resulting FFT array. Must be a power of 2 between 16 and 1024
//const blurAmount = 4;
let volume = 0.01; // initial starting volume of amplitude (necessary for p5.sound)
let amplitude;
let song;
let img;
let noise;
let mic;
let shdr;
let vertSource, fragSource;

function preload() {
  //song = loadSound("seastar.mp3");
  vertSource = loadStrings("shader.vert");
  fragSource = loadStrings("starter.frag");
}

// function toggleSong() {
//   if (song.isPlaying()) {
//     song.pause();
//   } else {
//     song.play();
//   }
// }

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
  noCursor();
  
  // LYGIA code
  vertSource = resolveLygia(vertSource);
  fragSource = resolveLygia(fragSource);
  
  // Hi There! this ^ two lines ^ use `resolveLygia( ... )` to resolve the LYGIA dependencies from the preloaded `shader.vert` and `shader.frag` files.
  // Check `index.html` to see how it's first added to the project.
  // And then, the `shader.frag` file to how it's used.

  theShader = createShader(vertSource, fragSource);

  blob0 = new Particle(0, 0);
  blob1 = new Particle(100, 50);
  // button = createButton("toggle");
  // button.mousePressed(toggleSong);
  //song.play();

  // initialize the FFT, plug in our variables for smoothing and binCount
  fft = new p5.FFT(smoothing, binCount);
  peakDetect = new p5.PeakDetect();

  //amplitude = new p5.Amplitude();
  mic = new p5.AudioIn();
  mic.start();
  fft.setInput(mic);
}

function draw() {
  background(0);
  let spectrum = fft.analyze(binCount);
  peakDetect.update(fft);
  //volume = amplitude.getLevel();
  const bass = fft.getEnergy("bass");
  const treble = fft.getEnergy("treble");
  const mid = fft.getEnergy("mid");
  let vol = mic.getLevel();
  //console.log(bass);
  let mapMid;
  if ( peakDetect.isDetected ) {
    mapMid = map(mid, 0, 255, 0.2, 0.35); //.25
  } else {
    mapMid = map(mid, 0, 255, 0.0, 0.15);
  }

  
 // let mapVol = map(vol, 0, 0.01, 0.1, 1.0);
  let mapVol = map(vol, 0, 0.01, 0.1, 1.0);
  //console.log(treble);
 // let mapVol = map(volume, 0, 0.51, 0.0, 10.0);
  let mapBass = map(bass, 0, 255, 0.4, 0.6);
  const mapTreble = map(treble, 0, 32, 0.0, 1.0);
  // const mapMid = map(mid, 0, 255, 0.0, 0.2);

  theShader.setUniform("u_vol", mapVol);
  theShader.setUniform("u_bass", mapBass);
  theShader.setUniform("u_treble", mapTreble);
  theShader.setUniform("u_mid", mapMid);
  theShader.setUniform("u_blob0", [blob0.x,blob0.y]);
  theShader.setUniform("u_blob1", [blob1.x,blob1.y]);
  theShader.setUniform("u_resolution", [width, height]);
  //theShader.setUniform("u_texture", img);
  theShader.setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  //theShader.setUniform("iFrame", frameCount / 20);
  theShader.setUniform("u_time", millis() / 1000.0);
  //theShader.setUniform("spectrum", spectrum[0]);
  
  

  // Rotate our geometry on the X and Y axes
  // rotateX(frameCount * 0.01);
  // rotateY(frameCount * 0.005);
  shader(theShader);

  // rect gives us some geometry on the screen
  rect(0, 0, width, height);
  blob0.update();
  blob1.update();
}

// function mousePressed() {
//   save("shape.jpg");
// }
