let video;
let faceMesh;
let faces = [];
let petals = [];
//let newPoints;
let triangles;
let uvCoords;
let img;
let yoff = 0;
const particles = [];
let silhouette = [
  10, // top
  338,
  297,
  332,
  284,
  251,
  389,
  356,
  454,
  323, // midright
  361,
  288,
  397,
  365,
  379,
  378,
  400,
  377,
  152, // bottom
  148,
  176,
  149,
  150,
  136,
  172,
  58,
  132,
  93,
  234, // midleft
  127,
  162,
  21,
  54,
  103,
  67,
  109,
];

// // Lower outer.
//     61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291,
//     // Upper outer(excluding corners).
//     185, 40, 39, 37, 0, 267, 269, 270, 409,
//     // Lower inner.
//     78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308,
//     // Upper inner(excluding corners).
//     191, 80, 81, 82, 13, 312, 311, 310, 415,
//

let upperlip = [
  61,
  185,
  40,
  39,
  37,
  0,
  267,
  269,
  270,
  409,
  287,
  415,
  310,
  311,
  312,
  13,
  82,
  81,
  80,
  191,
];

let lowerlip = [
  61,
  76,
  62,
  78,
  95,
  88,
  178,
  87,
  14,
  317,
  402,
  318,
  324,
  308,
  291,
  287,
  375,
  321,
  405,
  314,
  17,
  84,
  181,
  181,
  91,
  146,
];

// Thank you Jack B. Du for these lists!
// Define the exterior lip landmark indices for drawing the outer lip contour
let lipsExterior = [
  267,
  269,
  270,
  409,
  291, // rt corner
  375,
  321,
  405,
  314,
  17,
  84,
  181,
  91,
  146,
  61, // left corner
  185,
  40,
  39,
  37,
  0,
];

// Define the interior lip landmark indices for drawing the inner lip contour
let lipsInterior = [
  13,
  312,
  311,
  310,
  415,
  308,
  324,
  318,
  402,
  317,
  14,
  87,
  178,
  88,
  95,
  78,
  191,
  80,
  81,
  82,
];

function preload() {
  faceMesh = ml5.faceMesh({ maxFaces: 1, flipped: true });
  img = loadImage("2.png");
}

function mousePressed() {
  console.log(faces);
}

function gotFaces(results) {
  faces = results;
}

function setup() {
  createCanvas(400, 400, WEBGL);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  faceMesh.detectStart(video, gotFaces);
  triangles = faceMesh.getTriangles();
  uvCoords = faceMesh.getUVCoords();
  //console.log(uvCoords);
}

function draw() {
  orbitControl();
  translate(-width / 2, -height / 2);
  background(0);
 // background(34, 42, 104);


  if (faces.length > 0) {
    let face = faces[0];
   
    texture(img);
        textureMode(NORMAL);
        noStroke();
        beginShape(TRIANGLES);
        for (let i = 0; i < triangles.length; i++) {
          let tri = triangles[i];
          let [a, b, c] = tri;
          let pointA = face.keypoints[a];
          let pointB = face.keypoints[b];
          let pointC = face.keypoints[c];
          let uvA = uvCoords[a];
          let uvB = uvCoords[b];
          let uvC = uvCoords[c];

          vertex(pointA.x, pointA.y, pointA.z, uvA[0], uvA[1]);
          vertex(pointB.x, pointB.y, pointB.z, uvB[0], uvB[1]);
          vertex(pointC.x, pointC.y, pointC.z, uvC[0], uvC[1]);
        }
        endShape();
    }
  push()
  translate(width/2, height/2, -30);
  ellipsoid(90,60, 30);
  pop()
}


// Function to save the canvas as an image when 'k' key is pressed
function keyPressed() {
  if (key === "k" || key === "K") {
    save("img.jpg");
  }
}
