let sw = 11.2;
let x = sw / 4;
let y = sw / 4;
let v;

let paths = [];
let slider;

const colors = {
  purple: "#70327E",
  sky: "#30C5F3",
  pink: "#EF63A4",
  orange: "#F89E4F",
};

// The Coding Train / Daniel Shiffman
// Livestream https://www.youtube.com/watch?v=d6RXcetnl20
// Repo https://github.com/CodingTrain/Coding-Train-Logo

function setup() {
  createCanvas(100, 200);
  //angleMode(DEGREES)
  strokeWeight(2.9166);
  strokeCap(ROUND);
  strokeJoin(ROUND);
}

function draw() {
  background(255);
  
  //rotateY(180);
  scale(1);
  
//   stroke('#70327E');
//   line(25.631, 44.613, 25.631, 34.251);
//   line(25.631, 34.251, 22.581, 34.251);
//   line(22.581, 34.251, 22.581, 27.926);
//   line(22.581, 27.926, 49.61, 27.926);
//   line(49.61, 27.926, 49.61, 39.409);

//   stroke('#30C5F3');
//   line(57.015, 39.409, 55.198, 27.926);
//   line(55.198, 27.926, 68.114, 27.926);
//   line(68.114, 27.926, 66.298, 39.409);

//   stroke('#EF63A4');
//   line(78.126, 66.499, 72.372, 59.146);
//   line(72.372, 59.146, 76.229, 48.65);
//   line(76.229, 48.65, 72.282, 39.409);

//   noFill();
//   stroke('#70327E');
//   circle(35.104, 58.745, 13.23 * 2);

//   stroke('#30C5F3');
//   strokeWeight(2.7978);
//   circle(55.298, 67.558, 4.516 * 2);

//   strokeWeight(2.7735);
//   circle(68.054, 67.597, 4.477 * 2);

//   stroke('#F89E4F');
//   strokeWeight(2.9166);
//   line(66.68, 44.613, 66.68, 53.135);
//   line(61.656, 44.613, 61.656, 53.135);
//   line(56.632, 44.613, 56.632, 53.135);

//   line(68.005, 59.075, 55.308, 59.075);
  
  push();
    
    // Scale -1, 1 means reverse the x axis, keep y the same.
    scale(-1, 1);
    
    // Because the x-axis is reversed, we need to draw at different x position.
    //image(img, -width, 0);
    logo();
    pop();
 
}

function mousePressed() {
  saveCanvas("logo.jpg");
}

function logo() {
  stroke('#70327E');
  line(25.631, 44.613, 25.631, 34.251);
  line(25.631, 34.251, 22.581, 34.251);
  line(22.581, 34.251, 22.581, 27.926);
  line(22.581, 27.926, 49.61, 27.926);
  line(49.61, 27.926, 49.61, 39.409);

  stroke('#30C5F3');
  line(57.015, 39.409, 55.198, 27.926);
  line(55.198, 27.926, 68.114, 27.926);
  line(68.114, 27.926, 66.298, 39.409);

  stroke('#EF63A4');
  line(78.126, 66.499, 72.372, 59.146);
  line(72.372, 59.146, 76.229, 48.65);
  line(76.229, 48.65, 72.282, 39.409);

  noFill();
  stroke('#70327E');
  circle(35.104, 58.745, 13.23 * 2);

  stroke('#30C5F3');
  strokeWeight(2.7978);
  circle(55.298, 67.558, 4.516 * 2);

  strokeWeight(2.7735);
  circle(68.054, 67.597, 4.477 * 2);

  stroke('#F89E4F');
  strokeWeight(2.9166);
  line(66.68, 44.613, 66.68, 53.135);
  line(61.656, 44.613, 61.656, 53.135);
  line(56.632, 44.613, 56.632, 53.135);

  line(68.005, 59.075, 55.308, 59.075);
}

function mousePressed() {
  save("logo.jpg");
}