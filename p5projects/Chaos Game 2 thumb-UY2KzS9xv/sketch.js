// The Chaos Game
// Daniel Shiffman
// Part 1: https://youtu.be/7gNzMtYo9n4
// https://thecodingtrain.com/CodingChallenges/123.1-chaos-game
// Part 2: https://youtu.be/A0NHGTggoOQ
// https://thecodingtrain.com/CodingChallenges/123.2-chaos-game

let points;
let current;
let percent = 0.5;
let previous;
let w = 450;


function setup() {
  //createCanvas(windowWidth, windowHeight);
  createCanvas(800, 450);
  points = [];
  const n = 5;
  //translate(width/2, height/2);
  for (let i = 0; i < n; i++) {
    // let v = createVector(random(width), random(height));
    let angle = i * TWO_PI / n;
    let v = p5.Vector.fromAngle(angle);
    v.mult(w / 2);
    v.add(width / 2, w / 2);
    points.push(v);
  }

  reset();
}

function reset() {
  //translate(width*3/4, height/2);
  current = createVector(random(width), random(width));
  background(45, 197, 244);
  stroke(255);
  strokeWeight(6);
  for (let p of points) {
    //point(p.x, p.y);
  }
  

}

function draw() {

  if (frameCount % 100 == 0) {
    //reset();
  }
  
  for (let i = 0; i < 5000; i++) {
    strokeWeight(1);
    stroke(240, 99, 164,50);
    
    let next = random(points);
    if (next !== previous) {
      current.x = lerp(current.x, next.x, percent);
      current.y = lerp(current.y, next.y, percent);
      point(current.x, current.y);
    }

    previous = next;
  }



}