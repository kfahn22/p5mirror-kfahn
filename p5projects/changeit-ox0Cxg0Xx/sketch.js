// a shader variable
let theShader;
let shaderBg;

let x;
let y;
let outsideRadius = 200;
let insideRadius = 100;


function preload(){
  // load the shader
  theShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  
  // initialize the createGraphics layers
  shaderBg = createGraphics(windowWidth, windowHeight, WEBGL);
  
  // turn off the cg layers stroke
  shaderBg.noStroke();
  
   x = 0;
   y = 0;
}

function draw() {
  
  // shader() sets the active shader with our shader
  // instead of just setting the active shader we are passing it to the shaderBg graphic
  shaderBg.shader(theShader);

  // here we're using setUniform() to send our uniform values to the shader
  // set uniform is smart enough to figure out what kind of variable we are sending it,
  // so there's no need to cast (unlike processing)
  theShader.setUniform("u_resolution", [width, height]);
  theShader.setUniform("u_time", millis() / 1000.0);
  theShader.setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0)]);

  // rect gives us some geometry on the screen
  // passing the shaderBg graphic geometry to render on
  shaderBg.rect(0,0,width,height);
  
  background(255);
  texture(shaderBg);
  
  push();
  
  let numPoints = int(map(mouseX, 0, width, 3, 30));
  let angle = 0;
  let angleStep = 180.0 / numPoints;
  
  console.log(numPoints);

  beginShape(TRIANGLE_STRIP);
  for (let i = 0; i <= numPoints; i++) {
    let px = x + cos(radians(angle)) * outsideRadius;
    let py = y + sin(radians(angle)) * outsideRadius;
    
    let u1, v1, u2, v2;
    // console.log(px, -250, 250, 0, 1);
    
    u1 = map(px, -250, 250, 0, 1);
    v1 = map(py, -250, 250, 0, 1);
    
    angle += angleStep;
    vertex(px, py, u1, v1);
    px = x + cos(radians(angle)) * insideRadius;
    py = y + sin(radians(angle)) * insideRadius;
    
    u2 = map(px, -250, 250, 0, 1);
    v2 = map(py, -250, 250, 0, 1);
    
    vertex(px, py, u2, v2);
    angle += angleStep;
  }
  endShape();
  pop();
}
