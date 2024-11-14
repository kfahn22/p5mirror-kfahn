class Ophiuride {
    constructor(_px, _py, _a, _b, _sc, _rot, _c, _st) {
        this.px = _px;
        this.py = _py;
        this.a = _a;
        this.b = _b;
        this.sc = _sc;
        this.points = [];
        this.rot = _rot;
        this.st = _st;
        this.c = _c;
        this.col = color(this.c);
    }

    // https://github.com/anuraghazra/CanvasFun/blob/master/LoveHearts/Heart.js
    // Reference for this function
    // We need to loop trhough flower once before creating object
    oneCurve() {
        // 7560 when angle mode radians
        for (let theta = -170; theta < 170; theta += 1) {
            // Equations for ophiuride curve
            let r = ( this.b * sin(theta) -  this.a * cos(theta) ) * tan(theta);
            let x = this.sc * r * cos(theta);
            let y = -this.sc * r * sin(theta);
            let p = createVector(x, y);
            if (this.points.length < 180) {
                this.points[theta] = p;
            } else {
                break;
            }
        }

    }


    show(rot) {
        push();
        noFill();
        translate(this.px, this.py);
        rotate(this.rot);
        beginShape();
        for (let v of this.points) {
            strokeWeight(this.st);
               stroke(this.col);
               vertex(v.x, v.y);
        }
        endShape();
        pop();
    }
}