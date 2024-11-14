class Heart4 {
    constructor(_px, _py, _sc) {
        this.px = _px;
        this.py = _py;
        this.sc = _sc;
        this.color = color(random(255), random(255), random(255));
        this.heart4 = [];
    }

    show() {
        translate(this.px, this.py);
        noStroke(255);
        strokeWeight(2);
        scale(-1);
        fill(this.color);

        // We draw shape and then draw its reflection across Y axis.
        beginShape();
        for (let v of this.heart4) {
            vertex(v.x, v.y);
        }
        endShape();

        const r = 2 - 2 * sin(a) + sin(a) * (pow(abs(cos(a)), 0.5) / (sin(a) + 1.4));
        const x = this.sc * r * cos(a);
        const y = this.sc * r * sin(a);
        this.heart4.push(createVector(x, y));

        // So that it stops
        if (a > 2*PI) {
            noLoop();
        }
        a += 0.01;
    }
}