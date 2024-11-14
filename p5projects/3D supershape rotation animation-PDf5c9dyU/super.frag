// This file renders the supershape
// The code for the superformula and supershape3D are based primarily on Daniel Shiffman's 3d Supershape Coding CHallenge

// This method is based on a youtube tutorial by The Art of Code  Martijn Steinrucken
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

// input color from sketch
uniform float re;  // value for red
uniform float gr;  // value for green
uniform float bl;  // value for blue

// Or add color directly in frag file
// The uvs are floating point with a range of [0.0,1.0] so we normalize by dividing by 255.
//#define PURPLE vec3(123,30,122) / 255.
#define RED vec3(191, 18, 97) / 255.
#define ORANGE vec3(249,86,79) / 255.
#define NAVY vec3(12, 10, 62) / 255.
#define PURPLE vec3(170,62,152) / 255.
#define PINK vec3(239,149,156) / 255.
#define AQUA1 vec3(140, 222, 220) / 255.
#define AQUA2 vec3(178, 236, 225) / 255.

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

// From Daniel Shiffman's 2d Supershape Coding Challenge
float superFormula(float theta) {
  float aa = 1.0, bb = 1.0, n1 = 1.0, n2 = 1.0, n3 = 1.0;;
  float m = 6.0;
  float newm = m*sin(T)*0.5 + 0.5;
  float t1 = abs((1.0/aa) * cos(m * theta / 4.0));
  t1 = pow(t1, n2);
  // make t2 a function of time
  float t2 = abs((1.0/bb) * sin(newm * theta / 4.0));
  t2 = pow(t2, n3);
  
  float t3 = t1 + t2;
  
  float r = pow(t3, -1.0 / n1);
 
  return r;
}

float Supershape2D( vec2 uv ) {
  float rr = 0.5;
  vec2 q;
  float d = length(uv);
  float angle = atan(uv.y, uv.x);
  float radius = superFormula( angle );
  q.x = rr * radius * cos(angle);
  q.y = rr * radius * sin(angle);
  return d -= length(q); 
}

float Rotation ( vec3 p ) {
   float d1 =  Supershape2D( vec2( length(p.xy), p.z ));
   float d2 =  Supershape2D( vec2( length(p.yz), p.x ));
   float d3 =  Supershape2D( vec2( length(p.xz), p.y ));
  return max(d1, max(d2, d3));
}

float GetDist(  vec3 p ) {
  return Rotation( p );
}

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
     
    
    vec3 rd = GetRayDir(uv, ro, vec3(0,0.,0), 3.0);
     // when capturing GIF background colors don't render well!!
     //col = colorGradient(uv,PURPLE,PINK, 0.5);
    
  
    float d = RayMarch(ro, rd);

    if(d<MAX_DIST) {
        vec3 p = ro + rd * d;
        vec3 n = GetNormal(p);
        vec3 r = reflect(rd, n);
        float spec = pow(max(0.0, r.y), 10.); // add specular highlight
        float dif = dot(n, normalize(vec3(1,2,3)))*.5+.5;
        vec3 c = vec3(dif);
         
       col = vec3( dif*re, dif*gr, dif*bl ) + spec*0.2;
    } 
       
    col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}