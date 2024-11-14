function setup() {
  createCanvas(600,600);
}

function draw() {
  background(255);
  stroke(0);
  strokeWeight(5);
  line(50,50, 50,550);
  line(50,50, 550,50);
  line(550,50,550,550);
  line(300,50,300,550);
  line(50,425,550,425);
  line(175,50,175,550);
  line(425,50,425,550);
  line(50,175,550,175);
  line(50,300,550,300);
  line(50,550,550,550);
  
  
  strokeWeight(1);
  line(50,175,175,50);
  line(50,50,550,550);
  line(50,550,550,50);
  line(50,175, 175,175);
  line(50,300,300,50);
  line(50,425,425,50);
  line(175,550,550,175);
  line(300,550, 550, 300);
  line(425,550,550,425);
  line(300,50,550,300);
  line(425,50,550,175);
  line(175,50,550,425);
  line(50,175,425,550);
  line(50,300,300,550);
  line(50,425,175,550);
  
//   let para = createP('Color the tiles and cut out along the solid black lines.  Randomly place one of the tiles on a blank copy of the grid.  Can you figure out how to add the other tiles so that the tiles on all four sides match by color?')
//   para.position(50,600);
//   para.style('font-size', '18px');
//   para.style(color, black);

}

  
// function mousePressed() {
// saveFrames('worksheet', 'png', 1, 1);

// }