// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

var population;
// Each rocket is alive till 400 frames
var lifespan = 500;
// Made to display count on screen
var lifeP;
// Keeps track of frames
var count = 0;
// Where rockets are trying to go
var target;
// Max force applied to rocket
var maxforce = 0.2;

// Dimensions of barrier
// var rx = 100;
// var ry = 150;
// var rw = 200;
// var rh = 10;
var rx = 220;
var ry = 200;
var rw = 360;
var rh = 30;

function setup() {
  createCanvas(800, 450);
  population = new Population();
  lifeP = createP();
  target = createVector(width / 2, 50);

}

function draw() {
  background('#66D334');
  population.run();
  // Displays count to window
  lifeP.html(count);

  count++;
  if (count == lifespan) {
    population.evaluate();
    population.selection();
    // Population = new Population();
    count = 0;
  }
  // Renders barrier for rockets
  fill('#9253A1');
  noStroke();
  rect(rx, ry, rw, rh);
  // Renders target
  
  ellipse(target.x, target.y, 36, 36);
}
