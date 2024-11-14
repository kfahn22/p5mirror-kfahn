//References:
//https://github.com/therewasaguy/p5-music-viz/blob/master/demos/05a_fft_particle_system_color/sketch.js
// https://github.com/neundex/AudioBasedImageDistortion/blob/master/shaders/d1.frag
// Example sketches by Patricio Gonzalez Vivo demonstrating use of new Lygia library
// https://editor.p5js.org/patriciogonzalezvivo/sketches

let theShader;
let vertSource, fragSource;

function preload() {
  img = loadImage("flowers.jpeg");
  //song = loadSound("seastar.mp3");
  vertSource = loadStrings("shader.vert");
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

}

function draw() {
  background(0);
  theShader.setUniform("u_resolution", [width, height]);
  theShader.setUniform("u_texture", img);
  theShader.setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iFrame", frameCount / 20);
  theShader.setUniform("u_time", millis() / 1000.0);

  shader(theShader);

  // rect gives us some geometry on the screen
  rect(0, 0, width, height);
  
  
}

// function mousePressed() {
//   save("shape.jpg");
// }
