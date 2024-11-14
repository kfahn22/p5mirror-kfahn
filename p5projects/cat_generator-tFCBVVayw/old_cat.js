class Catz {
  constructor(x,y,r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
  
//   lfeye() {
//     let lfeye = circle(this.x-this.r/2, this.y+this.r/2, 20);
//   }
  
  rteye() {
    let rteye = circle(this.x+this.r/2, this.y+this.r/2, 20);
  }
  
  smile() {
      let sm = arc(this.x,this.y, this.r/4,this.r/4, 10, 2/3*PI,OPEN);
  }
  
   whiskers() {
     
   }
  
  show() {
    circle(this.x,this.y,this.r);
    //fill(100);
    strokeWeight(5);
    circle(-width/10, -height/10, 30);
    circle(width/10, -height/10, 30);
    
    //draw right ear
    line(this.r/2*cos(-45), this.r/2*sin(-45), width/4,-0.4 * height);
    line(width/4, -0.4 * height, this.r/2*cos(-65), this.r/2*sin(-65));
    //draw left ear
    line(this.r/2*cos(-135), this.r/2*sin(-135), -width/4, -0.4 * height);
    line(-width/4, -0.4 * height, this.r/2*cos(-115), this.r/2*sin(-115));
    //draw left whiskers
    line(this.r/3*cos(170), this.r/3*sin(170), 0.6*this.r*cos(170), 0.6*this.r*sin(170));
    line(this.r/3*cos(180), this.r/3*sin(180), 0.6*this.r*cos(180), 0.6*this.r*sin(180));
     line(this.r/3*cos(190), this.r/3*sin(190), 0.6*this.r*cos(190), 0.6*this.r*sin(190));
    //draw right whiskers
    line(this.r/3*cos(-10), this.r/3*sin(-10), 0.6*this.r*cos(-10), 0.6*this.r*sin(-10));
    line(this.r/3*cos(0), this.r/3*sin(0), 0.6*this.r*cos(0), 0.6*this.r*sin(0));
     line(this.r/3*cos(10), this.r/3*sin(10), 0.6*this.r*cos(10), 0.6*this.r*sin(10));
    // draw mouth
    scale(1.2);
    triangle(0,0, width/30, height/25, -width/30, height/25);
    line(0,height/25,0,height/12.5);
    translate(width/30,height/12.5);
    arc(0,0, width/20, height/25, 0, 180, OPEN);
    translate(-2*width/30,0);
    arc(0,0, width/20, height/25, 0, 180, OPEN);
   
  }
  
}