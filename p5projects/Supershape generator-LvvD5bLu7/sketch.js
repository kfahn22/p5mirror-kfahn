// The supershape code is based on Daniel Shiffman's 3d-supershapes challenge
// https://thecodingtrain.com/challenges/26-3d-supershapes
// I also used the code from https://openprocessing.org/sketch/651525 as a starting point

let divA
let button;
let angX = 0;
let angY = 0;
let globe = [];
let rotation = true;
let total, m, a, b, r;
let mSlider, rSlider, tSlider;
let n1Slider, n2Slider, n3Slider;
let aSlider, bSlider;
let n1, n2, n3;
let rP, aP, bP, n1P, n2P, n3P, mP, totalP, rd, gr, bl;
let num;

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
  noCursor();
 
  // Controls for supershape parameters
  let divG = createDiv().position(650, 10).class('parameters');
  para1 = createP('Supershape parameters:').parent(divG);
  
  divA = createDiv().parent(divG).class('box');
 
  let divA1 = createDiv().parent(divA).class('slider');
  let spanr = createSpan("r: ").parent(divA1);
  rSlider = createSlider(100, 400, 250).parent(divA1).style('width', '180px').class('mySlider');
 
  
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
  
  let divB4= createDiv().parent(divB).class('slider');
  let spannt = createSpan("total: ").parent(divB4);
  tSlider = createSlider(0, 100, 20).style('width', '180px').parent(divB4).class('mySlider');
  
  
  let divG1 = createDiv().position(10, 650).class('color_parameters');
  colorP = createP('Color palette:').parent(divG1);
  
  let divD = createDiv().parent(divG1).class('subdiv').class('preset');
  // let spannc = createSpan("Color palette").parent(divD);
  sel = createSelect().parent(divD).class('dropdown');
  sel.option('Blue', 0);
  sel.option('Pink and blue', 1);
  sel.option('Eggplant and raspbery', 2);
  sel.option('Blue, black, and burgandy', 3);
  sel.option('Orange', 6);
  sel.option('Pinkish purple', 7);
  sel.option('Purple', 9);
  sel.selected(1);
  
//   divC = createDiv().parent(divG1).class('colors');
  
//   let divC1 = createDiv().parent(divC).class('slider');
//   let spanred = createSpan("red: ").parent(divC1);
//   redSlider = createSlider(0, 255, 125, 1).style('width', '180px').parent(divC1).class('mySlider');
//   let divC2 = createDiv().parent(divC).class('slider');
//   let spangreen = createSpan("green: ").parent(divC2);
//   greenSlider = createSlider(0, 255, 125, 1).style('width', '180px').parent(divC2).class('mySlider');
//   let divC3 = createDiv().parent(divC).class('slider');
//   let spanblue = createSpan("blue: ").parent(divC3);
//   blueSlider = createSlider(0, 255, 125, 1).style('width', '180px').parent(divC3).class('mySlider');

}

function draw() { 
  let choice = sel.value();
  chooseBackground(choice);
  
  rotateX(angX);
  rotateY(angY);

  ambientLight(255);
  normalMaterial()
  stroke('#9253A1');
  noStroke();

  r = rSlider.value();
  a = aSlider.value();
  b = bSlider.value();
  m = mSlider.value();
  n1 = n1Slider.value();
  n2 = n2Slider.value(); 
  n3 = n3Slider.value();
  total = tSlider.value();
//   rd = redSlider.value();
//   gr = greenSlider.value();
//   bl = blueSlider.value();
  
  
  for (let i = 0; i < total+1; i++) {
    globe[i] = [];
    let lat = map(i, 0, total, -PI/2, PI/2);
    let r2 = superShape(lat, m, n1, n2, n3);

    for (let j = 0; j < total+1; j++) {
      let lon = map(j, 0, total, -PI, PI);
      let r1 = superShape(lon, m, n1, n2, n3);
      let x = r * r1 * cos(lon) * r2 * cos(lat);
      let y = r * r1 * sin(lon) * r2 * cos(lat);
      let z = r * r2 * sin(lat);

      globe[i].push(createVector(x, y, z));
    }
  }
  
  for (let i = 0; i < total; i++) {
     num = map(i, 0, total, -PI/2, PI*1/2);
     chooseColor(choice, i);
    
     // uncomment to choose your own colors
     // num = map(i, 0, total, -PI, PI);
     //fill( rd*sin(num + PI), gr*sin(num ), bl*sin(num + PI/2));
     //fill( rd*cos(num), gr*cos(num+ PI), bl*cos(num ));
     //fill(rd*cos(num), gr*cos(num + PI/2), bl*cos(num)); 
         
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


function chooseBackground(colorChoice) {
  // shades of blue 
  if (colorChoice  == 0) {
    background('#F063A4');
  }
  // bright pink and blue
  else if (colorChoice == 1) {
   background('#2DC5F4');
  }
  // raspberry and eggplant
  else if (colorChoice == 2) {
     background('#2DC5F4');
  } 
  else if (colorChoice == 3) {
    // blue, black, and burgandy
   background('#F063A4');
  }
  // purple on one side, black on the other
  else if (colorChoice == 4) {
    background('#F89E4F');
  }
  else if (colorChoice == 5) {
    // green, blue, red
    background('＃FCEE21');
  }
  else if (colorChoice == 6) {
    //orangish yellow
   background('#9253A1');; 
  }
  else if (colorChoice == 7) {
     //pinkish-purple
      background('#0B6A88');
  } else if (colorChoice == 8) {
     //blue
     background('#F16164'); 
  } else if (colorChoice == 9) {
     //purple
      background('#2DC5F4');
  }
}
function chooseColor(colorChoice, i) {
  // shades of blue 
  if (colorChoice  == 0) {
    num = map(i, 0, total, -PI, PI);
    fill( 100*cos(num), 255*cos(num), 255*cos(num/2) );
  }
  // bright pink and blue
  else if (colorChoice == 1) {
   num = map(i, 0, total, -PI, PI);
    fill( 255*cos(num), 0*cos(num), 255*cos(num/2) );
  }
  // raspberry and eggplant
  else if (colorChoice == 2) {
    num = map(i, 0, total, -3.14158, 3.14159);
    //fill( 255*cos(num), 0*cos(num), 255*cos(num) );
    fill( 255*cos(num + PI/3), 0*cos(num), 255*cos(num+ PI/3) );
  } 
  else if (colorChoice == 3) {
    // blue, black, and burgandy
   num = map(i, 0, total,-PI, PI);
    fill( 100*sin(num + PI), 0*sin(num), 255*sin(num) );
  }
  // purple on one side, black on the other
  else if (colorChoice == 4) {
     num = map(i, 0, total,-PI, PI);
    fill( 100*sin(num), 0*sin(num+ PI), 255*sin(num) );
  }
  else if (colorChoice == 5) {
    // green, blue, red
    num = map(i, 0, total, -PI, PI);
    fill( 100*sin(num), 255*sin(num+ PI), 255*sin(num+PI/2) );
  }
  else if (colorChoice == 6) {
    //orangish yellow
    num = map(i, 0, total, 0, 255);
    fill(255, num, 0); 
  }
  else if (colorChoice == 7) {
     //pinkish-red
      num = map(i, 0, total, 0, 255);
      fill(200, 0.5*num, 1.25*num); 
  } else if (colorChoice == 8) {
     //blue
      num = map(i, 0, total, 0, 255);
      fill(0, num, 255);  
  } else if (colorChoice == 9) {
     //purple
      num = map(i, 0, total, 0, 255);
     fill(num, 0, 255); 
  }
}