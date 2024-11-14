// This sketch provides an interface for the Animal Pose Control Net Gradio Space on Hugging Face @ https://huggingface.co/spaces/kfahn/Animal_Pose_Control_Net
// Animal Pose Control Net model can be found ADD LINK
// More info can be found @ https://github.com/fi4cr/animalpose
// The Animal Pose Control Net model was developed as part of the Hugging Face Jax-Diffusers Sprint

let diameter = 10;
let saveButton;
let joints = [];
let draggedJoint = null;

function preload() {
  img = loadImage("keypoints.jpg");
}

function setup() {
  createCanvas(256, 256);
  saveButton = createButton("SAVE IMAGE");
  saveButton.position(275, 140)
  saveButton.mousePressed(saveImage);
  saveButton.style('background-color', 'blue');
  saveButton.style('color', 'white');
  let h3 = createElement('h3', 'Use the mouse to move the joints.  When you are happy with the image, press SAVE IMAGE to download the image.');
h3.style('color', '#ffffff');
h3.position(10, 270);
  joints = createJoints();
}

function draw() {
  background(0);
  //background(img);

  // add connections
  strokeWeight(3);
  stroke(198, 153, 49);
  line(joints[0].x, joints[0].y, joints[1].x, joints[1].y);
  stroke(4, 253, 245);
  line(joints[0].x, joints[0].y, joints[12].x, joints[12].y);
  stroke(1, 96, 254);
  line(joints[1].x, joints[1].y, joints[2].x, joints[2].y);
  stroke(6, 252, 179);
  line(joints[0].x, joints[0].y, joints[6].x, joints[6].y);
  stroke(124, 126, 107);
  line(joints[0].x, joints[0].y, joints[9].x, joints[9].y);
  stroke(253,59,45);
  line(joints[2].x, joints[2].y, joints[3].x, joints[3].y);
  stroke(3, 219, 254);
  line(joints[2].x, joints[2].y, joints[4].x, joints[4].y);
   stroke(118,107,102);
  line(joints[1].x, joints[1].y, joints[4].x, joints[4].y);
  stroke(254,138,0);
  line(joints[4].x, joints[4].y, joints[5].x, joints[5].y);
  stroke(106, 0, 247);
  line(joints[6].x, joints[6].y, joints[7].x, joints[7].y);
  stroke(201, 253, 8);
  line(joints[7].x, joints[7].y, joints[8].x, joints[8].y);
  stroke(102,254,5);
  line(joints[9].x, joints[9].y, joints[10].x, joints[10].y);
  stroke(158,128,58);
  line(joints[10].x, joints[10].y, joints[11].x, joints[11].y);
  stroke(151,128,130);
  line(joints[12].x, joints[12].y, joints[13].x, joints[13].y);
  stroke(127, 123, 232);
  line(joints[13].x, joints[13].y, joints[14].x, joints[14].y);
  stroke(25, 17, 180);
  line(joints[14].x, joints[14].y, joints[15].x, joints[15].y);
  stroke(29, 65, 252);
  line(joints[15].x, joints[15].y, joints[16].x, joints[16].y);
  stroke(190,7,250);
  line(joints[13].x, joints[13].y, joints[17].x, joints[17].y);
  stroke(11,252,39);
  line(joints[17].x, joints[17].y, joints[18].x, joints[18].y);
   stroke(254,210,1);
  line(joints[18].x, joints[18].y, joints[19].x, joints[19].y);

  // draw the joints
  colorJoints();
  // for (let i = 0; i < joints.length; i++) {
  //   let j = joints[i];
  //   strokeWeight(2);
  //   stroke(0);
  //   fill(255);
  //   ellipse(j.x, j.y, diameter, diameter);
  // }
  console.log(mouseX, mouseY);
}

function mousePressed() {
  // check if the mouse is over a joint
  for (let i = 0; i < joints.length; i++) {
    let j = joints[i];
    if (dist(j.x, j.y, mouseX, mouseY) < diameter / 2) {
      draggedJoint = j; // set the draggedJoint variable to the joint being dragged
      break;
    }
  }
}

