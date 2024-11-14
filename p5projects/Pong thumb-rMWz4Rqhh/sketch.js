// port of Daniel Shiffman's Pong coding challenge
// by madacoo

let leftscore = 0;
let rightscore = 0;


function preload() {
  // img1 = loadImage("Rainbow_Run.png");
  // img2 = loadImage("assets/Asterisk_Run.png");
   bracket = loadImage("SymbolCharacter_Emoji_CurlyBracket.png");
   dot = loadImage("SymbolCharacter_Emoji_Dot.png");
}
function setup() {
    createCanvas(800, 450);
    ding = loadSound("data/ding.mp3");
    puck = new Puck();
    left = new Paddle(true);
    right = new Paddle(false);
  
}

mousePressed = () => {
  save('pong.jpg');
}

function draw() {
   
    background(59);
    image(dot, 230, 15);
    image(bracket, 630, 15);
    puck.checkPaddleRight(right);
    puck.checkPaddleLeft(left);

    left.show();
    right.show();
    left.update();
    right.update();
    
    puck.update();
    puck.edges();
    puck.show();
    
    
    noStroke();
    fill(45, 197, 244);
    textSize(60);
    text(leftscore, 200-15, 50);
    text(rightscore, 600-15, 50);
 
   dashedLine();
}

function dashedLine() {
   // reference article for drawing dashed lines
   //https://gorillasun.de/blog/animated-dashed-lines-in-p5js
    stroke(45, 197, 244);
    strokeWeight(8);
    drawingContext.setLineDash([15, 25]);
    line(400,0,400,450);
}

function keyReleased() {
    left.move(0);
    right.move(0);
}

function keyPressed() {
    console.log(key);
    if (key == 'A') {
        left.move(-10);
    } else if (key == 'Z') {
        left.move(10);
    }

    if (key == 'J') {
        right.move(-10);
    } else if (key == 'M') {
        right.move(10);
    }
}
