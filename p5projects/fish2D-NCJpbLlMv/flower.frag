 // "RayMarching starting point" 
// by Martijn Steinrucken aka The Art of Code/BigWings - 2020
// The MIT License
// See Texturing SDFs by The Art of Code


#ifdef GL_ES
precision mediump float;
#endif

#define S smoothstep
#define T iFrame
#define PI 3.14159

uniform vec2 u_resolution; // This is passed in as a uniform from the sketch.js file
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;
uniform sampler2D tex0;
uniform sampler2D tex1;
uniform sampler2D tex2;

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .001

#define S smoothstep

mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
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



// From IQ
// Add rotation matrix to improve noise function
// using coordinates for right triangle
mat2 m = mat2( 0.8, .6, -.6, 0.8);


// IQ coding an eye livestream
float fbm1( vec2 p)
  {
  float f = 0.0;
   f += 0.5000*SmoothNoise( p ) ; p*= m*2.02;
   f += 0.2500*SmoothNoise( p ) ; p*= m*2.03;
   f += 0.1250*SmoothNoise( p ) ; p*= m*2.01;
   f += 0.0625*SmoothNoise( p ) ; p*= m*2.04;
   f /= 0.9375;
   return f;
}

// IQ coding an eye livestream
// this version creates smoother appearance
float fbm2( vec2 p)
  {
  float f = 0.0;
   f += 0.5000*SmoothNoise2( p ) ; p*= m*2.02;
   f += 0.2500*SmoothNoise2( p ) ; p*= m*2.03;
   f += 0.1250*SmoothNoise2( p ) ; p*= m*2.01;
   f += 0.0625*SmoothNoise2( p ) ; p*= m*2.04;
   f /= 0.9375;
   return f;
}

// See Gear livestream by Inigo Quilezfor a really good explanation of how the box SDF is derived

float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

float sdCircle( vec2 p, float r )
{
    return length(p) - r;
}

//Uneven Capsule - exact   (https://www.shadertoy.com/view/4lcBWn)

float sdUnevenCapsule( vec2 p, float r1, float r2, float h )
{
    p.x = abs(p.x);
    float b = (r1-r2)/h;
    float a = sqrt(1.0-b*b);
    float k = dot(p,vec2(-b,a));
    if( k < 0.0 ) return length(p) - r1;
    if( k > a*h ) return length(p-vec2(0.0,h)) - r2;
    return dot(p, vec2(a,b) ) - r1;
}

// // Could I create a 2D fish and extrude to 3D?
// float opExtrusion( in vec3 p, in sdf2dPrim, in float h )
// {
//     float d = primitive(p.xy)
//     vec2 w = vec2( d, abs(p.z) - h );
//     return min(max(w.x,w.y),0.0) + length(max(w,0.0));
// }

// float opRevolution( in vec3 p, in sdf2dPrim, float o )
// {
//     vec2 q = vec2( length(p.xz) - o, p.y );
//     return primitive(q)
// }

//Functions to join objects together
float opSmoothUnion( float d1, float d2, float k ) {
    float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
    return mix( d2, d1, h ) - k*h*(1.0-h); }

float opSmoothSubtraction( float d1, float d2, float k ) {
    float h = clamp( 0.5 - 0.5*(d2+d1)/k, 0.0, 1.0 );
    return mix( d2, -d1, h ) + k*h*(1.0-h); }

float opSmoothIntersection( float d1, float d2, float k ) {
    float h = clamp( 0.5 - 0.5*(d2-d1)/k, 0.0, 1.0 );
    return mix( d2, d1, h ) + k*h*(1.0-h); }

float ndot(vec2 a, vec2 b ) { return a.x*b.x - a.y*b.y; }
float sdRhombus( in vec2 p, in vec2 b ) 
{
    p = abs(p);
    float h = clamp( ndot(b-2.0*p,b)/dot(b,b), -1.0, 1.0 );
    float d = length( p-0.5*b*vec2(1.0-h,1.0+h) );
    return d * sign( p.x*b.y + p.y*b.x - b.x*b.y );
}

