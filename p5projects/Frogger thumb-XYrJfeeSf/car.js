class Car extends Rectangle {

    constructor(x, y, width, height, speed, clr) {
        super(x, y, width, height);
        this.speed = speed;
        this.col = clr;
    }

    show(){
      fill(this.col);
      rect(this.x, this.y, this.width, this.height);
    }

    update(){
       this.x += this.speed;

       if(this.speed > 0 && this.x > width+grid){
           this.x = - this.width - grid;
       } else if(this.speed < 0 && this.x < -this.width-grid){
            this.x = width + grid;
       }
    }

}
