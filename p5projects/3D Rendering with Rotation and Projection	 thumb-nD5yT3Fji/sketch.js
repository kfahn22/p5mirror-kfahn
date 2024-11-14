// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in
// Javascript transcription: Chuck England

// Coding Challenge #112: 3D Rendering with Rotation and Projection
// https://youtu.be/p4Iz0XJY-Qk

let angle = 0;

let points = [];

const projection = [
    [1, 0, 0],
    [0, 1, 0],
];

const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
    createCanvas(800, 450);

    points[0] = createVector(-0.5, -0.5, -0.5);
    points[1] = createVector(0.5, -0.5, -0.5);
    points[2] = createVector(0.5, 0.5, -0.5);
    points[3] = createVector(-0.5, 0.5, -0.5);
    points[4] = createVector(-0.5, -0.5, 0.5);
    points[5] = createVector(0.5, -0.5, 0.5);
    points[6] = createVector(0.5, 0.5, 0.5);
    points[7] = createVector(-0.5, 0.5, 0.5);
}

function draw() {
    background('#0B6A88');
  let c1 = color('#F16164');
   let c2 = color('#0B6A88');
  let  col2 = setGradientL(0, 0, 400, 450, c2, c1, X_AXIS);
  let  col3 = setGradientR(400, 0, 750, 450, c1, c2, X_AXIS);
    translate(width / 2, height / 2);

    const rotationZ = [
        [cos(angle), -sin(angle), 0],
        [sin(angle), cos(angle), 0],
        [0, 0, 1],
    ];

    const rotationX = [
        [1, 0, 0],
        [0, cos(angle), -sin(angle)],
        [0, sin(angle), cos(angle)],
    ];

    const rotationY = [
        [cos(angle), 0, sin(angle)],
        [0, 1, 0],
        [-sin(angle), 0, cos(angle)],
    ];

    let projected = [];

    for (let i = 0; i < points.length; i++) {
        let rotated = matmul(rotationY, points[i]);
        rotated = matmul(rotationX, rotated);
        //rotated = matmul(rotationZ, rotated);
        let projected2d = matmul(projection, rotated);
        projected2d.mult(240);
        projected[i] = projected2d;
        //point(projected2d.x, projected2d.y);
    }

    for (let i = 0; i < projected.length; i++) {
        stroke(255);
        strokeWeight(30);
        noFill();
        const v = projected[i];
        point(v.x, v.y);
    }

    // Connecting
    for (let i = 0; i < 4; i++) {
        connect(i, (i + 1) % 4, projected);
        connect(i + 4, ((i + 1) % 4) + 4, projected);
        connect(i, i + 4, projected);
    }

    angle += 0.001;
}

function mousePressed() {
  save('3dcube.jpg');
}
function connect(i, j, points) {
    const a = points[i];
    const b = points[j];
    strokeWeight(4);
    stroke(255);
    line(a.x, a.y, b.x, b.y);
}

function setGradientL(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0,1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function setGradientR(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0.0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0,1.75);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

