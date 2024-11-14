// Code based on 3D Knot coding challenge
// Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/87-3d-knots
// https://youtu.be/r6YMKr1X0VA
// Javascript transcription: Chuck England

// Code from challenge: https://editor.p5js.org/codingtrain/sketches/fa1rAWng9

// Equation for Torus knots from
// https://home.adelphi.edu/~stemkoski/knotgallery/

// https://github.com/davepagurek/p5.Framebuffer

// Adjusting p & q don't affect rendering so no longer truely a torus knot?

let angle = 0;
let beta = 0;
let knots = [];
let p = 9;
let q = 8;
let r; // will determine scale of knot
let h = 3;
let x, y;
let num = 15; // 15 optimum number 
let amt, mr, mr1;
let adj;
let ox = 50; // as ox increases height/radius of orbit increases 
let oy = 0.3; // affects y position of orbit
let blurRenderer;
let frames = 361;

let colorOptions = [
    [0,0,0],
    [246,245,174],
    [241,91,181],
    [0,187,249],
    [75,47,200] 
]

let colorOptions10 = [
    [2,3,6], // black
    [255, 215, 145], // yellow
    [255, 215, 145], // yellow
    [39,111,191],  // blue
    [39,111,191]  // blue
]

function keyPressed() {
    if (key == "s") {
        const options = {
            units: "frames",
            delay: 0
        }
        saveGif("GIF/knotty2.gif", frames, options);
    }
}

function setup() {
    createCanvas(410, 410, WEBGL);
    angleMode(DEGREES);
    //https://p5js.org/reference/#/p5/blendMode
    //blendMode(BLEND);
    blendMode(REPLACE);
    //blendMode(SUBTRACT);  not sure why this is not working??

    //lights();
    // There's a bug in Firefox where you can only make floating point textures
    // if they're RGBA, and it breaks if it's just RGB
    //blurRenderer = createGaussianBlurRenderer()
    blurRenderer = createBlurRenderer();
    blurRenderer.setIntensity(0.25);
    blurRenderer.setSamples(10);
    blurRenderer.setDof(10);

    for (i = 0; i < num; i++) {
        // adjust radius of tori 
        mr1 = map(i, 0, num, 0, 0.999);
        r = i * (1 - mr1);

        mr = map(r, 0, num, height/(num+1), r);
        x = 0;
        y = mr;
        amt = i / num;
        let c;
        let one = color(colorOptions10[1]);
        let two = color(colorOptions10[2]);
        let three = color(colorOptions10[3]);
        let four = color(colorOptions10[4]);
        if (amt < 0.333) {
            c = lerpColor(one, two, 0.5);
        } else if (amt > 0.333 & amt < 0.666) {
            c = lerpColor(two, three, 0.5);
        } else if (amt > 0.66) {
            c = lerpColor(three, four, 0.25);
        }
        
        knots.push(new TorusKnot(x, y, p, q, r, h, c));
    }
}

function draw() {
    translate(0, -height/2, 0); // for spheres

    blurRenderer.draw(() => {
        clear();
        push();
        background(colorOptions10[0]);
        noStroke();
        push();
        translate(0, -height / 4, 0);
        blurRenderer.focusHere();
        pop();
        push();
        for (let i = 0; i < knots.length; i++) {
            rotateY(angle + i / 90);
            knots[i].oneKnot();
            // use .show() for regular torusknot or .showSphere() for spheres 
            //knots[i].show();
            knots[i].showSphere();
            //angle += 0.01;
            angle -= TWO_PI / frames;
        }
        pop();
        pop();
    })
    
}