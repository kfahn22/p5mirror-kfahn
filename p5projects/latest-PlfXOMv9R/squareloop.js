class SqLoop {
  constructor(x,y) {
    this.x = 0;
    this.y = 0;
    this.color = 0;
  }
  
  leftLoop(a= 5, b = 2, c=5, d=20, e=35, f = 45, g = 10, h = 10, i = 0.95) {
    
    stroke(this.color);
    fill(this.color);
    //need to ensure that 2*(b+d+e) = a + c + f if want to keep square shape
    //h distance from (0,0) to base of loop
    //a(c) bottom(top) of loop
    //b(d) inner(outer) part of loop
    //e(f) inner width(height) of loop
    //g distance between loops
    let j = b + d + e;
    let k = a + c + f;
    
    beginShape();
    
      vertex(0, 0);  //1
      vertex(0, h); //2 
      vertex(0,h+a); //3
      vertex(0, h+k);  //4
      vertex(-j, h+k); //5
      vertex(-j, h) //6
      vertex(-b,h);  //7,17
      vertex(0,h); //8 ,2
      vertex(g,h);  //9
      vertex(g,h+a);  //10
      vertex(0,h+a); //11
      vertex(-b,h+a); //12,16
      vertex(-b-e,h+a);  //13
      vertex(-b-e,h+a+f);  //14
      vertex(-b, h+a+f);  //15
      vertex(-b,h+a); // 16
      vertex(-b,h);  // 17
      vertex(-b,0);  //18 
      vertex(0, 0); //19
      endShape(CLOSE);
  }
  
  rightLoop(a= 5, b = 2, c=5, d=20, e=35, f = 45, g = 10, h = 10, i = 0.95) {
    
    stroke(this.color);
    fill(this.color);
    //need to ensure that 2*(b+d+e) = a + c + f if want to keep square shape
    //h distance from (0,0) to base of loop
    //a(c) bottom(top) of loop
    //b(d) inner(outer) part of loop
    //e(f) inner width(height) of loop
    //g distance between loops
    let j = b + d + e;
    let k = a + c + f;
    
    beginShape();
    
      vertex(0, 0);  //1
      vertex(0,h); //2 ,8
      vertex(0,h+a); //3
      vertex(0, h+k);  //4
      vertex(j,h+k); //5
      vertex(j,h) //6
      vertex(b,h);  //7
      vertex(0,h); //8 ,2
      vertex(-g,h);  //9
      vertex(-g,h+a);  //10
      vertex(0,h+a); //11
      vertex(b, h+a); //12
      vertex(b+e, h+a);  //13
      vertex(b+e, h+a+f);  //14
      vertex(b, h+a+f);  //15
      vertex(b, h+a); // 16
      vertex(b,0);  // 17
      vertex(0, 0); //18
      endShape(CLOSE);
  }
  
  doubleSqLoop(a= 5, b = 2, c=5, d=20, e=35, f = 45, g = 10, h = 10, i = 0.95) {
    stroke(this.color);
    fill(this.color);
    //need to ensure that 2*(b+d+e) = a + c + f if want to keep square shape
    //h distance from (0,0) to base of loop
    //a(c) bottom(top) of loop
    //b(d) inner(outer) part of loop
    //e(f) inner width(height) of loop
    //g distance between loops
    let j = b + d + e;
    let k = a + c + f;
    
    beginShape();
    
      vertex(0, 0);  //1
      vertex(0, h); //2 same as 28
      vertex(0,h+a); //3,25 
      vertex(0, h+k);  //4
      vertex(-j, h+k); //5
      vertex(-j, h) //6
      vertex(-b,h);  //7,31
      vertex(0,h); //8 ,2
      vertex(g,h);  //9,15
      vertex(g+b,h);  //10, 18
      vertex(g+j,h); //11
      vertex(g+j,h+k); //12
      vertex(g, h+k);  //13
      vertex(g,h+a);  //14, 24
      vertex(g,h);  //15
      vertex(g, 0); // 16
      vertex(g+b,0);  // 17
      vertex(g+b, h);  //18 
      vertex(g+b, h+a); //19,23
      vertex(g+b, h+a+f); //20
      vertex(g+b+e, h+a+f); // 21
      vertex(g+b+e, h+a); // 22
      vertex(g+b, h+a); // 23
      vertex(g,h+a); // 24
      vertex(0,h+a); // 25
      vertex(-b,h+a); // 26,30
      vertex(-b-e,h+a); //27
      vertex(-b-e,h+a+f);  //28
      vertex(-b, h+a+f);  //29
      vertex(-b,h+a);  //30
      vertex(-b,h); //31
      vertex(-b,0); //32
      vertex(0, 0); //33
      endShape(CLOSE);
  }
}

//   singleSqLoop(a=0.7,b=0.95) {
//    //a and b are parameters that adjust width and height of square loop
 
//       beginShape();
//       vertex(-5, -100);  
//       vertex(-100, -100);
//       vertex(-100,100); 
//       vertex(100,100);
//       vertex(100,-100); 
//       vertex(5,-100);
//       vertex(5, -95);
//       vertex(a * 95,-95); 
//       vertex(a * 95, b*95); 
//       vertex(a * -95, b*95);
//       vertex(a * -95,-95);
//       vertex(-5, -95);
//       vertex(-5, -100);
//       endShape(CLOSE);
//   }
  