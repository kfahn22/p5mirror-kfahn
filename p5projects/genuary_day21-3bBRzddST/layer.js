 
class Layer {
  
  constructor(x,y, img) {
    this.x = 0;
    this.y = 0;
    this.sand = img;
  }
  
  addLayer(w,a) {
    
    //NW corner
    push();
    translate(-(0-a)*w,-(1+a)*w);
    rotate(0);
    
    rect(this.x,this.y, 2*w, w);
    image(sand[int(random(10))], this.x, this.y, 2*w, w);
    pop();

    // north connector blocks
    for (let j=2;j<2*a+1;j+=2) {
      push();
      translate((a-j)*w,-(1+a)*w);
      rotate(0);
      //fill(c);
      rect(this.x,this.y,2*w,w);
       image(sand[int(random(10))], this.x, this.y, 2*w, w);
      pop();
    }

    //NE corner
    push();
    translate((a+2)*w,-a*w);
    rotate(90);
   // fill(c);
    rect(this.x,this.y,2*w,w);
    image(sand[int(random(10))], this.x, this.y, 2*w, w);
    pop(); 


    // east connector blocks
    for (let j=0;j<a;j++) {
      push();
      translate((2+a)*w,(a-2*j)*w);
      rotate(90);
      //fill(c);
      rect(this.x,this.y,2*w,w);
      image(sand[int(random(10))], this.x, this.y, 2*w, w);
      pop();
      }

    //south east corner
    push();
    translate((a+1)*w,(a+2)*w);
    rotate(180); 
   // fill(c);
    rect(this.x,this.y,2*w,w);
    image(sand[int(random(10))], this.x, this.y, 2*w, w);
    pop(); 

    // south connector blocks
    for (let j=1;j<2*a;j+=2) {
      push();
      translate((1*j-a)*w,(a+2)*w);
      rotate(180);
      //fill(c);
      rect(this.x,this.y,2*w,w);
      image(sand[int(random(10))], this.x, this.y, 2*w, w);
      pop();
    }

    //SW corner
    push();
    translate(-(a)*w,(a+1)*w);
    rotate(180);
    //fill(c);
    rect(this.x,this.y,w,2*w);
     image(sand[int(random(10))], this.x, this.y, w, 2*w);
    pop();

    // west connector blocks
    for (let j=1;j<2*a;j+=2) {
      push();
      translate((-a)*w,(1*j-a)*w);
      rotate(180);
     // fill(c);
      rect(this.x,this.y,w,2*w);
      image(sand[int(random(10))], this.x, this.y, w, 2*w);
      pop(); 
    }
  }
} 

// class Frame {
  
//   constructor(x,y,img) {
//     this.x = x;
//     this.y = y;
//     this.bell = img;
//   }
  
//   move() {
//     this.x = this.x - 2;
//     // if (this.x < 0) {
//     //   this.x = width;
//     // }
    
//   }
//   show() {
//     rectMode(CENTER);
//    // rect(this.x,this.y, width*3, height*0.2);
    
//     image(this.bell, this.x, this.y, width*0.3, height* 0.25);
    
    
//   }
  
//   }
