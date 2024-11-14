// The leaf is an adaption of the cannibus curve
// let r  = this.sc * (1 + 7/10 * cos(4 * beta))*(1 + 1/10 * cos(8*beta))*(5/10 + 0.06 * cos(40*beta)) * (1 + sin(4*beta));

class Leaf {
   
       constructor( _px, _py, _sc) {
        this.px = _px;
        this.py = _py;
        this.sc = _sc;
        this.points = [];
    }

    // We need to loop trhough curve once before creating object
    oneLeaf() {
        // 7560 when angle mode radians
        for (let beta = 0; beta < 360; beta += 1) {
            //let r  = 90 * (1 + 7/10 * cos(4 * beta))*(1 + 1/10 * cos(12*beta))*(9/10 + 1/10 * cos(50*beta)) * (1 + sin(beta));
            let r = this.sc * (1 + 1 * cos(1 * beta)) * (1 + 2 / 10 * cos(7 * beta)) * (5 / 10 + 0.06 * cos(50 * beta)) * (1 + sin(beta));
            let x = r * cos(beta);
            let y = -r * sin(beta);
            let p = createVector(x, y);
            if (this.points.length < 360) {
                this.points[beta] = p;
            } else {
                break;
            }
        }

    }

    renderLeaf(angle) {
        strokeWeight(2);
        stroke(38,115,38, 220);
        fill(45, 134, 45, 210);
        push();
        translate(this.px, this.py);
        rotate(angle);
        beginShape();
        for (let v of this.points) {
            vertex(v.x, v.y);
        }
        endShape();
        pop();
    }
}