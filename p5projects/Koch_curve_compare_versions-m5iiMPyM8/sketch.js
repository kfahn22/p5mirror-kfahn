// Compare different implemnentations of the Koch curve

let theShader;
let vertSource, fragSource;

function preload() {
  //img = loadImage("flowers.jpeg");
  
  vertSource = loadStrings("shader.vert");
  // Art of Code
  //fragSource = loadStrings("edit_a.frag");
  //fragSource = loadStrings("a-koch.frag");
  // pedrotrschneider
  //fragSource = loadStrings("s-koch.frag");
  // LYGIA
  fragSource = loadStrings("l-koch.frag");
  // Nimitz (@stormoid)
  //fragSource = loadStrings("n-koch.frag");
}

function setup() {
  createCanvas(500, 500, WEBGL);
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
  theShader.setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iFrame", frameCount / 20);
  theShader.setUniform("u_time", millis() / 1000.0);

  shader(theShader);

  // rect gives us some geometry on the screen
  rect(0, 0, width, height);
  
 // console.log(sqrt(3));
}
