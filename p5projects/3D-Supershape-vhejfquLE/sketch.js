
let total = 75;
let lat, lon;
let theta, m, n1,  n2,  n3;

// a shader variable
let theShader;

function preload(){
  // load the shader

  theShader = loadShader('starter.vert', 'starter.frag');
}


function setup() {
  pixelDensity(1);
  // shaders require WEBGL mode to work
  createCanvas(800, 800, WEBGL);
  noStroke();
}

//float r2 = superShape(lat, m, 0.2, 1.7, 1.7);
function draw() {  
  background(0);
  lat = getLat(total);
  lon = getLon(total);
  m = 7.0;
  n1 = 0.2;
  n2 = 1.7;
  n3 = 1.7;
  // send resolution of sketch into shader
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iFrame", frameCount);
  theShader.setUniform("iTime", millis()/1000.0);
  theShader.setUniform("lat", lat);
  theShader.setUniform("lon", lon);
  theShader.setUniform("m", 7);
  theShader.setUniform("n1", n1);
  theShader.setUniform("n2", n2);
  theShader.setUniform("n3", n3);
  
  // shader() sets the active shader with our shader
  shader(theShader);
  //model(cubeObj);
  // rect gives us some geometry on the screen
  rect(0,0,width, height);
   
}

function getLat(total) {
  for (let i = 0; i < total+1; i++) {
    for (let j = 0; j < total+1; j++) {
      lat = map(i, 0, total, -HALF_PI, HALF_PI);
    }
  }
  return lat;
}

function getLon(total) {
  for (let i = 0; i < total+1; i++) {
    for (let j = 0; j < total+1; j++) {
      lon = map(j, 0, total, -PI, PI);
    }
  }
  return lon;
}

// function superShape(theta, m, n1,  n2,  n3) {
//   t1 = abs((1.0/a)*cos(m * theta / 4.0));
//   t1 = pow(t1, n2);
//   t2 = abs((1.0/b)*sin(m * theta/4.0));
//   t2 = pow(t2, n3);
//   t3 = t1 + t2;
//   r = pow(t3, - 1.0 / n1);
//   return r;
// }