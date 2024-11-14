let shdr;
let obj;
let vertSource, fragSource;

function preload() {
  obj = loadModel("mandelbulb.obj")
  vertSource = loadStrings("shader.vert");
  fragSource = loadStrings("shader.frag");
} 


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(1);
  noCursor();
  vertSource = resolveLygia(vertSource);
  fragSource = resolveLygia(fragSource);
  // Hi There! this ^ two lines ^ use `resolveLygia( ... )` to resolve the LYGIA dependencies from the preloaded `shader.vert` and `shader.frag` files.
  // Check `index.html` to see how it's first added to the project.
  // And then, the `shader.frag` file to how it's used.

  shdr = createShader(vertSource, fragSource);
}

function draw(){
    shdr.setUniform("u_resolution", [width, height]);
    shdr.setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0)]);
    //theShader.setUniform("iFrame", frameCount / 20);
    shdr.setUniform("u_time", millis() / 1000.0);
    shdr.setUniform("u_cubeMap", obj);
    shader(shdr);

  // rect gives us some geometry on the screen
  rect(0, 0, width, height);
}