// Ported to P5.js from "RayMarching starting point" 
// by Martijn Steinrucken aka The Art of Code/BigWings - 2020
// The MIT License
// YouTube: youtube.com/TheArtOfCodeIsCool


// An introduction to Shader Art Coding
// https://www.youtube.com/watch?v=f4s1h2YETNY

// http://dev.thi.ng/gradients/
// https://github.com/thi-ng/cgg
// kishimisu

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;

#define S smoothstep


// vec3 palette (float t, vec3 a, vec3 b, vec3 c, vec3 d ) {
//   return a + b * cos( 6.28310*(c*t + d) ) ;
// }

vec3 palette (float t) {
  vec3 a = vec3(-0.032, 0.478, 0.758);
  vec3 b = vec3(-0.622, 0.108, 0.228);
  vec3 c = vec3(-0.142, -2.162, -0.032);
  vec3 d = vec3(0.838, 0.558, -1.122);
  return a + b * cos( 6.28310*(c*t + d) ) ;
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

void main( )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv =( gl_FragCoord.xy*2.0 - u_resolution.xy)/u_resolution.y;
  float t =  iTime;
  vec2 uv0 = uv; 
  vec3 finalColor = vec3(0.0);
  
  // add fractals by iterating
  for (float i = 0.0; i < 4.0; i++)
  {
    uv = fract(uv*1.5) - 0.5;

    float d = length(uv) * exp(-length(uv0));
    vec3 col = palette(length(uv0) + i * 0.4  + iTime * 0.4);
    d = sin(d*8.0 + iTime)/8.0;
    d = abs(d);
    
    d = pow(0.01/d, 1.2);
    d = clamp(d, 0.05, 1.0);
    finalColor += col * d;
  }
  
   
    

    gl_FragColor = vec4(finalColor, 1.0);
}
