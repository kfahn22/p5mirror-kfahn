// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Video: https://youtu.be/H81Tdrmz2LA

// Original GIF: https://beesandbombs.tumblr.com/post/149654056864/cube-wave

let angle = 0;
let w = 48;
let ma;
let maxD;

let colorsCT = [ '#9253A1', '#F063A4',  '#F89E4F', '#FCEE21', '#66D334', '#0B6A88'

]


function setup() {
  createCanvas(800, 450, WEBGL);
  ma = atan(cos(QUARTER_PI));
 //maxD = dist(0, 0, 400,400);
  maxD = dist(0, 0, 420,420);
}

function draw() {
  background('#70327E');
  strokeWeight(3);
  
 
  //translate(0, 50, -50);
  let maxWidth = width*0.75;
  let minWidth = width*0.25;
  ortho(-450, 450, 450, -450, 0, 900);
  
  //from menger sponge
  rotateX(PI* 1.2/5); // -PI*1/7
  rotateY(PI*5/3); // PI*1/6
  //rotateZ(-PI/2);
  
  
  ambientLight(255, 255, 255); // purple light
  
//    pointLight(164, 41, 99, 0, 0, 150); //lights up inside front
//  //pointLight(102, 211, 52, 800, 450, 255);
//    pointLight(40, 99, 164, 800, 450, 255); //lights up inside front
//  pointLight(236, 1, 90, 0, 450, 255); //lights up side inside front
//   pointLight(241, 97, 100, 0, 0, 200);
  
  //let w = width/16;
  //ambientLight(c1, 0, -1, 0);
  // rotateY(PI*1/3);
  //rotateY(QUARTER_PI);
  //rotateX(-ma);
 // rotateY(-PI/2);

  for (let z = 0; z < height; z += w) {
   // for (let x = 0; x < width; x += w) {
      for (let x = minWidth; x  < maxWidth; x += w) {
      push();
      let d = dist(x, z, width / 2, height / 2);
      let offset = map(d, 0, maxD, -PI, PI);
      let a = angle + offset;
      let h = floor(map(sin(a), -1, 1, 100, 300));
      translate(x - width / 2, 0, z - height / 2);
      let c = pickColor(offset);
      fill(cos(offset+ PI*7/8)*h, cos(offset)*h, cos(offset+ PI)*h);
      //fill(c);
      //fill(fill(cos(num)*255, cos(num)*255, cos(num)*161);)
      //fill(cos(offset+ PI*10/15)*255, cos(offset+ PI/4)*255, cos(offset+ PI* 10/15)*255);
      //fill(cos(offset)*197, cos(offset)*83, cos(offset)*161);
      // fill(cos(num)*197, cos(num)*83, cos(num)*161);
      //fill(c3);
      //fill('#A42963');
      //normalMaterial();
      box(w, h, w);
      //rect(x - width / 2 + w / 2, 0, w - 2, h);
      pop();
    }
  }

  angle -= 0.1;
}


function mousePressed() {
 save('wave.jpg');
}

function pickColor(offset) {
  
  let c;
  if (offset > -PI*1/8 && offset < PI*1/8 ) {
    c = colorsCT[5];
  }  else if (offset > -PI*1/4 && offset <= -PI*1/8 || offset  > PI*1/8 && offset <= PI*1/4 ) {
    c = colorsCT[4];
  } else if (offset > -PI*3/8 && offset <= -PI*2/8|| offset > PI*2/8 && offset <= PI*3/8) {
    c = colorsCT[3];
  }  else if (offset > -PI*4/8 && offset <= -PI*3/8 || offset > PI*3/8 && offset <= PI*4/8) {
    c = colorsCT[2];
   }  else if (offset > -PI*5/8 && offset <= -PI*4/8 || offset > PI*4/8 && offset <= PI*5/8) {
    c = colorsCT[2];
  }  else if (offset > -PI*6/8 && offset <= -PI*5/8 || offset > PI*5/8 && offset <= PI*6/8) {
    c = colorsCT[1];
  
  }  else if (offset > -PI && offset <= -PI*6/8 || offset > PI*6/8 && offset <= PI) {
    c = colorsCT[0];
  }
  return c;
}