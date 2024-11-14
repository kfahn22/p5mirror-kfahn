// Hilbert Curve
// Coding in the Cabana
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingInTheCabana/003-hilbert-curve.html
// https://youtu.be/dSK-MW-zuAc

let order = 5;
let N;
let total;

let path = [];

let counter = 0;
let animateCheckbox;

let imageInput;
let img;

let orderSlider;

let resetButton;
let forLabel;

// let c1 = color(358,60,95);
// let c2 = color(195,82,96);

let gradient;

const Y_AXIS = 1;
const X_AXIS = 2;

function hilbertpath(o){
  path = [];
  N = int(pow(2, o));
  total = N * N;

  for (let i = 0; i < total; i++) {
    path[i] = hilbert(i);
    let len = width / N;
    path[i].mult(len);
    path[i].add(len / 2, len / 2);
  }
}

function setup() {
  createCanvas(800, 450).parent("#canvas-container");
   
   strokeWeight(8);
  
  //colorMode(HSB, 360, 255, 255);
  imageInput = createFileInput(handleFile).parent("#gui-container");
  resetButton = createButton("Clear Image").mousePressed(() => {
    img = undefined;
    redraw();
  }).parent("#gui-container");
  createP(`<input type="range" id="order" name="order" min="0" max="8" value="${order}" step="1"> <label id="for-label" for="order">Order: ${order}</label>`).parent("#gui-container");
  forLabel = select("#for-label");
  orderSlider = select("#order").input(() => {
    order = orderSlider.value();
    hilbertpath(orderSlider.value());
    counter = 0;
    forLabel.html("Order: "+orderSlider.value())
    redraw();
  }).parent("#gui-container");
  animateCheckbox = createCheckbox("Animate Curve").changed(() => {
    loop();
    counter = 0;
  }).parent("#gui-container");
  // noLoop();
  
  //background(0);
  
  hilbertpath(orderSlider.value());
}

function handleFile(file){
  if (file.type === 'image') {
    img = loadImage(file.data, (img) => {
      img.resize(width, height);
      redraw();
    });
    
    // img.hide();
    
  } else {
    img = null;
  }
  redraw();
}

function draw() {
//   let from = color(195, 82, 96);
  
//   let to = color(358, 60, 95);
  //gradient = setGradient(c1, c2);
  //c4 = color(195, 82, 96);
  //c5 = color(358, 60, 95);
  c4 = color(289,60,49);
 c5 = color(255);
 gradient = setGradient(0, 0, 800, 450, c4, c5, Y_AXIS)
  //background(gradient);
  colorMode(HSB); // Try changing to HSB.
  
 
  //background(0); 
  // if(img)
  //   image(img, 0, 0);
   


  stroke(255);
  
  let sw = 10-orderSlider.value();
  // print(sw)
  scale(1.2);
  strokeWeight(4*sw);
  noFill();
  translate(width/3,-height*3/4);
  rotate(PI/4);

  if(!animateCheckbox.checked()){
    if(img){
      drawImageCurve(path.length);
    }else{
      drawCurve(path.length); 
    }
    noLoop();
  }else{
    if(img){
      drawImageCurve(counter)
    }else{
      drawCurve(counter);
    }
    let inc = max(int(path.length/100), 1)
    counter += inc;
    if (counter >= path.length) {
      counter = 0;
    }
  }
}

function drawCurve(end){
  for (let i = 1; i < end; i++) {
    let h = map(i, 0, path.length, 0, 360);
    stroke(h, 255, 255);
    line(path[i].x, path[i].y, path[i - 1].x, path[i - 1].y);
  }
}

function drawImageCurve(end){
  let b = 255-(brightness(img.get(0, 0)));
  for (let i = 1; i < end; i++) {
    let c1 = img.get(int(path[i].x), int(path[i].y));
    let c2 = img.get(int(path[i-1].x), int(path[i-1].y));
    let diff = brightness(c2)-brightness(c1);
    b += diff;
    b = constrain(b, 0, 255);
    stroke(255-b);
    line(path[i].x, path[i].y, path[i - 1].x, path[i - 1].y);
  }
}


function hilbert(i) {
  const points = [
    new p5.Vector(0, 0),
    new p5.Vector(0, 1),
    new p5.Vector(1, 1),
    new p5.Vector(1, 0)
  ];

  let index = i & 3;
  let v = points[index];

  for (let j = 1; j < order; j++) {
    i = i >>> 2;
    index = i & 3;
    let len = pow(2, j);
    if (index == 0) {
      let temp = v.x;
      v.x = v.y;
      v.y = temp;
    } else if (index == 1) {
      v.y += len;
    } else if (index == 2) {
      v.x += len;
      v.y += len;
    } else if (index == 3) {
      let temp = len - 1 - v.x;
      v.x = len - 1 - v.y;
      v.y = temp;
      v.x += len;
    }
  }
  return v;
}



// function setGradient(c1, c2) {
//   // noprotect
//   noFill();
//   for (let y = 0; y < height; y++) {
//     let inter = map(y, 0, height, 0, 1);
//     let c = lerpColor(c1, c2, inter);
//     stroke(c);
//     line(0, y, width, y);
//   }
// }

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
