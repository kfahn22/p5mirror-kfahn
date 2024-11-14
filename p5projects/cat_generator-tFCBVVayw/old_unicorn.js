class Unicorn {
  constructor(x,y,r) {
    this.x = 0;
    this.y = 0;
    this.rw = 205;
    this.rh = 205;
  }
  
  show() {
    //draw face
    ellipse(this.x,this.y,this.r/2,this.r);
    
    //draw eyelashes
    strokeWeight(5);
    //centerpoint of ellipse that defines eyelashes
    let cx = width/15;
    let cy = height/15;
    
    arc(-cx,-cy, width/20, height/25, 0, 180, OPEN);
    arc(cx,-cy, width/20, height/25, 0, 180, OPEN);
    //translate(cx,-cy);
    circle(0.066*width, -0.075*height, 2);
    //line(0.05*width,-height/25, 10);
     //line(width/20*cos(30), height/25*sin(30), width/20*cos(30), width/20*sin(30));
    // line(this.r/3*cos(180), this.r/3*sin(180), 0.6*this.r*cos(180), 0.6*this.r*sin(180));
    //  line(this.r/3*cos(190), this.r/3*sin(190), 0.6*this.r*cos(190), 0.6*this.r*sin(190));
    
    //draw right ear
    beginShape();
    vertex(this.r/3*cos(-55), this.r/3*sin(-57));
    bezierVertex(0.17*width, -0.14*height, 0.333* width,-0.55 * height,0.35 * this.r*cos(-74), 0.45 * this.r*sin(-79));
    endShape();
    
    //draw left ear
     beginShape();
    vertex(0.35*this.r * cos(-106), 0.45*this.r*sin(-101));
    bezierVertex(-0.333* width,-0.55 * height,-0.17*width, -0.14*height, this.r/3*cos(-125), this.r/3*sin(-127));
    endShape();
    
     // draw nose
    // nostrils
    circle(0.05*width, 0.15*height, 5);
    circle(-0.05*width, 0.15* height, 5);
    // arc
    translate(0, 0.3*this.r);
    arc(0, 0, 0.25 * width, 0.2 * height, -160, -380, OPEN);
    //circle(this.r/2*cos(-81), this.r/2*sin(-81), 10);
    translate(0,-this.r/4);   
    
    
    //draw hair
    
    
    //draw horn
    scale(1.1);
    beginShape();
    vertex(this.r/2*cos(-81), this.r/2*sin(-81));
    bezierVertex(0.02*width, -0.20*height,-0.05*width, -0.28*height,this.r/2*cos(-100),this.r/2*sin(-100));
    bezierVertex(-0.02*width, -0.31*height,0.05*width, -0.24*height,this.r/2*cos(-81), this.r/2*sin(-81));
    endShape();
    scale(0.81);
    translate(0, -height/11);
    beginShape();
    vertex(this.r/2*cos(-81), this.r/2*sin(-81));
    bezierVertex(0.02*width, -0.20*height,-0.05*width, -0.28*height,this.r/2*cos(-100),this.r/2*sin(-100));
    bezierVertex(-0.02*width, -0.31*height,0.05*width, -0.24*height,this.r/2*cos(-81), this.r/2*sin(-81));
    endShape();
    scale(0.81);
    translate(0, -height/11);
    beginShape();
    vertex(this.r/2*cos(-81), this.r/2*sin(-81));
    bezierVertex(0.02*width, -0.20*height,-0.05*width, -0.28*height,this.r/2*cos(-100),this.r/2*sin(-100));
    bezierVertex(-0.02*width, -0.31*height,0.05*width, -0.24*height,this.r/2*cos(-81), this.r/2*sin(-81));
    endShape();
    scale(0.81);
    translate(0, -height/11);
    beginShape();
    vertex(this.r/2*cos(-81), this.r/2*sin(-81));
    bezierVertex(0.02*width, -0.20*height,-0.05*width, -0.28*height,this.r/2*cos(-100),this.r/2*sin(-100));
    bezierVertex(-0.02*width, -0.31*height,0.05*width, -0.24*height,this.r/2*cos(-81), this.r/2*sin(-81));
    endShape();
    scale(0.81);
    translate(0, -height/11);
    beginShape();
    vertex(this.r/2*cos(-81), this.r/2*sin(-81));
    bezierVertex(0.02*width, -0.20*height,-0.05*width, -0.28*height,this.r/2*cos(-100),this.r/2*sin(-100));
    bezierVertex(-0.02*width, -0.31*height,0.05*width, -0.24*height,this.r/2*cos(-81), this.r/2*sin(-81));
    endShape();
    scale(0.81);
    translate(0, -height/11);
    beginShape();
    vertex(this.r/2*cos(-81), this.r/2*sin(-81));
    bezierVertex(0.02*width, -0.20*height,-0.05*width, -0.28*height,this.r/2*cos(-100),this.r/2*sin(-100));
    bezierVertex(-0.02*width, -0.31*height,0.05*width, -0.24*height,this.r/2*cos(-81), this.r/2*sin(-81));
    endShape();
    scale(0.81);
    translate(0, -height/11);
    beginShape();
    vertex(this.r/2*cos(-81), this.r/2*sin(-81));
    bezierVertex(0.02*width, -0.20*height,-0.05*width, -0.28*height,this.r/2*cos(-100),this.r/2*sin(-100));
    bezierVertex(-0.02*width, -0.31*height,0.05*width, -0.24*height,this.r/2*cos(-81), this.r/2*sin(-81));
    endShape();
    scale(0.81);
    translate(0, -height/11);
    beginShape();
    vertex(this.r/2*cos(-81), this.r/2*sin(-81));
    bezierVertex(0.02*width, -0.20*height,-0.05*width, -0.28*height,this.r/2*cos(-100),this.r/2*sin(-100));
    bezierVertex(-0.02*width, -0.31*height,0.05*width, -0.24*height,this.r/2*cos(-81), this.r/2*sin(-81));
    endShape();
   scale(0.81);
    translate(0, -height/11);
    beginShape();
    vertex(this.r/2*cos(-81), this.r/2*sin(-81));
    bezierVertex(0.02*width, -0.20*height,-0.05*width, -0.28*height,this.r/2*cos(-100),this.r/2*sin(-100));
    bezierVertex(-0.02*width, -0.31*height,0.05*width, -0.24*height,this.r/2*cos(-81), this.r/2*sin(-81));
    endShape();
  
  }
  
}