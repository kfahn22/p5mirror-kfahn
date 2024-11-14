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
#define BLUE vec3(57,96,110)/255.

float hash1( vec2 p )
{
    p  = 50.0*fract( p*0.3183099 );
    return fract( p.x*p.y*(p.x+p.y) );
}

float hash1( float n )
{
    return fract( n*17.0*fract( n*0.3183099 ) );
}

vec2 hash2( vec2 p ) 
{
    const vec2 k = vec2( 0.3183099, 0.3678794 );
    float n = 111.0*p.x + 113.0*p.y;
    return fract(n*fract(k*n));
}

float noise( vec2 x )
{
    vec2 p = floor(x);
    vec2 w = fract(x);
    #if 1
    vec2 u = w*w*w*(w*(w*6.0-15.0)+10.0);
    #else
    vec2 u = w*w*(3.0-2.0*w);
    #endif

    float a = hash1(p+vec2(0.,0.));
    float b = hash1(p+vec2(1.,0.));
    float c = hash1(p+vec2(0.,1.));
    float d = hash1(p+vec2(1.,1.));
    
    return -1.0+2.0*(a + (b-a)*u.x + (c-a)*u.y + (a - b - c + d)*u.x*u.y);
}

mat2 m = mat2( 0.8, 0.6, -0.6, 0.8);

float fbm( vec2 p) {
  float f = 0.0;
  f += 0.5000 *noise( p ); p*=m*2.02;
  f += 0.2500 *noise( p ); p*=m*2.03;
  f += 0.1250 *noise( p ); p*=m*2.01;
  f += 0.0625 *noise( p ); p*=m*2.04;
  f /- 0.9375;
  return f;
}


float N21( vec2 p) {
    return fract( sin(p.x*100. + p.y*6574.)*5674. );
}


// float SmoothNoise(vec2 uv) {
//    // lv goes from 0,1 inside each grid
//    // check out interpolation for dummies
//     vec2 lv = fract(uv);
   
//    //vec2 lv = smoothstep(0., 1., fract(uv*10.));  // create grid of boxes 
//     vec2 id = floor(uv); // find id of each of the boxes
//      lv = lv*lv*(3.-2.*lv); 
    
//     // get noise values for each of the corners
//     // Use mix function to join together
//     float bl = N21(id);
//     float br = N21(id+vec2(1,0));
//     float b = mix (bl, br, lv.x);
    
    
//     float tl = N21(id + vec2(0,1));
//     float tr = N21(id+vec2(1,1));
//     float t = mix (tl, tr, lv.x);
    
//     return mix(b, t, lv.y);
// }

// float SmoothNoise2 (vec2 uv) {
//    float c = SmoothNoise(uv*4.);
//      // Layer(or octave) of noise
//     // Double frequency of noise; half the amplitude
//     c += SmoothNoise(uv*8.)*.5;
//     c += SmoothNoise(uv*16.)*.25;
//     c += SmoothNoise(uv*32.)*.125;
//     c += SmoothNoise(uv*64.)*.0625;
    
//     return c/ 2.;  // have to normalize or could go past 1
  
// }
// mat2 Rot(float a) {
//     float s=sin(a), c=cos(a);
//     return mat2(c, -s, s, c);
// }





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
    vec2 uv = (gl_FragCoord.xy-0.5*u_resolution.xy)/u_resolution.y;
   
     vec3 col = vec3( 0.0 );
  
  
    float d = length(uv - vec2(.0, .0)) - .3;
  
    float m = S(.01, .0, d);
   
    col += m*BLUE;
  
  
    gl_FragColor = vec4(col, 1.0);
}
