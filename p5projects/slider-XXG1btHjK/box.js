//let wslider;
//let hslider;
let w=50;
let h=100;

class Box {
  constructor(x,y,mb,w,c, slider) {
  this.x = 0;
  this.y = 100;
  this.mb = false;
  this.w = 50;
  // this.h = 100;
  this.c = 0;
  this.slider =null;
  }
  
   inshape(x,y) {
   
    // if ((x > this.x && x < this.x + this.w) && 
    //    y > this.y && y < this.y + this.h) {
      if ((x > this.x && x < this.x + w) && 
       y > this.y && y < this.y + h) {
      this.c = 200;
      this.mb = true;
      //this.slider = createSlider(10,50,25);
      //this.w = slider.value();
    }
  }
  
  adjust() {
         if (this.mb === true) {
             let slider = createSlider(10,50,25);
             this.mb = false;
         }
}

   unclicked(x,y) {
   
    if ((mouseX < this.x || mouseX > this.x + w) || 
       mouseY < this.y || mouseY > this.y + h) {
      this.c = 255;
      this.s = null;
      //wslider.remove();
      //hslider.remove();
    }
  }

  
  show() {
    fill(this.c);
    rect(this.x,this.y,w,h);
  }
}