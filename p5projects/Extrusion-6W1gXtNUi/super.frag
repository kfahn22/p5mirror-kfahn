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
uniform float dd;  // depth
uniform float scale;  // scale
uniform float re;  // value for red
uniform float gr;  // value for green
uniform float bl;  // value for blue

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

// 2d Circle, Box, Star, and hexagon SDFs from Inigo Quilez

float sdCircle( vec2 uv, float r) {
  return length(uv) - r;
} 

float sdBox( vec2 uv, vec2 b )
{
    vec2 d = abs(uv)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

// r scales the star
// n -- vertices around circle
// m must must be > 1.0 (1.01 works) and less than n
float sdStar( vec2 uv,  float r, int n, float m)
{
    float an = 3.141593/float(n);
    float en = 3.141593/m; 
    vec2  acs = vec2(cos(an),sin(an));
    vec2  ecs = vec2(cos(en),sin(en)); 

    float bn = mod(atan(uv.x,uv.y),2.0*an) - an;
    uv = length(uv)*vec2(cos(bn),abs(sin(bn)));
    uv -= r*acs;
    uv += ecs*clamp( -dot(uv,ecs), 0.0, r*acs.y/ecs.y);
    return length(uv)*sign(uv.x);
}

float sdHexagon( vec2 p, float r )
{
    const vec3 k = vec3(-0.866025404,0.5,0.577350269);
    p = abs(p);
    p -= 2.0*min(dot(k.xy,p),0.0)*k.xy;
    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);
    return length(p)*sign(p.y);
}

///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// Inigio Quilez has a collection of optimized SDF's on his website
// You can substitute different SDF's to get different shapes

// Using extrusion (like pushing playdough through a mold)
// Example using sdStar

// From Inigo Quilez
float opExtrusion( vec3 p, float h )
{
   float d;
  //choose 2D shape
  if (shape1 == 0.0) {
    d = sdCircle(p.xy, scale);
  } else if (shape1 == 1.0) {
    d = sdStar(p.xy, scale, 8, 6.0);
  } else if (shape1 == 2.0) {
    d = sdHexagon(p.xy, scale);
  }
    vec2 w = vec2( d, abs(p.z) - h );
    return min(max(w.x,w.y),0.0) + length(max(w,0.0));
}

float GetDist(vec3 p) {
   vec3 q = p - vec3(0.0, 0.0, 0.0);
   return opExtrusion( p, dd);
 }


/////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////


// Raymarching function
float RayMarch(vec3 ro, vec3 rd) {
	float dO=0.;
    
    for(int i=0; i<MAX_STEPS; i++) {
    	vec3 p = ro + rd*dO;
        float dS = GetDist(p);
        dO += dS;
        if(dO>MAX_DIST || abs(dS)<SURF_DIST) break;
    }   
    return dO;
}

vec3 GetNormal(vec3 p) {
	float d = GetDist(p);
    vec2 e = vec2(.001, 0);
    
    vec3 n = d - vec3(
        GetDist(p-e.xyy),
        GetDist(p-e.yxy),
        GetDist(p-e.yyx));
    
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
     col = colorGradient(uv,PURPLE, BLUE, 0.5);
    //col = TEAL;
  
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
         
        // col = vec3(dif*0.8, 0.0, 1.0 );  // purple
        //col = vec3(0.5, dif*0.8, 1.0 ); // lilac
        col = vec3( dif*re, dif*gr, dif*bl );
    } 
       
    col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}