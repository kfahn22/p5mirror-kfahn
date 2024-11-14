// The supershape code is based on Daniel Shiffman's 3d-supershapes challenge
// https://thecodingtrain.com/challenges/26-3d-supershapes
// I also used the code from https://openprocessing.org/sketch/651525 as a starting point
// The shader code builds on work by Inigo Quilez and Martijn Steinrucken as detailed in the frag file


let divA, divB;
let button;
let angX = 0;
let angY = 0;
let globe = [];
let rotation = true;
let total, m, a, b, r;
let mSlider, rSlider, tSlider;
let n1Slider, n2Slider, n3Slider;
let aSlider, bSlider;

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
  
  let para1 = createP('Choose render method:')
  chooseShape = createSelect().class('choice').class('dropdown');
  chooseShape.position(30, 700);
  chooseShape.option('Supershape', '0');
  chooseShape.option('Shader', '1');
  chooseShape.selected('0');
  
  let divA = createDiv().position(30, 730).class("flex-container");
  
  let para2 = createP('Supershapes').parent(divA);
  let spanr = createSpan("r: ").parent(divA);
  rSlider = createSlider(1, 250, 150).style('width', '180px').parent(divA);
  
  let spana = createSpan("a: ").parent(divA);
  aSlider = createSlider(0, 2, 1, 0.1).style('width', '180px').parent(divA);
  
  let spanb = createSpan("b: ").parent(divA);
  bSlider = createSlider(0, 2, 1, 0.1).style('width', '180px').parent(divA);
  
  let spann1 = createSpan("n1: ").parent(divA);
  n1Slider = createSlider(0, 12, 1.7).style('width', '180px').parent(divA);
  
  let spann2= createSpan("n2: ").parent(divA);
  n2Slider = createSlider(0, 12, 1.7).style('width', '180px').parent(divA);
 
  let spann3 = createSpan("n3: ").parent(divA);
  n3Slider = createSlider(0, 12, 1.7).style('width', '180px').parent(divA);
 
  let spannm = createSpan("m: ").parent(divA);
  mSlider = createSlider(0, 12, 6).style('width', '180px').parent(divA);
 
  let spannt = createSpan("total: ").parent(divA);
  tSlider = createSlider(0, 100, 20).style('width', '180px').parent(divA);
  
  
  // Controls for shader
  divB = createDiv().position(350, 730).class('flex-container');
  let para3 = createP('Shader').parent(divB);
  sel1 = createSelect().parent(divB).class('dropdown');
  sel1.option('Mixture', '0');
  sel1.option('Extruded shape', '1');
  sel1.option('Rotation', '2');
  sel1.selected('0');
  
  para4 = createP('Choose some shapes to mix:').parent(divB);
  sel2 = createSelect().parent(divB).class('dropdown');
  sel2.option('Circle', '0');
  sel2.option('Star', '1');
  sel2.option('triangle', '2');
  sel2.option('Koch', '3');
  sel2.selected('0');
  
  sel3 = createSelect().parent(divB).class('dropdown');
  sel3.option('Circle', '0');
  sel3.option('Box', '1');
  sel3.selected('1');

  
  s = createSpan("scale: ").parent(divB);
  scaleSlider = createSlider(1, 20, 10, 1).style('width', '180px').parent(divB);
 
  mx = createSpan("mix: ").parent(divB);
  mixSlider = createSlider(0.0, 1.0, 0.5, 0.1).style('width', '180px').parent(divB);
  
  let para5 = createP('Depth of extruded shape').parent(divB);
  spand = createSpan("d: ").parent(divB);
  dSlider = createSlider(0.01, 5.0, 2.0, 0.1).style('width', '180px').parent(divB);
  
  
  let para6 = createP('3D Koch curve variations').parent(divB);
  sel4 = createSelect().parent(divB).class('dropdown');
  sel4.option('Intersection', '0');
  sel4.option('Rotation in 1 axis', '1');
  sel4.option('Rotation on 2 axis', '2');
  sel4.option('Mixed with a circle', '3');
  sel4.option('Mixed with a box', '4');
  sel4.option('Rotated Star mixed with box', '5');
  sel4.selected('4');
}

