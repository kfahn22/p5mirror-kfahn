// Shape Classifier (Mouse)
// Coding Challenge
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/158-shape-classifier.html
// https://youtu.be/3MqJzMvHE3E

// Mouse: https://editor.p5js.org/codingtrain/sketches/JgLVfCS4E
// Webcam: https://editor.p5js.org/codingtrain/sketches/2hZGBkqqq

let shapeClassifier;
let canvas;
let resultsDiv;
let inputImage;
let clearButton;

function setup() {
  canvas = createCanvas(800, 450);
  
  
  let options = {
    task: 'imageClassification',
  };
  shapeClassifier = ml5.neuralNetwork(options);
  const modelDetails = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin',
  };
  shapeClassifier.load(modelDetails, modelLoaded);

  
  background(248,158,79);
  pixelDensity(1);
  fill(255);
  // rect(width/4, height/2, 150, 200);
  // rect(width/2, height/2, 150, 200);
  // rect(width*0.75, height/2, 150, 200);
  clearButton = createButton('clear');
  // clearButton.mousePressed(function() {
  //   background(255);
  // });
  resultsDiv = createDiv('loading model');
  inputImage1 = createGraphics(64, 64);
  inputImage2 = createGraphics(64, 64);
  inputImage3 = createGraphics(64, 64);
}

function modelLoaded() {
  console.log('model ready!');
  classifyImage();
}

function classifyImage() {
  inputImage.copy(canvas, 0, 0, 400, 400, 0, 0, 64, 64);
  //image(inputImage, 0, 0);
  shapeClassifier.classify(
    {
      image: inputImage,
    },
    gotResults
  );
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
    return;
  }
  let label = results[0].label;
  let confidence = nf(100 * results[0].confidence, 2,1);
  resultsDiv.html(`${label} ${confidence}%`);
  classifyImage();
}

function draw() {
 
  if (mouseIsPressed) {
    strokeWeight(8);
    stroke(252,238,33)
    line(mouseX, mouseY, pmouseX, pmouseY);
  }

  stroke(0);
  strokeWeight(8);
  stroke(146,83,161);
  rectMode(CENTER);
 
}

// function keyPressed() {

//   if (key == 't') {
//     push();
//     translate(width/4, height/2);
//     strokeWeight(8);
//     stroke(252,238,33)
//     line(mouseX, mouseY, pmouseX, pmouseY);
//     pop();
//   } else if (key == 'c') {
//     push();
//     translate(width/2, height/2);
//     strokeWeight(8);
//     stroke(236,1,90)
//     line(mouseX, mouseY, pmouseX, pmouseY);
//     pop();
//   } else if (key == 's') {
//     push();
//     translate(width*0.75, height/2);
//     strokeWeight(8);
//     stroke(45,197,244)
//     line(mouseX, mouseY, pmouseX, pmouseY);
//     pop();
//   }
// }

