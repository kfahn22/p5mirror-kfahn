// This sketch renders recursive annual chains
// I am using the p5.patgrad library
// https://github.com/antiboredom/p5.patgrad

// You can modify the number of circles in the chain


let n = 9;
let allCircles = [];
let queue = [];
let gradient;

function setup() {
  createCanvas(400, 400);
  gradient = createRadialGradient(0, 100);
  let c = new Chain(height / 2, width / 2, height / 2, n);
  let circleArray = c.allCircles;
  for (let i = 0; i < circleArray.length; i++) {
    allCircles.push(circleArray[i]);
  }

  for (let i = allCircles.length - 1; i >= 1; i--) {
    let c = new Chain(allCircles[i].r, allCircles[i].x, allCircles[i].y, n);
    addChains(c);
  }
}

function draw() {
  //background(97, 48, 75);
  background(247, 153, 110);
  for (let c of allCircles) {
    c.show();
  }
  noLoop();
}

function mousePressed() {
  save("chains.jpg");
}

function addChains(c) {
  let newCircles = c.queue;
  for (cir of newCircles) {
    if (cir.r > 2) {
      allCircles.push(cir);
      c = new Chain(cir.r, cir.x, cir.y, n);
      addChains(c);
    }
  }
}
