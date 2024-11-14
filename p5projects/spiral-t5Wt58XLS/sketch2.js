// Code for line from Dave Pagurek
// https://openprocessing.org/sketch/1875216/


let strokeShader;
let n = 2;
let strokes = [];
let arcs = [];

function preload() {
  strokeShader = loadShader("line.vert", "line.frag");
}
function setup() {
  // Fix seams between segments by using WEBGL, which draws all
  // segments at once without antialiasing individually
  createCanvas(500, 500, WEBGL);
  angleMode(DEGREES);
  setAttributes({ antialias: true });
  
  for (let i = 0; i < n; i++) {
    let beginAngle = 20*i;
    let endAngle = beginAngle + 80;
    arcs.push(new newArc());
  }
}

function addArc(st, end, rad) {
  const stroke = [];
  //translate(st.x, st.y);
  for (let angle = st; angle < end; angle += 5) {
    let x = rad * cos(angle);
    let y = rad * sin(angle);
    let tX = rad * cos(end);
    let tY = rad * sin(end);
    let targetPt = createVector(tX, tY);
    let d = abs(end - angle) * rad;
    // Do the same for thickness
    if (angle === st) {
      stroke.push({
        pt: createVector(x, y),
        thickness: 1,
      });
    } else if (st < angle || angle <= end) {
      // const targetThickness = createVector(x, y).dist(targetPt);
      const targetThickness = d;
      const lastThickness = stroke[stroke.length - 1].thickness;
      const thickness = lerp(lastThickness, targetThickness, 0.0003);
      stroke.push({
        pt: createVector(x, y),
        thickness: thickness,
      });
    }

    strokes.push(stroke);
  }
}

function draw() {
  background(255);
  noStroke();

  addArc(20,120,100);
  
  addArc(180,270,50);
  addArc(60, 180, 80);
  addArc(240,360, 30);
  //strokes = arcs[1].addArc();
  //strokes = arcs[0].addArc(20, 50, 100);
  //console.log(strokes);

  // Make texture coordinates go from 0-1 instead of 0-w, 0-h
  // so it's easier to swap out images without changing all
  // the coordinates
  textureMode(NORMAL);

  // Use our shader to texture the shape
  shader(strokeShader);

  // Loop over all strokes
  for (const stroke of strokes) {
    // Got to have at least two points to connect into a line!
    if (stroke.length < 2) continue;

    // Calculate the direction to expand each stroke in
    const tangents = [];
    for (let i = 1; i < stroke.length; i++) {
      const prev = stroke[i - 1];
      const next = stroke[i];
      tangents.push(next.pt.copy().sub(prev.pt).normalize());
    }

    // We want a direction for each stroke but we have strokes.length-1
    // *differences* between strokes, so we just duplicate the last one
    tangents.push(tangents[tangents.length - 1].copy());

    // Rotate the tangent directions to point directly out
    const normals = tangents.map((tangent) => tangent.copy().rotate(90));

    // Draw the outline of the shape
    beginShape(TRIANGLE_STRIP);
    for (const [i, { pt, thickness }] of stroke.entries()) {
      const n = normals[i];

      // Change the fill color per vertex to have it smoothly blend
      // over the stroke! Here I'm making the opacity be based on
      // the thickness
      fill(0, map(thickness, 2, 40, 50, 255, true));

      // Loop over inside and outside of the curve
      for (const side of [-1, 1]) {
        vertex(
          pt.x + (side * n.x * thickness) / 2, // x
          pt.y + (side * n.y * thickness) / 2, // y
          0, // z
          map(side, -1, 1, 0, 1), // Texture x coordinate on the image, from 0-1
          i // Texture y coordinate on the image, from 0-1
        );
      }
    }
    endShape();
  }
}

