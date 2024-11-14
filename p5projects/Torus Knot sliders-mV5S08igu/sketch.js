// Code based on 3D Knot coding challenge
// Daniel Shiffman
// https://thecodingtrain.com/challenges/87-3d-knots
// Polar Roses 
// https://editor.p5js.org/codingtrain/sketches/3kanFIcHd

// 3D Knot
// Video: https://youtu.be/r6YMKr1X0VA

// Equation for Torus knots from
// https://home.adelphi.edu/~stemkoski/knotgallery/

// Here are some common parameter combinations of (p,q).   
// If p/q is odd you obtain intertwining
// (3,2) = trefoil torus knot,
// (5,2) Cinquefoil/Solomon's torus knot

let angle = 0;
let beta = 0;
let vectors = [];
var sliderP;
var sliderQ;
let p = 8;
let q = 9;
let r = 45; // will determine scale of knot
let sc = 3;

function setup() {
    knot = createCanvas(600, 600, WEBGL);
    colorMode(HSB, 255);
    sliderP = createSlider(1, 20, 8, 1);
    sliderQ = createSlider(1, 20, 9, 1);
    sliderP.input(draw);
    sliderQ.input(draw);
}

function draw() {
    //background('#701616');
    background('#70327E');
    p = sliderP.value();
    q = sliderQ.value();
    rotateX(angle);
    angle += 0.01;
    // phi and theta for torus knot
    let phi = p * beta;
    let theta = q * beta;
    x = r * cos(theta) * (sc + cos(phi)) ;//- 3*cos((p-q)*phi);
    y = r * sin(theta) * (sc + cos(phi)) ;// - 3*sin((p-q)*phi);
    z = r * sin(phi);
    //z = - sin(phi); //results in a 2D polar rose 
    vectors.push(createVector(x, y, z));

    beta += 0.01;

    noFill();
    strokeWeight(4);
    beginShape();
    for (let i = 0; i < vectors.length; i++) {
        let v = vectors[i];
        let d = v.mag();
        let m = map(v.x, min(v.x), max(v.x), 0, 255);
        stroke(m, 255, 255);
        vertex(v.x, v.y, v.z);
    }
    endShape();
}
