class Unicorn {
  constructor(w,h) {
    this.w = w;
    this.h = h;
  }
  
  show() {
    
    
    //draw face
    //scale(0.8);
    beginShape();
    vertex(-0.15*this.w, 0.25*this.h);
    //left side of head
    bezierVertex(-0.3*this.w, 0.15*this.h, -0.45*this.w, -0.15*this.h, -0.25*this.w, -0.25*this.h);

    //top of head
    bezierVertex(-0.15*this.w, -0.30*this.h, -0.05*this.w, -0.30*this.h, 0, -0.30*this.h);
    bezierVertex(0.05*this.w, -0.30*this.h, 0.15*this.w, -0.30*this.h, 0.25*this.w, -0.25*this.h);
   //right side of head
    bezierVertex(0.45*this.w, -0.15*this.h, 0.3*this.w, 0.15*this.h, 0.15*this.w, 0.25*this.h);
    //bottom of head
    bezierVertex(0.08*this.w, 0.30*this.h, 0.05*this.w, 0.30*this.h, 0, 0.30*this.h);
    bezierVertex(-0.05*this.w, 0.30*this.h, -0.08*this.w, 0.30*this.h, -0.15*this.w, 0.25*this.h);
    endShape();
    
    //draw eyes
    //fill(100);
    beginShape();
    vertex(0.22*this.w, -0.05*this.h);
     bezierVertex(0.195*this.w, -0.00*this.h,0.105*this.w, -0.00*this.h,0.07*this.w, -0.05*this.h);
    endShape();
    beginShape();
     vertex(-0.22*this.w, -0.05*this.h);
     bezierVertex(-0.195*this.w, -0.00*this.h,-0.105*this.w, -0.00*this.h,-0.07*this.w, -0.05*this.h);
    endShape();
    
    //eyelashes
//     line(0.22*this.w, -0.05*this.h, 0.260*this.w, -0.04*this.h);
//     line(0.18*this.w, -0.01*this.h, 0.200*this.w, 0.01*this.h);
//     line(0.18*this.w, -0.01*this.h, 0.200*this.w, 0.01*this.h);
    
   
    
    
    //draw right ear
    beginShape();
    vertex(0.25*this.w, -0.25*this.h);
    bezierVertex(0.35*this.w, -0.25*this.h, 0.25*this.w, -0.55*this.h,0.10*this.w, -0.3*this.h);
    endShape();
  
     //draw left ear
    beginShape();
    vertex(-0.1*this.w, -0.30*this.h);
    bezierVertex(-0.25*this.w, -0.55*this.h, -0.35*this.w, -0.25*this.h,-0.25*this.w, -0.25*this.h);
    endShape();
    
    //draw horn
//     beginShape();
//     vertex(-0.1*this.w, -0.20*this.h);
//     bezierVertex(-0.10*this.w, -0.55*this.h,0.10*this.w, -0.55*this.h,0.10*this.w, -0.2*this.h);
//     endShape();
//     beginShape();
//     vertex(-0.1*this.w, -0.30*this.h);
//     bezierVertex(-0.10*this.w, -0.15*this.h,0.10*this.w, -0.45*this.h,0.10*this.w, -0.30*this.h);
//     endShape();
    
//      beginShape();
//     vertex(-0.08*this.w, -0.35*this.h);
//     bezierVertex(-0.08*this.w, -0.30*this.h,0.08*this.w, -0.45*this.h,0.04*this.w, -0.40*this.h);
//     endShape();
    
    beginShape();
    vertex(-0.1*this.w, -0.15*this.h);
    bezierVertex(-0.10*this.w, -0.50*this.h,0.10*this.w, -0.50*this.h,0.10*this.w, -0.15*this.h);
    endShape();
    //bottom line
    beginShape();
    vertex(-0.09*this.w, -0.22*this.h);
    bezierVertex(-0.05*this.w, -0.18*this.h,0.10*this.w, -0.30*this.h,0.08*this.w, -0.27*this.h);
    endShape();
    //top line
     beginShape();
    vertex(-0.08*this.w, -0.30*this.h);
    bezierVertex(-0.08*this.w, -0.25*this.h,0.05*this.w, -0.35*this.h,0.06*this.w, -0.35*this.h);
    endShape();
    //draw hair
    // beginShape();
    // vertex(-0.25*this.w, -0.10*this.h);
    // bezierVertex(-0.02*this.w, -0.10*this.h,0.02*this.w, -0.20*this.h,0.1*this.w, -0.2*this.h);
    // bezierVertex(0.02*this.w, -0.3*this.h,-0.02*this.w, -0.20*this.h,-0.25*this.w, -0.10*this.h);
    // endShape();
    beginShape();
    vertex(-0.25*this.w, -0.08*this.h);
    bezierVertex(-0.02*this.w, -0.05*this.h,0.02*this.w, -0.15*this.h,0.1*this.w, -0.15*this.h);
    bezierVertex(0.02*this.w, -0.25*this.h,-0.02*this.w, -0.15*this.h,-0.25*this.w, -0.08*this.h);
    endShape();
    
    //draw nostrils
    ellipse(0.05*this.w, 0.20*this.h, 2,6);
    ellipse(-0.05*this.w, 0.20*this.h, 2,6);
 }
    
}