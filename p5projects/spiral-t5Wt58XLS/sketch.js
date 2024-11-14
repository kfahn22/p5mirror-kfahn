// https://mathworld.wolfram.com/ArchimedesSpiral.html

let a = 0; // Initial radius
let b = 5; // Rate of increase in radius
let strokeShader;
//let n = 4;

function preload() {
  strokeShader = loadShader("line.vert", "line.frag");
}
let spirals = [];
let arcs = [];
let spiralColors = [
  [111, 255, 233, 125],
  [91, 192, 190, 125],
  [58, 80, 107, 125],
  [28, 37, 65, 125],
];

function setup() {
  // Fix seams between segments by using WEBGL, which draws all
  // segments at once without antialiasing individually
  createCanvas(500, 500, WEBGL);
  angleMode(DEGREES);
  setAttributes({ antialias: true });
  background(255);
  angleMode(DEGREES);
  //fill(255, 0, 0);
  // circle(width/2, height/2, 300);
  let x = random(-5, 5);
  let y = random(-5, 5);
  translate(width / 2, height / 2);
  // for (i = 0; i < 20; i++) {
  //   spirals.push(new Spiral(x*i, y*i, random(spiralColors), random(2,8)));
  // }
  //   for (let i = 0; i < 10; i++) {
  //     spirals[i].drawSpiral(random(5, 10));

  //   }
  for (let i = 0; i < 2; i++) {
    let col = color(255, 0, 200);
    arcs.push(new Spiral(0, 0, col));
  }
}

function draw() {
  //background(255);
  translate(width / 2, height / 2);

  // Make texture coordinates go from 0-1 instead of 0-w, 0-h
  // so it's easier to swap out images without changing all
  // the coordinates
  textureMode(NORMAL);

  // Use our shader to texture the shape
  shader(strokeShader);

  for (let i = 0; i < arcs.length; i++) {
    arcs[i].addArc(20, 50, 100);
    arcs[i].showArc();
  }

  //   // Loop over all strokes
  //   for (const stroke of strokes) {
  //     // Got to have at least two points to connect into a line!
  //     if (stroke.length < 2) continue;

  //     // Calculate the direction to expand each stroke in
  //     const tangents = [];
  //     for (let i = 1; i < stroke.length; i++) {
  //       const prev = stroke[i - 1];
  //       const next = stroke[i];
  //       tangents.push(next.pt.copy().sub(prev.pt).normalize());
  //     }

  //     // We want a direction for each stroke but we have strokes.length-1
  //     // *differences* between strokes, so we just duplicate the last one
  //     tangents.push(tangents[tangents.length - 1].copy());

  //     // Rotate the tangent directions to point directly out
  //     const normals = tangents.map((tangent) => tangent.copy().rotate(90));

  //     // Draw the outline of the shape
  //     beginShape(TRIANGLE_STRIP);
  //     for (const [i, { pt, thickness }] of stroke.entries()) {
  //       const n = normals[i];

  //       // Change the fill color per vertex to have it smoothly blend
  //       // over the stroke! Here I'm making the opacity be based on
  //       // the thickness
  //       fill(0, map(thickness, 7, 16, 100, 255, true));

  //       // Loop over inside and outside of the curve
  //       for (const side of [-1, 1]) {
  //         vertex(
  //           pt.x + (side * n.x * thickness) / 2, // x
  //           pt.y + (side * n.y * thickness) / 2, // y
  //           0, // z
  //           map(side, -1, 1, 0, 1), // Texture x coordinate on the image, from 0-1
  //           i // Texture y coordinate on the image, from 0-1
  //         );
  //       }
  //     }
  //     endShape();
  //   }
}
