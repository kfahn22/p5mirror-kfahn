// Various clipping mask examples by Steve's Makerspace
// Video: https://youtu.be/Wdz71QzcdyY

let img;

function preload(){
  img=loadImage('Farmer.png')
}

function setup() {
  createCanvas(700, 700);
  background(190,220,250);
  
  //image inside shape, using clip function - only works with one shape
  img.resize(200,200);
  let cnv7 = createGraphics(200,200);
  ctx7 = cnv7.canvas.getContext("2d");
  //cnv7.circle(100,100,190);
  cnv7.triangle(0,0,100,200,200,0);
  ctx7.clip();
  cnv7.image(img,0,0);
  image(cnv7,350,225);
  
  //image inside shape, using mask function - works with multiple shapes
  img.resize(200,200);
  let cnv5 = createGraphics(200,200);
  //cnv5.circle(100,100,190);
  cnv5.triangle(0,0,100,200,200,0);
  img.mask(cnv5);
  image(img,300,25);
  
  //rectangle inside circle / circle inside rectangle using clip function
  cnv1 = createGraphics(width, height);
  ctx1 = cnv1.canvas.getContext("2d");
  //cnv1.circle(100, 100, 100);
  cnv1.strokeWeight(3);
  cnv1.rect(25, 0, 100);  
  ctx1.clip();
  cnv1.fill(0, 0, 200);
  cnv1.circle(100, 100, 100);  
  //cnv1.rect(25, 0, 100);
  image(cnv1, 50, 50);
  
  cloudyCircle(100);
  cloudyCircle(180);
  
  waterColor();
  
  // show drawings inside of text using clip and erase functions
  // first what's behind the text:
  cnv4 = createGraphics(width, height);
  ctx2 = cnv4.canvas.getContext("2d");
  cnv4.rect(100, 200, 200);
  ctx2.clip();
  cnv4.fill(0, 200, 0);
  cnv4.circle(200, 230, 100);
  image(cnv4, 0, 0);
  fill(0,200,0);
  //circle(300,230,100);
  // and now for the text:
  cnv3 = createGraphics(width, height);
  cnv3.fill(200,0,0);  
  cnv3.rect(100,200,200); 
  cnv3.erase();
  cnv3.textSize(200);
  cnv3.text('HI', 100, 350);
  cnv3.noErase();
  image(cnv3, 0, 0);
}

function cloudyCircle(x) {
  // noise field inside circle - no clip or cnv function needed 
  w = 100;
  h = 100;
  r = random(255);
  g = random(255);
  b = random(255);
  cnv2 = createGraphics(w, h);
  //cnv2.background(150);
  //ctx2 = cnv2.canvas.getContext("2d");
  cnv2.circle(w/2,w/2, w*0.95);
  //ctx2.clip();
  let rez = 0.005;
  cnv2.loadPixels();
  for (i = 0; i < w; i++) {
    for (j = 0; j < h; j++) {
      n = noise(i * rez, j * rez);
      pos = (w * j + i) * 4;
      cnv2.pixels[pos] = r * n;
      cnv2.pixels[pos + 1] = g * n;
      cnv2.pixels[pos + 2] = b * n;
    }
  }
  cnv2.updatePixels();
  image(cnv2, x, 500);
}

function waterColor(){
  //watercolor effect inside circle, using clip
  cnv6 = createGraphics(200,200);
  ctx6 = cnv6.canvas.getContext("2d");
  cnv6.circle(100,100,180);
  ctx6.clip();
  cnv6.background(200);
  cnv6.noStroke();
  r = 0;
  g = 50;
  b = 255;
  vary=10;
  for (n = 0; n < 700; n++) {
    let i = random(cnv6.width);
    let j = random(cnv6.height);
    cnv6.fill(
      r + random(-vary, vary),
      g + random(-vary, vary),
      b + random(-vary, vary),
      10
    );
    cnv6.circle(i,j,45);
  }
  image(cnv6,350,450)
}