let a = 0;
let n = 0;
let start = 0;

class Flower {
    constructor(_px, _py, _sc, _c) {
        this.px = _px;
        this.py = _py;
        this.a = createVector(this.px, height);
        this.b = createVector(this.px, this.py - this.adj);
        this.adj = 0;
        this.sc = _sc;
        this.points = [];
        this.flowerPoints = [];
        this.c = _c;
        this.c1 = _c[0];
        this.c2 = _c[1];
        this.c3 = _c[2];
    }

    // Reference https://github.com/anuraghazra/CanvasFun/blob/master/LoveHearts/Heart.js
    // We need to loop through flower once before creating object
    oneFlower() {
        // 7560 when angle mode radians
        for (let beta = 0; beta < 7560; beta += 1) {
            let r = 5 * (1 + sin(11 * beta / 5)) - 4 * pow(sin(17 * beta / 3), 4) + pow(sin(2 * cos(3 * beta) - 28 * beta), 8);
            let x = this.sc * r * cos(beta);
            let y = -this.sc * r * sin(beta);
            let p = createVector(x, y);
            if (this.flowerPoints.length < 7560) {
                this.flowerPoints[beta] = p;
            } else {
                break;
            }
        }

    }

    phyllotaxisCenter() {
        let c = map(this.sc, 2, 4, 1, 1.8);
        let adj = map(this.sc, 4, 6, 0.5, 1.8);
        push();
        noStroke();
        fill(this.c3, 200);
        for (let i = 0; i < 60; i++) {
            let a = i * 137.5;
            let r = c * sqrt(i);
            let x = r * cos(a);
            let y = r * sin(a);
            ellipse(x, y, c + adj, c + adj);
        }
        start += 0.1;
        pop();
    }

    show() {
        // Draw flower
        push();
        noFill();
        translate(this.px, this.py);
        beginShape();
        for (let v of this.flowerPoints) {
            fill(this.c1, 50)
            stroke(this.c2, 50);
            strokeWeight(0.1);
            vertex(v.x, v.y);
        }
        endShape();
        this.phyllotaxisCenter();
        pop();
    }
}