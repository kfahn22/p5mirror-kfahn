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

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .001

#define S smoothstep
#define T iTime


// Function to take r,g,b values to range 0,1
// Remember to input a float!
vec3 rgb( float r, float g, float b) 
{
   return vec3(r/ 255.0, g / 255.0, b / 255.0);
}

float N21( vec2 p) {
    return fract( sin(p.x*100. + p.y*6574.)*5674. );
}


float SmoothNoise(vec2 uv) {
   // lv goes from 0,1 inside each grid
   // check out interpolation for dummies
    vec2 lv = fract(uv);
   
   //vec2 lv = smoothstep(0., 1., fract(uv*10.));  // create grid of boxes 
    vec2 id = floor(uv); // find id of each of the boxes
     lv = lv*lv*(3.-2.*lv); 
    
    // get noise values for each of the corners
    // Use mix function to join together
    float bl = N21(id);
    float br = N21(id+vec2(1,0));
    float b = mix (bl, br, lv.x);
    
    
    float tl = N21(id + vec2(0,1));
    float tr = N21(id+vec2(1,1));
    float t = mix (tl, tr, lv.x);
    
    return mix(b, t, lv.y);
}

float SmoothNoise2 (vec2 uv) {
   float c = SmoothNoise(uv*4.);
     // Layer(or octave) of noise
    // Double frequency of noise; half the amplitude
    c += SmoothNoise(uv*8.)*.5;
    c += SmoothNoise(uv*16.)*.25;
    c += SmoothNoise(uv*32.)*.125;
    c += SmoothNoise(uv*64.)*.0625;
    
    return c/ 2.;  // have to normalize or could go past 1
  
}

mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

float sdSegment( in vec2 p, in vec2 a, in vec2 b )
{
    vec2 pa = p-a, ba = b-a;
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
    return length( pa - ba*h );
}

float sdTrapezoid( in vec2 p, in float r1, float r2, float he )
{
    vec2 k1 = vec2(r2,he);
    vec2 k2 = vec2(r2-r1,2.0*he);
    p.x = abs(p.x);
    vec2 ca = vec2(p.x-min(p.x,(p.y<0.0)?r1:r2), abs(p.y)-he);
    vec2 cb = p - k1 + k2*clamp( dot(k1-p,k2)/dot(k2,k2), 0.0, 1.0 );
    float s = (cb.x<0.0 && ca.y<0.0) ? -1.0 : 1.0;
    return s*sqrt( min(dot(ca,ca),dot(cb,cb)) );
}

float sdEquilateralTriangle( in vec2 p )
{
    const float k = sqrt(3.0);
    p.x = abs(p.x) - 1.0;
    p.y = p.y + 1.0/k;
    if( p.x+k*p.y>0.0 ) p = vec2(p.x-k*p.y,-k*p.x-p.y)/2.0;
    p.x -= clamp( p.x, -2.0, 0.0 );
    return -length(p)*sign(p.y);
}


//Rhombus - exact   (https://www.shadertoy.com/view/XdXcRB)

float ndot(vec2 a, vec2 b ) { return a.x*b.x - a.y*b.y; }
float sdRhombus( in vec2 p, in vec2 b ) 
{
    p = abs(p);
    float h = clamp( ndot(b-2.0*p,b)/dot(b,b), -1.0, 1.0 );
    float d = length( p-0.5*b*vec2(1.0-h,1.0+h) );
    return d * sign( p.x*b.y + p.y*b.x - b.x*b.y );
}
void main()
{
    //vec2 uv =gl_FragCoord.xy/u_resolution.y;
    vec2 uv = (gl_FragCoord.xy - .5*u_resolution.xy)/u_resolution.y;
	vec2 m = iMouse.xy/u_resolution.xy;
    
    vec3 col = vec3(0);
    //uv = uv*10.; 
    // uv.y = abs(uv.y);
    // vec3 col = vec3(0);
    // float a = 3.14159/ 4.;
    // float d1 = dot(uv, vec2(sin(a), cos(a)));
    // float d2= dot(uv, vec2(-sin(a), cos(a)));
    // float d3 = length()
    // float offset = 0.35;
    // col += S(-.001,.001, max(d1,d2) - offset);
   // col += d3;
   // float e = dot(uv, -vec2(1,0));
  
   //vec2 ra = 0.4 + 0.3*cos( iTime + vec2(0.0, 1.57) + 0.0);
    
   float r1 = .2;
   float r2 = .1;
   float h = .3;
   float d = sdTrapezoid(uv, r1,r2,h);
   col += S(-.001,.001, d);
  
    
    //col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}
