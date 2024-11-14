// Code base from Daniel Shiffman
// https://thecodingtrain.com/challenges/182-apollonian-gasket

// Other variations here https://github.com/kfahn22/Apollonian-Gasket

// n is the number of circles in the chain
// you can change to get different looks
let n = 8;
let chains = [];
let gaskets = [];

function setup() {
  createCanvas(600, 600);
 
 gaskets.push(new Gasket(width / 2, height / 2, height / 2, 3));
 
  let circleArray = gaskets[0].allCircles;
  // If you choose a different value for perc, only a portion of the gaskets will be filled
  let perc = 1.0; 
  let len = circleArray.length;
  for (let i = 1; i < len*perc; i++) {
    // choose a random gasket to replace
    let index = int(random(1, circleArray.length));
    let c = circleArray[index];

    // Replace a gasket with a chain
    chains.push(new SteinerChain(c.radius, c.center.a, c.center.b, n));
    // Find original gasket and delete because we don't want both
   circleArray.splice(index, 1);
  }

  for (let n = 0; n < 1; n++) {
    for (let i = gaskets.length - 1; i >= 0; i--) {
      let nextG = gaskets[i].recurse();
      if (nextG) gaskets.push(...nextG);
    }
  }
  for (let i = 0; i < chains.length; i++) {
    let newArray = chains[i].allCircles;
    for (let j = 0; j < newArray.length; j++) {
      let c = newArray[j];
      // the amount of color variation will change if you choose a different threshold
      if (c.radius > 10) {
        chains.push(new SteinerChain(c.radius, c.center.a, c.center.b, n));
      }
    }
  }
}

function draw() {
  background("#F89E4F")

  // Since we have replaced all but the first gasket with a chain this will only draw the first one
  for (let gasket of gaskets) {
    gasket.show();
  }
  for (let chain of chains) {
    // Not sure why, but get more color variation with push and pop
    push();
    chain.show();
    pop();
  }
  noLoop();
}

function mousePressed() {
  save("mix.jpg");
}
