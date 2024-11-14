// This file shows how to create a 3D shape from a 2D SDF
// This method is based on a youtube tutorial by The Art of Code Martijn Steinrucken
// How to turn your 2d fractal into 3d!
// https://www.youtube.com/watch?v=__dSLc7-Cpo
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

// sdKoch and vec3 sdBox from Martyn Steinrucken
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

// superFormula and Supershape2D from Daniel Shiffman's 2d Supershape Coding Challenge
float superFormula(float theta) {
  float  n1 = 0.3;
  float n2 = 0.3;
  float n3 = 0.3;
  float m = 5.0;
  float aa = 1.0;
  float bb = 1.0;
  float t1 = abs((1.0/aa) * cos(m * theta / 4.0));
  t1 = pow(t1, n2);
  
  float t2 = abs((1.0/bb) * sin(m * theta / 4.0));
  t2 = pow(t2, n3);
  
  float t3 = t1 + t2;
  float r = pow(t3, -1.0 / n1);
  return r;
}

float Supershape2D( vec2 uv ) {
  vec2 q;
  float rr = 4.0*scale;
  float d = length(uv);
  float angle = atan(uv.y, uv.x);
  float radius = superFormula( angle );
  q.x = rr * radius * cos(angle);
  q.y = rr * radius * sin(angle);
  return d -= length(q); 
}

// 2D circle, box, star, hexagram, hexagon, cross, and roundedX SDFs from Inigo Quilez
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

float sdCross( vec2 p,  vec2 b, float r ) 
{
    p = abs(p); p = (p.y>p.x) ? p.yx : p.xy;
    vec2  q = p - b;
    float k = max(q.y,q.x);
    vec2  w = (k>0.0) ? q : vec2(b.y-p.x,-k);
    return sign(k)*length(max(w,0.0)) + r;
}

float dot2( vec2 v ) { return dot(v,v); }
float sdHeart( vec2 p )
{
    p.x = abs(p.x);

    if( p.y+p.x>1.0 )
        return sqrt(dot2(p-vec2(0.25,0.75))) - sqrt(2.0)/4.0;
    return sqrt(min(dot2(p-vec2(0.00,1.00)),
                    dot2(p-0.5*max(p.x+p.y,0.0)))) * sign(p.x-p.y);
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

float Rotation( vec3 p) {
  float d, d1, d2, d3;
   if (choice == 0.0) {
    d1 =  sdHexagram( vec2( length(p.xy), p.z ), 0.75*scale);
    d2 =  sdHexagram( vec2( length(p.yz), p.x ), 0.75*scale);
    d3 =  sdHexagram( vec2( length(p.xz), p.y ), 0.75* scale);
    d = max(d1, max(d2, d3));
  } else if (choice == 1.0) {
     d1 = sdStar( vec2( length(p.xy), p.z), scale, 8, 6.0);
     d2 = sdStar( vec2( length(p.yz), p.x), scale, 8, 6.0);
     d3 = sdStar( vec2( length(p.xz), p.y), scale, 8, 6.0);
     d = max(d1, max(d2, d3));
  }  else if (choice == 2.0) {
     d1 =  sdHexagon( vec2( length(p.xy), p.z ), scale);
     d2 =  sdHexagon( vec2( length(p.yz), p.x ), scale);
     d3 =  sdHexagon( vec2( length(p.xz), p.y ), scale);
     d = max(d1, max(d2, d3));
  } else if (choice == 3.0) {
     d1 =  sdCross( vec2( length(p.xy), p.z ), vec2(scale), 0.3);
     d2 =  sdCross( vec2( length(p.yz), p.x ), vec2(scale), 0.3);
     d3 =  sdCross( vec2( length(p.xz), p.y ), vec2(scale), 0.3);
     d = max(d1, max(d2, d3));
  } else if (choice == 4.0) {
    d1 =  sdRoundedX( vec2( length(p.xy), p.z ), 0.75, 0.25*scale);
    d2 =  sdRoundedX( vec2( length(p.yz), p.x ), 0.75, 0.25*scale);
    d3 =  sdRoundedX( vec2( length(p.xz), p.y ), 0.75, 0.25*scale);
    d = max(d1, max(d2, d3));
  } else if (choice == 5.0) {
    vec2 xy = sdKoch(vec2(length(p.xy), p.z));
    vec2 yz = sdKoch(vec2(length(p.yz), p.x));
    vec2 xz = sdKoch(vec2(length(p.xz), p.y));
    d =  max(xy.y, max(yz.y, xz.y));    
    // Mix with a box
    d =  mix(d, sdBox(p, vec3(scale)), mv);
  }
   // d = max(d1, max(d2, d3));
   return d;
}

/////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
 
float GetDist(  vec3 p, float shape3) {
  return Rotation( p );
  //return GetDistKoch( p, shape3 );
}

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
    
    // lens adjust distance to shape and thus size
    float lens = 3.0;
    vec3 rd = GetRayDir(uv, ro, vec3(0,0.,0), lens);
    col = colorGradient(uv,BLUE, PURPLE, 0.75);
    //col = ORANGE;
  
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