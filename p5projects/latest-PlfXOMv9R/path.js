class Labyrinth {
  
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.color = 0;
  }
  
  show(w=50, h=5, c=90) {
      stroke(this.color);
      fill(this.color);
      angleMode(DEGREES);
      rect(0,0,w,h);//1
      translate(w,0);
      rotate(c);
      rect(0,0,w*2/3,h);//2
      rotate(-c);
      translate(0,w*2/3-h);//3
      rect(0,0,w*7/6,h);
      translate(w*7/6-h,0);//4
      rotate(-c);
      rect(0,0,w*8/7,h);//5
      translate(w*8/7+h,0);
      rotate(c);
      rect(0,0,w*2/3,h);//6
      translate(w*2/3+h,0);
      rotate(c);
      rect(0,0,w*2/3,h);//7
      translate(w*2/3+h,0);
      rotate(c);
      rect(0,0,w*4/3,h);//8
      translate(w*4/3+h,0);
      rotate(c);
      rect(0,0,w*5/4,h);//9
      translate(w*5/4+h,0);
      rotate(c);
      rect(0,0,w*10/4,h);
      translate(w*10/4+h,0);
      //rotate(c);
      // rect(0,0,w*7.5/4,h);
      // translate(w*7.5/4+h,0);
      // stroke(255,0,0);//
      // rotate(c);
      // rect(0,0,w*4/5,h);
      // translate(w*4/5+h,0);
      // rotate(c);
      // rect(0,0,w*6.5/5,h);
      // translate(w*6.5/5+h,0);
      // rotate(c);
      // rect(0,0,w*9.5/5,h);
      // translate(w*9.5/5-h,0);
      // rotate(-c);
      // rect(0,0,w*2.0/5,h);//
      // translate(w*2.0/5+h,h);
      // rotate(-c);
      // rect(0,0,w*3.0/5,h);
      // translate(w*2.5/5+h,h);
      // rotate(-c);
      // rect(0,0,w*6.0/5,h);
      // translate(w*6/5,h);
      // rotate(-c);
      // rect(0,0,w*9.50/5,h);//copy to here
      // translate(w*9.5/5,h);
      // rotate(-c);
      // rect(0,0,w*5.50/5,h);
      // translate(w*5.5/5,h);
      // rotate(-c);
      // rect(0,0,w*4.00/5,h);
      // translate(w*4/5-h,h);
      // rotate(-c);
      // rect(0,0,w*2.5/5,h);
      // translate(w*2/5+h,h);
      // rotate(-c);
      // rect(0,0,w*9.0/5,h*1/5);
      // translate(w*9/5,0);
      // rotate(-c);
      // rect(0,0,w*2.50/5,h*5/5);
      // translate(w*2.5/5-h,0);
      // rotate(-c);
      // rect(0,0,w*3.00/5,h*5/5);
      // stroke(10,255,255);
      // translate(w*3.0/5-h,0);
      // rotate(-c);
      // rect(0,0,w*5.50/5,h*5/5);
      // translate(w*5.5/5,0);
      // rotate(-c);
      // rect(0,0,w*6.50/5,h*1/5);
      // translate(w*6.5/5,0);
  }
}