class TorusKnot {
    constructor(_px, _py, _p, _q, _r, _h, _c) {
        this.beta = 0;
        this.p = _p;
        this.q = _q;
        this.px = _px;
        this.py = _py;
        this.r = _r;
        this.h = _h;
        this.c = _c;
        this.points = [];
    }

    oneKnot() {
        for (let beta = 0; beta < 361; beta += 1) {
            let phi = 8 * beta;
            let theta = 9 * beta;
            let x = this.r * cos(theta) * (this.h + cos(phi));
            let y = this.r * sin(theta) * (this.h + cos(phi));
            let z = this.r * sin(phi);
            if (this.points.length < 361) {
                this.points[beta] = createVector(x, y, z);
            } else {
                break;
            }
        }
    }

    show() {
        push();
        beginShape();
        for (let v of this.points) {
            translate(v.x, v.y, v.z);
            let col = color(this.c);
            fill(col);
            // I am rendering spheres instead of using vertex b/c the
            // colors were not working with stroke
            sphere(this.r);
        }
        endShape();
        pop();
    }
}