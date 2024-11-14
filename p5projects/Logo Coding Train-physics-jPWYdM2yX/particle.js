class Particle extends VerletParticle2D {
    constructor(x, y, _type, _img) {
        super(x, y);
        this.r = 8;
        this.type = _type;
        this.img = _img;
        physics.addParticle(this);
    }

    show() {
        if (this.type == 1) {
            fill(255);
            stroke(0);
            strokeWeight(0.4);
            ellipse(this.x, this.y, this.r * 1.8, this.r * 1.8);
            fill(0);
            stroke(0)
            ellipse(this.x-2, this.y, 5, 5);
        } else if (this.type == 2) {
            //fill(int(random(250, 255)), int(random(235, 245)), int(random(135, 140)), int(random(255)));
            image(this.img, this.x, this.y, 8, 8);
        }
    }
}