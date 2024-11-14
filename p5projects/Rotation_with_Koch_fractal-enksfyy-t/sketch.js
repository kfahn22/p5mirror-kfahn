// The supershape code is based on Daniel Shiffman's 3d-supershapes challenge
// https://thecodingtrain.com/challenges/26-3d-supershapes
// I also used the code from https://openprocessing.org/sketch/651525 as a starting point
// The shader code builds on work by Inigo Quilez and Martijn Steinrucken as detailed in the frag file


let divA, divB, divC;
let scSlider, mixSlider, depthSlider;
let redSlider, greenSlider, blueSlider;

// a shader variable
let img;
let theShader;
let sel1, sel2, spanh, s, mx, dd;

function preload(){
  // load the shader
  theShader = loadShader('super.vert', 'super.frag');
  img = loadImage('beads.png');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
  noCursor();
  
  // Controls for shader
  divA = createDiv().position(50, 630).class('flex-container');
 
  let para = createP('3D Koch curve variations').parent(divA);
  sel = createSelect().parent(divA).class('dropdown');
  sel.option('Intersection', '0');
  sel.option('Rotation in 1 axis', '1');
  sel.option('Rotation on 3 axis', '2');
  sel.option('Mixed with a circle', '3');
  sel.option('Mixed with a box', '4');
  sel.option('Cookie-cutter', '5');
  sel.option('Slice', '6');
  sel.selected('4');
  
  s = createSpan("scale: ").parent(divA);
  scaleSlider = createSlider(1, 20, 10, 1).style('width', '180px').parent(divA);
 
  mx = createSpan("mix: ").parent(divA);
  mixSlider = createSlider(1, 20, 10, 1).style('width', '180px').parent(divA);

  dd = createSpan("thckness: ").parent(divA);
  depthSlider = createSlider(1, 20, 10, 1).style('width', '180px').parent(divA);
  
  divC = createDiv().position(450, 630).class('flex-container');
  colorP = createP('Choose colors:').parent(divC);
  let spanred = createSpan("red: ").parent(divC);
  redSlider = createSlider(0, 255, 125, 1).style('width', '180px').parent(divC);
  let spangreen = createSpan("green: ").parent(divC);
  greenSlider = createSlider(0, 255, 125, 1).style('width', '180px').parent(divC);
  let spanblue = createSpan("blue: ").parent(divC);
  blueSlider = createSlider(0, 255, 125, 1).style('width', '180px').parent(divC);

}

function draw() { 
      background(0);
      let choice = sel.value();
      let sc = scaleSlider.value();
      let newSC = map(sc, 1, 20, 0.0, 1.0);
      let mixValue = mixSlider.value();
      let newMV = map(mixValue, 1, 20, 0.0, 1.0);
      let depthValue = depthSlider.value();
      let newD = map(depthValue, 1, 20, 0.0, 1.0);
      choice = sel.value();
  
      // Pass color choices
      rd = redSlider.value();
      let newRed = map(rd, 0, 255, 0.0, 1.0, 0.1);
      gr = greenSlider.value();
      let newGr = map(gr, 0, 255, 0.0, 1.0, 0.1);
      bl = blueSlider.value();
      let newBl = map(bl, 0, 255, 0.0, 1.0, 0.1);
    
      // send resolution of sketch into shader
      theShader.setUniform('u_resolution', [width, height]);
      theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
      theShader.setUniform("iFrame", frameCount);
      theShader.setUniform("iTime", millis()/1000.0);
      theShader.setUniform('tex0', img);
      theShader.setUniform('scale', newSC);
      theShader.setUniform('mv', newMV);
      theShader.setUniform('th', newD);
      theShader.setUniform('choice', choice);
      theShader.setUniform("re", newRed);
      theShader.setUniform("gr", newGr);
      theShader.setUniform("bl", newBl);

      // shader() sets the active shader with our shader
      shader(theShader);

      // rect gives us some geometry on the screen
      rect(0,0,width, height);
}