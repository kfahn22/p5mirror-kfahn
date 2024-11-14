// The Coding Train / Daniel Shiffman
// Livestream https://www.youtube.com/watch?v=d6RXcetnl20
// Repo https://github.com/CodingTrain/Coding-Train-Logo

let sw = 11.6;
// let x = 0;
// let y = 0;
let x = sw / 2;
let y = sw / 2;
let v;

function setup() {
  createCanvas(400, 400);
  //createCanvas(100+sw, 400+sw);
  //createCanvas(100, 200);
  angleMode(DEGREES)
  strokeCap(ROUND);
  strokeJoin(ROUND);
}

function draw() {
  background(255);
  strokeWeight(sw);
  // for 400, 400
  //translate(90-sw,112-sw);
  // top fowards
  //translate(sw, sw);
  //scale(0.4, 0.4);
  
  // top backwards
  //translate(width - sw, sw);
  //scale(-0.4, 0.4);
  
  // bottom forward
  //translate(sw, 0);
  
  // bottom backwards
  // dim of logo [235, 185]
  translate(width , height - 185/2 - 2* sw);
  scale(-0.5, 0.5);
  
  logo(x,y);
}

function mousePressed() {
  saveCanvas("bb.jpg");
}

function logo(x, y) {
  // back
  stroke('#70327E');
  line(x+13, y+66, x+13, y+25);
  line(x+13, y+25, x, 25);
  line(x, 25, x, y);
  line(x, y, x+108, y);
  line(x+108, y, x+108, y+46);

  // chimney
  stroke('#30C5F3');
  line(x+139, y+46, x+131, y);
  line(x+131, y, x+182, y);
  line(x+182, y, x+175, y+46);

  //front
  stroke('#EF63A4');
  line(x+223, y+154, x+199, y+125);
  line(x+199, y+125, x+215, y+83);
  line(x+215, y+83, x+199, y+46);

  // back wheel
  noFill();
  stroke('#70327E');
  //circle(x+50, y+123, 53);
  circle(x+54, y+123, 105);

  //frontwheel1
  stroke('#30C5F3');
  strokeWeight(11.2);
  circle(x+131, y+158, 36);

  //frontwheel1
  strokeWeight(11.2);
  circle(x+182, y+158, 36);

  // lines
  stroke('#F89E4F');
  
  line(x+177, y+66, x+177, y+101);
  line(x+157, y+66, x+157, y+101);
  line(x+137, y+66, x+137, y+101);
  line(x+182, y+124, x+131, y+124);
}