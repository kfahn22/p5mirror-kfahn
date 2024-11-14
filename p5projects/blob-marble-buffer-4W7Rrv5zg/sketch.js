// need two buffers
let currBuff, prevBuff;
let marbleShader;
let vertSource, fragSource;
let img;
let blob;

function preload() {
  vertSource = loadStrings("marble.vert");
  fragSource = loadStrings("marble.frag");
 
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

  // create buffers
  currBuff = createGraphics(width, height);
  currBuff.pixelDensity(1);
  currBuff.noSmooth();

  prevBuff = createGraphics(width, height);
  prevBuff.pixelDensity(1);
  prevBuff.noSmooth();

  marbleShader = createShader(vertSource, fragSource);
  
  blob = new Particle(random(width), random(height));
}

function draw() {
 
  // set the shader
  shader(marbleShader);
  
  blob = new Particle(random(width), random(height));
  
  blob.show();
  //blob.update();
  
  // update buffers
  prevBuff.image(currBuff, 0, 0);
  currBuff.image(get(), 0, 0);

  // set the buffers inside the shader
  marbleShader.setUniform("currBuff", currBuff);
  marbleShader.setUniform("prevBuff", prevBuff);

  marbleShader.setUniform("u_resolution", [width, height]);
  marbleShader.setUniform("iFrame", frameCount);
  marbleShader.setUniform("u_time", millis()/1000.);
  marbleShader.setUniform("uNoiseTexture", noise);  
  rect(-width, -height, width, height);
  
  
}