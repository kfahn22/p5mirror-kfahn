// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

let font;
let vehicles = [];

const Y_AXIS = 1;
const X_AXIS = 2;


function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
  //font2 = loadFont('Play-Bold.ttf');
}

function setup() {
  createCanvas(800, 450);
  //background(248, 158, 79);
  
  
  //font = textFont("RobotoMono");
  //textFont(font);
  textSize(72);
  
  
  // noStroke();
  // text('train', 100, 200);

 var points = font.textToPoints('this.', 210, 330, 192, {
    //var points = font2.textToPoints('Coding Train', 20, 250, 120, {
    sampleFactor: 0.1
  });

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
    // stroke(255);
    // strokeWeight(8);
    // point(pt.x, pt.y);
  }
}

function draw() {
  //translate(300, 200);
  //background(248, 158, 79);
   let c1 = color(146,83,161);
   let c2 = color(0);
   let c3 = color(45,197,244);
   let c4 = color(102, 211, 52);
 
  let  col2 = setGradient(0, 0, 800, 450, c1, c4, Y_AXIS);
  fill(146,83,161);
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
  
  stroke(255);
  fill(146,83,161);
  textSize(70);
  font = textFont("Arial");
  text("Don't forget the",150, 150);
}


function mousePressed() {
 save('steering.jpg');
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0.0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0,1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
