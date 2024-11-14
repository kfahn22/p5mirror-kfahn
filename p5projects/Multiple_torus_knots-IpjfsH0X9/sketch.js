// Code based on 3D Knot coding challenge
// Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/87-3d-knots
// https://youtu.be/r6YMKr1X0VA
// Javascript transcription: Chuck England

// Code from challenge: https://editor.p5js.org/codingtrain/sketches/fa1rAWng9

// Equation for Torus knots from
// https://home.adelphi.edu/~stemkoski/knotgallery/

// https://github.com/kfahn22/torus_knots

// Here are some common parameter settings
// (3,2) = trefoil torus knot,
// (5,2) Cinquefoil/Solomon's torus knot
// (4,3) 
// (11,6) 
// (8,9)
let angle = 0;
let beta = 0;
let vectors = [];
let vectors2 = [];
let vectors3 = [];
let p = 9;
let q = 8;
let r = 50; // will determine scale of knot
let h = 1;
let k = 30;
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
        saveGif("GIF/torus_ball.gif", frames, options);
    }
}

function draw() {
    //background('#398974');
    background('#701f2e');
    rotateY(angle);
    //angle += 0.01;
    // phi and theta for torus knot
    let phi = p * beta;
    let theta = q * beta;
    x = r * cos(theta) * (h + cos(phi)) ;//- 3*cos((p-q)*phi);
    y = r * sin(theta) * (h + cos(phi)) ;// - 3*sin((p-q)*phi);
    z = r * sin(phi);
    //z = - sin(phi); //results in a plane
    vectors.push(createVector(x, y, z));
    // make a second larger one with axis reversed
    z2 = (r + k)* cos(theta) * (h + cos(phi)) ;//- 3*cos((p-q)*phi);
    x2 = (r + k)* sin(theta) * (h + cos(phi)) ;// - 3*sin((p-q)*phi);
    y2 = (r + k)* sin(phi);
    // make a third one that is even larger 
    vectors2.push(createVector(x2,y2,z2));
    y3 = (r + 2 * k)* cos(theta) * (h + cos(phi)) ;//- 3*cos((p-q)*phi);
    z3 = (r + 2 * k)* sin(theta) * (h + cos(phi)) ;// - 3*sin((p-q)*phi);
    x3 = (r + 2 * k)* sin(phi);
    vectors3.push(createVector(x3,y3,z3));

    beta += 0.01;

    noFill();
    strokeWeight(4);
    beginShape();
    for (let i = 0; i < vectors.length; i++) {
        let v = vectors[i];
        let d = v.mag();
        //stroke('#efa634');
        stroke('#ebf9ff');
        vertex(v.x, v.y, v.z);
    }
    endShape();
    beginShape();
    for (let i = 0; i < vectors2.length; i++) {
        let v = vectors2[i];
        let d = v.mag();
        stroke('#feee8f');
        vertex(v.x, v.y, v.z);
    }
    endShape();
    beginShape();
    for (let i = 0; i < vectors3.length; i++) {
        let v = vectors3[i];
        let d = v.mag();
        //stroke('#9bce55');
        stroke('#54b098');
        vertex(v.x, v.y, v.z);
    }
    endShape();
    angle -= TWO_PI / frames;
}

// function mousePressed() {
//   save('torus_ball.jpg');
// }