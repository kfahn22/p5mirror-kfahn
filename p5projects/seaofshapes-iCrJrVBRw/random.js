let colorOptions2 = [
  [255,166,43], //orange
  [88,129,87],//green
  [239,214,172], //sand
  [255,46,204], //fushia
  [165,63,43], // red
  [254,208,187] //seahorse
  
]

class randomShape {
  constructor(x, y, a, color) {
    this.x = x;
    this.y = y;
    this.a = 15;
    this.color = 0;
  }
  
 show(a) {
  function tri(color) {
    push();
    let tx = 200;
    let ty = 200;
    translate(tx, ty);
    //fill(254,208,187);
    triangle(0, 0, 15, 0, 0, 15);
    pop();
  }
   
  function squar(tx, ty, color) {
    push();
    translate(tx, ty);
    stroke(color);
    fill(color);
    square(0, 0, 15);
    pop();
  }
  
  function parall(tx, ty, color) {
      push();
    let a = 15;
    translate(tx, ty);
     stroke(color);
    fill(color);
    let t = sqrt(2 * a * a);
    
      translate(1.75*t,-1.25* a);
      rotate(75);
      shearX(45);
      rect(0, 0, a, a);
      pop();
  }
   for (let i = 0; i < 10; i ++ ) {
     if ( i % 3 === 0 ) {
       tri();
     }
     else if ( i % 3 ==1 ) {
       squar(255,46,204);
     }
      else if (i % 3 === 2) {
        parall(255,166,43);
      }
   }
  
   }
}