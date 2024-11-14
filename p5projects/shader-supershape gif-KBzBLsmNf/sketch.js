// The supershape code is based on Daniel Shiffman's 3d-supershapes challenge
// https://thecodingtrain.com/challenges/26-3d-supershapes

// Note that the rendering can be glitchy depending on the chosen parameters 

let  divA, divB, divC;
let redSlider, greenSlider, blueSlider;

// a shader variable
let theShader;
let m, a, b, r, n1, n2, n3;
let mSlider, rSlider, aSlider, bSlider;
let n1Slider, n2Slider, n3Slider;
let rP, aP, bP, n1P, n2P, n3P, mP, totalP;
let frams = 60;

function preload(){
  // load the shader
  theShader = loadShader('super.vert', 'super.frag');
}

function keyPressed() {
    if (key == "s") {
        const options = {
            units: "frames",
            delay: 0
        }
        saveGif("GIF/knotty2.gif", frames, options);
    }
}

function setup() {
 // let globalDiv = createDiv().class('global');
  //let topDiv = createDiv().class('top').parent(globalDiv);
  let topDiv = createDiv().class('top');
  let can = createCanvas(800, 800, WEBGL).parent(topDiv);
  pixelDensity(1);
  noCursor();
  
  // Controls for supershape parameters
  //let divG = createDiv().position(625, 0).class('parameters');
  let divG = createDiv().parent(topDiv).class('parameters');
  para1 = createP('Supershape parameters:').parent(divG);
  
  divA = createDiv().parent(divG).class('box');
 
  let divA1 = createDiv().parent(divA).class('slider');
  let spanr = createSpan("r: ").parent(divA1);
  rSlider = createSlider(100, 700, 350).parent(divA1).style('width', '180px').class('mySlider');
 
  
  let divA2 = createDiv().parent(divA).class('slider');
  let spana = createSpan("a: ").parent(divA2);
  aSlider = createSlider(0, 2, 1, 0.1).parent(divA2).style('width', '180px').class('mySlider');
 
  let divA3 = createDiv().parent(divA).class('slider');
  let spanb = createSpan("b: ").parent(divA3);
  bSlider = createSlider(0, 2, 1, 0.1).parent(divA3).style('width', '180px').class('mySlider');
  
  let divA4 = createDiv().parent(divA).class('slider');
  let spanm = createSpan("m: ").parent(divA4);
  mSlider = createSlider(0, 12, 6, 1).parent(divA4).style('width', '180px').class('mySlider');
  let divB = createDiv().parent(divG).class('box');
  let divB1 = createDiv().parent(divB).class('slider');
  let spann1 = createSpan("n1: ").parent(divB1);
  n1Slider = createSlider(0, 12, 1.7, 0.1).style('width', '180px').parent(divB1).class('mySlider');
  
  let divB2= createDiv().parent(divB).class('slider');
  let spann2= createSpan("n2: ").parent(divB2);
  n2Slider = createSlider(0, 12, 1.7, 0.1).style('width', '180px').parent(divB2).class('mySlider');
 
  let divB3= createDiv().parent(divB).class('slider');
  let spann3 = createSpan("n3: ").parent(divB3);
  n3Slider = createSlider(0, 12, 1.7, 0.1).style('width', '180px').parent(divB3).class('mySlider');
  
  //let colorDiv = createDiv().parent('globalDiv').class('color_parameters');
  let colorDiv = createDiv().class('color_parameters');
  colorP = createP('Choose colors:').parent(colorDiv);
  divC = createDiv().parent(colorDiv).class('colors');
  
  let divC1 = createDiv().parent(divC).class('slider');
  let spanred = createSpan("red: ").parent(divC1);
  redSlider = createSlider(0, 255, 125, 1).style('width', '180px').parent(divC1).class('mySlider');
  let divC2 = createDiv().parent(divC).class('slider');
  let spangreen = createSpan("green: ").parent(divC2);
  greenSlider = createSlider(0, 255, 125, 1).style('width', '180px').parent(divC2).class('mySlider');
  let divC3 = createDiv().parent(divC).class('slider');
  let spanblue = createSpan("blue: ").parent(divC3);
  blueSlider = createSlider(0, 255, 125, 1).style('width', '180px').parent(divC3).class('mySlider');

}

function draw() { 
      background(0);
     
      // Pass the values from the sliders back to the shader
  
      let a = aSlider.value();
      let newA = map(a, 0, 2, 0.0, 1.0);
      let b = bSlider.value();
      let newB = map(b, 0, 2, 0.0, 1.0);
      let m = mSlider.value();
      let newM = map(m, 0, 12, 0.0, 12.0);
      let r = rSlider.value();
      let newR = map(r, 100, 400, 0.0, 4.0);
      
      let n1 = n1Slider.value();
      let newN1 = map(n1, 0, 12, 0.0, 12.0);
      let n2= n2Slider.value();
      let newN2 = map(n2, 0, 12, 0.0, 12.0);
      let n3 = n3Slider.value();
      let newN3 = map(n3, 0, 12, 0.0, 12.0);
  
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
      theShader.setUniform('aa', newA);
      theShader.setUniform('bb', newB);
      theShader.setUniform('rr', newR);
      theShader.setUniform('m', newM);
      theShader.setUniform('n1', newN1);
      theShader.setUniform('n2', newN2);
      theShader.setUniform('n3', newN3);
      theShader.setUniform("re", newRed);
      theShader.setUniform("gr", newGr);
      theShader.setUniform("bl", newBl);

      // shader() sets the active shader with our shader
      shader(theShader);

      // rect gives us some geometry on the screen
      rect(0,0,width, height);
}