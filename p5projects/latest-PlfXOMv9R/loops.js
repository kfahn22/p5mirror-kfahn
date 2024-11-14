
 class Loop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
   
    this.color = (0);
  }

   singleLoop(a=100,b=100,c=0.85,d=5) {
      translate(0.5*a, 0);
      beginShape();
      stroke(this.color);
      strokeWeight(1);
      fill(this.color);
      vertex(a,0);
      bezierVertex(0,0, 0,b, 0.5*a, b);
      bezierVertex(0.5*a,b, 0.5*a, b, 0.5*a, b-d);
      bezierVertex((1-c)*a, b, (1-c)*a,0, a, 0);
      endShape(CLOSE);
      beginShape();
      vertex(0,0);
      bezierVertex(a, 0, a, b, 0.5*a,b);
      bezierVertex(0.5*a,b, 0.5*a, b, 0.5*a, b-d);
      bezierVertex(c*a, b, c*a, 0, 0,0);
      endShape(CLOSE);
   }
   
  upLoops(a=100,b=100,c=1.1, d=0.85, e =0.9) {
      beginShape();
      stroke(this.color);
      strokeWeight(1);
      fill(this.color);
      vertex(0,0);
      bezierVertex(1.25*a,0,  1.25*a, 2*b, 0.5 * a, 2 * b);
      bezierVertex(0, 2*b, 0, b, a, b);
      bezierVertex(1.01*a, b, 1.03*a, b, c*a, b);
      bezierVertex(2*(c*a), b, 2 * c*a, 2*b, 1.5*c*a, 2 *b);
      bezierVertex(0.75 *c*a, 2*b, 0.75*c*a, 0, 2*c*a, 0);
      a += 1;
      b -= 1;
      // d/e determines width of outer/inner loop depending on position
      // e determines width of inner loop
      bezierVertex(d*c*a, 0, d*c*a, 2*b, 1.5*c*a, 2*b);
      // fraction multiplied by b determines width of outer part of loop
      bezierVertex((1+e) * c*a, 2*b, (1+e) * c*a, b, c*a, b);
      bezierVertex(1.03*a, b, 1.01*a, b, c*a, b);
      bezierVertex((1-e) *a, b, (1-e) * a, 2*b,0.5 * c*a, 2 * b);
      bezierVertex((2-d)*a*0.95, 2*b, (2-d)*a*0.95, 0, 1, 1);
      
      translate(1,-1);
      endShape();
    // stroke(255,0,0);
    // circle(0.5 * c*a, 2 * b,20);
 }
   
}

 // singleLoop(a=-7, b=4) {
 //    beginShape();
 //    fill(0,255,255);
 //    vertex(-3,0);
 //    bezierVertex(10*a, -10*b, -10 * a, -10 * b, 3, 0);
 //    //adjust inside curve
 //     a = 1.35*a;
 //     b = 1.1*b;
 //    bezierVertex(-10*a, -10*b, 10 * a, -10 * b, -3, 0);
 //    endShape(CLOSE);
 //  }