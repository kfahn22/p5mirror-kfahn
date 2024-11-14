// This file shows different methods for creating 3D shapes 
// This is entirely based on the works of Inigo Quilez and Martijn Steinrucken

// Another method is from Inigo Quilez 
// https://iquilezles.org/

// One method is based on tutorials by Martyn 
// https://www.youtube.com/c/TheArtofCodeIsCool

// Base code based on the Ray Marching Starting Point from the Art of Code
// https://www.youtube.com/watch?v=PGtv-dBi2wE

#ifdef GL_ES
precision mediump float;
#endif

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .001
#define S smoothstep
#define T iTime
#define PI 3.14159

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;
uniform sampler2D tex0;
uniform float choice;
uniform float shape1;
uniform float shape2;
uniform float dd;  // depth
uniform float scale;  // scale
uniform float mv;  // mix value
uniform float shape3; // number for choice of 3D Koch curve 

// Add color
// The uvs are floating point with a range of [0.0,1.0] so we normalize by dividing by 255.
#define PURPLE vec3(83, 29,109) / 255.
#define RED vec3(191, 18, 97) / 255.
#define ORANGE vec3(251,162, 100) / 255.
#define BLUE vec3(118, 212, 229) / 255.
#define TEAL vec3(11, 106, 136) / 255.

// Function to add color to shape using x,y,z dimensions
vec3 colXYZ( vec3 col1, vec3 col2, vec3 col3, vec3 n)
  {
        vec3 colXY = col1;  // front and back insdie and outside
        vec3 colXZ = col2;  // top and bottom
        vec3 colYZ = col3;  //  left and right inside and outside
      
       // Tri-planar mapping
        n = abs(n);  // take absolute value to get all faces of cube
        n *= pow(n, vec3(5.));
        n /= n.x + n.y + n.z; // add normalization 
      
       vec3 col = colXZ*n.y + colXY*n.z + colYZ*n.x ; 
       return col;
}

vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}  

float ndot(vec2 a, vec2 b ) { return a.x*b.x - a.y*b.y; }

// Rotation matrix
mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

// From KIFS Fractals explained by The Art of Code
// https://www.youtube.com/watch?v=il_Qg9AqQkE

// Create a normal line that rotates around origin
vec2 N(float angle)
  {
  return vec2( sin(angle), cos(angle) );
}

// sdKoch and vec3 sdBox from Martyn 
// This function returns a vec2 
vec2 sdKoch( vec2 uv) {
  
    uv.x = abs(uv.x);  // Reflect around y axis
    uv.y += tan((5./6.)*3.1415)*.5;
    vec2 n = N((5./6.)*3.1415);
    float d = dot(uv- vec2(.5,0), n);  //remap to right-most side of Koch curve
    uv -= n * max(0., d) * 2.; // Code for a reflection about a line
  
    n = N((2./3.)*3.1415);
    float scale = 1.;  // keeps track of how mnay times we compress the uvs
    uv.x += .5; // adjustment to reorient Koch curve
   
    for (int i = 0; i < 4; i++) {
    
        // Remap uv so that one line segment [-.5,.5]
        uv *= 3.;
        scale *= 3.;
        // put (0,0) in middle of line segment
        uv.x -= 1.5; 

        // Fold x coordinates in half by taking absolute value 
        uv.x = abs(uv.x);

        // Substract 0.5 on either side to increase the length of line to 3 units
        uv.x -= .5;
        d = dot(uv, n);
        uv -= n * min(0., d) *  2.;
     }
  uv /= scale;
  return uv;
}
// 3d SDFs
float sdBox(vec3 p, vec3 s) {
    p = abs(p)-s;
	return length(max(p, 0.))+min(max(p.x, max(p.y, p.z)), 0.);
}

float sdTorus( vec3 p, vec2 t )
{
  vec2 q = vec2(length(p.xz)-t.x,p.y);
  return length(q)-t.y;
}

float sdCylinder( vec3 p, vec3 c )
{
  return length(p.xz-c.xy)-c.z;
}

// 2d Circle, Box, Star, and hexagon SDFs from Inigo Quilez

float sdCircle( vec2 uv, float r) {
  return length(uv) - r;
} 

float sdBox( vec2 uv, vec2 b )
{
    vec2 d = abs(uv)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

float sdPentagon( vec2 p, float r )
{
    const vec3 k = vec3(0.809016994,0.587785252,0.726542528);
    p.x = abs(p.x);
    p -= 2.0*min(dot(vec2(-k.x,k.y),p),0.0)*vec2(-k.x,k.y);
    p -= 2.0*min(dot(vec2( k.x,k.y),p),0.0)*vec2( k.x,k.y);
    p -= vec2(clamp(p.x,-r*k.z,r*k.z),r);    
    return length(p)*sign(p.y);
}

float sdParallelogram( vec2 p, float wi, float he, float sk )
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
float sdHexagon( vec2 p, float r )
{
    const vec3 k = vec3(-0.866025404,0.5,0.577350269);
    p = abs(p);
    p -= 2.0*min(dot(k.xy,p),0.0)*k.xy;
    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);
    return length(p)*sign(p.y);
}


