let diameter = 15;
let joints = [];
let draggedJoint = null;

function preload() {
  img = loadImage("keypoints.jpg");
}

function setup() {
  createCanvas(512, 512);
  //j1 = createVector(115, 90);
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
  stroke(197, 0, 254);
  line(joints[11].x, joints[11].y, joints[12].x, joints[12].y);
  stroke(122, 127, 221);
  line(joints[12].x, joints[12].y, joints[13].x, joints[13].y);
   stroke(104, 255, 0);
  line(joints[13].x, joints[13].y, joints[14].x, joints[14].y);
   stroke(198, 255, 0);
  line(joints[11].x, joints[11].y, joints[15].x, joints[15].y);
     stroke(198, 255, 100);
  line(joints[15].x, joints[15].y, joints[16].x, joints[16].y);
   stroke(198, 255, 200);
  line(joints[15].x, joints[15].y, joints[16].x, joints[16].y);
   stroke(198, 255, 255);
  line(joints[16].x, joints[16].y, joints[17].x, joints[17].y);
  

  // draw the joints
  for (let i = 0; i < joints.length; i++) {
    let j = joints[i];
    strokeWeight(2);
    stroke(0);
    fill(255);
    ellipse(j.x, j.y, diameter, diameter);

    if (dist(j.x, j.y, mouseX, mouseY) < diameter / 2 && mouseIsPressed) {
      fill(50);
      j.x = mouseX;
      j.y = mouseY;
    }
  }
 // console.log(mouseX, mouseY);
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
  points.push(createVector(136, 139));
  points.push(createVector(425, 158)); // 11
  points.push(createVector(382, 288));
  points.push(createVector(392, 384)); // 13
  points.push(createVector(392, 444)); // 14
  points.push(createVector(408, 271));
  points.push(createVector(416, 369));
  points.push(createVector(417, 428));
  return points;
}

