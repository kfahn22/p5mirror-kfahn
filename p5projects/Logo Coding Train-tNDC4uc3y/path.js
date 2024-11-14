// Defines a generic path, which can be interpolated over.
class Path {
  constructor(options = {}) {
    this.stroke = options.stroke;
    this.strokeWeight = options.strokeWeight || 11.6;
  }

  style() {
    stroke(this.stroke);
    strokeWeight(this.strokeWeight);
  }
}

// A collection of points forming different segments of the path.
class LinearPath extends Path {
  constructor(points, options) {
    super(options);

    this.points = points;
  }

  // draws at fraction of animation 't'
  draw(t) {
    let numSegments = this.points.length - 1;
    // time for which one segment animates
    let segTime = 1 / numSegments;
    push();
    this.style();

    for (let i = 0; i < numSegments; i++) {
      if (segTime * i > t) break;

      let curr = this.points[i];
      let next = this.points[i + 1];

      if (segTime * (i + 1) > t) {
        let frac = map(t, segTime * i, segTime * (i + 1), 0, 1);
        // console.log(frac)
        if (frac > 0) {
          let vec = p5.Vector.sub(next, curr).mult(frac);
          push();
          translate(curr);
          line(0, 0, vec.x, vec.y);
          pop();
        }
      } else {
        line(curr.x, curr.y, next.x, next.y);
      }
    }
    pop();
  }
}

// A path in form of a circle.
class CirclePath extends Path {
  constructor(pos, rad, options) {
    super(options);

    this.pos = pos;
    this.radius = rad;
  }

  // draws at fraction of animation 't'
  draw(t) {
    push();
    this.style();
    arc(
      this.pos.x,
      this.pos.y,
      this.radius * 2,
      this.radius * 2,
      0,
      t * TWO_PI
    );
    pop();
  }
}
