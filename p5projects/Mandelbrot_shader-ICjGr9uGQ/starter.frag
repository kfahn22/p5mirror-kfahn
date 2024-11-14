// Used "RayMarching starting point" 
// Based on The Mandelbrot Fractal Explained! by
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

// Function to take r,g,b values to range 0,1
// Remember to input a float!
vec3 rgb( float r, float g, float b) 
{
   return vec3(r/ 255.0, g / 255.0, b / 255.0);
}

// Color scheme
// The uvs are floating point with a range of [0.0,1.0] so we normalize by dividing by 255.
#define PURPLE vec3(83, 29,109) / 255.
#define RED vec3(191, 18, 97) / 255.
#define ORANGE vec3(251,162, 100) / 255.
#define BLUE vec3(118, 212, 229) / 255.


 // Create a normal line that rotates around origin
vec2 N(float angle)
  {
  return vec2( sin(angle), cos(angle) );
}

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

void main( )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = (gl_FragCoord.xy- 0.5*u_resolution.xy)/u_resolution.y;
    vec2 m = iMouse.xy/u_resolution.xy;
    float k = 10.0;
    float zoom = pow(k, -m.x*k);
  
    vec2 c = uv*zoom;
  
   c += vec2(-.6995, .37999); // changes the position on screen
     
  
    vec2 z = vec2(0.);
    float iter = 0.;
  
   const float max_iter = 100.;
  
   float h = 2. + sin(iTime);
   float ma = 10.;
   for (float i=0.; i < max_iter; i++) {
     // z = z^2 + c
     //z = vec2( z.x*z.x - z.y*z.y + 0.285, 2.*z.x*z.y + 0.01);
     z = vec2 (z.x*z.x - z.y*z.y, 2.*z.x*z.y) + c;
    
     ma = min(ma, abs(z.x));
     if (length(z) > 2.) break;
     iter++;
     
   }
    float f = iter/max_iter;
    float power = 1.;
  
    f = pow(f, power);
    //vec3 col1 = vec3(f*ORANGE);
    // f= ma;
    vec3 col1 = colorGradient(uv, BLUE, PURPLE, .5);
    vec3 col = (1.- f)*col1 + f*ORANGE;
    //col += f;
    
    //gl_FragColor=vec4(0.5-cos(f*20.)/2.0,0.5-cos(f* 30.0)/2.0,0.5-cos(f*40.0)/2.0,1.0);
//gl_FragColor=vec4(0.5-cos(f*20.0)/2.0,0.5-cos(f* 30.0)/2.0,0.5-cos(f*40.0)/2.0,1.0);
    gl_FragColor = vec4(col, 1.0);
}
