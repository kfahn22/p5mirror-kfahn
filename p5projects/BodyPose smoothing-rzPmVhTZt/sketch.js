//https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/src/movenet#create-a-detector
// https://docs.ml5js.org/#/reference/bodypose

let video;
let bodPose;
let poses;


let offsetX = 0;
let offsetY = 0;

function preload() {
  bodyPose = ml5.bodyPose({ flipped: true });
}

function gotPoses(results) {
  poses = results;
}

function setup() {
  createCanvas(1000, 1000, WEBGL);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  bodyPose.detectStart(video, gotPoses);
}

function draw() {
  translate(-width / 2, -height / 2);
  background(0);
 

  if (faces.length > 0) {
    let face = faces[0];
    let box = face.box;
    
    let centerX = width/2;
    let centerY = height/2;
    
    let rawOffsetX = centerX - box.xMin - box.width / 2;
    let rawOffsetY = centerY - box.yMin - box.height / 2;
    
    offsetX = lerp(offsetX, rawOffsetX, 0.05);
    offsetY = lerp(offsetY, rawOffsetY, 0.05);
   
    
    translate(offsetX, offsetY);
    image(video, 0, 0) 
  }
}