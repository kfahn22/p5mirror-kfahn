class Frame {
  
  constructor(x,y,img) {
    this.x = x;
    this.y = y;
    this.bell = img;
  }
  
  move() {
    this.x = this.x - 2;
    // if (this.x < 0) {
    //   this.x = width;
    // }
    
  }
  show() {
    rectMode(CENTER);
  //rect(this.x,this.y, width*3, height*0.2);
    
    image(this.bell, this.x, this.y, width*0.3, height* 0.25);
    
  }
  
  }