// This file renders the supershape
// The code for the superformula and supershape3D are based primarily on Daniel Shiffman's 3d Supershape Coding CHallenge

// The code for the spherical coordinates is based on the one from 
// Mandelbulb Coding Challenge by Daniel Shiffman 
// https://www.youtube.com/watch?v=NJCiUVGiNyA
// Exploration of how to port from Shadertoy to P5.js
// https://www.youtube.com/watch?v=7ZIfXu_iPv4

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

float map(in float value, in float inMin, in float inMax, in float outMin, in float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}
// Spherical function from Daniel Shiffman
// I modified the function to change theta bsed on code from https://www.shadertoy.com/view/4llGWM
vec3 cart2polar( vec3 pos) 
{
   float r = length(pos);
   float theta = atan( length(pos.xy), pos.z );
   //float theta =pos.z/r;
   float phi = ( atan(pos.y, pos.x));
   
   vec3 w = vec3(r, theta, phi);
   return w;
}

float superFormula(float theta, float a, float b, float n1, float n2, float n3, float m) {
  float t1 = abs((1.0/1.0) * cos(m * theta / 4.0));
  t1 = pow(t1, n2);
  
  float t2 = abs((1.0/1.0) * sin(m * theta / 4.0));
  t2 = pow(t2, n3);
  
  float t3 = t1 + t2;
  float rr = pow(t3, -1.0 / n1);
  return rr;
}

float superShape3dSDF( in vec3 st, float s, float a, float b, float n1, float n2, float n3, float m) {
  float r = cart2polar( st ).x;
  float theta = cart2polar( st ).y;
  float phi = cart2polar( st ).z;
  float r1 = superFormula( phi, a, b, n1, n2, n3, m );
  float r2 = superFormula( theta, a, b, n1, n2, n3, m );
  float d1 = s * r1 * cos( phi ) * r2 * cos( theta );
  float d2 = s * r1 * sin( phi ) * r2 * cos( theta );
  float d3 = s * r2 * sin( theta ) ;
  vec3 q = vec3(d1, d2, d3);
  return r -= length(q); 
 }

/////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

float GetDist(  vec3 p ) {
  return superShape3dSDF( p, 0.8, 1.0, 1.0, 1.0, 1.0, 1.0, 5.0);
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
    
    // vec3 ro = vec3(0, 3, -3);
    // ro.yz *= Rot(-m.y*3.14+1.);
    // ro.xz *= Rot(-m.x*6.2831);
     vec2 st = (gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
  
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    //vec2 pixel = 1.0/u_resolution;
    //vec2 uv = ratio(st, u_resolution);
    vec2 mo = iMouse/u_resolution.y;
	float time = 32.0 + iTime * 1.5;

    // camera	
    vec3 ro = vec3( 4.5*cos(0.1*time + 7.0*mo.x), 1.2, 4.5*sin(0.1*time + 7.0*mo.x) ) * 1.;
    float lens = 1.0;
    vec3 rd = GetRayDir(uv, ro, vec3(0,0.,0), lens);
    
    float d = RayMarch(ro, rd);

    if(d<MAX_DIST) {
        vec3 p = ro + rd * d;
        vec3 n = GetNormal(p);
        vec3 r = reflect(rd, n);

        float dif = dot(n, normalize(vec3(1,2,3)))*.5+.5;
        vec3 c = vec3(dif);
      
         col += c * vec3(1);
       //col = vec3( dif*re, dif*gr, dif*bl );
    } 
       
    col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}