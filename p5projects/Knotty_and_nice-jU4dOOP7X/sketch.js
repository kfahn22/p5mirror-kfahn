// Code based on 3D Knot coding challenge
// Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/87-3d-knots
// https://youtu.be/r6YMKr1X0VA
// Javascript transcription: Chuck England

// Code from challenge: https://editor.p5js.org/codingtrain/sketches/fa1rAWng9

// Equation for Torus knots from
// https://home.adelphi.edu/~stemkoski/knotgallery/

// This sketch renders 25 torus knots

// I have used Dave Pagurek's Framebuffer library to add some blur
// https://github.com/davepagurek/p5.Framebuffer

let angle = 0;
let beta = 0;
let knot;
let knots = [];
let p = 9;
let q = 8;
let r = 50; // will determine scale of knot
let h = 2;
let num = 25; // 25
let x, y;
let ox = 50; // as ox increases height/radius of orbit increases 
let oy = 0.3; // affects y position of orbit
let blurRenderer;
let colorOptions1 = ['#9ad5ca', '#acdde7', '#3adb9e3', '#a379c9'];
let colorOptions2 = ['#caf7e2', '#58b09c', '#386150', '#4a442d'];
let colorOptions3 = ['#fdfffc', '#caf7e2', '#58b09c', '#386150'];
let colorOptions4 = ['#054a29', '#137547', '#2a9134', '#3fa34d'];

function setup() {
    //createCanvas(800, 450, WEBGL);
    createCanvas(800, 800, WEBGL);
    angleMode(DEGREES);
    blendMode();
    // There's a bug in Firefox where you can only make floating point textures
    // if they're RGBA, and it breaks if it's just RGB
    //blurRenderer = createGaussianBlurRenderer()
    blurRenderer = createBlurRenderer();
    blurRenderer.setIntensity(0.15)
    blurRenderer.setSamples(10)
    blurRenderer.setDof(50)

    //r = 6;
    for (i = 0; i < num; i++) {
        oy = 0.01 * random(i);
        // x = width * oy;
        // y = height * oy;
        x = width * 0.1;
        y = height * 0.1;
        r = i*0.25;
        let c = colorOptions3[i % 4];
        knots.push(new TorusKnot(x, y, p, q, r, h, c));
    }
}

function draw() {

    translate(0, -height * 0.4, 0);
    blurRenderer.draw(() => {
        clear();
        push();
        //background('#b744b8'); // colorOptions1
        //background('#3d3522');  // colorOptions2
        //background('#0f0326');  // colorOptions3
        background('#53131e'); // colorOptions4
        noStroke();
        push();
        translate(0, -height*0.4, 0);
        blurRenderer.focusHere()
        pop();
        push();
        for (let i = 0; i < knots.length; i++) {
            //let m = map(i, 0, knots.length, 0, 255);
            let rand = int(random(4));
            let col = color(colorOptions3[rand]);
            rotateY(angle + i / 90);
            knots[i].oneKnot();
            knots[i].show(col);
            angle += 0.01;
        }
        pop();
        pop();
    })
}

function mousePressed() {
  save('knotty.jpg');
}