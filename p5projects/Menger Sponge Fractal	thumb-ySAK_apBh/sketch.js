// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/LG8ZK-rRkXo

var a = 0;

var sponge = [];

const Y_AXIS = 1;
const X_AXIS = 2;
let col;
let w = 1400;
let h = 1000;

let gradient1;

function setup() {
  createCanvas(1280, 720, WEBGL);
   let c1 = color(146, 83, 161);
  let c2 = color(102,211,52);
 
 let  col = setGradient(-w/2, -h/2, w, h, c1, c2, Y_AXIS);
  
  noCursor();
  
  // as of p5.js 0.6.0, normal material is no longer the default and
  // has to be explicitly selected.
  
  //specularMaterial(112, 50, 126);
  ambientMaterial(146, 83, 161);
  //normalMaterial();
  //texture(col);
  // An array of Box objects
  // Start with one
  var b = new Box(0, 0, 0, 385);
  sponge.push(b);
}


function mousePressed() {
 save('menger.jpg');
}

function mousePressed() {
  // Generate the next set of boxes
  var next = [];
  for (var i = 0; i < sponge.length; i++) {
    var b = sponge[i];
    var newBoxes = b.generate();
    next = next.concat(newBoxes);
  }
  sponge = next;
}

function draw() {
  noStroke();
 fill(146, 83, 161);
  
//   rotateX(-PI* 1/6); // -PI*1/7
//   rotateY(PI*1/6); // PI*1/6
  
  rotateX(-PI* 1.2/5); // -PI*1/7
  rotateY(PI*3.9/3); // PI*1/6
  rotateZ(PI/2);
  
  let locX = mouseX - height / 2;
  let locY = mouseY - width / 2;
  let locX1 = mouseX + height / 2;
  let locY1 = mouseY + width / 2;
  
  ambientLight(146, 83, 161); // purple light
  
   pointLight(164, 41, 99, 0, 0, 150); //lights up inside front
 //pointLight(102, 211, 52, 800, 450, 255);
   pointLight(40, 99, 164, 800, 450, 255); //lights up inside front
 pointLight(236, 1, 90, 0, 450, 255); //lights up side inside front
  pointLight(241, 97, 100, 0, 0, 200);
  //specularColor(236, 1, 90); 
  shininess(1);
  //rotateZ(PI * 2/4);
  // Show what you've got!
  for (var i = 0; i < sponge.length; i++) {
    sponge[i].show();
  }
 // a += 0.01;
}


function setGradient(x, y, w, h, c1, c2, axis) {
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
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

