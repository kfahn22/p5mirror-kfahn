let current;
let finalV;

let variations = [];

let pixies = [];
let flameImg;

const total = 10000000;
const perFrame = 500000;
let count = 0;

// From: https://github.com/scottdraves/flam3/blob/master/test.flam3
//<xform weight="0.25" color="1" spherical="1" coefs="-0.681206 -0.0779465 0.20769 0.755065 -0.0416126 -0.262334"/>
//<xform weight="0.25" color="0.66" spherical="1" coefs="0.953766 0.48396 0.43268 -0.0542476 0.642503 -0.995898"/>
//<xform weight="0.25" color="0.33" spherical="1" coefs="0.840613 -0.816191 0.318971 -0.430402 0.905589 0.909402"/>
//<xform weight="0.25" color="0" spherical="1" coefs="0.960492 -0.466555 0.215383 -0.727377 -0.126074 0.253509"/>

//<xform weight="0.25" color="1" spherical="1" coefs="-0.357523 0.774667 0.397446 0.674359 -0.730708 0.812876"/>
//<xform weight="0.25" color="0.66" spherical="1" coefs="-0.69942 0.141688 -0.743472 0.475451 -0.336206 0.0958816"/>
//<xform weight="0.25" color="0.33" spherical="1" coefs="0.0738451 -0.349212 -0.635205 0.262572 -0.398985 -0.736904"/>
//<xform weight="0.25" color="0" spherical="1" coefs="0.992697 0.433488 -0.427202 -0.339112 -0.507145 0.120765"/>

let c1, c2;

function setup() {
  createCanvas(640, 480);

  // Pick two colors
  c1 = randomColor();
  c2 = randomColor();
  // Make sure they aren't the same
  while (c1 == c2) {
    c2 = randomColor();
  }

  // Four hard-coded variations
  // Variation s1 = new Spherical().setColor(1);
  // s1.setTransform(new float[]{-0.681206, -0.0779465, 0.20769, 0.755065, -0.0416126, -0.262334});
  // Variation s2 = new Spherical().setColor(0.66);
  // s2.setTransform(new float[]{0.953766, 0.48396, 0.43268, -0.0542476, 0.642503, -0.995898});
  // Variation s3 = new Spherical().setColor(0.33);
  // s3.setTransform(new float[]{0.840613, -0.816191, 0.318971, -0.430402, 0.905589, 0.909402});
  // Variation s4 = new Spherical().setColor(0);
  // s4.setTransform(new float[]{0.960492, -0.466555, 0.215383, -0.727377, -0.126074, 0.253509});

  // variations.add(s1);
  // variations.add(s2);
  // variations.add(s3);
  // variations.add(s4);

  // pixel map and image
  pixies = new Pixel[width][height];
  for (int i = 0; i < width; i++) {
    for (int j = 0; j < height; j++) {
      pixies[i][j] = new Pixel();
    }
  }
  flameImg = createImage(width, height, RGB);

  //variations.add(new Linear(1));
  //variations.add(new Sinusoidal());
  //variations.add(new Swirl());
  //variations.add(new Spherical());
  //variations.add(new HorseShoe());
  //variations.add(new Polar());
  //variations.add(new Hankerchief());
  //variations.add(new Heart());
  //variations.add(new Disc());
  //variations.add(new Hyperbolic());
  //variations.add(new Fisheye());

  // Starting point
  let x, y, z;
  current  = createVector(x,y,z);
  // Random xy
  current.x = random(-1, 1);
  current.y = random(-1, 1);
  // Using z for "c" (color)
  current.z = random(0, 1);
}

function draw() {

  // Iterations per frame
  for (int i = 0; i < perFrame; i++) {
    // Pick a variation (equal probabilities)
    let index = int(random(variations.size()));
    let variation = variations.get(index);
    // Save previous point just in case
    let  previous = current.copy();
    
    // New point
    current = variation.flame(current);

    // If we end up in some divide by zero disaster land go back to previous point
   if ((isNaN("current.x")) || (isNaN("current.x"))  || !isFinite(current.x) || !isFinite(current.y)) {
      current = previous.copy();
    }
    
    // Silly double-checking
    if ((!current.x) || isNaN("current.x") || !isFinite(current.x) || !isFinite(current.y)) {
      println("problem!");
    }


    // A final transformation to fit on window
    const zoom = 0.5;
    let x = current.x * width * zoom;
    let y = -1*current.y * height * zoom;
    
    // Pixel location
    let px = x + width/2;
    let py = y + height/2;
    
    // Are we in the window?
    if (px >= 0 && px < width && py >= 0 && py < height) {
      // Increase count
      pixies[px][py].value++;
      // Pick color
      let c = lerpColor(c1, c2, current.z);
      // Increase rgb counters
      pixies[px][py].r += red(c) / 255;
      pixies[px][py].g += green(c) / 255;
      pixies[px][py].b += blue(c) / 255;
    }
  }

  // Find maximum
  let max = 0;
  for (let i = 0; i < width; i++) {
    for (int j = 0; j < height; j++) {
      let pix = pixies[i][j];
      let value = Math.log10(pix.value);
      max = max(max, value);
    }
  }
  
  // Set all pixels
  flameImg.loadPixels();
  for (int i = 0; i < width; i++) {
    for (int j = 0; j < height; j++) {
      let pix = pixies[i][j];
      let value = Math.log10(pix.value)/max;
      let index = i + j * width;
      r = pix.r * value;
      g = pix.g * value;
      b = pix.b * value;
      
      // Apply gamma
      let gamma = 1 / 4.0;
      r = 255 * pow((r/255), gamma);
      g = 255 * pow((g/255), gamma);
      b = 255 * pow((b/255), gamma);

      flameImg.pixels[index] = color(r, g, b);
    }
  }
  flameImg.updatePixels();
  
  // Draw image
  background(0);
  image(flameImg, 0, 0);
  
  // Check progress
  count += perFrame;
  if (count < total) {
    let percent = float(count) / total;
    //fill(255);
    //rect(0, 50, percent * width, 50);
  } else {
    noLoop();
    saveFrame("render"+millis()+".png");
  }
}