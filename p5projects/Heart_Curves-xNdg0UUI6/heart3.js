class Heart3 {
    constructor(_px, _py, _sc) {
        this.px = _px;
        this.py = _py;
        this.sc = _sc;  // radius
        this.color = color(random(255), random(255), random(255));
        this.heart3 = [];
    }

    show() {
        translate(this.px, this.py);
        noStroke(255);
        strokeWeight(2);
        fill(this.color);

        // We draw shape and then draw its reflection across Y axis.
        beginShape();
        for (let v of this.heart3) {
            vertex(v.x, v.y);
        }
        endShape();
        beginShape();
        for (let v of this.heart3) {
            vertex(-v.x, v.y);
        }
        endShape();

        // Heart curve fomula adjusted from mathworld
        const x = -this.sc * sin(a) * cos(a) * log(abs(a) * 0.9);
        const y = -1.25 * this.sc * pow(abs(a), 0.7) * cos(a);
        this.heart3.push(createVector(x, y));

        // So that it stops
        if (a > PI / 2) {
            noLoop();
        }
        a += 0.01;
    }
}