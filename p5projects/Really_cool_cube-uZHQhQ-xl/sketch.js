//https://stackoverflow.com/questions/71097236/3d-object-faces-disappearing-in-p5-js?rq=3

const vert = `
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main() {
  vTexCoord = aTexCoord;

  vec4 viewModelPosition = uModelViewMatrix * vec4(aPosition, 1.0);
  gl_Position = uProjectionMatrix * viewModelPosition;
}`;

const frag = `
precision mediump float;

// ranges from 0..1
varying vec2 vTexCoord;

uniform sampler2D uSampler;

void main() {
  vec4 tex = texture2D(uSampler, vTexCoord);
  if (tex.a < 0.05) {
    discard;
  }

  gl_FragColor = tex;
}`;

let r = 10
let a = 0
let c = 20
let angle = 0
let art
let discardShader;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  art = createGraphics(800, 800)
  discardShader = createShader(vert, frag)
  textureMode(NORMAL)
}

function draw() {
  background(0);

  let x = r + c * cos(a)
  let y = r + c * sin(a)

  art.fill(r, a, c)
  art.ellipse(x + 400, y + 400, 10, 10)

  c += 0.2
  a += 1.8

  push()
  noStroke()
  texture(art)
  shader(discardShader)
  rotateX(angle)
  rotateY(angle)
  rotateZ(angle)
  box(400)

  angle += 0.0003
  pop()

  orbitControl();
}
