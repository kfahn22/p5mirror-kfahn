class Paddle {
    constructor(isLeft) {
        this.y = height/2;
        this.w = 25;
        this.h = 150;
        this.ychange = 0;
        
        if (isLeft) {
            this.x = this.w;
        } else {
            this.x = width - this.w;
        }
        
        
    }
    
    update() {
        this.y += this.ychange;
        this.y = constrain(this.y, this.h/2, height-this.h/2);
    }
    
    move(steps) {
        this.ychange = steps;
    }
    
    show() {
        noStroke();
        fill(236,1,90);
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);
    }
}
