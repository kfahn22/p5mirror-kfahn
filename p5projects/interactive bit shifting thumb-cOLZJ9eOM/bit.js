class Bit {

  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.diameter = d;
    this.state = false;
  }
  
  setState(state) {
    this.state = Boolean(parseInt(state)); 
  }
  
  toggle(x,y) {
   	let d = dist(x,y,this.x,this.y);
    if (d < this.diameter/2) {
     	this.state = !this.state; 
    }
  }


  show() {
    //stroke(241, 97, 100);
    noStroke();
    //strokeWeight(2);
    let c1 = color(241, 97, 100);
    let c2 = color(255);
     fill(this.state ? c2 : c1);
    //fill(this.state ? 255 : 51);
    ellipse(this.x, this.y+ 50, this.diameter);
  }



}