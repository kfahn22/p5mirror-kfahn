// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Circle Morphing Part 1

//Both methods together

new p5(ca => {

const Y_AXIS = 1;
const X_AXIS = 2;
let cirPath = [];
let triPath = [];
let spacing = 10;
let theta = 0;
let divA, canA;

ca.polarToCartesian = (r, angle) => {
  return ca.createVector(r * ca.cos(angle), r * ca.sin(angle));
}

ca.setup = () => {
    divA = ca.createDiv().position(0,0);
    canA = ca.createCanvas(400, 450);
    canA.parent(divA);
  ca.angleMode(ca.DEGREES);
  let radius = 150;
  let startA = 0;
  let endA = 120;
  let start = ca.polarToCartesian(radius, startA);
  let end = ca.polarToCartesian(radius, endA);
  for (let a = startA; a < 360; a += spacing) {
    let cv = ca.polarToCartesian(radius, a);
    cirPath.push(cv);
    let amt = (a % 120) / (endA - startA);
    let tv = p5.Vector.lerp(start, end, amt);
    triPath.push(tv);

    if ((a + spacing) % 120 === 0) {
      startA = startA + 120;
      endA = endA + 120;
      start = ca.polarToCartesian(radius, startA);
      end = ca.polarToCartesian(radius, endA);
    }
  }

}

ca.draw = () => {
  //ca.background('#F89E4F');
  let c1 = ca.color('#9253A1');
  let c2 = ca.color('#F89E4F');
 
  let  col = ca.setGradient(0, 0, 400, 450, c1, c2, Y_AXIS);
  ca.translate(ca.width / 2, ca.height * 2.5 / 5);
  ca.rotate(30);
  ca.stroke('#66D334');
  ca.strokeWeight(8);
  ca.noFill();
  let amt = (ca.sin(theta) + 1) / 2;
  theta += 5;
  ca.beginShape();
  for (let i = 0; i < cirPath.length; i++) {
    let cv = cirPath[i];
    let tv = triPath[i];
    let x = ca.lerp(cv.x, tv.x, amt);
    let y = ca.lerp(cv.y, tv.y, amt);
    ca.vertex(x, y);
  }
  ca.endShape(ca.CLOSE);


  // beginShape();
  // for (let i = 0; i < cirPath.length; i++) {
  //   let v = cirPath[i];
  //   vertex(v.x, v.y);
  // }
  // endShape(CLOSE);
  // beginShape();
  // for (let i = 0; i < triPath.length; i++) {
  //   let v = triPath[i];
  //   vertex(v.x, v.y);
  // }
  // endShape(CLOSE);

  // for (let i = 0; i < triPath.length; i++) {
  //   let v = triPath[i];
  //   fill(0);
  //   ellipse(v.x, v.y, 8);
  // }

}

ca.setGradient = (x, y, w, h, c1, c2, axis) => {
  ca.noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = ca.map(i, y, y + h, 0, 1);
      let c = ca.lerpColor(c1, c2, inter);
      ca.stroke(c);
      ca.line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = ca.map(i, x, x + w, 0, 1);
      let c = ca.lerpColor(c1, c2, inter);
      ca.stroke(c);
      ca.line(i, y, i, y + h);
    }
  }
}

});

new p5(cb => {
// Circle Morphing Part 2


const Y_AXIS = 1;
const X_AXIS = 2;
let cirPath = [];
let spacing = 2;
let divB, canB;

cb.polarToCartesian = (r, angle) => {
  return cb.createVector(r * cb.cos(angle), r * cb.sin(angle));
}

cb.setup = () => {
  divB = cb.createDiv().position(400,0);
  canB = cb.createCanvas(400, 450);
  canB.parent(divB);
  cb.angleMode(cb.DEGREES);
  let radius = 150;
  let i = 0;
  for (let a = 0; a < 360; a += spacing) {
    let cv = cb.polarToCartesian(radius, a);
    cv.active = true;
    if (a % 120 == 0) {
      cv.fixed = true;
    }
    cirPath.push(cv);

  }

}

cb.draw =() => {
 // cb.background('#F89E4F');
  let c1 = cb.color('#9253A1');
  let c2 = cb.color('#F89E4F');
 
  let  col = cb.setGradient(0, 0, 400, 450, c1, c2, Y_AXIS);
  cb.translate(cb.width * 1.75/4, cb.height * 2.5 / 5);
  cb.rotate(30);
  cb.stroke('#9253A1');
  cb.strokeWeight(8);
  cb.noFill();
  cb.beginShape();
  for (let i = 0; i < cirPath.length; i++) {
    let v = cirPath[i];
    if (v.active) {
      cb.vertex(v.x, v.y);
    }
  }
  cb.endShape(cb.CLOSE);

  let activeList = [];
  for (let i = 0; i < cirPath.length; i++) {
    let v = cirPath[i];
    if (v.active && !v.fixed) {
      activeList.push(v);
    }
  }

  let index = 0; //floor(random(activeList.length));
  let v = activeList[index];
  if (v) {
    v.active = false;
  }

}


cb.setGradient = (x, y, w, h, c1, c2, axis) => {
  cb.noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = cb.map(i, y, y + h, 0, 1);
      let c = cb.lerpColor(c1, c2, inter);
      cb.stroke(c);
      cb.line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = cb.map(i, x, x + w, 0, 1);
      let c = cb.lerpColor(c1, c2, inter);
      cb.stroke(c);
      cb.line(i, y, i, y + h);
    }
  }
}
});