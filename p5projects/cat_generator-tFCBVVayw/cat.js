class Cat {
  constructor(w,h) {
    this.w = w;
    this.h = h;
  }
  
  show() {
    
    
    //draw face
    
    beginShape();
    vertex(-0.20*this.w, 0.25*this.h);
    //left side of head
    bezierVertex(-0.45*this.w, 0.15*this.h, -0.30*this.w, -0.15*this.h, -0.20*this.w, -0.25*this.h);

    //top of head
    bezierVertex(-0.15*this.w, -0.30*this.h, -0.05*this.w, -0.30*this.h, 0, -0.30*this.h);
    bezierVertex(0.05*this.w, -0.30*this.h, 0.15*this.w, -0.30*this.h, 0.20*this.w, -0.25*this.h);
   //right side of head
    bezierVertex(0.30*this.w, -0.15*this.h, 0.45*this.w, 0.15*this.h, 0.20*this.w, 0.25*this.h);
    //bottom of head
    bezierVertex(0.10*this.w, 0.30*this.h, 0.05*this.w, 0.30*this.h, 0, 0.30*this.h);
    bezierVertex(-0.05*this.w, 0.30*this.h, -0.10*this.w, 0.30*this.h, -0.20*this.w, 0.25*this.h);
    endShape();
    
    //draw eyes
    //fill(100);
    beginShape();
    vertex(0.10*this.w, -0.05*this.h);
    bezierVertex(0.125*this.w, -0.10*this.h,0.175*this.w, -0.10*this.h,0.20*this.w, -0.05*this.h);
     bezierVertex(0.175*this.w, -0.00*this.h,0.125*this.w, -0.00*this.h,0.10*this.w, -0.05*this.h);
    endShape();
    ellipse(0.15*this.w, -0.05*this.h, 5,15);
    
    beginShape();
    vertex(-0.10*this.w, -0.05*this.h);
    bezierVertex(-0.125*this.w, -0.10*this.h,-0.175*this.w, -0.10*this.h,-0.20*this.w, -0.05*this.h);
     bezierVertex(-0.175*this.w, -0.00*this.h,-0.125*this.w, -0.00*this.h,-0.10*this.w, -0.05*this.h);
    endShape();
    ellipse(-0.15*this.w, -0.05*this.h, 5,15);
    //draw right ear
    beginShape();
    vertex(0.20*this.w, -0.25*this.h);
    bezierVertex(0.25*this.w, -0.45*this.h, 0.20*this.w, -0.45*this.h,0.05*this.w, -0.30*this.h);
    endShape();
  
     //draw left ear
    beginShape();
    vertex(-0.05*this.w, -0.30*this.h);
    bezierVertex(-0.20*this.w, -0.45*this.h, -0.25*this.w, -0.45*this.h,-0.20*this.w, -0.25*this.h);
    endShape();
    
//     //draw left whiskers
    let r = 0.7*this.w;
    //circle(0,0,0.7*width);
     line(-0.075*this.w, 0.08*this.h, -0.375*this.w, 0.04*this.h);
     line(-0.075*this.w, 0.10*this.h, -0.375*this.w, 0.10*this.h);
     line(-0.075*this.w, 0.12*this.h, -0.375*this.w, 0.16*this.h);
    // //draw right whiskers
     line(0.075*this.w, 0.08*this.h, 0.375*this.w, 0.04*this.h);
    line(0.075*this.w, 0.10*this.h, 0.375*this.w, 0.10*this.h);
    line(0.075*this.w, 0.12*this.h, 0.375*this.w, 0.16*this.h);
    
    // draw nose
    beginShape()
    vertex(0,0.05*this.h);
    bezierVertex(0.1*this.w, 0.125*this.h,-0.1*this.w, 0.125*this.h,0.00*this.w, 0.05*this.h);
    endShape();
    
    //draw mouth
    beginShape();
    vertex(0,0.12*this.h);
    bezierVertex(-0.01*this.w, 0.20*this.h, 0.05*this.w, 0.20*this.h, 0.075*this.w, 0.175*this.h);
    endShape();
       beginShape();
    vertex(0,0.12*this.h);
    bezierVertex(0.01*this.w, 0.20*this.h, -0.05*this.w, 0.20*this.h, -0.075*this.w, 0.175*this.h);
    endShape();
 }
    
}