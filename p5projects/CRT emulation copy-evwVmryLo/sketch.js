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


function preload(){
  // load the shader
  // monochromatic image works best
  textureImg = loadImage("Assets/mountain.JPG");
  theShader = loadShader('starter.vert', 'starter.frag');
}


function setup() {
   pixelDensity(1);
  // // shaders require WEBGL mode to work
  createCanvas(800, 800, WEBGL);
  noStroke();
}


function draw() { 
  background(0);
 
  

  // pass the image from canvas context in to shader as uniform
  theShader.setUniform("u_resolution", [width, height]);
  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iFrame", frameCount);
  theShader.setUniform("iTime", millis()/1000.);

  // shader() sets the active shader with our shader
    shader(theShader);

    // rect gives us some geometry on the screen
    rect(0, 0, width, height);
}

