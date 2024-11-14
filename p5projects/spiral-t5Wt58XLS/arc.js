class newArc {
  constructor(st, end, rad) {
    this.st = st;
    this.end = end;
    this.rad = rad;
    this.strokes = [];
  }

  addArc() {
    const stroke = [];
    //translate(st.x, st.y);
    for (let angle = this.st; angle < this.end; angle += 10) {
      let x = this.rad * cos(angle);
      let y = this.rad * sin(angle);
      // let tX = this.rad * cos(this.end);
      // let tY = this.rad * sin(this.end);
      // let targetPt = createVector(tX, tY);
      let d = abs(this.end - angle) * this.rad;
      // Do the same for thickness
      if (angle === this.st) {
        stroke.push({
          pt: createVector(x, y),
          thickness: 1,
        });
      } else if (this.st < angle && angle <= this.end) {
        // const targetThickness = createVector(x, y).dist(targetPt);
        const targetThickness = d;
        const lastThickness = stroke[stroke.length - 1].thickness;
        const thickness = lerp(lastThickness, targetThickness, 0.00005);
        stroke.push({
          pt: createVector(x, y),
          thickness: thickness,
        });
       
      }
      
    }
     console.log(this.strokes)
      this.strokes.push(stroke);
   
  }
}
