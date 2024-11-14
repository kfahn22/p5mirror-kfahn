// Daniel Shiffman
// https://thecodingtrain.com/CodingInTheCabana/002-collatz-conjecture.html
// https://youtu.be/EYLWxwo1Ed8
// https://editor.p5js.org/codingtrain/sketches/XjLDE7gu6

function setup() {
  createCanvas(800, 450);
  background(112,50,126);
  for (let i = 1; i < 10000; i++) { 
    let sequence = [];
    let n = i;
    do {
      sequence.push(n);
      n = collatz(n);
    } while (n != 1);
    sequence.push(1);
    sequence.reverse(); 

    let len = 5;
    let angle = 0.15;
    resetMatrix();
    translate(width/2, height);
    for (let j = 0; j < sequence.length; j++) {
      let value = sequence[j];
      if (value % 2 == 0) {
        rotate(angle);
      } else {
        rotate(-angle);
      }
      strokeWeight(2);
      stroke(248,158,79, 10);
      line(0, 0, 0, -len);
      translate(0, -len);
    }

    // Visualize the list
  }
}




function collatz(n) {
  // even
  if (n % 2 == 0) {
    return n / 2;
    // odd
  } else {
    return (n * 3 + 1)/2;
  }
}
