// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// QuadTree
// 1: https://www.youtube.com/watch?v=OJxEcs0w_kE
// 2: https://www.youtube.com/watch?v=QQx_NmCIuCY

// For more:
// https://github.com/CodingTrain/QuadTree

let qtree;

function setup() {
  createCanvas(800, 450);
  background('#701616');
  let boundary = new Rectangle(400, 225, 400, 225);
  qtree = new QuadTree(boundary, 4);
  for (let i = 0; i < 50; i++) {
    let x = randomGaussian(width / 2, width / 8);
    let y = randomGaussian(height / 2, height / 8);
    let p = new Point(x, y);
    qtree.insert(p);
  }
}

function draw() {
  background('#701616');
  //strokeWeight(14)
  qtree.show();

  stroke("#66D334");
  rectMode(CENTER);
  let range = new Rectangle(mouseX, mouseY, 75, 75);
  
  // This check has been introduced due to a bug discussed in https://github.com/CodingTrain/website/pull/556
  if (mouseX < width && mouseY < height) {
    
    let points = qtree.query(range);
    for (let p of points) {
      strokeWeight(10);
      point(p.x, p.y);
    }
    rect(range.x, range.y, range.w * 2, range.h * 2);
  }

}

function mousePressed() {
 save('quad.jpg');
}
