//https://www.youtube.com/watch?v=jEwAMgcCgOA&list=PLRqwX-V7Uu6aFcVjlDAkkGIixw70s7jpW&index=9let mic;

let volHistory = [];

function setup() {
    createCanvas(400, 800);
    //textAlign(CENTER);
    mic = new p5.AudioIn();
    mic.start();
}

function draw() {
    background(98,71,170);
    stroke(255);
  noFill();
    strokeWeight(2);
  
    let vol = mic.getLevel();
    volHistory.push(vol*10);
  beginShape();
    for (let i = 0; i < volHistory.length; i++) {
        let y = map(volHistory[i], 0, 1, height, 0);
        vertex(i, y);
    }
  endShape();
  
  if (volHistory.length > width) {
    volHistory.splice(0, 1);
  }
    //rect(width/2, height, 5, vol * 2000);
}