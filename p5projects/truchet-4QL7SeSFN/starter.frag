// Ported to P5.js from "RayMarching starting point" 
// by Martijn Steinrucken aka The Art of Code/BigWings - 2020
// The MIT License
// YouTube: youtube.com/TheArtOfCodeIsCool

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;

#define S smoothstep
#define PURPLE vec3(146,83,161) / 255.
#define ORANGE vec3(248, 158, 79) / 255.


float N21( vec2 p) {
    return fract( sin(p.x*100. + p.y*6574.)*5674. );
}

float remap01(float a, float b, float t)
{
 return (t-a) / (b-a);
}

float remap(float a, float b, float c, float d, float  t)
{

  return remap01(a,b,t) * (d-c) + c;
}

// function to create psuedo random variable
// two values as input, 1 as output
float Hash21(vec2 uv) {
  uv = fract( uv*vec2(1834.536, 9345.891));
  uv += dot(uv, uv + 345.327);
  return fract(uv.x * uv.y);
}

// float cityBlockDist( vec2 uv ) {
//   d = 
// }

float chebychevDist( vec2 uv, float k) {
  //k = 0.6; //small values make it straighter
  // Chebychev distance
  uv = abs(uv); // take abs b/c if k is odd breaks
  return pow(pow(uv.x, k) + pow(uv.y, k), 1.0/k);
}

// want random tiles to flip by flipping coordinates
vec4 Truchet( vec2 uv, vec3 col, float curve, float thickness, float pattern) {
  
  vec2 id = floor(uv); // integer
  float n = Hash21(id);  // random 0, 1 per box
  
  uv = fract(uv) - 0.5; // decimal
  
  float d = 0.0;
  
  if (n < 0.5) 
   uv.x *= -1.0;
   
  // if x > y then s = 1, otherwise set equal to -1
  float s = uv.x > -uv.y ? 1.0 : -1.0; // corner selection
  // distance to center
  vec2 cp = uv - vec2(0.5, 0.5)*s; // circle coordinates
  float cd = chebychevDist(cp*s, curve);
  float r = 0.5;
  float w = 0.01; // edge blur
  float ed = abs(cd- r) - thickness; // edge distance
  float contour = S(w, -w, ed);
  
  float a = atan(cp.x, cp.y); //polar ange for -PI to PI
  d = cos(2.0*a)*0.5 + 0.5;  // the depth
  col *=mix(0.3, 1.0, d); 
  
  // need to flip pattern for every other tile
  float check = mod(id.x + id.y, 2.0)*2.0 - 1.0;  // to craete checkerboard
  float l = 5.0;  // add animation effect for pattern
  col *=1.0 + sin(check*a*30.0 + ed*100.0 - iTime*l)*0.3*pattern;
  return vec4(col, d)* contour;
}

void main( )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = (gl_FragCoord.xy - 0.5*u_resolution.xy)/u_resolution.y;
    float t =  iTime;
    
    vec3 col = vec3(0.0);
  
    // adjust thickness based on position on screen
    float cd = length(uv); // distance to center of screen
    uv *= 8.0;
    
    float w = mix( 0.1, 0.01, S(0.0, 0.5, cd) );
    vec4 t1 = Truchet(uv, PURPLE, 2.0, w, 1.0);
    vec4 t2 = Truchet(uv+0.5, ORANGE, 1.0, 0.1, 0.0);
  
    col = t1.a >t2.a ? t1.rgb : vec3(0.0);
    col += t2.a>t1.a ? t2.rgb : vec3(0.0);
  
    gl_FragColor = vec4(col, 1.0);
}
