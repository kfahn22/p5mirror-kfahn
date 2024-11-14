// The supershape code is based on Daniel Shiffman's Supershapes challenges
// https://thecodingtrain.com/challenges/23-2d-supershapes
// https://thecodingtrain.com/challenges/26-3d-supershapes
// The shader code builds on work by Inigo Quilez and Martijn Steinrucken as detailed in the frag file

// This is not an implementation of the original 3D supershape.  
// The code for the 2d shapershape is rotated about the x, y, and z axes and the 
// boolean intersection is used to create this 3D shape.

// / Animation rendered by varying supershape parameter m using time

let  divC;
let redSlider, greenSlider, blueSlider;

// a shader variable
let theShader;

function preload(){
  // load the shader
  theShader = loadShader('super.vert', 'super.frag');
}

function keyPressed() {
  // This is approximately the number of seconds for a full cycle of the animation
  if (key === 's') {
    saveGif('mySketch', 228);
  }
}

function setup() {
  // I have hard coded mouseX and mouseY values so render the shape at a specific angle

  let canvas = createCanvas(600, 600, WEBGL);
 // canvas.position(200,0)
  pixelDensity(1);
  noCursor();

  divG1 = createDiv().position(20, 680).class('color_parameters');
  colorP = createP('Choose colors:').parent(divG1);
  divC = createDiv().parent(divG1).class('colors');
  
  let divC1 = createDiv().parent(divC).class('slider');
  let spanred = createSpan("red: ").parent(divC1);
  redSlider = createSlider(0, 255, 33, 1).style('width', '180px').parent(divC1).class('mySlider');
  let divC2 = createDiv().parent(divC).class('slider');
  let spangreen = createSpan("green: ").parent(divC2);
  greenSlider = createSlider(0, 255, 145, 1).style('width', '180px').parent(divC2).class('mySlider');
  let divC3 = createDiv().parent(divC).class('slider');
  let spanblue = createSpan("blue: ").parent(divC3);
  blueSlider = createSlider(0, 255, 251, 1).style('width', '180px').parent(divC3).class('mySlider');

}

function draw() { 
      background(0);
     //console.log(mouseX, mouseY);
  
      // Pass color choices
      rd = redSlider.value();
      let newRed = map(rd, 0, 255, 0.0, 1.0, 0.1);
      gr = greenSlider.value();
      let newGr = map(gr, 0, 255, 0.0, 1.0, 0.1);
      bl = blueSlider.value();
      let newBl = map(bl, 0, 255, 0.0, 1.0, 0.1);
    
      // send resolution of sketch into shader
      theShader.setUniform('u_resolution', [width, height]);
    //  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
      theShader.setUniform("iMouse", [462.03, map(517.03, 0, height, height, 0)]);
      theShader.setUniform("iFrame", frameCount);
      theShader.setUniform("iTime", millis()/1000.0);
      theShader.setUniform("re", newRed);
      theShader.setUniform("gr", newGr);
      theShader.setUniform("bl", newBl);

      // shader() sets the active shader with our shader
      shader(theShader);

      // rect gives us some geometry on the screen
      rect(0,0,width, height);
}