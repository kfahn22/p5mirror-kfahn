//https://editor.p5js.org/jeffThompson/sketches/Dzr4vexcc

// text to display
// (note: the space at the end helps keep the first
// and last word from running into each other)
let str = 'AnimalPose ControlNet';

let startAngle =    0;     // angle where text should start
let distanceAngle = 360;   // how far (in degrees) text will go
let radius;                // set dynamically in setup()
let font;

function preload() {
  //img = loadImage('cocker.jpeg');
  img = loadImage('IMG_1278.png');
 // font = loadFont('assets/CaslonSemiBoldItalic.otf');
}

function setup() {
  createCanvas(512, 512);
}

function draw() {
  background("#F89E4F");
  image(img, 0, 0, 512, 512);
  strokeWeight(6);
  stroke("#66D334");
  line(155, 375, 170, 275);
  stroke("#2DC5F4");
  line(380, 375, 320, 275);
  stroke("#EC015A");
  line(320, 275, 170, 275);
  stroke(0);
  strokeWeight(2);
  fill(255);
  circle(155, 375, 13);
  circle(380, 375, 13);
  circle(170, 275, 13);
  circle(320, 275, 13);
  
  textSize(12);
  textFont('Georgia');
  noFill();
  stroke(0,150,255);
  circle(width/2,height/2, radius*2);
  
  // calculate the angle between each letter
  let angleBetweenLetters = radians(distanceAngle) / str.length;
  
  // display the text!
  push();
  translate(width/2, height/2);        // move to circle's center
  rotate(radians(startAngle));         // rotate to where text starts
  for (let i=0; i<str.length; i++) {   // go through each letter in the text
    push();
    rotate(i * angleBetweenLetters);   // rotate to angle
    translate(0,-radius);              // and translate to edge of circle
    fill(255);
    noStroke();
    text(str[i], 0,0);                 // draw character at location
    pop();
  }
  pop();
}

function circleText()
{
  // the circle our text will go around
  noFill();
  stroke(0,150,255);
  circle(width/2,height/2, radius*2);
  
  // calculate the angle between each letter
  let angleBetweenLetters = radians(distanceAngle) / str.length;
  
  // display the text!
  push();
  translate(width/2, height/2);        // move to circle's center
  rotate(radians(startAngle));         // rotate to where text starts
  for (let i=0; i<str.length; i++) {   // go through each letter in the text
    push();
    rotate(i * angleBetweenLetters);   // rotate to angle
    translate(0,-radius);              // and translate to edge of circle
    fill(255);
    noStroke();
    text(str[i], 0,0);                 // draw character at location
    pop();
  }
  pop();
}

function mousePressed() {
 save('favicon.jpg');
}