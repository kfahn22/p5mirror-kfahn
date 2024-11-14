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

    // https://github.com/anuraghazra/CanvasFun/blob/master/LoveHearts/Heart.js
    // Reference for this function
    // We need to loop trhough torus knot before creating object
    oneKnot() {
        // 630 when angle mode radians
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
        noFill();
        translate(this.px, this.py);
        // translate(0, height/2);
        beginShape();
        for (let v of this.points) {
            translate(v.x, v.y, v.z);
            let col = color(this.c);
            stroke(col, 255);
            vertex(v.x, v.y, v.z);
        }
        endShape();
        pop();
    }

    showSphere() {
        push();
        noStroke();
        // this adjustment only works for num = 5 
        let n = 3;
        let adj = this.py/this.r;
        //translate(this.px, this.py-n*this.r,0);
        translate(this.px, this.py, -10);
        push();
        beginShape();
        for (let v of this.points) {
            //let d = pow((v.x * v.x + v.y * v.y), 0.5);
           // let adjy = v.y / 2; // can add some really different looks this way
           translate(v.x, v.y, v.z);
            //translate(v.x+d, v.y-d, v.z); // straightens out the curve of spheres

            let col = color(this.c);
            fill(col);
            sphere(this.r);
            
        }
        endShape();
        pop();
        pop();
    }
}