// Code from https://thecodingtrain.com/challenges/54-islamic-star-patterns
// changed to class with help from chatGPT

class IslamicStarPattern {
  constructor(buffer, w, h, inc, delta, angle, col, sw) {
    this.buffer = buffer;
    this.w = w;
    this.h = h;
    this.inc = inc;
    this.delta = random(10,20);
    this.angle = random(15, 85);
    this.col = col;
    this.sw = sw;
    this.polys = [];
    this.initPolygons();
  }

  initPolygons() {
    const inc = this.inc;
    for (let x = 0; x < this.w; x += inc) {
      for (let y = 0; y < this.h; y += inc) {
        const poly = new Polygon(4, this.delta, this.angle, this.sw);
        poly.addVertex(x, y);
        poly.addVertex(x + inc, y);
        poly.addVertex(x + inc, y + inc);
        poly.addVertex(x, y + inc);
        poly.close();
        this.polys.push(poly);
      }
    }
  }

  draw() {
    this.buffer.background(this.col);
    for (let poly of this.polys) {
      poly.hankin();
      poly.show(this.buffer);
    }
  }
}

class Polygon {
  constructor(n, delta, angle, sw) {
    this.vertices = [];
    this.edges = [];
    this.sides = n;
    this.delta = delta;
    this.angle = angle;
    this.sw = sw;
  }

  addVertex(x, y) {
    let a = createVector(x, y);
    let total = this.vertices.length;
    if (total > 0) {
      let prev = this.vertices[total - 1];
      let edge = new Edge(prev, a, this.delta, this.angle, this.sw);
      this.edges.push(edge);
    }
    this.vertices.push(a);
  }

  close() {
    let total = this.vertices.length;
    let last = this.vertices[total - 1];
    let first = this.vertices[0];
    let edge = new Edge(last, first, this.delta, this.angle, this.sw);
    this.edges.push(edge);
  }

  hankin() {
    for (let edge of this.edges) {
      edge.hankin(this.sides);
    }
  }

  show(buffer) {
    for (let edge of this.edges) {
      edge.show(buffer);
    }
  }
}

class Edge {
  constructor(a, b, delta, angle, sw) {
    this.a = a;
    this.b = b;
    this.delta = delta;
    this.angle = angle;
    this.sw = sw;
    this.h1 = null;
    this.h2 = null;
  }

  show(buffer) {
    buffer.stroke(255);
    buffer.strokeWeight(this.sw);
    buffer.line(this.a.x, this.a.y, this.b.x, this.b.y);
    if (this.h1 && this.h2) {
      this.h1.show(buffer);
      this.h2.show(buffer);
    }
  }

  hankin(sides) {
    let mid = p5.Vector.add(this.a, this.b).mult(0.5);
    let v1 = p5.Vector.sub(this.a, mid);
    let v2 = p5.Vector.sub(this.b, mid);

    let elen = v1.mag() + this.delta;

    let offset1 = mid;
    let offset2 = mid;
    if (this.delta > 0) {
      v1.setMag(this.delta);
      v2.setMag(this.delta);
      offset1 = p5.Vector.add(mid, v2);
      offset2 = p5.Vector.add(mid, v1);
    }
    v1.normalize();
    v2.normalize();

    v1.rotate(radians(-this.angle));
    v2.rotate(radians(this.angle));

    let interior = ((sides - 2) * PI) / sides;
    let alpha = interior * 0.5;
    let beta = PI - radians(this.angle) - alpha;
    let hlen = (elen * sin(alpha)) / sin(beta);

    v1.setMag(hlen);
    v2.setMag(hlen);

    this.h1 = new Hankin(offset1, v1, this.sw);
    this.h2 = new Hankin(offset2, v2, this.sw);
  }
}

class Hankin {
  constructor(a, v, sw) {
    this.a = a;
    this.v = v;
    this.sw = sw;
    this.b = p5.Vector.add(a, v);
  }

  show(buffer) {
    buffer.stroke(255);
    buffer.strokeWeight(this.sw);
    buffer.line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
