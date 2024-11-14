let axiom = "FX";
let sentence = axiom;
let rules = [];
let length = 5;
let angle;
let level = 12;

function setup() {
  createCanvas(800, 800);
  angle = radians(90);
  rules[0] = {
    a: "X",
    b: "X+YF+",
  };
  rules[1] = {
    a: "Y",
    b: "-FX-Y",
  };

  for (let i = 0; i < level; i++) {
    // Increase the number of iterations for more complexity
    generate();
  }
 // console.log(sentence);
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  stroke(0);
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);

    if (current === "F") {
      line(0, 0, length, 0);
      translate(length, 0);
    } else if (current === "+") {
      rotate(angle);
    } else if (current === "-") {
      rotate(-angle);
    }
  }
  noLoop();
}

function generate() {
  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (let j = 0; j < rules.length; j++) {
      if (current === rules[j].a) {
        nextSentence += rules[j].b;
        found = true;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
}
