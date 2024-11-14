// The shader code builds on work by Inigo Quilez and Martijn Steinrucken as detailed in the frag file


let divA, divB, divC;
let r, n, m, h, sc, mixValue, ht, rd, gr, bl;
let scaleSlider, mixSlider, hSlider, rSlider, mSlider, nSlider;
let redSlider, greenSlider, blueSlider;
let sel2, sel3, sspan, mspan, hspan, spanr, spann, spanm;

// Shader 
let img;
let theShader;

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

  para = createP('Choose shapes:').parent(divA);
  sel2 = createSelect().parent(divA).class('dropdown');
  sel2.option('Circle', '0');
  sel2.option('Star', '1');
  sel2.option('triangle', '2');
  sel2.option('Koch', '3');
  sel2.selected('0');
  
  sel3 = createSelect().parent(divA).class('dropdown');
  sel3.option('Circle', '0');
  sel3.option('Box', '1');
  sel3.option('rhombic dodecahedron', "2");
  sel3.selected('1');

 
  sspan = createSpan("scale: ").parent(divA);
  scaleSlider = createSlider(1, 20, 10, 1).style('width', '180px').parent(divA);
 
  mspan = createSpan("mix: ").parent(divA);
  mixSlider = createSlider(1, 20, 10, 1).style('width', '180px').parent(divA);

  hspan = createSpan("depth: ").parent(divA);
  hSlider = createSlider(0, 10, 5, 1).style('width', '180px').parent(divA);
  
  divB = createDiv().position(250, 630).class('flex-container');  // For star shape
  starP = createP('Star parameters:').parent(divB);
  let spanr = createSpan("r: ").parent(divB);
  rSlider = createSlider(1, 10, 5, 1).style('width', '180px').parent(divB);
  
  let spann = createSpan("n: ").parent(divB);
  nSlider = createSlider(1, 20, 8, 1).style('width', '180px').parent(divB);
  
  let spanm= createSpan("m: ").parent(divB);
  mSlider = createSlider(1, 20, 6, 1).style('width', '180px').parent(divB);

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
      //let choice = sel1.value();
      let shape1 = sel2.value();
      let shape2 = sel3.value();
    
      sc = scaleSlider.value();
      let newSC = map(sc, 1, 20, 0.0, 1.0);
      mixValue = mixSlider.value();
      let newMV = map(mixValue, 1, 20, 0.0, 1.0);
      ht = hSlider.value();
      let newH = map(ht, 1, 10, 0.0, 1.0);
  
  
      r = rSlider.value();
      let newR = map(r, 0, 10, 0.0, 0.5);
      n = nSlider.value();
      let newN = int(map(n, 1, 20, 0.0, 1.0));
      m = mSlider.value();
      let newM = map(m, 1, 20, 0.0, 1.0);
  
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
      theShader.setUniform("shape1", shape1);
      theShader.setUniform("shape2", shape2);
      theShader.setUniform("scale", newSC);
      theShader.setUniform("mv", newMV);
      theShader.setUniform("h", newH);
      theShader.setUniform("r", newR);
      theShader.setUniform("nn", n);
      theShader.setUniform("m", newM);
      theShader.setUniform("re", newRed);
      theShader.setUniform("gr", newGr);
      theShader.setUniform("bl", newBl);
  

      // shader() sets the active shader with our shader
      shader(theShader);

      // rect gives us some geometry on the screen
      rect(0,0,width, height);

}