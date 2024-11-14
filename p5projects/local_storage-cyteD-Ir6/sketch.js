
let rSlider, gSlider, bSlider;


function setup() {
  createCanvas(400, 400);
  rSlider = createSlider(0,255, 0);
  gSlider = createSlider(0,255, 0);
  bSlider = createSlider(0,255, 0);
 // background(0);
  
  rSlider.changed(storeData);
  gSlider.changed(storeData);
  bSlider.changed(storeData);
}

function storeData() {
  console.log("Red:" + rSlider.value());
  storeItem("red", rSlider.value());
}

// function mousePressed() {
//   
//   fill(r,g,b);
//   noStroke();
//   circle(mouseX, mouseY, 10);
// }

function draw() {
  let r = rSlider.value();
  let g = gSlider.value();
  let b = bSlider.value();
  background(r, g, b);
}