function mouseDragged() {
  if (draggedJoint) {
    draggedJoint.x = mouseX;
    draggedJoint.y = mouseY;
  }
}

function mouseReleased() {
  draggedJoint = null; // reset the draggedJoint variable
}

function saveImage() {
  saveCanvas('myCanvas', 'jpg');
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveImage();
  }
}

function createJoints() {
  let points = [];
  points.push(createVector(56, 106)); // 0 front
  points.push(createVector(50, 59)); // 1
  points.push(createVector(39, 42));
  points.push(createVector(32, 30));
  points.push(createVector(58, 43));
  points.push(createVector(65, 30));
  points.push(createVector(63, 141));
  points.push(createVector(59, 187)); //7
  points.push(createVector(64, 220));
  points.push(createVector(74, 148)); // 9
  points.push(createVector(69, 194));
  points.push(createVector(74, 227)); // 11
  points.push(createVector(70, 72)); //neck
  points.push(createVector(214, 78)); //  13 back
  points.push(createVector(192, 141)); // 
  points.push(createVector(196, 189));
  points.push(createVector(197, 222));
  points.push(createVector(204, 135));
  points.push(createVector(209, 182));
  points.push(createVector(208, 215));
  return points;
}

saveTile = () => {
  storeItem("img", elt.toDataURL());
};

function colorJoints() {
    noStroke();
    j0 = joints[0]
    fill(5,236,251);
    ellipse(j0.x, j0.y, diameter, diameter);
    fill(5,0,253)
    j1 = joints[1]
    ellipse(j1.x, j1.y, diameter, diameter);
    fill(251,164,4)
    j2 = joints[2]
    ellipse(j2.x, j2.y, diameter, diameter);
    fill(2,196,247)
    j3 = joints[3]
    ellipse(j3.x, j3.y, diameter, diameter);
    fill(243,213,1)
    j4 = joints[4]
    ellipse(j4.x, j4.y, diameter, diameter);
    fill(255,110,0)
    j5 = joints[5]
    ellipse(j5.x, j5.y, diameter, diameter);
    fill(10,253,136)
    j6 = joints[6]
    ellipse(j6.x, j6.y, diameter, diameter);
    fill(60,253,2)
    j7 = joints[7]
    ellipse(j7.x, j7.y, diameter, diameter);
    fill(249,253,7)
    j8 = joints[8]
    ellipse(j8.x, j8.y, diameter, diameter);
    fill(255, 0, 171)
    j9 = joints[9]
    ellipse(j9.x, j9.y, diameter, diameter);
    fill(161,0,251)
    j10 = joints[10]
    ellipse(j10.x, j10.y, diameter, diameter);
    fill(1,44,249)
    j11 = joints[11]
    ellipse(j11.x, j11.y, diameter, diameter);
    fill(57, 255, 0)
    j12 = joints[12]
    fill(244,7,75)
    ellipse(j12.x, j12.y, diameter, diameter);
    fill(13,251,234)
    j13 = joints[13]
    ellipse(j13.x, j13.y, diameter, diameter);
    fill(240,4,253)
    j14 = joints[14]
    ellipse(j14.x, j14.y, diameter, diameter);
    fill(51,0,255)
    j15 = joints[15]
    ellipse(j15.x, j15.y, diameter, diameter);
    fill(0, 133, 255)
    j16 = joints[16]
    ellipse(j16.x, j16.y, diameter, diameter);
  fill(151, 255, 0)
    j17 = joints[17]
    ellipse(j17.x, j17.y, diameter, diameter);
    fill(166,245,16)
    j18 = joints[18]
    ellipse(j18.x, j18.y, diameter, diameter);
   fill(255,166,1)
    j19 = joints[19]
    ellipse(j19.x, j19.y, diameter, diameter);
}
