let marbleShader;
let blobs = [];
let n = 2;

// create two buffers
let currBuff, prevBuff;

function preload() {
  marbleShader = loadShader("marble.vert", "marble.frag");
}

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
  noSmooth();
  angleMode(DEGREES);
  
  // create buffers
  currBuff = createGraphics(width, height);
  currBuff.pixelDensity(1);
  currBuff.noSmooth();

  prevBuff = createGraphics(width, height);
  prevBuff.pixelDensity(1);
  prevBuff.noSmooth();

  // set the shader
  shader(marbleShader);

  marbleShader.setUniform("u_resolution", [width, height]);
  //marbleShader.setUniform("u_time", millis() / 1000);
  
 
}

function draw() {
  // stroke(255, 0, 0);
  
  circle(random(width) - width / 2, random(height) - height / 2, 40);
  
  
  // update buffers
  prevBuff.image(currBuff, 0, 0);
  currBuff.image(get(), 0, 0);
  
  // set the buffers inside the shader
  marbleShader.setUniform("currBuff", currBuff);
  marbleShader.setUniform("prevBuff", prevBuff);

  rect(-width / 2, -height / 2, width, height);
  
  // for (i = 0; i < blobs.length; i++) {
  //   blobs[i].addBlob();
  //   blobs[i].showInk();
  //   //blobs[i].update();
  // }
  
}

// function mousePressed() {
//   blobs.push(new InkBlob(random(width), random(height), random(10, 20)));
// }
