#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_blob0;
uniform vec2 u_blob1;
#define S smoothstep
#define CG colorGradient
#define PI 3.14159

#define AQUA vec3(160,223,247)/255.
#define RASPBERRY vec3(253,96,182)/255.
#define PURPLE vec3(196,103,236)/255.
#define ORANGE  vec3(255,160,78)/255.
#define YELLOW vec3(254,241,9)/255.
#define RED vec3(255,77, 28)/255.

vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
} 

// vec4 Layer(vec2 uv, float blur)
//   {
//      vec4 col = vec4(0); 
//      float x = abs(uv.x);
//      float y1 = getHeight(uv.x);
//      //float y2 = (1. - x) * pow(x, 2.) + x * (1. - pow(x, 2.));
//      //float y = smax(y1, y2, .2);
//      float m =  S(blur, -blur, uv.y + y1);
//      // float y2 = (1. - x) * pow(x, 2.) + x * (1. - pow(x, 2.));
//      // float y = smax(y1, y2, .2);
//      // float m =  S(blur, -blur, uv.y + 1.2*y);
//      return col + m;
//  }

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 blob0_uv = u_blob0.xy /  u_resolution.xy;
  vec2 blob1_uv = u_blob1.xy /  u_resolution.xy;
  vec3 col = CG(uv, PURPLE, RASPBERRY, .5);
  
  float r = 0.1;
  float sum = 0.0;
  vec2 diff0 = uv.xy - blob0_uv.xy;
  float d0 = dot(diff0, diff0);
  float m = S(0.008, 0.0, d0);
  

 
  vec2 diff1 = uv.xy - blob1_uv.xy;
  float d1 = length(diff1);
  float m1 = S(-.01, 0.1, d1);
  //sum += 1.0 * r / d1;
  

  
 // float m0 = S(0.008, 0.0, sum);
  col += m;
 // col += m0 * AQUA + m1 * YELLOW;
  //vec3 color = vec3(sum);
  gl_FragColor = vec4(col, 1.0);
}


