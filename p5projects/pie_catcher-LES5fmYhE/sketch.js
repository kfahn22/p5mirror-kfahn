let pies = [];
let plate;

let digitsDiv;
let digits = "3.";
let piCounter = 0;
let piShow;
function preload() {
  // load digits of pie here
 // pi = loadStrings('one-million.txt');
  
}

function setup() {
  //pi = pi.join('');
  createCanvas(400, 400);
  plate = new Plate(width /2, 50);
  digits = createDiv("hello");
  digits.style('font-size', '64pt');
  piSHow = pi.substring(0,2);
}

function draw() {
  
  fill(255);
  textSize(16);
  text(piShow, width-64, 50);
  background(0);
  if (random(1) < 0.1) {
      pies.push(new Pie(random(width), random(-100, -20)));
  }
  for (let pie of pies) {
    pie.show();
    pie.update();
    }
 
  
  for (let i = pies.length -1; i >= 0; i--) {
    if (plate.catches(pies[i])) {
      // catch the pie
      // check what digit was caught and deal with score!
       digits += pies[i].digit;
       digits += digit;
      
      let correctDigit = pi.charAt(piCounter);
          if (correctDigit == digit) {
            console.log("pie");
            digits += digit;
            piCounter ++;
            piShow = pisubstring(piCounter, 2);
          } else {
            console.log("no");
          }
      } 
  
      //digitsDiv.html(digits);
      console.log("Yum");
      if (pie[i].y > height + pies[i].r) {
        pies.splice(i, 1);
      }
  }
  plate.x = mouseX;
   plate.show();
}
  
  

