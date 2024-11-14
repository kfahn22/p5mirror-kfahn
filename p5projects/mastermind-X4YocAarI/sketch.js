

let selectColor;
let selectPosition;
let selectRow;
let pegs = [];
let cols = 6;
let rows = 1;
const r = 6;
const h = 30;
let col;
let pos;
let turn;
let inp;
let solution = ['red', 'green', 'red', 'yellow'];

function setup() {
  createCanvas(600, 600, WEBGL);

//   inp = createInput('');
//   inp.position(200, 700);
//   inp.size(100);
  
  
  col = chooseColor(play);
  pos = choosePosition();
  //turn = chooseRow();
  
  // col.selected('green');
  // pos.selected('0');
  
  
 // col.changed(play(col,pos));
  
  const hw = width* 0.5;
  ortho(-hw, hw, hw, -hw, -1500, 1500);
   
  for (let i  = 0; i < cols; i++) {
    for (let j = 0; j < rows; j ++) {
  let p = new Peg(i, j, 6,30);
  pegs.push(p);
    }
  }
}


function draw() {
  
  background(200);
 
  for (let i  = 0; i < cols; i++) {
    for (let j = 0; j < rows; j ++) {
      push();
      const x = -1 * (cols -1 ) * r + i * 3 * r ;
      const y = -3 * (rows - 1) * r + j * (r + h)  ;
      //circle(x, y, 2*r);
      //translate(x, y, -100);
      
     }
  }
     
      rotateX(PI/3);
      rotateY(PI/3);
      stroke(0, 50); 
  
      // make a move
      col = chooseColor();
      pos = choosePosition();
      let newC = col.value();
      let newP = pos.value();
     
      //col.changed(play(newC,newP));
     
      console.log(pegs.length);
     //  const x = -1 * (cols -1 ) * r + t * 3 * r ;
     //  const y = -3 * (rows - 1) * r + p * (r + h)  ;
     // translate(hw, hw, -100);
   console.log(newC, newP);
      play(newP, newC);
     //pegs[index].show(color(0,225,0));
     // pos.changed(chooseColor);
      pop();
    

 //noLoop();
}

  // sel.changed(addonelayer);
  // del.changed(delLayer);
// function myInputEvent() {
//   console.log('you are typing: ',
//     this.value());
// }

// add feature to add layers
function chooseColor() {
  sel = createSelect();
  sel.position(10,600);
  sel.option('red');
  sel.option('green');
  sel.option('blue');
  sel.option('green');
  sel.option('yellow');
  sel.option('black');
  sel.option('white');
  return sel;
}

function choosePosition() {
  selectPosition = createSelect();
  selectPosition.position(100,600);
  selectPosition.option('0');
  selectPosition.option('1');
  selectPosition.option('2');
  selectPosition.option('3');
  selectPosition.option('4');
  selectPosition.option('5');
  return selectPosition;
}

// function chooseRow() {
//   selectRow = createSelect();
//   selectRow.position(150,600);
//   selectRow.option('0');
//   selectRow.option('1');
//   selectRow.option('2');
//   selectRow.option('3');
//   selectRow.option('4');
//   selectRow.option('5');
//   selectRow.option('6');
//   selectRow.option('7');
//   selectRow.option('8');
//   selectRow.option('9');
  
//   return selectRow;
// }

function play(position, colour) {
   pv = int(position);
   col = colour;
  if ( col == 'red') {
   pegs[pv].show(color(255,0,0));
  }
  else if ( col == 'green') {
    pegs[pv].show( color(0,255,0));
  }
   else if ( col == 'blue') {
    pegs[pv].show( color(0,0,255)); 
  }
   else if ( col == 'yellow') {
    pegs[pv].show(  color(255,255,0)) ;
  }
  else if ( col == 'black') {
    pegs[pv].show( color(0));
  }
  else if ( col == 'white') {
     pegs[pv].show( color(255));
  }    
  
}




// for reference
// function addonelayer() {
  
//   w = width/40;
//   let s = int(sel.value());
//   for (let i =0; i < s; i++) {
  
//   rainbowLayers[i].neCorner(w, i, random(c1));
//   for (j=0;j<i;j++) {
//   rainbowLayers[i].eastConnector(w,(2+i)*w,(i-2*j)*w,random(c1));
//   }
//   rainbowLayers[i].seCorner(w, i, random(c1));
//    for (j=1;j<2*i;j+=2) {
//   rainbowLayers[i].southConnector(w,(1*j-i)*w,(i+2)*w,random(c1));
//   }
//   rainbowLayers[i].swCorner(w,i, random(c1));
//   for (j=1;j<2*i;j+=2) {
//   rainbowLayers[i].westConnector(w,(-i)*w,(1*j-i)*w,random(c1));
//   } 
//   rainbowLayers[i].nwCorner(w,i, random(c1));
//    for (j=2;j<2*i+1;j+=2) {
//   rainbowLayers[i].northConnector(w,(i-j)*w,-(1+i)*w,random(c1));
//   }
//   }
  
// }
