class Fish {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.position = createVector(x,y);
    
    this.xoff = 0;
    this.hitEdge = false;
  }
  

   levyFlight() {
     let angle = noise(this.xoff) * PI/8;
    let steer = p5.Vector.fromAngle(angle);
     let r = random(100);
     if (r < 10 ) {
       this.position.x = this.position.x - random(10);
       this.position.y = this.position.y + random(-5,5)
       this.position.add(steer);
       
     } else if ( r <= 20 && r > 10 ) {
     this.position.x = this.position.x - random(20);
     this.position.y = this.position.y 
     this.position.add(-steer);
    } else {
      this.position.x = this.position.x - random(10);
      this.position.y = this.position.y + random(-5,5)
      this.position.add(steer);
      print(this.position.x, this.position.y);
    }
   } 
  
  // Path Following (Complex Path)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/LrnR6dc2IfM
// https://thecodingtrain.com/learning/nature-of-code/5.7-path-following.html

// Path Following: https://editor.p5js.org/codingtrain/sketches/dqM054vBV
// Complex Path: https://editor.p5js.org/codingtrain/sketches/2FFzvxwVt

  
 
   edges() {
       if (this.position.x < 0) {
          scale(-1);
    }
  }


  show()  {
  stroke(235, 52, 125);
  fill(235, 52, 125);
    
    push();
    translate(this.position.x, this.position.y);
    
    //create fish point a
    beginShape();
    vertex(this.x, this.y);
    
  //start body
    let n = noise(this.xoff);
    //b
    bezierVertex((this.x + 0.03*width), (this.y - 0.06*height),(this.x + 0.1125*width),(this.y- 0.17*height), (this.x+ 0.45*width*(1+n/10)),(this.y +0.08*height*(1+n/10))) ;
    

    //c
  bezierVertex((this.x + 0.38*width*(1+n/10)), (this.y + 0.02*height*(1+n/10)), (this.x + 0.50*width*(1+n/10)),(this.y +  0.015*height*(1+n/10)), (this.x+ 0.42*width*(1+n/10)), (this.y - 0.00*height*(1+n/10)));
    //d
   bezierVertex((this.x + 0.49*width*(1+n/10)), (this.y - 0.02*height*(1+n/10)), (this.x + 0.39*width*(1+n/10)),(this.y -  0.027*height*(1+1*n/10)), (this.x+ 0.45*width*(1+n/10)), (this.y- 0.075*height*(1+1*n/10)));
    //5

     bezierVertex((this.x + 0.1*width), (this.y + 0.19*height), (this.x + 0.01*width),(this.y +  0.005*height), this.x, this.y);
    endShape();
    
     //add eyes
  stroke(255);
  fill(255);
  ellipse(this.x+35, this.y-15, 25,25);
  fill(0);
  ellipse(this.x+35, this.y-15, 20,20);
    //scale(0.8);
    //translate(50,20);
  // draw fish marking
  stroke(0);
  fill(0);
  
  beginShape();
  vertex((this.x + 0.30*width),(this.y ));
   bezierVertex((this.x + 0.15*width), (this.y - 0.08*height),(this.x + 0.15*width), (this.y- 0.070*height), (this.x + 0.052*width),(this.y + 0.020*height)) ;
   bezierVertex((this.x + 0.10*width), (this.y + 0.08*height),(this.x + 0.12*width), (this.y- 0.025*height), (this.x + 0.18*width),(this.y - 0.04*height)) ;
   bezierVertex((this.x + 0.25*width), (this.y - 0.04*height),(this.x + 0.28*width), (this.y + 0.025*height), (this.x + 0.30*width),(this.y)) ;
  endShape();
  
    pop();
  }
  
}
