let sentence = "HELLOWORLD";
let sentenceArray = [];
let r = 100;
let theta = 0;

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER);
  textSize(18);
  fill(255);

  sentenceArray = sentence.split(""); // splits a string into an array of chars

  print(sentenceArray);
}


function draw() {
  background(185, 20, 222);
  translate(width / 2, height / 2);
  let x = r * cos(theta);
  let y = r * sin(theta);
  
  for (let i = 0; i < sentenceArray.length; i++) {
    rotate(QUARTER_PI / 1.25);
    text(sentenceArray[i], x, y);
  }
}