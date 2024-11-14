// Every Good Thing 

/*
 * @name Shader Using Video
 * @arialabel Neon texture added to the scene displayed by the user’s built-in webcam
 * @description The webcam can be passed to shaders as a texture.
 * <br> To learn more about using shaders in p5.js: <a href="https://itp-xstory.github.io/p5js-shaders/">p5.js Shaders</a>
 */

 
// this variable will hold our webcam video
let video;
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
  
  video = createCapture(VIDEO);
  video.size(710, 400);

   video.hide();
  
  // LYGIA code
  vertSource = resolveLygia(vertSource);
  fragSource = resolveLygia(fragSource);
  
  // Hi There! this ^ two lines ^ use `resolveLygia( ... )` to resolve the LYGIA dependencies from the preloaded `shader.vert` and `shader.frag` files.
  // Check `index.html` to see how it's first added to the project.
  // And then, the `shader.frag` file to how it's used.

  theShader = createShader(vertSource, fragSource);

  blob0 = new Particle(0, 0);
  blob1 = new Particle(100, 50);
  
 
}

function draw() {
  background(0);
  
  
 

  // passing cam as a texture
  theShader.setUniform('tex0', video);
  theShader.setUniform("u_blob0", [blob0.x,blob0.y]);
  theShader.setUniform("u_blob1", [blob1.x,blob1.y]);
  theShader.setUniform("u_resolution", [width, height]);
  //theShader.setUniform("u_texture", img);
  theShader.setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  
  theShader.setUniform("u_time", millis() / 1000.0);
  
  

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
