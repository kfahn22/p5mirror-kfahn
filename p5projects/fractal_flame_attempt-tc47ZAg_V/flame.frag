#ifdef GL_ES
precision mediump float;
#endif

varying vec2 pos;

uniform vec2 res;
uniform sampler2D currBuff;
uniform sampler2D prevBuff;
uniform float damping;

int total = 10000000;
int perFrame = 500000;
int count = 0;

vec3 diamond(vec3 v) {
    float r = v.x * v.x + v.y * v.y;
    float theta = atan(v.x / v.y);
    float x =  sin(theta) * cos(r);
    float y =  cos(theta) * sin(r);
    return vec2(x, y);
}


void main() {
  // calculate pixel size
  vec2 pix = 1.0/res;
  
  float x = random();
  float y = random();
  vec2 current = vec2(x,y)
  
  
  // get previous color
  //vec2 prev = texture2D(prevBuff, pos).rg;
  
  // get previous neighbour water states
  // float u = texture2D(currBuff, pos + vec2(0.0, pix.y)).r;
  // float d = texture2D(currBuff, pos - vec2(0.0, pix.y)).r;
  // float l = texture2D(currBuff, pos + vec2(pix.x, 0.0)).r;
  // float r = texture2D(currBuff, pos - vec2(pix.x, 0.0)).r;

  // calculate the next state value
  float next = ((u + d + l + r)/2.0) - prev;
  next = next * damping;

  // output next state value
  gl_FragColor = vec4(next, next/2.0 + 0.5, 1.0, 1.0);
}

