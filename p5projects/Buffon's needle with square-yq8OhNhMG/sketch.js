// Based on // Coding Train / Daniel Shiffman's PI Day 2023 challenge
// Buffon's Needle with square
// https://thecodingtrain.com/challenges/176-buffon-needle

// Kathy McGuiness

let t = 75; // 50
let len = 20;
let intersects = false;
let intersecting = 0;
let total = 0;
let colorsCT = [ '#2DC5F4', '#66D334', '#A42963',
  '#EC015A', '#F063A4', '#F16164', '#F89E4F', '#FCEE21'
]

function setup() {
    createCanvas(600, 600);
    //createCanvas(600, 450);
    background("#70327E");
    rectMode(CENTER);
    angleMode(DEGREES);

    for (let col = 0; col < width; col += t) {
        stroke(255);
        strokeWeight(1);
        line(col, 0, col, height);
    }
    pieDiv = createDiv("0.0");
    pieDiv.style("font-size", "64pt");
    pieDiv.style("font-family", "courier");
}

function draw() {
    for (let i = 0; i < 10; i++) {
        let angle = random(0, 45);
        let x = round(random(width));
        let y = round(random(height));

        // Calculate the coordinates of the four corners of the rotated square
        let topLeft = rotatePoint(-len / 2, -len / 2, x, y, abs(angle));
        let topRight = rotatePoint(len / 2, -len / 2, x, y, abs(angle));
        let bottomRight = rotatePoint(len / 2, len / 2, x, y, abs(angle));
        let bottomLeft = rotatePoint(-len / 2, len / 2, x, x, abs(angle));

        // console.log(topLeft, topRight, bottomRight, bottomLeft)

        // Check for intersection with the closest vertical line
        let closest = round(x / t);
        let c = closest * t;
        if (((topLeft.x < c) && (topRight.x > c)) ||
            ((bottomLeft.x < c) && (bottomRight.x > c)) ||
            (abs(x - c) < 0.5)
        ) {
            intersects = true;
        }

        // Check if the square intersects the vertical line
        if (intersects) {
            // The square intersects the vertical line
            let col = random(colorsCT);
            fill(col);
            strokeWeight(2);
            intersecting++;
           // console.log(intersecting);
        } else {
            // The square does not intersect the vertical line
            fill(255, 25);
        }
        total++;
       // console.log(total);
        // reset intersects
        intersects = false;

        noStroke();
        // Draw the rotated square
        push();
        translate(x, y);
        rotate(angle);
        rect(0, 0, len, len);
        pop();
    }
    let prob = intersecting / total;
    let pie = (4 * len) / (prob * t);

    pieDiv.html(nf(pie, 1, 5));
}

function rotatePoint(x, y, p, q, angle) {
    push();
    translate(p, q);
    let cosAngle = cos(angle);
    let sinAngle = sin(angle);
    let newX = x * cosAngle - y * sinAngle + p;
    let newY = x * sinAngle + y * cosAngle + q;
    pop();
    return createVector(newX, newY);
}

function mousePressed() {
 save('buffon.jpg');
}