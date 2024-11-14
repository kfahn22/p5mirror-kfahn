// Example sketches by Patricio Gonzalez Vivo demonstrating use of new Lygia library

//https://p5js.org/examples/3d-shader-as-a-texture.html

// https://github.com/davepagurek/p5.Framebuffer

let fbo;
let theShader;
let vertSource, fragSource;

function preload() {
  //img = loadImage("stones.jpeg");
  vertSource = loadStrings("shader.vert");
  fragSource = loadStrings("example.frag");
}

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
  vertSource = resolveLygia(vertSource);
  fragSource = resolveLygia(fragSource);
  // Hi There! this ^ two lines ^ use `resolveLygia( ... )` to resolve the LYGIA dependencies from the preloaded `shader.vert` and `shader.frag` files.
  // Check `index.html` to see how it's first added to the project.
  // And then, the `shader.frag` file to how it's used.

  
  fbo = createFramebuffer();
 // theShader = createShader(vertSource, fragSource);
  //fbo = new Framebuffer(window);
}

function draw() {
//   background(255, 0, 255);
//   let img = texture(fbo.color);
//   theShader.setUniform("u_resolution", [width, height]);
//   theShader.setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0)]);
//   //theShader.setUniform("u_tex0",  img);
//   theShader.setUniform("iFrame", frameCount / 20);
//   theShader.setUniform("u_time", millis() / 1000.0);
//   theShader.setUniform("u_doubleBuffer0", fbo.color);
//   theShader.setUniform("u_doubleBuffer0", img);
//   shader(theShader);

//   // rect gives us some geometry on the screen
//   rect(0, 0, width, height);
  
}

