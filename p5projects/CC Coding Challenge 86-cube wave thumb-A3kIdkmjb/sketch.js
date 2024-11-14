// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Video: https://youtu.be/H81Tdrmz2LA

// Original GIF: https://beesandbombs.tumblr.com/post/149654056864/cube-wave

let angle = 0;
let w = 32;
let ma;
let maxD;

let colorsCT = [ 
  '#70327E', '#9253A1', '#F063A4', '#F89E4F', '#FCEE21', '#66D334', '#2DC5F4',
  '#0B6A88', '#F16164', '#A42963']

// function preload() {
//   img = loadImage('background.jpg');
// }

function setup() {
  div = createDiv();
  div.position(200, 0);
  //let can = createCanvas(400, 400, WEBGL);
   let can = createCanvas(800, 800, WEBGL);
  can.parent(div);
  ma = atan(cos(PI));
  //maxD = dist(0, 0, height/2, height/2);
  //maxD = dist(0, 0, 200, 200);
  maxD = dist(0, 0, 400, 400);
}

function draw() {
  
  background('#66D334');
   //ortho(-200,200,-200,200,-800,800,0,1000)
  //ortho(-400, 400, 400, -400, 0, 1000);
  ortho(-800, 800, 800, -800, 0, 2000);
  //rotateX(-ma*1.65);
  rotateX(-ma);
  //rotateY(-QUARTER_PI);
  rotateY(-PI/3);
  
  // pointLight(255,255,255, 650,100,300);
  // pointLight(255,255,255, 150, 100, 300);
  // pointLight(255.255,255, 800, -100, 300);
  pointLight(255,255,255, 750,100, 600);
  pointLight(255,255,255, 150, 100, 600);
  pointLight(255.255,255, 1600, -100, 600);
  ambientLight(colorsCT[1]);
  ambientMaterial(colorsCT[1]);
 
  for (let z = 0; z < height; z += w) {
    for (let x = 0; x < width; x += w) {
      push();
      let d = dist(x, z, width / 2, height / 2);
      let offset = map(d, 0, maxD, -PI, PI);
      let a = angle + offset;
      let h = floor(map(sin(a), -1, 1, 100, 700));
      translate(x - width / 2, 0, z - height / 2);
      let c1 = pickColor(offset);
      let c2 = pickRainbow(d);
      //scale(1.75);
      //let alph = map(d, 0, maxD, 0, 255);
      noStroke();
      //fill(c1);
      
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
     c = color('#7f418e');
  }  else if (offset > -PI*1/4 && offset <= -PI*1/8 || offset  > PI*1/8 && offset <= PI*1/4 ) {
   // c = colorsCT[1];
    c = color('#834491');
  } else if (offset > -PI*3/8 && offset <= -PI*2/8|| offset > PI*2/8 && offset <= PI*3/8) {
    //c = colorsCT[0];
    c = color('#864794');
  }  else if (offset > -PI*4/8 && offset <= -PI*3/8 || offset > PI*3/8 && offset <= PI*4/8) {
   // c = colorsCT[1];
      c = color('#894a97');
   }  else if (offset > -PI*5/8 && offset <= -PI*4/8 || offset > PI*4/8 && offset <= PI*5/8) {
   // c = colorsCT[0];
      c = color('#8f509e');
 
  }  else if (offset > -PI*6/8 && offset <= -PI*5/8 || offset > PI*5/8 && offset <= PI) {
    //c = colorsCT[1];
    c = color('#9253a1');
  }  else if (offset > -PI && offset <= -PI*6/8 || offset > PI*6/8 && offset <= PI) {
    c = colorsCT[1];
  }
  return c;
}

// function pickColor(offset) {
//   let c;
//   if (offset > -PI*1/8 && offset < PI*1/8 ) {
//     c = colorsCT[0];
//   }  else if (offset > -PI*1/4 && offset <= -PI*1/8 || offset  > PI*1/8 && offset <= PI*1/4 ) {
//    // c = colorsCT[1];
//     c = color('#763884');
//   } else if (offset > -PI*3/8 && offset <= -PI*2/8|| offset > PI*2/8 && offset <= PI*3/8) {
//     //c = colorsCT[0];
//     c = color('#7c3e8b');
//   }  else if (offset > -PI*4/8 && offset <= -PI*3/8 || offset > PI*3/8 && offset <= PI*4/8) {
//    // c = colorsCT[1];
//      c = color('#834491');
//    }  else if (offset > -PI*5/8 && offset <= -PI*4/8 || offset > PI*4/8 && offset <= PI*5/8) {
//    // c = colorsCT[0];
//       c = color('#894a97');
 
//   }  else if (offset > -PI*6/8 && offset <= -PI*5/8 || offset > PI*5/8 && offset <= PI) {
//     //c = colorsCT[1];
//     c = color('#8f509e');
//   }  else if (offset > -PI && offset <= -PI*6/8 || offset > PI*6/8 && offset <= PI) {
//     c = colorsCT[0];
//   }
//   return c;
// }

function pickRainbow(i) {
  let c;
   if ((i % 2 === 0) && (i % 4 != 0)) {
     c = colorsCT[0];
  } else if (i % 3 === 0) {
     c = colorsCT[1];
  } else if (i % 4 === 0) {
     c = colorsCT[2];
  } else if (i % 5 === 0) {
     c = colorsCT[3];
  // }  else if (i % 7 == 0) {
  //    c = colorsCT[5];
  // }  else if (i % 8 == 0) {
  //    c = colorsCT[6];
  // }  else if (i % 9 == 0) {
  //    c = colorsCT[7];
   }
  return c;
}