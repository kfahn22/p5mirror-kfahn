class Goldfish {
    constructor(x, y, a, color) {
        this.x = x;
        this.y = y;
        this.a = a;
        this.color = color;
        // this.tx = tx;
        // this.ty = ty;
    }

  
  
  move() {
    angleMode(RADIANS);
    let increment = TWO_PI / 180;
    let angle = 0;
    
    let x = map(sin(angle), -1, 1, -0.1, -0.5);
    angle -= increment;
    this.x = this.x + x;
    
   //this.x = this.x - 1;
   this.y += random(-1,1);
    if (this.x < 0) {
      this.x = width;
    }
  }
  
    show() {
        angleMode(DEGREES);
        fill(this.color);
        stroke(0);
        strokeWeight(1);
        // rectMode(CENTER);

        function drawHead(a) {
            rectMode(CENTER);
            push();
            rotate(-45);
            triangle(0, 0, 2 * a, 0, 0, 2 * a);
            pop();
        }

        function drawBody(a) {
           
            push();
            translate(2 * a, -1 * a);
            square(0, 0, a);
            pop();


            push();
            translate(1.5 * a, -0.5 * a);
            triangle(0, 0, a, 0, 0, a);
            pop();

            push();
            translate(2.5 * a, 1.5 * a);
            triangle(0, 0, -a, 0, 0, -a);
            pop();

            push();
            translate(2 * a, 0.5 * a);
            rotate(90);
            shearX(45);
            rect(0, 0, a, a);
            pop();

            push();
            translate(4 * a, 0);
            rotate(135);
            triangle(0, 0, 2 * a, 0, 0, 2 * a);
            pop();
        }

        function drawTail(a) {
            push();
            translate(4 * a, 0);
            triangle(0, 0, a, -a, a, a);
            pop();
        }

        // draw goldfish
        push();
      strokeWeight(3);
      stroke(255,166,43);
        translate(this.x, -this.y);
        drawHead( this.a);
        drawBody(this.a);
        drawTail( this.a);
        //draw eyes
        stroke(0);
      fill(0);
        circle(this.a / 2, -this.a / 4, width * 0.005);
        pop();
    }
}