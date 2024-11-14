let segments = [];
let endSegment;
let length = 100; // Length of each segment
let iterations = 2; // Number of iterations to generate the curve

function setup() {
  createCanvas(800, 800);
  background(255);
  stroke(0);
  //translate(width / 2, height / 2);

  let b = createVector(0, 0);
  // let startA = createVector(0, 0);
  let a = createVector(0, length);
  endSegment = new Segment(a, b, b);
  endSegment.completed = true;
  segments.push(endSegment);

  for (let i = 0; i < iterations; i++) {
    // generateDragonCurve();
    nextGeneration();
  }

  for (let s of segments) {
    if (!s.completed) {
      s.update();
    }
    s.show();
  }
}

let firstTime = true;

function nextGeneration() {
  let newSegments = [];
  for (let s of segments) {
    let newS = s.duplicate(endSegment.a);
    if (firstTime) {
      newS.origin = endSegment.b.copy();
      firstTime = false;
    }

    newSegments.push(newS);
  }
  endSegment = newSegments[0];
  segments = segments.concat(newSegments);
}

// function generateDragonCurve() {
//   let nextSegments = [];
//   for (let i = 0; i < segments.length; i++) {
//     let currentSegment = segments[i];
//     let origin = currentSegment.b;
//     currentSegment.update();
//     nextSegments.push(currentSegment);

//     if (i % 2 === 0) {
//       let newSegment = currentSegment.duplicate(origin);
//       newSegment.update();
//       nextSegments.push(newSegment);
//     }
//   }
//   segments = nextSegments;
// }

function draw() {
  // No continuous drawing required
  background(255);
  translate(width / 2, height / 2);
  //   let newZoom = lerp(zoom, targetZoom, amt);
  //   scale(newZoom);

  //   amt += 0.01;
  for (let s of segments) {
    if (!s.completed) {
      s.update();
    }
    s.show();
  }

  // if (amt >= 1) {
  //   for (let s of segments) {
  //     s.completed = true;
  //   }
  //   nextGeneration();
  //   amt = 0;
  //   zoom = newZoom;
  //   targetZoom = zoom / sqrt(2);
  // }
  noLoop();
}
