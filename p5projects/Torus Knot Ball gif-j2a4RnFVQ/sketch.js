// Code based on 3D Knot coding challenge
// Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/87-3d-knots
// https://youtu.be/r6YMKr1X0VA
// Javascript transcription: Chuck England

// Code from challenge: https://editor.p5js.org/codingtrain/sketches/fa1rAWng9

// https://github.com/kfahn22/torus_knots

// Equation for Torus knots from
// https://home.adelphi.edu/~stemkoski/knotgallery/

let angle = 0;
let beta = 0;
let vectors = [];
let vectors2 = [];
let vectors3 = [];
let p = 9;
let q = 8;
let r = 30; // will determine scale of knot
let h = 2;
let frames = 60;

function setup() {
    knot = createCanvas(800, 800, WEBGL);
}
function keyPressed() {
  if (key == "s") {
    const options = {
      units: "frames",
      delay: 0
    }
    saveGif("tknotball.gif", frames, options);
  }
}


function draw() {
    //background('#398974');
    background('#701f2e');
    rotateY(angle);
    r = 0.09 * height;
    angle += 0.01;
    //angle += 640/frames;
    //angle +=  PI/frames;
    // phi and theta for torus knot
    let phi = p * beta;
    let theta = q * beta;
    push();
    //translate(width/2, height/4)
    x = r * cos(theta) * (h + cos(phi)); //- 3*cos((p-q)*phi);
    y = r * sin(theta) * (h + cos(phi)); // - 3*sin((p-q)*phi);
    z = r * sin(phi);
    //z = - sin(phi); //results in a plane
    vectors.push(createVector(x, y, z));
    pop();
    push();
    // make a second larger one with axis changed
    z2 = r * cos(theta) * (h + cos(phi)); //- 3*cos((p-q)*phi);
    x2 = r * sin(theta) * (h + cos(phi)); // - 3*sin((p-q)*phi);
    y2 = r * sin(phi);
    // make a third one with axis changed
    pop();
    push();
    //translate(width/2, height/4);
    vectors2.push(createVector(x2, y2, z2));
    y3 = r * cos(theta) * (h + cos(phi)); //- 3*cos((p-q)*phi);
    z3 = r * sin(theta) * (h + cos(phi)); // - 3*sin((p-q)*phi);
    x3 = r * sin(phi);
    vectors3.push(createVector(x3, y3, z3));
    //console.log(vectors3.length)
    beta += 0.01;
    beta += TWO_PI/ frames;
  
    noFill();
    strokeWeight(4);
    beginShape();
    for (let i = 0; i < vectors.length; i++) {
        let v = vectors[i];
        //stroke('#efa634');
        stroke('#ebf9ff');
        vertex(v.x, v.y, v.z);
    }
    endShape();
    beginShape();

    for (let i = 0; i < vectors2.length; i++) {
        let v = vectors2[i];
        stroke('#feee8f');
        vertex(v.x, v.y, v.z);
    }
    endShape();
    beginShape();
    for (let i = 0; i < vectors3.length; i++) {
        let v = vectors3[i];
        //stroke('#9bce55');
        stroke('#54b098');
        vertex(v.x, v.y, v.z);
    }
    endShape();
}