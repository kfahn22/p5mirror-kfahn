// This sketch was created for the Hugging Face Computer Vision course 

// This sketch can also generate a gif of 1000 frames which can be used to create a dataset of random circles and squares

// FLASHING WARNING!!

let w = 100;
let frames = 1000;

function keyPressed() {
  if (key == "s") {
    const options = {
      units: "frames",
      delay: 0,
    };
    saveGif("circles.gif", frames, options);
    //saveGif("squares.gif", frames, options);
  }
}

function setup() {
  createCanvas(512, 512);
}

function draw() {
  background(random(255), random(255), random(255));

  //randomCircles();
  randomSquares();
}

function randomCircles() {
  noStroke();
  fill(random(255), random(255), random(255), random(255));
  circle(
    width / 2 + random(-150, 150),
    height / 2 + random(-150, 150),
    random(216)
  );
}

function randomSquares() {
  noStroke();
  rectMode(CENTER);
  fill(random(255), random(255), random(255), random(255));
  square(
    width / 2 + random(-75, 75),
    height / 2 + random(-75, 75),
    random(216)
  );
}