float sdEgg( in vec2 p, in float ra, in float rb )
{
    const float k = sqrt(3.0);
    p.x = abs(p.x);
    float r = ra - rb;
    return ((p.y<0.0)       ? length(vec2(p.x,  p.y    )) - r :
            (k*(p.x+r)<p.y) ? length(vec2(p.x,  p.y-k*r)) :
                              length(vec2(p.x+r,p.y    )) - 2.0*r) - rb;
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

 float sdTriangleIsosceles( in vec2 p, in vec2 q )
{
    p.x = abs(p.x);
    vec2 a = p - q*clamp( dot(p,q)/dot(q,q), 0.0, 1.0 );
    vec2 b = p - q*vec2( clamp( p.x/q.x, 0.0, 1.0 ), 1.0 );
    float s = -sign( q.y );
    vec2 d = min( vec2( dot(a,a), s*(p.x*q.y-p.y*q.x) ),
                  vec2( dot(b,b), s*(p.y-q.y)  ));
    return -sqrt(d.x)*sign(d.y);
}

float sdParallelogram( in vec2 p, float wi, float he, float sk )
{
    vec2 e = vec2(sk,he);
    p = (p.y<0.0)?-p:p;
    vec2  w = p - e; w.x -= clamp(w.x,-wi,wi);
    vec2  d = vec2(dot(w,w), -w.y);
    float s = p.x*e.y - p.y*e.x;
    p = (s<0.0)?-p:p;
    vec2  v = p - vec2(wi,0); v -= e*clamp(dot(v,e)/dot(e,e),-1.0,1.0);
    d = min( d, vec2(dot(v,v), wi*he-abs(s)));
    return sqrt(d.x)*sign(-d.y);
}

// float sdFish( in vec2 p) {
//         float offset = .10;
//         float angle = 3.14159/2.;
        
//         float d1 = sdTriangleIsosceles( vec2(p.x+2.*offset, p.y)*Rot(angle), vec2(.05)) - .01;
//         float d2 = sdTrapezoid( vec2(p.x+offset, p.y)*Rot(angle), .05, .1, .05) ;
//         float d3 = sdBox( vec2(p.x, p.y), vec2(.05, .1) );
//         float m =  opSmoothUnion(d2, d3, .2);
//         //float d4 = sdTrapezoid( vec2(p.x-offset, p.y)*Rot(-angle), .05, .1, .05) ;
//         //float m2 = mix(m1, d4);
//         //float m2 = opSmoothUnion(d3,d4, .13);
//         float d5 = sdRhombus(vec2(p.x-2.*offset, p.y+.045)*Rot(6.28318/13.5), vec2(.1, .05));
//         float d6 = sdRhombus(vec2(p.x-2.*offset, p.y-.045)*Rot(-6.28318/13.5), vec2(.1, .05));
//        // float m3 = min(d5,d6, .13);
//         //float m = min(m1, m2);
//         // float m1 = min(d3,d4);
//         // float m2 = min(d5,d6);
//         // m  = min(m,m1);
//         // m  = min(m,m2);
//         return  S(-.001, .001, m) -.01;
// }
void main()
{
    vec2 uv = (gl_FragCoord.xy -.5*u_resolution.xy)/u_resolution.y;
	//vec2 m = iMouse.xy/u_resolution.xy;
    
    vec3 col = vec3(0);
   
   //vec2 d = vec2(1.) - pow( abs(uv), 2.5);
 
   vec2 gv = uv;
  
   //float d1 = pow( gv.x, 3.);
   float d1 = pow( abs(gv.x), 2.5);
   float d = S(-.5, .5, d1);
    col += d;
   
    
    //col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}


    //     float d1 = sdTriangleIsosceles( vec2(uv.x+2.17*offset, uv.y)*Rot(angle), vec2(.056)) - .001;
    //     float d2 = sdTrapezoid( vec2(uv.x+offset, uv.y)*Rot(angle), .05, .09, .05) ;
    //     float d3 = sdBox( vec2(uv.x, uv.y), vec2(.05, .1) );
    //     float m =  opSmoothUnion(d2, d3, .2);
    //     // //float d4 = sdTrapezoid( vec2(p.x-offset, p.y)*Rot(-angle), .05, .1, .05) ;
    //     float m2 = min(d1, m);
    //     float d4 = sdTriangleIsosceles( vec2(uv.x-1.6375*offset, uv.y)*Rot(-angle), vec2(.1)) - .002;
    //     float m3 = min(m2,d4);
    //     float d5 = sdRhombus(vec2(uv.x-2.*offset, uv.y+.045)*Rot(6.28318/13.5), vec2(.1, .05));
    //     float d6 = sdRhombus(vec2(uv.x-2.*offset, uv.y-.045)*Rot(-6.28318/13.5), vec2(.1, .05));
    //    // float m3 = min(d5,d6, .13);
    //     //float m = min(m1, m2);
    //     // float m1 = min(d3,d4);
    //     // float m2 = min(d5,d6);
    //     // m  = min(m,m1);
    //     // m  = min(m,m2);
    //     float d =  S(-.001, .001,m3) -.01;
    // //float fish = sdFish(uv);   
