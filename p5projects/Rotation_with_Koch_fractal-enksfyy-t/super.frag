// This file shows how to create a 3D shape from a Koch fractal
// This is based on a youtube tutorial by The Art of Code  Martijn Steinrucken

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
uniform float choice; // number for choice of 3D Koch curve 
uniform float shape1;
// uniform float shape2;
uniform float scale;  // scale
uniform float th;  // thickness of slice
uniform float mv;  // mix value
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



// 2d Circle, Box, Star, and rhombus SDFs from Inigo Quilez

float sdCircle( vec2 uv, float r) {
  return length(uv) - r;
} 

float sdBox( vec2 uv, vec2 b )
{
    vec2 d = abs(uv)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

float sdHexagon( vec2 p, float r )
{
    const vec3 k = vec3(-0.866025404,0.5,0.577350269);
    p = abs(p);
    p -= 2.0*min(dot(k.xy,p),0.0)*k.xy;
    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);
    return length(p)*sign(p.y);
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

float sdRoundedX( vec2 p,  float w, float r )
{
    p = abs(p);
    return length(p-min(p.x+p.y,w)*0.5) - r;
}

float sdHexagram(  vec2 p,  float r )
{
    const vec4 k = vec4(-0.5,0.8660254038,0.5773502692,1.7320508076);
    p = abs(p);
    p -= 2.0*min(dot(k.xy,p),0.0)*k.xy;
    p -= 2.0*min(dot(k.yx,p),0.0)*k.yx;
    p -= vec2(clamp(p.x,r*k.z,r*k.w),r);
    return length(p)*sign(p.y);
}

float sdPentagon( in vec2 p, in float r )
{
    const vec3 k = vec3(0.809016994,0.587785252,0.726542528);
    p.x = abs(p.x);
    p -= 2.0*min(dot(vec2(-k.x,k.y),p),0.0)*vec2(-k.x,k.y);
    p -= 2.0*min(dot(vec2( k.x,k.y),p),0.0)*vec2( k.x,k.y);
    p -= vec2(clamp(p.x,-r*k.z,r*k.z),r);    
    return length(p)*sign(p.y);
}
// From The Art of Code
float GetDistKoch(vec3 p, float choice) {
   float d; 
   vec2 xy;
   vec2 yz;
   vec2 xz;
   vec2 uv = sdKoch(p.xy);
   if (choice == 0.0) {
     //straight intersection 
     xy = sdKoch( p.xy );
     yz = sdKoch( p.yz );
     xz = sdKoch( p.xz );
     d = max(xy.y, max(yz.y, xz.y));
   } else if (choice == 1.0) {
   // similar to extrusion method with full depth
   // this one is a little pixelated
     xy = sdKoch( vec2( length(p.xz), p.y ) );
     d =  xy.y;
   }
  //  // intersection of revolutions
    else if (choice == 2.0) {
        xy = sdKoch(vec2(length(p.xy), p.z));
        yz = sdKoch(vec2(length(p.yz), p.x));
        xz = sdKoch(vec2(length(p.xz), p.y));
        d =  max(xy.y, max(yz.y, xz.y));    
   }
   else if (choice == 3.0) {
        xy = sdKoch(vec2(length(p.xy), p.z));
        yz = sdKoch(vec2(length(p.yz), p.x));
        xz = sdKoch(vec2(length(p.xz), p.y));
        d =  max(xy.y, max(yz.y, xz.y));    
        // Mix with a sphere
        d =  mix(d, length(p) - scale, mv);
   }
  else if (choice== 4.0) {
        xy = sdKoch(vec2(length(p.xy), p.z));
        yz = sdKoch(vec2(length(p.yz), p.x));
        xz = sdKoch(vec2(length(p.xz), p.y));
        d =  max(xy.y, max(yz.y, xz.y));    
        // Mix with a box
        d =  mix(d, sdBox(p, vec3(scale)), mv);
   }
   else if (choice == 5.0) {
     // cookie cutter 
       d = length(uv) - 0.03;  // makes a cylinder
       d = max(d, abs(p.z)- th); // boolean intersection
   }
   else if (choice == 6.0)  {
       // slice
       d = length(uv) - 0.03;  // makes a cylinder
       d =  uv.y;
       d = max(d, abs(p.z)- th); // boolean intersection
   }
  return d;
}


float rotation( vec3 p) {
   float d;
   // float d1 =  sdHexagon( vec2( length(p.xy), p.z ), scale);
   // float d2 =  sdHexagon( vec2( length(p.yz), p.x ), scale);
   // float d3 =  sdHexagon( vec2( length(p.xz), p.y ), scale);
  
    // float d1 =  sdHexagram( vec2( length(p.xy), p.z ), scale);
    // float d2 =  sdHexagram( vec2( length(p.yz), p.x ), scale);
    // float d3 =  sdHexagram( vec2( length(p.xz), p.y ), scale);
  
    float d1 =  sdRoundedX( vec2( length(p.xy), p.z ), 0.75, scale);
    float d2 =  sdRoundedX( vec2( length(p.yz), p.x ), 0.75, scale);
    float d3 =  sdRoundedX( vec2( length(p.xz), p.y ), 0.75, scale);
  
//   float d1 =  sdPentagon( vec2( length(p.xy), p.z ), scale);
//    float d2 =  sdPentagon( vec2( length(p.yz), p.x ), scale);
//    float d3 =  sdPentagon( vec2( length(p.xz), p.y ), scale);
  
   // float d1 = sdStar( vec2( length(p.xy), p.z), 0.5, 8, 6.0);
   // float d2 = sdStar( vec2( length(p.yz), p.x), 0.5, 8, 6.0);
   // float d3 = sdStar( vec2( length(p.xz), p.y), 0.5, 8, 6.0);
   d = max(d1, max(d2, d3));
  
   
  return d;
}
/////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
 
float GetDist(  vec3 p, float shape3) {
  //return rotation( p );
  return GetDistKoch( p, shape3 );
}


// Both methods are the same from this point on
float RayMarch(vec3 ro, vec3 rd) {
	float dO=0.;
    
    for(int i=0; i<MAX_STEPS; i++) {
    	vec3 p = ro + rd*dO;
        float dS = GetDist(p, choice);
        dO += dS;
        if(dO>MAX_DIST || abs(dS)<SURF_DIST) break;
    }   
    return dO;
}

vec3 GetNormal(vec3 p) {
	float d = GetDist(p,  choice);
    vec2 e = vec2(.001, 0);
    
    vec3 n = d - vec3(
        GetDist(p-e.xyy, choice),
        GetDist(p-e.yxy, choice),
        GetDist(p-e.yyx, choice));
    
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
    
    
    vec3 rd = GetRayDir(uv, ro, vec3(0,0.,0), 3.0);
   col = colorGradient(uv,BLUE, PURPLE, 0.75);
    //col = ORANGE;
  
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
         
       // col = vec3(dif*0.8, 0.0, 1.0 ); //very nice purple
       // col = vec3(0.5, dif*0.8, 1.0 ); // purple
       // col = vec3(0.0, 0.5*dif, dif*1.0); // aqua
       col = vec3( dif*re, dif*gr, dif*bl );
    } 
       
    col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}