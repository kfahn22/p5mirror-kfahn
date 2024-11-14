// Circle Packing
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/050.1-circlepackinganimated.html
// https://thecodingtrain.com/CodingChallenges/050.2-circlepackingimage.html

// Basic: https://editor.p5js.org/codingtrain/sketches/2_4gyDD_9
// Image (Text): https://editor.p5js.org/codingtrain/sketches/wxGRAd4I-
// Image (Kitten): https://editor.p5js.org/codingtrain/sketches/tRpryH_um

let circles;
let img;
// Adding a constraint on circles in face
let face = {
       x: 425,
       y: 180,
       z: 275,
}
// boolean for whether one circle inside another
let inside = false;

function preload() {
  img = loadImage('gloria.png');
}


function mousePressed() {
 save('dog.jpg');
}

function setup() {
  createCanvas(800, 450);
  img.loadPixels();
  circles = [];
}

function draw() {
  //translate(100, 0);// for kitten
  //background(img);
  fill(0);
  //rect(0,0, 600, 450);
  let total = 10;
  let count = 0;
  let attempts = 0;
  
  // Find a circle around face
//   stroke(255,0,0);
//   noFill();
//   let det = circle(425, 180, 275);
 
  while (count < total) {
    let newC = newCircle();
    if (newC !== null) {
      circles.push(newC);
      count++;
    }
    attempts++;
    if (attempts > 1000) {
      noLoop();
      console.log('finished');
      break;
    }
  }

  for (let i = 0; i < circles.length; i++) {
    let circl = circles[i];

    if (circl.growing) {
      if (circl.edges()) {
        circl.growing = false;
      } else {
        for (let j = 0; j < circles.length; j++) {
          let other = circles[j];
          if (circl !== other) {
            let d = dist(circl.x, circl.y, other.x, other.y);
            let distance = circl.r + other.r;
            // Adding constraint around face
            // let df = dist(face.x, face.y, circl.x, circl.y);
            // let distF = face.r + circl.r;
            inSide(face.x, face.y, circl.x, circl.y, face.r, circl.r);
            //if (d - 1 < distance) {
            if ((d - 1 < distance)  || (circl.r > 12)) {
               // if (inside === true && circl.r > 8) {
                circl.growing = false;
                break;
           // }
           }
          }
        }
      }
    }
  
    circl.show();
    circl.grow();
  }
}

function newCircle() {
  let x = random(0, img.width);
  let y = random(0, img.height);

  let valid = true;
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    let d = dist(x, y, circle.x, circle.y);
    if (d - 2 < circle.r) {
      valid = false;
      break;
    }
  }
  if (valid) {
    let index = (int(x) + int(y) * img.width) * 4;
    let r = img.pixels[index];
    let g = img.pixels[index + 1];
    let b = img.pixels[index + 2];
    let c = color(r, g, b);
    return new Circle(x, y, color(c));
  } else {
    return null;
  }
}

function inSide(x1,x2,y1,y2,r1,r2) {
  //compute d 
    let dist = sqrt( (x2-x1)^2 + (y2-y1)^2 );
    //get r2 and r1
    if (r1 > ( dist + r2 ) ) {
       //circle 2 inside circle 1
      inside = true;
    } else {
       //circle 2 not inside circle 1
    }
}