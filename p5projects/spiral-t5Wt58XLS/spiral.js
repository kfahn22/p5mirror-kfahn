class Spiral {
  constructor(_x, _y, col) {
    this.x = 0;
    this.y = 0;
    this.col = color(255, 0, 100);
    this.points = [];
    this.strokes = [];
  }

  drawSpiral(sw) {
    // Draw the Archimedean spiral
    console.log(this.color);
    for (let angle = 0; angle < 360; angle += 0.01) {
      push();
      translate(this.x, this.y);
      let radius = a + b * angle;
      let x = radius * cos(angle);
      let y = radius * sin(angle);

      // vary the strokeweight
      let d = abs(end - angle) * radius;
      const targetThickness = d;
      const lastThickness = stroke[stroke.length - 1].thickness;
      const thickness = lerp(lastThickness, targetThickness, 0.0003);
      stroke.push({
        pt: createVector(x, y),
        thickness: thickness,
      });
    }
    stroke(this.color);
    strokeWeight(this.sw);
    point(x, y);
    pop();
  }

  addArc(st, end, rad) {
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

      this.strokes.push(stroke);
    }
    return this.strokes;
  }

  showArc() {
    // Loop over all strokes
    for (const stroke of this.strokes) {
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
      //stroke(255, 0, 255);
      
      // Draw the outline of the shape
      beginShape(TRIANGLE_STRIP);
      for (const [i, { pt, thickness }] of stroke.entries()) {
        const n = normals[i];

        // Change the fill color per vertex to have it smoothly blend
        // over the stroke! Here I'm making the opacity be based on
        // the thickness
        
        fill(0, map(thickness, 7, 16, 100, 255, true));

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
}
