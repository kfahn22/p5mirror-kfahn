let poincareDisk;
let img;

function setup() {
  createCanvas(400, 400);
  
  // Create an offscreen graphics buffer with the same dimensions as the canvas
  poincareDisk = createGraphics(width, height);

  // Define the center and radius of the Poincaré disk
  let centerX = width / 2;
  let centerY = height / 2;
  let radius = min(width, height) / 2;

  // Draw a white background in the offscreen graphics buffer
  poincareDisk.background(255);

  // Create a clipping mask in the shape of the Poincaré disk
  poincareDisk.fill(0);
  poincareDisk.noStroke();
  poincareDisk.beginShape();
  poincareDisk.vertex(centerX, centerY);
  for (let i = 0; i <= 360; i += 1) {
    // Convert degrees to radians and use hyperbolic trig functions
    let theta = radians(i);
    let r = radius * tanh(1);
    let x = centerX + r * cos(theta);
    let y = centerY + r * sin(theta);
    poincareDisk.vertex(x, y);
  }
  poincareDisk.endShape(CLOSE);

  // Load an image
  img = loadImage('8_9.jpg', function() {
    // Draw the image within the Poincaré disk
    poincareDisk.image(img, 0, 0, width, height);

    // Display the Poincaré disk on the canvas
    image(poincareDisk, 0, 0);
  });
}

function tanh(theta) {
    let e = 2.71828;
    let l = pow(e, 2 * theta);
    return (l - 1) / (l + 1);
  }



