// Example sketches by Patricio Gonzalez Vivo demonstrating use of new Lygia library

let img;
let theShader;
let vertSource, fragSource;

function preload() {
  img = loadImage("stones.jpeg");
  vertSource = loadStrings("shader.vert");
  //fragSource = loadStrings("micro.frag");
  fragSource = loadStrings("tunnel.frag");
  //fragSource = loadStrings("tree.frag");


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

}

function draw() {
  background(0);
  theShader.setUniform("u_resolution", [width, height]);
  theShader.setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iFrame", frameCount / 20);
  theShader.setUniform("u_time", millis() / 1000.0);
  theShader.setUniform("tex0",  img);
  shader(theShader);

  // rect gives us some geometry on the screen
  rect(0, 0, width, height);
  
}

