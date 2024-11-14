// The supershape code is based on Daniel Shiffman's 3d-supershapes challenge
// https://thecodingtrain.com/challenges/26-3d-supershapes
// I also used the code from https://openprocessing.org/sketch/651525 as a starting point
// The shader code builds on work by Inigo Quilez and Martijn Steinrucken as detailed in the frag file


let divA, divB;
let scSlider, mixSlder;

// a shader variable
let img;
let theShader;
let sel1, sel2, spanh, s, mx;

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
  sel4 = createSelect().parent(divA).class('dropdown');
  sel4.option('Intersection', '0');
  sel4.option('Rotation in 1 axis', '1');
  sel4.option('Rotation on 2 axis', '2');
  sel4.option('Mixed with a circle', '3');
  sel4.option('Mixed with a box', '4');
  sel4.option('Rotated Star mixed with box', '5');
  sel4.selected('4');
  
  s = createSpan("scale: ").parent(divA);
  scaleSlider = createSlider(1, 20, 10, 1).style('width', '180px').parent(divA);
 
  mx = createSpan("mix: ").parent(divA);
  mixSlider = createSlider(1, 20, 10, 1).style('width', '180px').parent(divA);

}

function draw() { 
      background(0);
      //let choice = sel1.value();
       let sc = scaleSlider.value();
      let newSC = map(sc, 1, 20, 0.0, 1.0);
      let mixValue = mixSlider.value();
      let newMV = map(mixValue, 1, 20, 0.0, 1.0);
      
    
      // send resolution of sketch into shader
      theShader.setUniform('u_resolution', [width, height]);
      theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
      theShader.setUniform("iFrame", frameCount);
      theShader.setUniform("iTime", millis()/1000.0);
      theShader.setUniform('tex0', img);
      theShader.setUniform('mv', newMV);
      //theShader.setUniform('shape3', shape3);

      // shader() sets the active shader with our shader
      shader(theShader);

      // rect gives us some geometry on the screen
      rect(0,0,width, height);
}