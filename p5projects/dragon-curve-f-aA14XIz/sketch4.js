// https://github.com/johnnyawesome/DragonCurve/blob/master/DragonCurve/DragonCurve/sketch.js

let dragonCurve = ["R"];
let segmentLength = 200;

function setup() {
  createCanvas(650, 650, P2D);
  background(0);
  stroke(0, 255, 0);
  strokeWeight(1);
  angleMode(DEGREES);
}

let createCurve = setInterval(() => {
  console.log(segmentLength);

  if (segmentLength > 1) {
    background(0);
    drawDragonCurve(segmentLength);
    calculateDragonCurve();
  }
  else {
    segmentLength = 200;
    dragonCurve = ["R"];
  }
}, 1000);

function calculateDragonCurve() {

  //Create a temporary curve containing the original curve
  let dragonCurveTemp = dragonCurve.slice(0);

  //Push "R" at the end of the original curve
  dragonCurve.push("R");

  //Add an "L" in the middle of the temporary curve
  dragonCurveTemp[((dragonCurveTemp.length - 1) / 2)] = "L";

  //Add the temporary curve at the end of the original curve
  dragonCurve = dragonCurve.concat(dragonCurveTemp);
}

function drawDragonCurve(length) {

  //Center 0,0
  translate(width / 2, height / 2);

  if (length > 1) {

    push();
    rotate(-90);
    //First line is constant
    line(0, 0, length, 0);
    translate(length, 0);

    //Draws the actual curve
    for (let i = 0; i < dragonCurve.length; i++) {
      const element = dragonCurve[i];

      //-90 = turn left, 90 = turn right
      if (element === "R") {
        rotate(90);
        line(0, 0, length, 0);
        translate(length, 0);
      }
      else if (element === "L") {
        rotate(-90);
        line(0, 0, length, 0);
        translate(length, 0);
      }
    }
    pop();

    //Shorten segments for next iteration
    segmentLength *= 0.7055;
  }
}

function draw() {
}