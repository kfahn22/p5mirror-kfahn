// Daniel Shiffman
// Code for: https://youtu.be/E1B4UoSQMFw

// variables: A B
// axiom: A
// rules: (A → AB), (B → A)
var angle;
var axiom = "F";
var sentence = axiom;
var len = 100;
let index = 0;
var rules = [];
rules[0] = {
  a: "F",
  b: "FF+[+F-F-F]-[-F+F+F]"
}

function generate() {
  len *= 0.5;
  var nextSentence = "";
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    var found = false;
    for (var j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        index = index + 1;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  createP(sentence);
  turtle();

}

function turtle() {
  background(11,106,136);
  resetMatrix();
  translate(width*(2.75 / 6), height);
  scale(1.2);
  stroke(255,255,255, 100);
  strokeWeight(4);
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    
    //let alph = map(index, 0, sentence.length, 0, 255);
    //stroke(255, 255, 255, alph);
    if (current == "F") {
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (current == "+") {
      rotate(angle);
    } else if (current == "-") {
      rotate(-angle)
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    }
  }
}


function mousePressed() {
 save('turtle.jpg');
}

function setup() {
  createCanvas(800, 450);
  angle = radians(25);
  background(51);
  createP(axiom);
  turtle();
  var button = createButton("generate");
  button.mousePressed(generate);
}