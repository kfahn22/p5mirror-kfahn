#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float u_time;
uniform float iFrame;

#define PURPLE vec3(112, 50, 126) / 255.
#define GREEN vec3(102, 211, 52) / 255.
#define YELLOW vec3(252, 238, 33) / 255.
#define ORANGE vec3(248, 158, 79) / 255.
#define RASPBERRY vec3(236, 1, 90) / 255.

const int AMOUNT = 10;

void main()
{
  float n = 20.0;
  vec2 uv = n * (gl_FragCoord.xy - u_resolution.xy / 2.0) / min(u_resolution.y, u_resolution.x);

  float len;

  for(int i = 0; i < AMOUNT; i++){
    len = length(vec2(uv));
    float freq = cos(u_time*0.001)/1.825;
    uv.x = uv.x - cos(uv.y + sin(len)) + cos(u_time * 0.01);
    uv.y = uv.y + sin(uv.x + cos(len)) + sin(u_time * 0.05);
  }
  
  float bias2 = abs(sin(uv.y*2.));
  
  vec3 col = mix(PURPLE, ORANGE, uv.x);
  vec3 col2 = mix(GREEN, RASPBERRY, uv.y);
  col = mix(col, col2, bias2);
  
  //vec3 col = vec3(0.2, cos(len), sin(len*2.6));
  
  gl_FragColor = vec4(col,1.0);
}