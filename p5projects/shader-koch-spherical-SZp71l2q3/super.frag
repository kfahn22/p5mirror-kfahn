// This file renders the supershape
// The code for the superformula and supershape3D are based primarily on Daniel Shiffman's 3d Supershape Coding CHallenge

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

// supershape parameters
uniform float aa;
uniform float bb;
uniform float rr; 
uniform float m;  
uniform float n1;
uniform float n2;
uniform float n3;
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

// Rotation matrix
mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

float ndot(vec2 a, vec2 b ) { return a.x*b.x - a.y*b.y; }

// From KIFS Fractals explained by The Art of Code
// https://www.youtube.com/watch?v=il_Qg9AqQkE

// Create a normal line that rotates around origin
vec2 N(float angle)
  {
  return vec2( sin(angle), cos(angle) );
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

float sdCircle( vec2 p, float r )
{
    return length(p) - r;
}
// float superFormula(float theta, float  m, float n1, float n2, float n3) {
//   float t1 = abs((1.0/aa) * cos(m * theta / 4.0));
//   t1 = pow(t1, n2);
  
//   float t2 = abs((1.0/bb) * sin(m * theta / 4.0));
//   t2 = pow(t2, n3);
  
//   float t3 = t1 + t2;
//   float rr = pow(t3, -1.0 / n1);
//   return rr;
// }

// float Supershape3D( vec3 p, float rr, float m, float n1, float n2, float n3 ) {

//   // Code for angles from https://www.shadertoy.com/view/4llGWM
//   float d = length(p);//the distance to the center of the shape
//   float sn = p.z/d;//the sine of rho (the angle between z and xy)
//   float angle1 = atan(p.y,p.x);
//   float angle2 = asin(sn);
//   float r1 = superFormula(angle1, m, n1, n2, n3 );
//   float r2 = superFormula(angle2, m, n1, n2, n3 );
//   float d1 = rr * r1 * cos(angle1) * r2 * cos(angle2);
//   float d2 = rr * r1 * sin(angle1) * r2 * cos(angle2);
//   float d3 = rr * r2 * sin(angle2) ;
//   vec3 q = vec3(d1, d2, d3);
//   return d -= length(q);
  
// }

// // Function to extract polar coordinates
// // Comparable to Spherical class in Coding Train mandelbulb challenge
// vec3 Spherical( in vec3 pos) 
// {
//    float r = sqrt(pos.x*pos.x + pos.y*pos.y + pos.z*pos.z);
//    float theta = atan( sqrt(pos.x*pos.x + pos.y*pos.y), pos.z);
//    float phi = atan(pos.y, pos.x);
//    vec3 w = vec3(r, theta, phi);
//    return w;
// }

// float Koch3D( vec3 p) {
//   float rr = 1.0;
//   vec3 q;
//   float r = length( p );
//   float angle1 = atan(p.y,p.x);
//   float sn = p.z/r;//the sine of rho (the angle between z and xy)
//   float angle2 = asin(sn);
//   float r1 = length(sdKoch(p.yz));
//   float r2 = length(sdKoch(p.xz));
//   q.x = rr * r1 * cos(angle1) * r2 * cos(angle2);
//   q.y = rr * r1 * sin(angle1) * r2 * cos(angle2);
//   q.z = rr * r2 * sin(angle2);
//   return length(q);
//   //return r -= length(q);
// }
// Spherical function from Daniel Shiffman
// I modified the function to change theta bsed on code from https://www.shadertoy.com/view/4llGWM
vec3 Spherical( vec3 pos) 
{
   float r = sqrt(pos.x*pos.x + pos.y*pos.y + pos.z*pos.z);
  // float theta = atan( sqrt(pos.x*pos.x + pos.y*pos.y), pos.z);
   float theta =pos.z/r;
   float phi = atan(pos.y, pos.x);
   vec3 w = vec3(r, theta, phi);
   return w;
}

float hexagon3D( vec3 p) {
  float rr = 1.0;
  vec3 q;
  float r = Spherical( p ).x;
  float theta = Spherical( p ).y;
  float phi = Spherical( p ).z;
  //float phi = atan(p.y,p.x);
  //float sn = p.z/r;//the sine of rho (the angle between z and xy)
  //float angle2 = asin(sn);
  float r1 = sdHexagram(p.yz, 0.5);
  float r2 = sdHexagram(p.xz, 0.5);
  q.x = rr * r1 * cos(phi) * r2 * cos(theta);
  q.y = rr * r1 * sin(phi) * r2 * cos(theta);
  q.z = rr * r2 * sin(theta);
  //return length(q);
  return r -= length(q);
}

float circle3D( vec3 p) {
  float rr = 1.0;
  vec3 q;
  float r = Spherical( p ).x;
  float theta = Spherical( p ).y;
  float phi = Spherical( p ).z;
  //float phi = atan(p.y,p.x);
  //float sn = p.z/r;//the sine of rho (the angle between z and xy)
  //float angle2 = asin(sn);
  float r1 = sdCircle(p.yz, 0.5);
  float r2 = sdCircle(p.xz, 0.5);
  q.x = rr * r1 * cos(phi) * r2 * cos(theta);
  q.y = rr * r1 * sin(phi) * r2 * cos(theta);
  q.z = rr * r2 * sin(theta);
  //return length(q);
  return r -= length(q);
}
/////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

float GetDist(  vec3 p ) {
  return sdHexagram( p, 0.2 );
}


// Both methods are the same from this point on
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
    
    float lens = 5.0;
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