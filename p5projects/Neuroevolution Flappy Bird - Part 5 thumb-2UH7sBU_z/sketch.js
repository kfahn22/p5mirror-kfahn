// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Neuro-Evolution Flappy Bird

// Part 1: https://youtu.be/c6y21FkaUqw
// Part 2: https://youtu.be/tRA6tqgJBc
// Part 3: https://youtu.be/3lvj9jvERvs
// Part 4: https://youtu.be/HrvNpbnjEG8
// Part 5: https://youtu.be/U9wiMM3BqLU

let pipes = [];
let slider;
let trains = [];
let bird;
let counter = 0;
let img, unicorn;
let brainJSON;

function preload() {
  brainJSON = loadJSON("best_bird.json");
  //bimg = loadImage('background.jpg');
  bimg = loadImage('Background_SkySun.jpg');
  uimg = loadImage('unicorn.png');
  timg = loadImage('train.png');
  pimg = loadImage('purplep.png');
  //pimg = loadImage('pipe_marshmallow_fix.png');
  //brainJSON = loadJSON("bad_bird.json");
}


function setup() {
  createCanvas(800, 450);
  
  slider = createSlider(1, 10, 1);
  let birdBrain = NeuralNetwork.deserialize(brainJSON);
  for (let i = 0; i < 4; i++) {
  trains.push(new Bird(birdBrain));
  }
  bird = new Bird(birdBrain);
}

function draw() {
  background(bimg);
  for (let n = 0; n < slider.value(); n++) {
    if (counter % 50 == 0) {
      pipes.push(new Pipe());
    }
    counter++;

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();

      if (pipes[i].hits(bird)) {
        console.log("collision");
      }
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    if (bird.offScreen()) {
      console.log("bottom");
    }

    for (let i=0; i< trains.length; i++) {
      trains[i].think(pipes);
      trains[i].update();
      trains[i].show();
    }
//     bird.think(pipes);
//     bird.update();



//     // All the drawing stuff
//     //background(255,0,0);
    

//     bird.show();

    for (let pipe of pipes) {
      pipe.show();
    }
  }
}

// function keyPressed() {
//   if (key == ' ') {
//     bird.up();
//     //console.log("SPACE");
//   }
// }