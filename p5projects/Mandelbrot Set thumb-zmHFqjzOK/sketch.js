// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/6z7GQewK-Ks

const minval = -0.5;
const maxval = 0.5;

let minSlider;
let maxSlider;

let frDiv;

let hu = 0;
let w = 800;

function setup() {
  createCanvas(800, 800);
  translate(87, 0);
  pixelDensity(1);

  minSlider = createSlider(-2.5, 0, -2.5, 0.01);
  maxSlider = createSlider(0, 2.5, 2.5, 0.01);

  frDiv = createDiv('');
}

function mousePressed() {
 save('mandelbrot.jpg');
}

function draw() {
  let maxiterations = 100;
 
  loadPixels();
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < w; y++) {

      let a = map(x, 0, w, minSlider.value(), maxSlider.value());
      let b = map(y, 0, w, minSlider.value(), maxSlider.value());

      let ca = a;
      let cb = b;

      let n = 0;

      while (n < maxiterations) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (a * a + b * b > 16) {
          break;
        }
        n++;
      }

      let bright = map(n, 0, maxiterations, 0, 1);
      bright = map(sqrt(bright), 0, 1, 59, 255);

      if (n == maxiterations) {
      pixels[pix + 0] = 112;
      pixels[pix + 1] = 50;
      pixels[pix + 2] = 126;
      }

      // Try green background colors
      // Started with Coding Train green (102,211,52)
      // in HSB adjusted brightness down
      // Took resulting RGB colors
      var pix = (x + y * w) * 4;
      pixels[pix + 0] = 204 + bright*0.9 ;
      pixels[pix + 1] = 130 + bright*0.6;
      pixels[pix + 2] = 65 +  bright*0.3;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();

  frDiv.html(floor(frameRate()));
}