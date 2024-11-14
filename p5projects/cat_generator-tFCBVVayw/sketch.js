
let cats = [];
let unicorns = [];

let clouds = [];
function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  let c = new Cat(400,400);
  cats.push(c);
  
  let cl = new Cloud(50, 200);
  clouds.push(cl);
  
  let u = new Unicorn(200,400);
  unicorns.push(u);
}

function draw() {
  //translate(width/2,height/2);
  background(206,141,141);
  stroke(0);
  strokeWeight(6);
  //cats[0].show();
 // unicorns[0].show();
  clouds[0].show();
  
}