// The shader code builds on work by Inigo Quilez and Martijn Steinrucken as detailed in the frag file


let divA, divC;
let scaleSlider, dSlider;
let redSlider, blueSlider, greenSlider;

// a shader variable
let img;
let theShader;
let sel2, sSpan;

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
  divA = createDiv().position(50, 650).class('flex-container');

  sel2 = createSelect().parent(divA).class('dropdown');
  sel2.option('Circle', '0');
  sel2.option('Star', '1');
  sel2.option('Hexagon', '2');
  sel2.selected('0');
  
  sSpan = createSpan("Scale: ").parent(divA);
  scaleSlider = createSlider(1, 20, 10, 1).style('width', '180px').parent(divA);
  
  let para2 = createP('Depth of extruded shape:').parent(divA);
  dSlider = createSlider(0.01, 5.0, 2.0, 0.1).style('width', '180px').parent(divA);
  
  
  divC = createDiv().position(400, 630).class('flex-container');
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
     
      let shape1 = sel2.value();
  
      //  Note that we must remap values to 0.0, 1.0
  
      // scale and depth
      let d = dSlider.value();
      let newd = map(d, 0.5, 5.0, 0.0, 1.0);
      let sc = scaleSlider.value();
      let newSC = map(sc, 1, 20, 0.0, 1.0);
  
      // Color choices
      rd = redSlider.value();
      let newRed = map(rd, 0, 255, 0.0, 1.0, 0.1);
      gr = greenSlider.value();
      let newGr = map(gr, 0, 255, 0.0, 1.0, 0.1);
      bl = blueSlider.value();
      let newBl = map(bl, 0, 255, 0.0, 1.0, 0.1);
  
      // pass parameters of sketch into shader
      theShader.setUniform('u_resolution', [width, height]);
      theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
      theShader.setUniform("iFrame", frameCount);
      theShader.setUniform("iTime", millis()/1000.0);
      theShader.setUniform('tex0', img);
      theShader.setUniform("shape1", shape1);
      theShader.setUniform("scale", newSC);
      theShader.setUniform("dd", newd);
      theShader.setUniform("re", newRed);
      theShader.setUniform("gr", newGr);
      theShader.setUniform("bl", newBl);
  
      // shader() sets the active shader with our shader
      shader(theShader);

      // rect gives us some geometry on the screen
      rect(0,0,width, height);

}