// Example sketches by Patricio Gonzalez Vivo demonstrating use of new Lygia library

let theShader;
let vertSource, fragSource;
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

function preload() {
  vertSource = loadStrings("shader.vert");
  fragSource = loadStrings("fractal.frag");
}

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
  vertSource = resolveLygia(vertSource);
  fragSource = resolveLygia(fragSource);
  // Hi There! this ^ two lines ^ use `resolveLygia( ... )` to resolve the LYGIA dependencies from the preloaded `shader.vert` and `shader.frag` files.
  // Check `index.html` to see how it's first added to the project.
  // And then, the `shader.frag` file to how it's used.

  theShader = createShader(vertSource, fragSource);
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
    mapMid = map(mid, 0, 255, 6, 7);
  } else {
    mapMid = map(mid, 0, 255, 6, 6);
  }

  
 // let mapVol = map(vol, 0, 0.01, 0.1, 1.0);
  let mapVol = map(vol, 0, 0.01, 0.5, 1.0);
  //console.log(treble);
 // let mapVol = map(volume, 0, 0.51, 0.0, 10.0);
  let mapBass = map(bass, 0, 255, 0.0, 1.0);
  const mapTreble = map(treble, 0, 32, 0.0, 1.0);
  theShader.setUniform("u_vol", mapVol);
  theShader.setUniform("u_bass", mapBass);
  theShader.setUniform("u_treble", mapTreble);
  theShader.setUniform("u_mid", mapMid);
  theShader.setUniform("u_resolution", [width, height]);
  theShader.setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iFrame", frameCount / 20);
  theShader.setUniform("u_time", millis() / 1000.0);

  shader(theShader);

  // rect gives us some geometry on the screen
  rect(0, 0, width, height);
  
}

