// Ported to P5.js from "RayMarching starting point" 
// by Martijn Steinrucken aka The Art of Code/BigWings - 2020
// 

// This shader  folds uv space to draw the Koch curve

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
#define PI 3.14159

// Color scheme
// The uvs are floating point with a range of [0.0,1.0] so we normalize by dividing by 255.
#define PURPLE vec3(83, 29,109) / 255.
#define RED vec3(191, 18, 97) / 255.
#define ORANGE vec3(251,162, 100) / 255.
#define BLUE vec3(118, 212, 229) / 255.


vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}  

 // Create a normal line that rotates around origin
vec2 N(float angle)
  {
  return vec2( sin(angle), cos(angle) );
}

float N21( vec2 p) {
    return fract( sin(p.x*100. + p.y*6574.)*5674. );
}

// Function of reflect uvs across a line
// adj remaps line 
// dot(uv,n) =  uv.x*n.x + uv.y*n.y
vec2 Reflect( vec2 uv, vec2 adj, vec2 n ) {
    float d = dot(uv - adj, n); 
    return n*max(0., d)*2.0;
  // if (d < 0.) {
  //   return n*min(0., d)*2.0;
  // } else {
  //   return n*max(0., d)*2.0;
  // }
}

float remap01(float a, float b, float t)
{
 return (t-a) / (b-a);
}

float remap(float a, float b, float c, float d, float  t)
{

  return remap01(a,b,t) * (d-c) + c;
}

float Mandelbrot( vec2 uv, float k, vec2 m) {

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
    // vec3 col1 = colorGradient(uv, BLUE, PURPLE, .5);
    // vec3 col = (1.- f)*col1 + f*ORANGE;
  return f;
}

void main( )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = (gl_FragCoord.xy-0.5*u_resolution.xy)/u_resolution.y;
    float t =  iTime;
    vec2 mouse = iMouse.xy/u_resolution.xy;
    uv *= 2.0;
    vec3 col = vec3(0.0);

    // We use a reflection to add two more Koch curves reflected across a line of angle 5./6.*PI
    uv.x = abs(uv.x);
    uv.y += tan(5./6.*PI)*0.5; //adjustment to reorient Koch snowflake back in center
    vec2 n = N(5./6.*PI); //orientation of line 
   // adjustment to move reflection line to end of Koch curve
    vec2 adj = vec2(0.5, 0.0); 
    uv -= Reflect(uv, adj, n);

    n = N(2./3. * PI); // angle to give "hat"
   // we add a scaling factor so line does not change as uvs are divided
   float scale = 1.0;
   uv.x += 0.5;
   for (int i = 0; i < 5; i++ ) {
    uv *= 3.0; // we multiply by 3. to divide the uvs
    scale *=3.0;
    uv.x  -= 1.5; // adjustment to translate uvs back to origin
     
    uv.x = abs(uv.x);  // reflect uvs across line (uvs go from 1.0 - 0.0 - 1.0)
    uv.x -= 0.5;  // adjust length of line so that it is 3 units long
    // mirror uvs around line 
    //uv -= Reflect(uv, vec2(0.0), n);
    uv -= n*min(0.0, dot(uv - vec2(0.0, 0.0), n))*2.; // uv.x*n.x + uv.y*n.y
   }
    float d = Mandelbrot( uv, 10.0, mouse);
    //float d = length( uv - vec2(clamp(uv.x, -1., 1.), 0));
    float s =  S(2./u_resolution.y, 0.0, d/scale);
    col = (1. - s) * ORANGE + s*PURPLE;
    gl_FragColor = vec4(col, 1.0);
}