// 3D Koch curve ported from The Art of Code
// Several different variations
float GetDistKoch(vec3 p, float axis) {
   float d; 
   vec2 xy;
   vec2 yz;
   vec2 xz;
   if (shape3 == 0.0) {
     //straight intersection 
     xy = sdKoch( p.xy );
     yz = sdKoch( p.yz );
     xz = sdKoch( p.xz );
     d = max(xy.y, max(yz.y, xz.y));
   } else if (shape3 == 1.0) {
  //similar to extrusion method with full depth
 
  // rotation
     xy = sdKoch( vec2( length(p.xz), p.y ) );
     d =  xy.y;
  // roughly analygous to supershape contruction
   } else if (shape3 == 2.0) {
        xy = sdKoch(vec2(length(p.xy), p.z));
        yz = sdKoch(vec2(length(p.yz), p.x));
        xz = sdKoch(vec2(length(p.xz), p.y));
        d =  max(xy.y, max(yz.y, xz.y));    
   }
   else if (shape3 == 3.0) {
     // intersection of revolutions
        xy = sdKoch(vec2(length(p.xy), p.z));
        yz = sdKoch(vec2(length(p.yz), p.x));
        xz = sdKoch(vec2(length(p.xz), p.y));
        d =  max(xy.y, max(yz.y, xz.y));    
        // Mix with a sphere
        d =  mix(d, length(p) - scale, mv);
   }
  else if (shape3 == 4.0) {
        xy = sdKoch(vec2(length(p.xy), p.z));
        yz = sdKoch(vec2(length(p.yz), p.x));
        xz = sdKoch(vec2(length(p.xz), p.y));
        d =  max(xy.y, max(yz.y, xz.y));    
        // Mix with a box
        d =  mix(d, sdBox(p, vec3(scale)), mv);
   }
   
  return d;
}

float rotation( vec3 p) {
   float d;
   float d1 =  sdHexagon( vec2( length(p.xy), p.z ), 0.3);
   float d2 =  sdHexagon( vec2( length(p.yz), p.x ), 0.3);
   float d3 =  sdHexagon( vec2( length(p.xz), p.y ), 0.3);
   d = max(d1, max(d2, d3));
  return d;
}

/////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
 
float GetDist(  vec3 p, float shape3) {
 // return hexRot( p, choice);
  return hexRot( p );
}


// Both methods are the same from this point on
float RayMarch(vec3 ro, vec3 rd) {
	float dO=0.;
    
    for(int i=0; i<MAX_STEPS; i++) {
    	vec3 p = ro + rd*dO;
        float dS = GetDist(p, shape3);
        dO += dS;
        if(dO>MAX_DIST || abs(dS)<SURF_DIST) break;
    }   
    return dO;
}

vec3 GetNormal(vec3 p) {
	float d = GetDist(p,  shape3);
    vec2 e = vec2(.001, 0);
    
    vec3 n = d - vec3(
        GetDist(p-e.xyy, shape3),
        GetDist(p-e.yxy, shape3),
        GetDist(p-e.yyx, shape3));
    
    return normalize(n);
}

vec3 GetRayDir(vec2 uv, vec3 p, vec3 l, float z) {
    vec3 f = normalize(l-p),
        r = normalize(cross(vec3(0,1,0), f)),
        u = cross(f,r),
        c = f*z,
        i = c + uv.x*r + uv.y*u,
        d = normalize(i);
    return d;
}

void main( )
{
    vec2 uv = (gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
	vec2 m = iMouse.xy/u_resolution.xy;
    vec3 col = vec3(0);
    
    vec3 ro = vec3(0, 3, -3);
    ro.yz *= Rot(-m.y*3.14+1.);
    ro.xz *= Rot(-m.x*6.2831);
    
    
    vec3 rd = GetRayDir(uv, ro, vec3(0,0.,0), 2.0);
     //col = colorGradient(uv,TEAL, ORANGE, 0.25);
    col = TEAL;
  
     // Add a reflective background surface
    // uv = vec2(atan(rd.x, rd.z)/ 6.2832 , rd.y/3.) + .5;  // remap coordinates
    // col = texture2D(tex0, uv).rgb;
  
    float d = RayMarch(ro, rd);

    if(d<MAX_DIST) {
        vec3 p = ro + rd * d;
        vec3 n = GetNormal(p);
        vec3 r = reflect(rd, n);

        float dif = dot(n, normalize(vec3(1,2,3)))*.5+.5;
        vec3 c = vec3(dif);
         
        //col = mix(col, c*RED, 0.5);
        col = c*RED;
       
      
    } 
       
    col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}