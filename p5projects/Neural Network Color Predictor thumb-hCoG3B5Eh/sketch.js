// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Color Predictor
// https://youtu.be/KtPpoMThKUs

// Inspired by Jabril's SEFD Science
// https://youtu.be/KO7W0Qq8yUE
// https://youtu.be/iN3WAko2rL8

let r, g, b;
let brain;

let which = "black";

let wButton;
let bButton;
let myfont;

function preload() {
  myfont = loadFont('Cubano.ttf');
}

function pickColor() {
  r = random(255);
  g = random(255);
  b = random(255);
  redraw();
}

function setup() {
  createCanvas(800, 450);
  noLoop();
  brain = new NeuralNetwork(3, 3, 2);

  for (let i = 0; i < 10000; i++) {
    let r = random(255);
    let g = random(255);
    let b = random(255);
    let targets = trainColor(r, g, b);
    let inputs = [r / 255, g / 255, b / 255];
    brain.train(inputs, targets);
  }

  pickColor();

}

function mousePressed() {
  // let targets;
  // if (mouseX > width / 2) {
  //   targets = [0, 1];
  // } else {
  //   targets = [1, 0];
  // }
  // let inputs = [r / 255, g / 255, b / 255];
  //
  // brain.train(inputs, targets);


  pickColor();
}


function colorPredictor(r, g, b) {
  console.log(floor(r + g + b));
  let inputs = [r / 255, g / 255, b / 255];
  let outputs = brain.predict(inputs);
  textFont(myfont);
  //console.log(outputs);

  if (outputs[0] > outputs[1]) {
    return "black";
  } else {
    return "white";
  }

  // if (r + g + b > 300) {
  //   return "black";
  // } else {
  //   return "white";
  // }
}

function trainColor(r, g, b) {
  if (r + g + b > (255 * 3) / 2) {
    return [1, 0];
  } else {
    return [0, 1];
  }
}

// mousePressed = () => {
//   save('cont.jpg');
// }


function draw() {
  background('#F16164');
 // background(r, g, b);
  strokeWeight(12);
  stroke(0);
  line(width / 2, 0, width / 2, height);

  textSize(90);
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  text("black", 200, 150);
  fill(255);
  text("white", 600, 150);

  let which = colorPredictor(r, g, b);
  if (which === "black") {
    fill(0);
    ellipse(200, 300, 80);
  } else {
    fill(255);
    ellipse(600, 300, 80);
  }


}
