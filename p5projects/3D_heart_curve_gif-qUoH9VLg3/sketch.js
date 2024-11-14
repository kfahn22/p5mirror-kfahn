// Starter code by Daniel Shiffman
// https://editor.p5js.org/codingtrain/sketches/egvieHyt0
// https://thecodingtrain.com/challenges/134-heart-curve
// https://youtu.be/oUBAi9xQ2X4

// https://editor.p5js.org/kfahn/sketches/qUoH9VLg3

let hearts = [];
let a = 0;
let r;
const e = 2.71828;
let angle = 0;
let frames = 120;

function keyPressed() {
  if (key == "s") {
    const options = {
      units: "frames",
      delay: 0
    }
    saveGif("GIF/3dheart.gif", frames, options);
  }
}

function setup() {
  createCanvas(300, 300, WEBGL);
  angleMode(DEGREES);
  for (let z = -20; z < -0.25; z += 0.25) {
    hearts.push(new Heart(0, 0, z));
  }
  for (let z = 0.25; z < 20; z += 0.25) {
    hearts.push(new Heart(0, 0, z));
  }
}


function draw() {
  background('#330033');
  noStroke();
  rotateY(angle);
  angle += 360 / frames;
  let num = hearts.length;
  for (let k = 0; k < num / 2; k++) {
    r = map(k, 0, num / 2, 0, 6);
    hearts[k].ctHeart(r);
    hearts[k].show(k, num);

  }
  for (let k = num / 2; k < num; k++) {
    r = map(k, num / 2, hearts.length, 6, 0);
    hearts[k].ctHeart(r);
    hearts[k].show(k, num);
  }

}

function mousePressed() {
  save('heart.jpg');
 }