// Body joint color map. #BGR
JOINT_CMAP = {
  0: [0, 0, 255],
  1: [255, 208, 0],
  2: [255, 161, 0],
  3: [255, 114, 0],
  4: [0, 189, 255],
  5: [0, 236, 255],
  6: [0, 255, 226],
  7: [255, 0, 76],
  8: [0, 255, 131],
  9: [255, 0, 171],
  10: [0, 255, 37],
  11: [244, 0, 253],
  12: [57, 255, 0],
  13: [151, 0, 255],
  14: [151, 255, 0],
  15: [57, 0, 255],
  16: [245, 255, 0],
  17: [0, 39, 255],
  18: [255, 169, 0],
  19: [0, 133, 255],
};

const limbSeq = {
  1: [0, 1],
  2: [0, 2],
  3: [0, 5],
  4: [1, 3],
  5: [2, 4],
  6: [1, 2],
  7: [5, 7],
  8: [5, 8],
  9: [5, 9],
  10: [6, 7],
  11: [6, 10],
  12: [6, 11],
  13: [9, 13],
  14: [13, 17],
  15: [8, 12],
  16: [12, 16],
  17: [11, 15],
  18: [15, 19],
  19: [10, 14],
  20: [14, 18],
};

// CONNECTION_CMAP = {
//  (0, 1): [127, 104, 127],
//  (0, 2): [0, 94, 255],
//  (0, 5): [255, 184, 0],
//  (1, 3): [255, 137, 0],
//  (2, 4): [255, 57, 38],
//  (1, 2): [0, 212, 255],
//  (5, 7): [0, 245, 240],
//  (5, 8): [0, 255, 178],
//  (5, 9): [127, 127, 104],
//  (6, 7): [150, 127, 126],
//  (6, 10): [197, 0, 254],
//  (6, 11): [122, 127, 221],
//  (9, 13): [104, 255, 0],
//  (13, 17): [156, 127, 56],
//  (8, 12): [104, 0, 255],
//  (12, 16): [198, 255, 0],
//  (11, 15): [28, 19, 255],
//  (15, 19): [28, 66, 255],
//  (10, 14): [28, 114, 255],
//  (14, 18): [250, 212, 0],
// }

// This sketch provides an interface for the Animal Pose Control Net Gradio Space on Hugging Face @ https://huggingface.co/spaces/kfahn/Animal_Pose_Control_Net
// Animal Pose Control Net model can be found ADD LINK
// More info can be found @ https://github.com/fi4cr/animalpose
// The Animal Pose Control Net model was developed as part of the Hugging Face Jax-Diffusers Sprint

let diameter = 15;
let saveButton;
let joints = [];
let draggedJoint = null;

function preload() {
  img = loadImage("keypoints.jpg");
}

function setup() {
  createCanvas(512, 512);
  saveButton = createButton("SAVE IMAGE");
  saveButton.position(10, 520);
  saveButton.mousePressed(saveImage);
  saveButton.style("background-color", "blue");
  saveButton.style("color", "white");
  joints = createJoints();
}

function draw() {
  background(29);
  // background(img);

  // add connections
  strokeWeight(3);
  stroke(127, 104, 127);
  line(joints[0].x, joints[0].y, joints[1].x, joints[1].y);
  stroke(0, 94, 255);
  line(joints[0].x, joints[0].y, joints[2].x, joints[2].y);
  stroke(255, 184, 0);
  line(joints[1].x, joints[1].y, joints[2].x, joints[2].y);
  stroke(255, 137, 0);
  line(joints[0].x, joints[0].y, joints[3].x, joints[3].y);
  stroke(255, 57, 38);
  line(joints[3].x, joints[3].y, joints[4].x, joints[4].y);
  stroke(255, 57, 38);
  line(joints[3].x, joints[3].y, joints[4].x, joints[4].y);
  stroke(0, 212, 255);
  line(joints[4].x, joints[4].y, joints[5].x, joints[5].y);
  stroke(0, 245, 240);
  line(joints[5].x, joints[5].y, joints[6].x, joints[6].y);
  stroke(100, 245, 240);
  line(joints[3].x, joints[3].y, joints[7].x, joints[7].y);
  stroke(200, 245, 240);
  line(joints[7].x, joints[7].y, joints[8].x, joints[8].y);
  stroke(0, 255, 178);
  line(joints[8].x, joints[8].y, joints[9].x, joints[9].y);
  stroke(127, 127, 104);
  line(joints[3].x, joints[3].y, joints[10].x, joints[10].y);
  stroke(150, 127, 126);
  line(joints[10].x, joints[10].y, joints[11].x, joints[11].y);
  stroke(122, 127, 221);
  line(joints[11].x, joints[11].y, joints[12].x, joints[12].y);
  stroke(104, 255, 0);
  line(joints[12].x, joints[12].y, joints[13].x, joints[13].y);
  stroke(198, 255, 0);
  line(joints[10].x, joints[10].y, joints[14].x, joints[14].y);
  stroke(198, 255, 100);
  line(joints[14].x, joints[14].y, joints[15].x, joints[15].y);
  stroke(198, 255, 200);
  line(joints[15].x, joints[15].y, joints[16].x, joints[16].y);

  // draw the joints
  colorJoints();
  // for (let i = 0; i < joints.length; i++) {
  //   let j = joints[i];
  //   strokeWeight(2);
  //   stroke(0);
  //   fill(255);
  //   ellipse(j.x, j.y, diameter, diameter);
  // }
  // console.log(mouseX, mouseY);
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
  saveCanvas("myCanvas", "jpg");
}

