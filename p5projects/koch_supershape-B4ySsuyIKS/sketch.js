// This sketch is based on Daniel Shiffman's 3d-supershapes challenge
// https://thecodingtrain.com/challenges/26-3d-supershapes
// I also used the code from https://openprocessing.org/sketch/651525 as a starting point

let angX = 0;
let angY = 0;
//let globe = [];
let rotation = true;

let segments = [];

function addAll(arr, list) {
  for (let s of arr) {
    list.push(s);
  }
}

function koch(x) {
  x = abs(x);
  y = tan(5/6*TWO_PI);
  let p = createVector(x, y);
}
// function superShape(theta, m, n1, n2, n3) {
//   a = aSlider.value();
//   b = bSlider.value();
  
//   let t1 = abs((1/a) * cos(m * theta / 4));
//   t1 = pow(t1, n2);
  
//   let t2 = abs((1/b) * sin(m * theta / 4));
//   t2 = pow(t2, n3);
  
//   t3 = t1 + t2;
//   let r = pow(t3, -1 / n1);
//   return r;
// }

function setup() {
  createCanvas(800, 450, WEBGL);

}


function draw() {
 
  background(146,83,161)
  
  // rotateX(angX);
  // rotateY(angY);

  ambientLight(255);
  noStroke();

      // From 129 Koch snowflake
      let a = createVector(0, 100);
      let b = createVector(600, 100);
      let s1 = new Segment(a, b);

      let len = p5.Vector.dist(a, b);
      let h = len * sqrt(3) / 2;
      let c = createVector(300, 100+h);

      let s2 = new Segment(b, c);
      let s3 = new Segment(c, a);
      segments.push(s1);
      segments.push(s2);
      segments.push(s3);

    
     
  for (let i = 0; i < segments.length; i++) {
    
    var lat = map(i, 0, total, -HALF_PI, HALF_PI);
    
    
    let r2 = superShape(lat, m, n1, n2, n3);
   
    for (let j = 0; j < total+1; j++) {
      var lon = map(j, 0, total, -PI, PI);
      let r1 = superShape(lon, m, n1, n2, n3);
      var x = r * r1 * cos(lon) * r2 * cos(lat);
      var y = r * r1 * sin(lon) * r2 * cos(lat);
      var z = r * r2 * sin(lat);
      
      globe[i].push(createVector(x, y, z));
      
    }
  }
  
  
  for (let i = 0; i < total; i++) {
   
    // strokeWeight(1);
    // fill(255, map(i, 0, total, 0, 200), 0);
   
    beginShape(TRIANGLE_STRIP);
    for (let j = 0; j < total+1; j++) {
      let v1 = globe[i][j];
      vertex(v1.x, v1.y, v1.z);
      let v2 = globe[i+1][j];
      vertex(v2.x, v2.y, v2.z);
    }
    endShape();
  }

  
   for (let s of segments) {
    s.show();
  }
  if(rotation) {
    angX += 0.03;
    angY += 0.04;
  }
}


function mousePressed() {
  let nextGeneration = [];

  for (let s of segments) {
    let children = s.generate();
    addAll(children, nextGeneration);
  }
  segments = nextGeneration;
}