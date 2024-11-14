// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/074-clock.html

function setup() {
  createCanvas(800, 450);
  angleMode(DEGREES);
}

function draw() {
  background(45,197,244);
  translate(400, 225);
  scale(1.2);
  rotate(-90);

  let hr = hour();
  let mn = minute();
  let sc = second();

  noStroke();
  fill(0);
  circle(0, 0, 300);
  
  
  strokeWeight(8);
  stroke(236,1,90);
  
  strokeWeight(10);
  noFill();
  let secondAngle = map(sc, 0, 60, 0, 360);
  arc(0, 0, 300, 300, 0, secondAngle);

  stroke(102,211,52);
  let minuteAngle = map(mn, 0, 60, 0, 360);
  arc(0, 0, 280, 280, 0, minuteAngle);

  stroke(146,83,161);
  let hourAngle = map(hr % 12, 0, 12, 0, 360);
  arc(0, 0, 260, 260, 0, hourAngle);

  push();
  rotate(secondAngle);
  stroke(236,1,90);
  line(0, 0, 100, 0);
  pop();

  push();
  rotate(minuteAngle);
  stroke(102,211,52);
  line(0, 0, 75, 0);
  pop();

  push();
  rotate(hourAngle);
  stroke(146,83,161);
  line(0, 0, 50, 0);
  pop();

  stroke(112,50,126);
  point(0, 0);
  
  
  
  //  fill(255);
  //  noStroke();
  //  text(hr + ':' + mn + ':' + sc, 10, 200);


}