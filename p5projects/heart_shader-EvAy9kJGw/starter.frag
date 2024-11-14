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
uniform sampler2D tex0;

#define S smoothstep


// Color scheme
// The uvs are floating point with a range of [0.0,1.0] so we normalize by dividing by 255.
#define PURPLE vec3(83, 29,109) / 255.
#define RED vec3(191, 18, 97) / 255.
#define ORANGE vec3(251,162, 100) / 255.
#define BLUE vec3(118, 212, 229) / 255.

// This is not really doing anything for this sketch, but this is how you pass in a texture
#define TEXTURE texture2D(tex0, p.yz*.5+0.5).rgb

// Function to create a color gradient
vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}

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

float Heart( vec2  uv ) {
    uv.x *= 0.8;
    uv.y -= sqrt(abs(uv.x))*0.5;
    float d = length(uv- vec2(0.0, -0.1));
  
    return  S(0.3, 0.29, d);
}

void main( )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = (gl_FragCoord.xy- 0.5*u_resolution.xy)/u_resolution.y;
    float t =  iTime;
  
    vec3 col1 = colorGradient(uv, PURPLE, RED, 0.5);
   
    uv.x *= 0.8;
    uv.y -= sqrt(abs(uv.x))*0.5;
    float d = length(uv- vec2(0.0, -0.1));
  
    float m = S(0.3, 0.29, d);
  
    vec3 col = vec3(m)*RED;
    //vec3 col = (1. - m) * col1 + m*RED;
  
    gl_FragColor = vec4(col, 1.0);
}
