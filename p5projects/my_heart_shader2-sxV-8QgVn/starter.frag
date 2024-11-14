// Base shader code from The Art of Code

// Formula for heart curve from https://mathworld.wolfram.com/HeartCurve.html

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;

#define S smoothstep
#define PI 3.14159

// Color scheme
// The uvs are floating point with a range of [0.0,1.0] so we normalize by dividing by 255.
#define PURPLE vec3(83, 29,109) / 255.
#define RED vec3(191, 18, 97) / 255.
#define BLUE vec3(118, 212, 229) / 255.
#define PINK vec3(236,203,217) / 255.

// Function to create a color gradient
vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}

// Spherical function modified from Daniel Shiffman
vec2 Spherical( vec2 pos) 
{
   float r = sqrt(pos.x*pos.x + pos.y*pos.y);
   float theta = atan(pos.y, pos.x);
   vec2 w = vec2(r, theta);
   return w;
}

float Heart( vec2 uv) {
  vec2 q;
  //Take the absolute value to make it symmetrical
   uv.x = abs(0.7*uv.x);
  // Take the negative to flip it right side up
   uv.y = -1.2*uv.y;
   
  float th = Spherical(uv).y;
  th = clamp(th, -2., -1.);

  // Equation for Heart curve 1
  float r = 9.0 * pow(sin(th), 7.0) * pow(2.71828, 2.0 * th);
  q.x = r * cos(th);
  q.y = -r * sin(th);

  float d = length(uv - q) ;
  float s = S(0.3, 0.299, d);
  return s;
}

void main( )
{
   vec2 uv = (gl_FragCoord.xy-0.5*u_resolution.xy) / u_resolution.y;
   // Add a background color with gradient
    vec3 col = colorGradient(uv, PINK, RED, .5);

  // Adjust uv.y to lower heart curve
  float d = Heart( uv + vec2(0.0, 0.35));
  float m = S(0.3, 0.299, d);

  col = (1.0 - m)*col + m* PURPLE;
 
    gl_FragColor = vec4(col,1) ; 
}