
let marbleShader;
let vertSource, fragSource;
let img;

function preload() {
  vertSource = loadStrings("marble.vert");
  fragSource = loadStrings("marble.frag");
  img = loadImage('apple.jpg');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
  noSmooth();
  angleMode(DEGREES);
  vertSource = resolveLygia(vertSource);
  fragSource = resolveLygia(fragSource);
  // Hi There! this ^ two lines ^ use `resolveLygia( ... )` to resolve the LYGIA dependencies from the preloaded `shader.vert` and `shader.frag` files.
  // Check `index.html` to see how it's first added to the project.
  // And then, the `shader.frag` file to how it's used.

  marbleShader = createShader(vertSource, fragSource);
  
  // create buffers
  currBuff = createGraphics(width, height);
  currBuff.pixelDensity(1);
  currBuff.noSmooth();

  prevBuff = createGraphics(width, height);
  prevBuff.pixelDensity(1);
  prevBuff.noSmooth();

  
}

function draw() {
 
  // set the shader
  shader(marbleShader);

  marbleShader.setUniform("u_resolution", [width, height]);
  marbleShader.setUniform("u_tex", img);
  // update buffers
//   prevBuff.image(currBuff, 0, 0);
//   currBuff.image(get(), 0, 0);
  
//   // set the buffers inside the shader
//   marbleShader.setUniform("currBuff", currBuff);
//   marbleShader.setUniform("prevBuff", prevBuff);

  rect(0, 0, width, height);
  
}

// function mousePressed() {
//   blobs.push(new InkBlob(random(width), random(height), random(10, 20)));
// }
