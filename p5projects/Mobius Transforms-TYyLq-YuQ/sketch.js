let circles = [{ x: 0, y: 0, r: 100 }];

function setup() {
  createCanvas(800, 800);
  noLoop();
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  circles.forEach(circle => {
    drawCircle(circle);
    let transformedCircles = applyTransformations(circle);
    transformedCircles.forEach(tc => {
      drawCircle(tc);
    });
  });
}

function drawCircle(circle) {
  ellipse(circle.x, circle.y, circle.r * 2);
}

function applyTransformations(circle) {
  let newCircles = [];

  // Affine transformations
  let affine1 = affineTransform(circle.x, circle.y, 0.5, 0.5, -circle.r, 0);
  let affine2 = affineTransform(circle.x, circle.y, 0.5, 0.5, circle.r, 0);
  let affine3 = affineTransform(circle.x, circle.y, 0.5, 0.5, 0, -circle.r);
  let affine4 = affineTransform(circle.x, circle.y, 0.5, 0.5, 0, circle.r);

  // Convert to complex numbers for Möbius transformation
  let z1 = math.complex(affine1.x, affine1.y);
  let z2 = math.complex(affine2.x, affine2.y);
  let z3 = math.complex(affine3.x, affine3.y);
  let z4 = math.complex(affine4.x, affine4.y);

  // Möbius parameters (example)
  let a = math.complex(1, 0);
  let b = math.complex(0, 0);
  let c = math.complex(0, 0);
  let d = math.complex(1, 0);

  let mobius1 = mobiusTransform(z1, a, b, c, d);
  let mobius2 = mobiusTransform(z2, a, b, c, d);
  let mobius3 = mobiusTransform(z3, a, b, c, d);
  let mobius4 = mobiusTransform(z4, a, b, c, d);

  newCircles.push({ x: mobius1.re, y: mobius1.im, r: circle.r / 2 });
  newCircles.push({ x: mobius2.re, y: mobius2.im, r: circle.r / 2 });
  newCircles.push({ x: mobius3.re, y: mobius3.im, r: circle.r / 2 });
  newCircles.push({ x: mobius4.re, y: mobius4.im, r: circle.r / 2 });

  return newCircles;
}

function mobiusTransform(z, a, b, c, d) {
  let numerator = math.add(math.multiply(a, z), b);
  let denominator = math.add(math.multiply(c, z), d);
  return math.divide(numerator, denominator);
}


function affineTransform(x, y, scaleX, scaleY, translateX, translateY) {
  let newX = scaleX * x + translateX;
  let newY = scaleY * y + translateY;
  return { x: newX, y: newY };
}