function keyPressed() {
  if (key === "s" || key === "S") {
    saveImage();
  }
}

function createJoints() {
  let points = [];
  points.push(createVector(97, 114)); // 0
  points.push(createVector(76, 84)); // 1
  points.push(createVector(116, 86));
  points.push(createVector(108, 220));
  points.push(createVector(127, 282));
  points.push(createVector(117, 373));
  points.push(createVector(125, 438));
  points.push(createVector(146, 299)); //7
  points.push(createVector(133, 392));
  points.push(createVector(147, 453)); // 9
  // points.push(createVector(136, 139));
  points.push(createVector(425, 158)); // 11
  points.push(createVector(382, 288));
  points.push(createVector(392, 384)); // 13
  points.push(createVector(392, 444)); // 14
  points.push(createVector(408, 271));
  points.push(createVector(416, 369));
  points.push(createVector(417, 428));
  return points;
}

saveTile = () => {
  storeItem("img", elt.toDataURL());
};

function colorJoints() {
    noStroke();
    j0 = joints[0]
    fill(0, 0, 255);
    ellipse(j0.x, j0.y, diameter, diameter);
    fill(255, 208, 0)
    j1 = joints[1]
    ellipse(j1.x, j1.y, diameter, diameter);
    fill(255, 161, 0)
    j2 = joints[2]
    ellipse(j2.x, j2.y, diameter, diameter);
    fill(255, 114, 0)
    j3 = joints[3]
    ellipse(j3.x, j3.y, diameter, diameter);
    fill(0, 189, 255)
    j4 = joints[4]
    ellipse(j4.x, j4.y, diameter, diameter);
    fill(0, 236, 255)
    j5 = joints[5]
    ellipse(j5.x, j5.y, diameter, diameter);
    fill(0, 255, 226)
    j6 = joints[6]
    ellipse(j6.x, j6.y, diameter, diameter);
    fill(255, 0, 76)
    j7 = joints[7]
    ellipse(j7.x, j7.y, diameter, diameter);
    fill(0, 255, 131)
    j8 = joints[8]
    ellipse(j8.x, j8.y, diameter, diameter);
    fill(255, 0, 171)
    j9 = joints[9]
    ellipse(j9.x, j9.y, diameter, diameter);
    fill(0, 255, 37)
    j10 = joints[10]
    ellipse(j10.x, j10.y, diameter, diameter);
    fill(244, 0, 253)
    j11 = joints[11]
    ellipse(j11.x, j11.y, diameter, diameter);
    fill(57, 255, 0)
    j12 = joints[12]
    fill(151, 0, 255)
    ellipse(j12.x, j12.y, diameter, diameter);
    fill(151, 0, 255)
    j13 = joints[13]
    ellipse(j13.x, j13.y, diameter, diameter);
    fill(151, 255, 0)
    j14 = joints[14]
    ellipse(j14.x, j14.y, diameter, diameter);
    fill(151, 255, 0)
    j15 = joints[15]
    ellipse(j15.x, j15.y, diameter, diameter);
    fill(0, 133, 255)
    j16 = joints[16]
    ellipse(j16.x, j16.y, diameter, diameter);
}

