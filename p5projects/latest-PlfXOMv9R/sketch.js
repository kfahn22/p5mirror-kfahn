
let w = 50;
let h = 5;
let xf = 1;
let yf = -1;
let i, j;

let swirlDrawing;
let labyrinths = [];
let loops = [];
let curves = [];
let rectloops = [];
let swirls = [];
let eLoops = [];

function preload() {
  swirlDrawing = loadImage('swirl.png');
}

function setup() {
    createCanvas(1000, 1000);
    d = new SwirlDrawing(0,-125,width,height);
    let l1 = new Loop();
    loops.push(l1);
    let sq= new SqLoop();
     rectloops.push(sq);
    let lb = new Labyrinth();
    labyrinths.push(lb);
    let s1 = new Swirl();
    swirls.push(s1);
    let e1 = new eLoop();
    eLoops.push(e1);

}


function draw() {
  background(255);
  //d.show();
 
  //print(mouseX, mouseY);
  stroke(0,0, 255);

  translate(70, 135);
  fill(0,255,255);
  scale(1.0);
  labyrinths[0].show();
 
  rectloops[0].leftLoop(10,10,5,10,25,55,10,30,0.95);
  translate(0,10+30);
  
  scale(-1);
  rotate(90);
  rectloops[0].rightLoop(10,10,10,10,20,25,30,20,0.95);
  translate(-30+10, 20);
  rotate(90);
  rect(0,0,6/3*w,2*h);
  translate(6/3*w+20,00);
  scale(-1);
  //starts on right side when facing up
  rectloops[0].doubleSqLoop(5,5,5,15,15,20,20,20,0.95);
  rotate(180);
  swirls[0].draw(6);
  translate(w,0);
  stroke(255,0,0);
  fill(255,0,0);
  //circle(0,0,5);
  rotate(180);
  scale(-0.25, 0.25);
  
  
  loops[0].upLoops(200,100,1.1,0.85,0.95);
  translate(2*200,0);
  loops[0].upLoops(220,120,1.2,0.95,0.75);
 
  translate(2*220,0);
   stroke(255,0,0);
  fill(255,0,0);
  circle(0,0,20);
  scale(1.5, -1);
  //loops[0].singleLoop(100,100,0.75,5);
  
  eLoops[0].show();
  
  // scale(-0.5);
  // translate(200, 100);
  
  //loops[0].sqloop(0.9, 0.8);
 

 
 
  
 
 
}

