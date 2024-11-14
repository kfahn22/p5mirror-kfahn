// Code based on 3D Knot coding challenge
// Daniel Shiffman
// https://thecodingtrain.com/challenges/87-3d-knots

// 3D Knot
// Video: https://youtu.be/r6YMKr1X0VA

// Equation for Torus knots from
// https://home.adelphi.edu/~stemkoski/knotgallery/

// https://github.com/kfahn22/torus_knots

// Here are some common parameter combinations of (p,q).   
// If p/q is odd you obtain intertwining
// (3,2) = trefoil torus knot,
// (5,2) Cinquefoil/Solomon's torus knot
// (4,3) 
// (11,6) 
// (8,9)

let angle = 0;
let beta = 0;
let vectors = [];
let p = 8;
let q = 9;
let r = 45; // will determine scale of knot
let sc = 3;

function setup() {
    knot = createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
    background('#A42963');
    //background('#70327E');
    rotateX(angle);
    angle += 0.01;
    // phi and theta for torus knot
    let phi = p * beta;
    let theta = q * beta;
    r = height*0.095;
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
        //stroke(d, 255, d);
        stroke('#66D334');
        vertex(v.x, v.y, v.z);
    }
    endShape();
}

function mousePressed() {
  save('torus_89.jpg');
}