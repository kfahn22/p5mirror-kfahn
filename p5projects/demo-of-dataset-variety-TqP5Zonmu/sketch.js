// This sketch was created for the Hugging Face Computer Vision course to illustrate overfitting.

// It has functions to illustrate how a dataset might suffer from poor variety.

// This sketch can also generate a gif of 1000 frames which can be used to create a dataset of random circles and squares
// FLASHING WARNING if you use it to generate the images.


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
  // for overfit functions
  createCanvas(1000, 500);

  // Uncomment to generate gif
  //createCanvas(512, 512);
}

function draw() {
  background(random(255), random(255), random(255));
  //overfitLocation();
  //overfitColor();
  //overfitSize();
  //overfitBackground();
  goodVariety();
  noLoop();
  
  //.noLoop() needs to be commented out to generate GIf
  // generateTile();
}

function mousePressed() {
  save("overfit.jpg");
}

function generateTile() {
  noStroke();
  // Generate a random circle or square
  let r = random(1);
  let x = random(-125, 125);
  let y = random(-125, 125);
  // generate random circles
  fill(random(255), random(255), random(255), random(255));
  circle(width / 2 + x, height / 2 + y, random(216));

  // geneate random squares
  // fill(random(255), random(255), random(255), random(255));
  // square(width/2+x, height/2+y, random(216));
}

// overly consistent color
function overfitColor() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      fill(255);
      stroke(0);
      strokeWeight(2);
      square(i * w, j * w, w);
      push();
      rectMode(CENTER);
      noStroke();
      fill(255, 0, 0);
      square(i * w + w / 2 + random(-25, 25), j * w + w / 2 + random(-25, 25), w * 0.3 + random(10));
      pop();
    }
  }
  for (let i = 5; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
      fill(255);
      stroke(0);
      square(i * w, j * w, w);
      push();
      let x = random(-12, 12);
      noStroke();
      fill(0, 0, 255);
      circle(i * w + w / 2 + random(-25, 25), j * w + w / 2 + random(-25, 25), w * 0.45 + random(8));
      pop();
    }
  }
}

// overly consistent size
function overfitSize() {
  let x = random(-11, 11);
  let y = random(-11, 11);
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      fill(255);
      stroke(0);
      strokeWeight(2);
      square(i * w, j * w, w);
      noStroke();
      push()
      rectMode(CENTER);
      fill(random(255), random(255), random(255));
      square(i * w + w / 2 + random(-25, 25), j * w + w / 2 + random(-25, 25), w * 0.3);
      pop()
    }
  }
  for (let i = 5; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
      fill(255);
      stroke(0);
      square(i * w, j * w, w);
      push();
      noStroke();
      fill(random(255), random(255), random(255));
      circle(i * w + w / 2 + random(-25, 25), j * w + w / 2 + random(-25, 25), w * 0.5);
      pop();
    }
  }
}

// overly consistent background
function overfitBackground() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      fill(255);
      stroke(0);
      strokeWeight(2);
      square(i * w, j * w, w);
      
      push();
      noStroke();
      fill(random(255), random(255), random(255));
      rectMode(CENTER);
      square(i * w + w / 2 + random(-25, 25), j * w + w / 2 + random(-25, 25), w * 0.3 + random(10));
      pop();
    }
  }
  for (let i = 5; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
      fill(59);
      stroke(0);
      square(i * w, j * w, w);
      push();
      noStroke();
      fill(random(255), random(255), random(255));
      circle(i * w + w / 2 + random(-25, 25), j * w + w / 2 + random(-25, 25), w * 0.4 + random(10));
      pop();
    }
  }
}


// overly consistent location
function overfitLocation() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      fill(255);
      stroke(0);
      strokeWeight(2);
      square(i * w, j * w, w);
      push();
      noStroke();
      let x = random(-11, 11);
      fill(random(255), random(255), random(255));
      square(i * w , j * w, w * 0.3 + random(30));
      pop();
    }
  }
  for (let i = 5; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
      fill(255);
      stroke(0);
      square(i * w, j * w, w);
      push();
      let x = random(-12, 12);
      noStroke();
      fill(random(255), random(255), random(255));
      circle(i * w + w * 0.7, j * w + w * 0.7, w * 0.4 + random(20));
      pop();
    }
  }
}

// good variety of color, background, size, location
function goodVariety() {
  let x = random(-25, 25);
  let y = random(-25, 25);
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      fill(random(255), random(255), random(255));
      stroke(0);
      strokeWeight(2);
      square(i * w, j * w, w);
      push();
      rectMode(CENTER);
      noStroke();
      let x = random(-11, 11);
      fill(random(255), random(255), random(255));
      square(i * w + w / 2 + random(-25, 25), j * w + w / 2 + random(-25, 25), w * 0.3 + x);
      pop();
    }
  }
  for (let i = 5; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
      fill(random(255), random(255), random(255));
      stroke(0);
      square(i * w, j * w, w);
      push();
      let x = random(-15, 15);
      noStroke();
      fill(random(255), random(255), random(255));
      circle(i * w + w / 2 + random(-25, 25), j * w + w / 2 + random(-25, 25), w * 0.4 + x);
      pop();
    }
  }
}