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
#define BG backgroundGradient
#define BLUE vec3(57,96,110)/255.
#define PINK vec3(255, 57, 255)/255.
#define YELLOW vec3(242,214,65)/255.


// Beginning of terrain shader
// Function to add background color
vec3 backgroundGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}

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

// Renamed noised function from mountain shader
vec3 hash3( in vec2 x )
{
    vec2 p = floor(x);
    vec2 w = fract(x);
    #if 1
    vec2 u = w*w*w*(w*(w*6.0-15.0)+10.0);
    vec2 du = 30.0*w*w*(w*(w-2.0)+1.0);
    #else
    vec2 u = w*w*(3.0-2.0*w);
    vec2 du = 6.0*w*(1.0-w);
    #endif
    
    float a = hash1(p+vec2(0,0));
    float b = hash1(p+vec2(1,0));
    float c = hash1(p+vec2(0,1));
    float d = hash1(p+vec2(1,1));

    float k0 = a;
    float k1 = b - a;
    float k2 = c - a;
    float k4 = a - b - c + d;

    return vec3( -1.0+2.0*(k0 + k1*u.x + k2*u.y + k4*u.x*u.y), 
                 2.0*du * vec2( k1 + k4*u.y,
                            k2 + k4*u.x ) );
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

float noise( vec2 pos, float u, float v ) {
  vec2 p = vec2( floor(pos.x), floor(pos.y) );
  vec2 f = fract(pos);
  
  float k = 1.0 + 63.0*pow(1.0-v, 4.0);
  float va = 0.0;
  float wt = 0.0;
  for( int j = -2; j <= 2; j++)
    for( int i = -2; i <= 2; i++)
      {
      vec2 g = vec2( float(i), float (j) );
      vec3 o = hash3( p + g )*vec3(u,u,1.0);
      vec2 r = g - f +o.xy;
      float d = dot(r,r);
      float w = pow(1.0-S( 0.0, 1.414, sqrt(d) ), k );
      va += w*o.z;
      wt += w;
    }
  return va/wt;
}

float N21( vec2 p) {
    return fract( sin(p.x*100. + p.y*6574.)*5674. );
}

vec2 N22( vec2 p) {
  vec3 a = fract(p.xyx*vec3(123.34, 234.34, 345.65));
  a += dot(a, a + 34.45);
  return fract(vec2( a.x*a.y, a.y*a.z) );
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
  vec2 uv = (2.*gl_FragCoord.xy-u_resolution.xy)/u_resolution.y;
  
  vec3 col = BLUE;
  float m = 0.;
  
  float t = iTime;
   
  float minDist = 100.;
  float cellIndex = 0.;
  
  if (false) {
  for (float i = 0.; i < 100.; i++) {
    vec2 n = N22(vec2(i));
    vec2 p = sin(n*t);
    
    float d = length(uv-p);
    m += S(.02, .01, d);
    
    if (d<minDist) {
      minDist = d;
      cellIndex = i;
      
    }
  }
  } else {
  uv *= 3.; // change this parameter to change number of grids
  vec2 gv = fract(uv) - .5;
  vec2 id = floor(uv);
  vec2 cid = vec2(0);
    
    for (float y =-1.; y<=1.; y++) {
      for (float x =-1.; x<=1.; x++) {
        vec2 offs = vec2(x, y);
        
        vec2 n = N22(id+offs);
        vec2 p = offs+sin(n*t)*0.5;
        float d = length(gv-p);
       
        if (d<minDist) {
           minDist = d;
           cid = id + offs;
        } 
      }
    }
  col = BLUE*vec3(minDist);
  //col.rg = cid*.1;
  }
  

  //col = vec3(cellIndex/50.);
   
    gl_FragColor = vec4(col, 1.0);
}
