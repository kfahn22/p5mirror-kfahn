class Heart2 {
    constructor(_px, _py, _sc) {
        this.px = _px;
        this.py = _py;
        this.sc = _sc;
        this.color = color(random(255), random(255), random(255));
        this.heart2 = [];
    }

    show() {
        translate(this.px, this.py);
        noStroke(255);
        strokeWeight(2);
        fill(this.color);
        scale(-1);
        // We draw shape and then draw its reflection across Y axis.
        rotate(-PI/18);
        beginShape();
        for (let v of this.heart2) {
            vertex(v.x, v.y);
        }
        endShape();
        rotate(PI / 9);
        beginShape();
        for (let v of this.heart2) {
            vertex(-v.x, v.y);
        }
        endShape();

        if (a > PI/3) // added this constraint to eliminate weird tail at bottom of curve
        {const r = this.sc * (1-abs(a))*(1+2*abs(a)) ;
        const x = r* cos(a/2)*sin(a);
        const y = -r* sin(a);
        this.heart2.push(createVector(x, y));}

        // So that it stops
        if (a > PI) {
            noLoop();
        }
        a += 0.01;
    }
}