// Circle Packing
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/050.1-circlepackinganimated.html
// https://thecodingtrain.com/CodingChallenges/050.2-circlepackingimage.html

// Basic: https://editor.p5js.org/codingtrain/sketches/2_4gyDD_9
// Image (Text): https://editor.p5js.org/codingtrain/sketches/wxGRAd4I-

let circles;
let spots;
let img;

let colorsCT = [ '#70327E', '#9253A1', '#A42963',
  '#EC015A', '#F063A4', '#F16164', '#F89E4F', '#FCEE21'
]


function preload() {
  img = loadImage("codingTrain.png");
}

function setup() {
  createCanvas(800, 450);
  img.loadPixels();
  spots = [];
  circles = [];
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let index = x + y * img.width;
      let c = img.pixels[index * 4];
      let b = brightness([c]);
      if (b > 1) {
        spots.push(createVector(x, y));
      }
    }
  }
}

function draw() {
  background(45, 197, 244);

  let total = 5;
  let count = 0;
  let attempts = 0;

  while (count < total) {
    let newC = newCircle();
    if (newC !== null) {
      circles.push(newC);
      count++;
    }
    attempts++;
    if (attempts > 1000) {
      noLoop();
      console.log("finished");
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
            var d = dist(circl.x, circl.y, other.x, other.y);
            var distance = circl.r + other.r;

            if (d - 4 < distance || circl.r > 10) {
              circl.growing = false;
              break;
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
  var r = int(random(0, spots.length));
  var spot = spots[r];
  var x = spot.x;
  var y = spot.y;

  var valid = true;
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    var d = dist(x, y, circle.x, circle.y);
    if (d < circle.r) {
      valid = false;
      break;
    }
  }
  if (valid) {
    return new Circle(x, y);
  } else {
    return null;
  }
}
