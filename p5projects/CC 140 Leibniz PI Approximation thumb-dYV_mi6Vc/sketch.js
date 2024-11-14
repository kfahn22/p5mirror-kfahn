// Pi Day Leibniz Series
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/140-leibniz-formula-pi
// https://editor.p5js.org/codingtrain/sketches/8nvCqk0-W
// https://youtu.be/uH4trBNn540

let pi = 4;
let iterations = 0;
let history = [];
let div;
let piText;
let minY = 2;
let maxY = 4;

function setup() {
  createCanvas(800, 450);
  div = createDiv('').style('font-size', '64pt');
}

function preload() {
  ft = loadFont('Cubano.ttf');
}

function mousePressed() {
  save('leibniz.jpg');
}

function draw() {
  background('#70327E');
  let den = iterations * 2 + 3;
  if (iterations % 2 == 0) {
    pi -= (4 / den);
  } else {
    pi += (4 / den);
  }
  history.push(pi);
  
  push()
  stroke(255);
  let piY = map(PI, minY, maxY, height*0.75, 0);
  line(0, piY, width, piY);
  pop();
  
  noFill();
  beginShape();
  stroke('#F89E4F');
  strokeWeight(3);
  // let spacing = width / history.length;
  let spacing = width / history.length;
   for (let i = 0; i < history.length; i++) {
    let x = i * spacing;
    let y = map(history[i], minY, maxY, height* 0.75, 0);
    vertex(x, y);
  }
  endShape();
  
  if (iterations === 20) {
    piText = pi;
  }
  fill('#F89E4F');
  textSize(70);
  text(piText, 70, 375)
  //div.html(pi);
  iterations++;
}
// function hist() {
//   let den = iterations * 2 + 3;
//   if (iterations % 2 == 0) {
//     pi -= (4 / den);
//   } else {
//     pi += (4 / den);
//   }
//   history.push(pi);
// }