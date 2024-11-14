let canvas, shaderLayer, crtShader, ctx;
let textureImg;
// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/IKB1hWWedMk
// https://thecodingtrain.com/CodingChallenges/011-perlinnoiseterrain.html

// Edited by SacrificeProductions

var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;

var flying = 0;

var terrain = [];


// function preload(){
//   // load the shader
//   // monochromatic image works best
//   textureImg = loadImage("Assets/mountain.JPG");
//   theShader = loadShader('starter.vert', 'starter.frag');
// }


function setup() {
  // pixelDensity(1);
  // // shaders require WEBGL mode to work
  // createCanvas(800, 800, WEBGL);
  // noStroke();
    // Get the canvas context so we can grap the image data from it later
    canvas = createCanvas(windowWidth, windowHeight).canvas;
    ctx = canvas.getContext('2d');

    // p5 graphcis element to draw our shader output to
    shaderLayer = createGraphics(windowWidth, windowHeight, WEBGL);
    shaderLayer.noStroke();
 
  cols = w / scl;
  rows = h / scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }

}


function draw() { 
  
  flying -= 0.1;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 150);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  let from = color(236, 225, 185);
  let to = color(206,141, 141);
  let sky = lerpColor(from, to , 0.70);

  background(sky);
  translate(0, 50);
  rotateX(PI / 3);
  fill(79, 39, 18, 200);
  noStroke();
  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
  
  shaderLayer.rect(0,0, width, height);
  shaderLayer.shader(crtShader);

  // pass the image from canvas context in to shader as uniform
  crtShader.setUniform("u_tex", ctx.getImageData(0,0,width, height));
  crtShader.setUniform("u_resolution", [width, height]);
  crtShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  crtShader.setUniform("iFrame", frameCount);
  crtShader.setUniform("iTime", millis()/1000.);
//   theShader.setUniform("tex0", textureImg);
  
  // Resetting the background to black to check we're not seeing the original drawing output
  background(255);
  image(shaderLayer, 0,0,width,height);
   // background(0);
  
}

