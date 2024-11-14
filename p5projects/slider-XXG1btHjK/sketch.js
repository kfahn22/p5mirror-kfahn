
let boxes = [];
let bw = []
let sliders = [];
let widths = [];

function setup() {
  createCanvas(600, 400);
  for (i = 0; i< 2; i++) {
    let x = 0;
    let y = height/2;
    let mb = false;
    let c = color(random(1,255), random(1,255), random(1,255));
    let b = new Box();
    let w = 50;
    boxes.push(b);
  }
}


function changeSize() {
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].mb === true) {
          boxes[i].w = boxes[i].slider.value();
          boxes[i].mb = false;
    }
  }
}

function mousePressed() {
    for (let i=0; i < boxes.length; i++) {
        boxes[i].inshape(mouseX,mouseY);
        console.log(boxes[i].mb);
        //console.log(boxes[i].slider.value());
        boxes[i].adjust(boxes[i].mb);
        
    }
}

// function slider(mb) {
//    for (let i=0; i<boxes.length; i++) {
//      if (boxes[i].mb === true) {
//        let slider = createSlider(10,50,25);
//        boxes[i].w = slider.value();
//        boxes[i].mb = false;
//      }
//    }
// }


function doubleClicked() {
  boxes[0].unclicked(mouseX, mouseY);
}

function draw() {
  background(255);
  stroke(3);
  boxes[0].show(200,200,boxes[0].w,h);
 
  translate(w,0);
  boxes[1].show(200,200,boxes[1].w,h); 
}