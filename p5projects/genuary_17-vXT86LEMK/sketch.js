// Daniel Shiffman
// http://codingtra.in
// Islamic Star Patterns
// Video Part 1: https://youtu.be/sJ6pMLp_IaI
// Video Part 2: [coming soon]
// Based on: http://www.cgl.uwaterloo.ca/csk/projects/starpatterns/

// Repo with more tiling patterns and features
// https://github.com/CodingTrain/StarPatterns

var polys = [];
var angle = 37.5;
var delta = 0;
let img;
let button;
let seldelta;
let selangle;
let stars = [];



var deltaSlider;
// var angleSlider;

function setup() {
  createCanvas(400, 400);
  
  button = createButton("save frame");
  button.mousePressed(saveWork);
  
  function saveWork() {
      saveCanvas("threecolors.png"); 
    }

  
  selangle = createSelect();
  selangle.position(500,100);
  selangle.option(0);
  selangle.option(5);
  selangle.option(10);
  selangle.option(15);
  selangle.option(20);
  selangle.option(25);
  selangle.option(30);
  selangle.option(35);
  selangle.option(40);
  selangle.option(45);
  selangle.option(50);
  selangle.option(55);
  selangle.option(60);
  selangle.option(65);
  selangle.option(70);
  selangle.option(75);
  selangle.option(80);
  selangle.option(85);
  selangle.option(90);
 
  
  // deltaSlider = createSlider(0, 25, 10);
  // angleSlider = createSlider(0, 90, 75);

  deltaSlider = createSlider(0, 25, 0);
  // angleSlider = createSlider(0, 90, 45);

  var inc = 100;
  for (var x = 0; x < width; x += inc) {
    for (var y = 0; y < height; y += inc) {
      var poly = new Polygon(4);
      poly.addVertex(x, y);
      poly.addVertex(x + inc, y);
      poly.addVertex(x + inc, y + inc);
      poly.addVertex(x, y + inc);
      poly.close();
      polys.push(poly);
    }
  }
}

function draw() {
  let from = color(109,50,109);
  let to = color(57,67,183);
  background(58,50,135);
  angle = selangle.value();
  delta = deltaSlider.value();
  //console.log(angle, delta);
  for (var i = 0; i < polys.length; i++) {
    polys[i].hankin();
    polys[i].show();
  }
  rectMode(RADIUS);
  //rotate(90);
  stroke(214,107,160);
  fill(214,107,160);
  for (i = width/4; i < width; i += width/4) {
     for (j = height/4 ; j < height; j += height/4) {
      circle(i, j, 10, 20);
      }
  }
  //noLoop();
}
