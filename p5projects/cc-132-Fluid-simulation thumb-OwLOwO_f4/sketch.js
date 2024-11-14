let fluid;
let can;
function setup() {
  createCanvas(600, 600);
  can = createGraphics(400, 400, WEBGL);
  frameRate(22);
  can.fluid = new Fluid(0.2, 0, 0.0000001);
}

draw = () =>{
  stroke(59);
  strokeWeight(2);

  let cx = int((0.5 * width) / SCALE);
  let cy = int((0.5 * height) / SCALE);
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      can.fluid.addDensity(cx + i, cy + j, random(50, 150));
    }
  }

  for (let i = 0; i < 2; i++) {
    let angle = noise(t) * TWO_PI * 2;
    let v = p5.Vector.fromAngle(angle);
    v.mult(0.2);
    t += 0.01;
    can.fluid.addVelocity(cx, cy, v.x, v.y);
  }

  can.fluid.step();
  can.fluid.renderD();
}