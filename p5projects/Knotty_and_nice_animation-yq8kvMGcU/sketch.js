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
let num = 15;
let amt, mr, mr1;
let adj;
let ox = 50; // as ox increases height/radius of orbit increases 
let oy = 0.3; // affects y position of orbit
let blurRenderer;
let frames = 181; // reduce this number to 61 to render a GIF

let colorOptions = [
    [2,3,6], // black
    [255, 215, 145], // yellow
    [39,111,191]  // blue
]

// Daniel Shiffman's short on creating the perfect GIF loop
// https://www.youtube.com/shorts/CEnfKhs6wLg

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
    createCanvas(400, 400, WEBGL);
    angleMode(DEGREES);
    //https://p5js.org/reference/#/p5/blendMode
    blendMode(BLEND);

    //lights();
    // There's a bug in Firefox where you can only make floating point textures
    // if they're RGBA, and it breaks if it's just RGB
    //blurRenderer = createGaussianBlurRenderer()
    blurRenderer = createBlurRenderer();
    blurRenderer.setIntensity(0.25);
    blurRenderer.setSamples(10);
    blurRenderer.setDof(10);

    for (i = 0; i < num; i++) {
        //oy = 0.01 * random(i);
        adj = 0.895;
        mr1 = map(i, 0, num, 0, 0.999);
        //let mr2 = log(i);
        //r = i * (1 - pow(adj, mr2)); // for spheres
        //r = i /(1 - mr1); // for spheres
        r = i * (1 - mr1);
        //r = i; // for torus knots
        //r = i*0.2; //.25

        mr = map(r, 0, num, height/num, r);
        x = 0;
        y = mr;
        let from = color(colorOptions[1]);
        let to = color(colorOptions[2]);
        amt = i / num;
        let c = lerpColor(from, to, amt);
        //let c = colorOptions7[i % 4];
        knots.push(new TorusKnot(x, y, p, q, r, h, c));
    }
}

function draw() {
    //translate(0,  -50-height/2 * mr1, 0); // -height/2 for regular torus knot
    translate(0, -height/2, 0); // for spheres

    blurRenderer.draw(() => {
        clear();
        push();
        background(colorOptions[0]);
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