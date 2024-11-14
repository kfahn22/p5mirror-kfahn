// https://www.youtube.com/watch?v=XcII7comJ00&t=1s

let golShader;

let prevFrame;
let things = [];

function preload() {
  golShader = loadShader("gol.vert", "gol.frag");
}

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
  noSmooth();

  prevFrame = createGraphics(width, height);
  prevFrame.pixelDensity(1);
  prevFrame.noSmooth();

  background(0);
  stroke(255);
  shader(golShader);
  golShader.setUniform("normalRes", [1.0 / width, 1.0 / height]);
}

function draw() {
  if (mouseIsPressed) {
    addInk(random(width), random(height));

    background(0);
    for (let thing of things) {
      thing.show();
    }
  }

  // Copy the rendered image into our prevFrame image
  prevFrame.image(get(), 0, 0);
  // Set the image of the previous frame into our shader
  golShader.setUniform("tex", prevFrame);

  // Give the shader a surface to draw on
  rect(-width / 2, -height / 2, width, height);
}

function addInk(x, y) {
  let r = random(10, 50);
  let t = new Thing(x, y, r);

  for (let thing of things) {
    for (let i = 0; i < thing.v.length; i++) {
      let v = thing.v[i];
      let p = p5.Vector.add(v, thing.position);
      p.sub(t.position);
      let d = p.mag();
      p.mult(sqrt(1 + (r * r) / (d * d)));
      p.add(t.position);
      p.sub(thing.position);
      thing.v[i] = p;
    }
  }

  things.push(t);
}
