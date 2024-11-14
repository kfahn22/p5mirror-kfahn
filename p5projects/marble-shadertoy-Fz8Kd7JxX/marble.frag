// Adjust slightly from here:
// https://www.shadertoy.com/view/tssXR8

const int AMOUNT = 8;

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;


void main()
{
  float a = 20.0;
  vec2 p = a * (gl_FragCoord.xy - u_resolution.xy / 2.0) / min(u_resolution.y, u_resolution.x);

  float len;

  for(int i = 0; i < AMOUNT; i++){
    len = length(vec2(p.x, p.y));
    float b = 4.0; // 4.0
    float c = 5.0; // 5.0
    p.x = p.x - cos(p.y + sin(len)) + cos(iTime / b);
    p.y = p.y + sin(p.x + cos(len)) + sin(iTime / c);
  }
  float d = 0.2; // 0.2
  float e = 2.6; // 2.6
  vec3 col = vec3(d, cos(len*0.75), sin(len*e));
  
  gl_FragColor = vec4(col,1.0);
}