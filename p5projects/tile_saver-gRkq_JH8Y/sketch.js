
//let g;
let r,g,b;
let rSlider,gSlider,bSlider;

function preload() {
  img = loadImage("canvas")
}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.mousePressed(drawCircle);
  //pixelDensity(1);
  
  // const b64 = getItem("canvas");
  // const img = loadImage(b64, ready);
  
  rSlider = createSlider(0, 255, 127);
  gSlider = createSlider(0, 255, 127);
  bSlider = createSlider(0, 255, 127);
  background(0);
  
  // function ready() {
  // //if (g == null) {
  // //console.log(g);
  //  g = createGraphics(400,400);
  //  g.background(0);
  //  g.image(img, 0, 0, 400, 400);
  //  }
}

function storeData() {
  //console.log('canvas');
  storeItem("canvas", g.elt.toDataURL());
}

function drawCircle() {
  let r = rSlider.value();
  let g = gSlider.value();
  let b = bSlider.value();
  fill(r,g,b);
  noStroke();
  circle(mouseX, mouseY, 20);
}

function draw() {
  let r = rSlider.value();
  let g = rSlider.value();
  let b = rSlider.value();
  //background(r,g,b);
  // if (g) {
  // let x = random(width);
  // let y = random(height);
  // g.fill(255, 100);
  // g.circle(x, y, 20);
  // image(g, 0, 0 );
  }


function keyPressed() {
  storeItem( "canvas", g.elt.toDataURL() );
}