// Most of the code adapted from Inigo Quelez
// https://iquilezles.org/www/articles/distfunctions/distfunctions.htm
// https://www.youtube.com/watch?v=Cfe5UQ-1L9Q
// this video from the coding train explains how to port from Shadertoy
// https://www.youtube.com/watch?v=7ZIfXu_iPv4

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 iResolution;
uniform int iFrame;
uniform vec2 iMouse;
uniform float iTime;
const float max_its = 100.;


// function to extract polar coordinates
// vec3 Spherical( vec3 pos) 
// {
//    float r = sqrt(pos.x*pos.x + pos.y*pos.y + pos.z*pos.z);
//    float theta = atan( sqrt(pos.x*pos.x + pos.y*pos.y), pos.z);
//    float phi = atan(pos.y, pos.x);
//    vec3 w = vec3(r, theta, phi);
//    return w;
// }
// function to extract polar coordinates
float mandelbrot( vec2 z) 
{
  
  vec2 c = z;
   for ( float  i = 0.; i < max_its; i+=1.) {
  if (dot(z,z)>4.) return i;
     z = vec2(z.x*z.x - z.y*z.y, 2.*z.x*z.y)+c;
   }
  return max_its;
}
  

void main() {
  
   // Normalized pixel coordinates (from 0 to 1)
   //vec2 pos = (2.0*gl_FragCoord.xy-iResolution.xy)/iResolution.y;
    vec2 pos = gl_FragCoord.xy-iResolution.xy/iResolution.y;
 
    gl_FragColor = vec4(mandelbrot(pos)/max_its);
}

