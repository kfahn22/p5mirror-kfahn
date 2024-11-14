let r;
let factor = 0;
let p1, p2;
const Y_AXIS = 1;
const X_AXIS = 2;

let colorOptions = [
  [ 255,255,255], //white
  [ 164,41,99 ], // maroon
   [ 248,158,79 ], //orange
]

function setup() {
  createCanvas(800, 450);
  r = (height / 2) - 16;
}

function getVector(index, total) {
  const angle = map(index % total, 0, total, 0, TWO_PI);
  const v = p5.Vector.fromAngle(angle + PI);
  v.mult(r);
  return v;
}

function draw() {
 // background(255,160,77);
   background(45,197,244);
   let c1 = color(146,83,161);
   let c2 = color(11, 106, 136); //teal
   let c3 = color(241, 97, 100); //rose
   let c4 = color(255);
  
  let  col2 = setGradientL(0, 0, 400, 450, c3, c2, X_AXIS);
  let  col3 = setGradientR(400, 0, 750, 450, c2, c3, X_AXIS);

  const total = 200; //int(map(mouseX, 0, width, 0, 200));
  //factor += 0.015;
  factor = 2;
  
  translate(width / 2, height / 2);
  
  stroke(255);
  strokeWeight(3);
  noFill();
  ellipse(0, 0, r * 2);


  for (let i = 0; i < total; i++) {
    //let c = getColor(i,total);
    //let st = map(i, 0, 100, 0, 10);
    strokeWeight(2);
    const a = getVector(i, total);
    const b = getVector(i * factor, total);
    
  line(a.x, a.y, b.x, b.y);
    // p1 = createVector(a.x, a.y);
    // p2 = createVector(b.x, b.y);
    // p3 = createVector(b.x +);
    // let an = angleBetween(p1,p2);
    let lx = a.x + b.x;
    //let ly = a.y + b.y;
    
    //rect(a.x, a.y, lx, st);
 }
}

function setGradientL(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0.2,1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function setGradientR(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0.0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0,1.5);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function getColor(index, total) {
  let i = index/total;
  let c1 = color(236,1,90);
  let c2 = color(146,83,161);
  let c3 = lerpColor(c1,c2, 0.5);
   let c4 = color(240, 99, 164);
 // let c5 = color();
 // let c5= lerpColor(c4,c5, 0.5);
  let c5 = lerpColor(c2,c4, 0.5);
  if (index  <= 0.20) {
      
        stroke(c1);
      } else if (i > 0.2 && i <= 0.4) {
        stroke(c3);
      } else if (i > 0.4 && i  <= 0.6) {
        stroke(c2);
      } else if (i > 0.6 && i <= 0.8) {
        stroke(c4);
      } else if (i > 0.8 ) {
        stroke(c5);
      } 
 
}
 

function mousePressed() {
 save('cartiod.jpg');
}

function setColor(i) {
    
            if ((i % 2 === 0 )) {
              //strokeWeight(2);
              stroke(colorOptions[0]);
            } 
            else if (i % 3 === 0) {
              strokeWeight(3);
               stroke(colorOptions[1]);
            }
           
       
  }