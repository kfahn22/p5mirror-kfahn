
let rSlider, gSlider, bSlider;
let g;
//let colors

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  
  rSlider = createSlider(0,255,0);
  gSlider = createSlider(0,255,0);
  bSlider = createSlider(0,255,0);
  
  let colors = getItem("colors");
  
  if (colors !== null) {
    rSlider.value(colors.r);
    gSlider.value(colors.g);
    bSlider.value(colors.b);
  }
  
   rSlider.changed(storeData);
   gSlider.changed(storeData);
   bSlider.changed(storeData);


  
//   const b64 = getItem("canvas");
//   const img = loadImage(b64, ready);
  
//   function ready() {
//   g = createGraphics(400,400);
//   g.background(0);
//   g.image(img, 0, 0, 400, 400);
//   }
}

function storeData() {
  //console.log("Red: " + rSlider.value());
  
  let colors = {
      r: rSlider.value(),
      g: gSlider.value(),
      b: bSlider.value()
   }
  storeItem("colors", colors);
}

function draw() {
  let r = rSlider.value();
  let g = gSlider.value();
  let b = bSlider.value();
  background(r,g,b);
  //if (g) {
  // let x = random(width);
  // let y = random(height);
  // g.fill(255, 100);
  // g.circle(x, y, 20);
  // image(g, 0, 0 );
  //}
}

// function mousePressed() {
//   storeItem("canvas", g.elt.toDataURL());
// }