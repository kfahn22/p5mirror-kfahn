//https://emojipedia.org/

let emoji = '🎵';
let emoji1 = '🎶';

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255,0,0);
  textSize(45);
  textAlign(CENTER, CENTER);
  translate(width/2, height*4/9);
  fill(0);
  text('Generative Music', 0, 0);
  text(emoji, -100, 120);
  text(emoji1, 90, 100);
  text(emoji, -140, 100);
  text(emoji1, -100, -100);
  text(emoji1, 150, 120);
  text(emoji, 100, -120);
}
function mousePressed() {
  save('genuary10.jpg');
}