function draw() { 
  //background(11, 106, 136); // teal
  background('#F89E4F'); //orange
  //background('#F16164'); // rose
  //background('#66D334'); // green
  
  renderMethod();
}

function superShape(theta, m, n1, n2, n3) {
  a = aSlider.value();
  b = bSlider.value();
  
  let t1 = abs((1/a) * cos(m * theta / 4));
  t1 = pow(t1, n2);
  
  let t2 = abs((1/b) * sin(m * theta / 4));
  t2 = pow(t2, n3);
  
  t3 = t1 + t2;
  let r = pow(t3, -1 / n1);
  return r;
}

function renderMethod() {
  let s = chooseShape.value();
  if (s === "0") {
      
      rotateX(angX);
      rotateY(angY);

      ambientLight(255);
      noStroke();

      m = mSlider.value();
      n1 = n1Slider.value();
      n2 = n2Slider.value();
      n3 = n3Slider.value();
      r = rSlider.value();
      total = tSlider.value();
      for (let i = 0; i < total+1; i++) {
        globe[i] = [];
        var lat = map(i, 0, total, -HALF_PI, HALF_PI);
        let r2 = superShape(lat, m, n1, n2, n3);

        for (let j = 0; j < total+1; j++) {
          var lon = map(j, 0, total, -PI, PI);
          let r1 = superShape(lon, m, n1, n2, n3);
          var x = r * r1 * cos(lon) * r2 * cos(lat);
          var y = r * r1 * sin(lon) * r2 * cos(lat);
          var z = r * r2 * sin(lat);

          globe[i].push(createVector(x, y, z));

        }
      }

      for (let i = 0; i < total; i++) {

        let num = map(i, 0, total, 0, 255);
        //fill(175, 0.5*num, 1.25*num);  //pinkish-purple
        //fill(255, num, 0); //orangish yellow
        //fill(0, num, 255);  //blue
        //fill(num, 0, 255);  //purple
        fill(num, 255, 50);  //greenish-yellow
        beginShape(TRIANGLE_STRIP);
        for (let j = 0; j < total+1; j++) {
          let v1 = globe[i][j];
          vertex(v1.x, v1.y, v1.z);
          let v2 = globe[i+1][j];
          vertex(v2.x, v2.y, v2.z);
        }
        endShape();
        }

        if(rotation) {
          angX += 0.03;
          angY += 0.04;
        }
  } else {
      background(0);
      let choice = sel1.value();
      let shape1 = sel2.value();
      let shape2 = sel3.value();
      let shape3 = sel4.value();
      let d = dSlider.value();
      let newd = map(d, 0.5, 5.0, 0.0, 1.0);
    
      let sc = scaleSlider.value();
      let newSC = map(sc, 1, 20, 0.0, 1.0);
      let mixValue = mixSlider.value();
      let newMV = map(sc, 1, 10, 0.0, 0.5);
     
      // send resolution of sketch into shader
      theShader.setUniform('u_resolution', [width, height]);
      theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
      theShader.setUniform("iFrame", frameCount);
      theShader.setUniform("iTime", millis()/1000.0);
      theShader.setUniform('tex0', img);
      theShader.setUniform("choice", choice);
      theShader.setUniform("shape1", shape1);
      theShader.setUniform("shape2", shape2);
      theShader.setUniform("scale", newSC);
      theShader.setUniform("mv", mixValue);
      theShader.setUniform("dd", newd);
      theShader.setUniform('shape3', shape3);

      // shader() sets the active shader with our shader
      shader(theShader);

      // rect gives us some geometry on the screen
      rect(0,0,width, height);

  }
}