// This sketch shows how to use the Lygia library to filter a webcam feed.

// For more information about the Lygia library see https://github.com/patriciogonzalezvivo/lygia

// The Lygia library is dual-licensed under the Prosperity Public License and Patron License
 
// this variable will hold our webcam video
let video;
let theShader;

let shdr;
let vertSource, fragSource;

let blob0, blob1;

function preload() {
  vertSource = loadStrings("shader.vert");
  fragSource = loadStrings("example.frag");
}

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
  
  shader(theShader);

  // rect gives us some geometry on the screen
  rect(0, 0, width, height);
  blob0.update();
  blob1.update();
}

// function mousePressed() {
//   save("video.jpg");
// }
