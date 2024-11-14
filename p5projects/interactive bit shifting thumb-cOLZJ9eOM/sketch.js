let byte = [];
let decimalP;
let shiftButton;

function setup() {
  createCanvas(800,225);
  decimalP = createDiv('');
  decimalP.position( 660, 325);
  shiftButton = createButton('>>');
  shiftButton.mousePressed(shiftBits);
  shiftButton.position( 67, 325);
  let w = width / 8;
  for (let i = 0; i < 8; i++) {
    byte[i] = new Bit(w/2 + i * w, 50, w-4);
    byte[i].setState(floor(random(2)));
  }
}

// function mousePressed() {
//  save('bit.jpg');
// }

function shiftBits() {
  let num = getBinaryString();
  let val = binaryToDecimal(num);
  val = val >> 1;
  num = decimalToBinary(val);
  for (let i = 0; i < 8; i++) {
    byte[i].setState(num.charAt(i));
  }


  
}

function getBinaryString() {
  let num = '';
  for (let i = 0; i < byte.length; i++) {
    byte[i].show();
    num += byte[i].state ? '1' : '0';
  }
  return num;

}

function draw() {
  background(51);
  background('#0B6A88');
  let num = getBinaryString();
 	decimalP.html(binaryToDecimal(num));
}


function mousePressed() {
  for (let i = 0; i < byte.length; i++) {
    byte[i].toggle(mouseX, mouseY);
  }
}


function decimalToBinary(num) {
  let bits = '';
  let rem = num;
  for (let i = 7; i >= 0; i--) {
    let divisor = pow(2,i);
    let bitValue = floor(rem / divisor);
    bits += bitValue;
    rem = rem % divisor;
  }
  return bits;
}



function binaryToDecimal(val) {
  let sum = 0;
  for (let i = 0; i < val.length; i++) {
    let bit = val.charAt(val.length - i - 1);
    sum += parseInt(bit) * pow(2, i);
  }
  return sum;
}