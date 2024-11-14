let pi;
let piShow = '';
let piCounter = 2;
let digitsDiv;
let digits = "";

let raw;
let newDigits, searchBox;
let indexP;

function preload() {
  pi = loadStrings('pi-thousand.txt');
 // bkgd = loadImage("pi_search.jpg");
}


function mousePressed() {
 save('pi_search.jpg');
}

function setup() {
  createCanvas(800, 450);
   pi = pi.join('');
  //textFont(32);
  digitsDiv = createDiv(digits);
  digitsDiv.style("font-size", "64pt");
  piShow = pi.substring(0, 2);

  textSize(48);
  textAlign(CENTER, CENTER);
  noLoop();
}

function draw() {
  background(45,197,244);
 
  let gap = 50;
  let margin = 20;
  translate(20, 30);
   // Loop as long as there is space on the canvas
  for (let y = 20; y < 450 - gap; y += gap) {
    for (let x = 20; x < 800 - gap; x += gap) {
     number = pi.charAt(piCounter)
      fill(255,255,255,60);
     
      // Draw the letter to the screen
      text(number, x, y);
       // Increment the counter
      piCounter++;
    }
     
    }
}
function indexOf(txt, search) {
  let start = search.charAt(0);
  for (let i = 0; i < txt.length; i++) {
    if (txt.charAt(i) === start) {
      let found = true;
      for (let j = 1; j < search.length; j++) {
        if (txt.charAt(i + j) !== search.charAt(j)) {
          found = false;
          break;
        }
      }
      if (found) {
        return i;
      }
    }
  }
  return -1;
}

function searchItUp() {
  let search = searchBox.value();
  console.log(search);

  // let index = digits.indexOf(search, 2);

  let index = indexOf(digits, search);

  if (index > 0) {
    indexP.html(`is the ${index - 1} digit of PI`);
    indexP.position(125, 175);
  } else {
    // This is just a demo with a small file of digits
    indexP.html("not found in the first 1 thousand digits");

    // indexP.html('not found in the first 1 million digits');
  }
}

// function setup() {
//   noCanvas();

//   digits = raw[0];
//   searchBox = createInput("");
//   searchBox.size(400);
//   searchBox.position(100,125);
//   searchBox.input(searchItUp);
//   indexP = createP("searching");
//    indexP.position(125, 150);
  
// }
