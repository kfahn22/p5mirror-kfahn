// The frag shader code is based on code from Daniel Shiffman, Inigo Quilez, and Martijn Steinrucken (aka the Art of Coding)

// Mandelbulb challenge from theCodingTrain
// https://www.youtube.com/watch?v=NJCiUVGiNyA
// Exploration of how to port from Shadertoy to P5.js
// https://www.youtube.com/watch?v=7ZIfXu_iPv4

// https://iquilezles.org/www/articles/mandelbulb/mandelbulb.htm

// YouTube: youtube.com/TheArtOfCodeIsCool
// Refer to the Ray marching starting point video for a good explanation of Ray marching 

#ifdef GL_ES
precision mediump float;
#endif


// SPACE
#include "lygia/space/ratio.glsl"
#include "lygia/sdf.glsl"

// #define RAYMARCH_SAMPLES 100
// #define RAYMARCH_MULTISAMPLE 4

#define RAYMARCH_BACKGROUND ( vec3(0.7, 0.9, 1.0) + ray.y * 0.8 )
#define RAYMARCH_AMBIENT    vec3(0.7, 0.9, 1.0)

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .001

#define S smoothstep
#define T iTime

#define PURPLE vec3(83, 29,109) / 255.
#define RED vec3(191, 18, 97) / 255.
#define ORANGE vec3(251,162, 100) / 255.
#define BLUE vec3(118, 212, 229) / 255.
#define TEAL vec3(11, 106, 136) / 255.
// Coloring
#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/color/exposure.glsl"
#include "lygia/color/vibrance.glsl"
#include "lygia/color/mixSpectral.glsl"


mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

// function to extract polar coordinates
// from Daniel Shiffman
vec3 Spherical( in vec3 pos) 
{
   float r = sqrt(pos.x*pos.x + pos.y*pos.y + pos.z*pos.z);
   float theta = atan( sqrt(pos.x*pos.x + pos.y*pos.y), pos.z);
   float phi = atan(pos.y, pos.x);
   vec3 w = vec3(r, theta, phi);
   return w;
}

// mapping function
// adapted from IQ, incorporatin Coding Train variable names
vec2 mandelbulbSDF( vec3 pos) 
{
  vec3 zeta = pos;
  float m = dot(pos,pos);
  float dz = 1.0;
  float n = 8.0;
  const int maxiterations = 20;
  float iterations = 0.0;
  float r = 0.; 
   
   float dr = 1.;
   for ( int i = 0; i < maxiterations; i+=1) {
     dz = n*pow(m, 3.5)*dz + 1.0;
     vec3 sphericalZ = Spherical( zeta ); 
     float newx = pow(sphericalZ.x, n) * sin(sphericalZ.y*n) * cos(sphericalZ.z*n);
     float newy = pow(sphericalZ.x, n) * sin(sphericalZ.y*n) * sin(sphericalZ.z*n);
     float newz = pow(sphericalZ.x, n) * cos(sphericalZ.y*n);
     zeta.x = newx + pos.x;
     zeta.y = newy + pos.y;
     zeta.z = newz + pos.z;

     iterations += 1.0;
      m = dot (zeta, zeta);
      if ( m > 2.0)
         break;
   }
 
  // distance estimation through the Hubbard-Douady potential from IQ
   return vec2(0.25*log(m) * sqrt(m) / dz, iterations);
   
}

float GetDist(vec3 p) {
    //p.xz *= Rot(iTime*.1);
    float d = mandelbulbSDF(p).x;
  
    return d;
}

vec2 RayMarch(vec3 ro, vec3 rd) {
	float dO=0.0;
    float iter=0.0;
    for(int i=0; i<MAX_STEPS; i++) {
    	vec3 p = ro + rd*dO;
        float dS = GetDist(p);
        //float di = GetDist(p).y;
        dO += dS;
        iter += 1.0;
        if(dO>MAX_DIST || abs(dS)<SURF_DIST) break;
    }
    
    return vec2(dO, iter);
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

void main()
{
    vec2 uv = (gl_FragCoord.xy - .5*u_resolution.xy)/u_resolution.y;
	vec2 m = iMouse.xy/u_resolution.xy;

    vec3 ro = vec3(0, 3, -3);
    ro.yz *= Rot(-m.y*3.14+1.);
    ro.xz *= Rot(-m.x*6.2831);
    
   // Last parameter--lens of camera
   // Increase to zoom in
    vec3 rd = GetRayDir(uv, ro, vec3(0,0.,0), 1.5); 
   
    vec3 col = vec3(0);
  
   vec2 rm = RayMarch(ro, rd);
   
    if(rm.x<MAX_DIST) {
        vec3 p = ro + rd * rm.x;
        vec3 n = GetNormal(p);
        vec3 r = reflect(rd, n);
      
        //Color mandelbulb by # iter / max_steps
        float es = mandelbulbSDF(p).y/100.0;


        float dif = dot(n, normalize(vec3(1,2,3)))*.5+.5;
  
      
      vec3 c = vec3(dif);
      //vec3 c = vec3(es, dif, dif);
      //vec3 c = mix(vec3(dif), vec3(es), 0.2);
         
     col = (1.0-c)*col + c*vec3(0.5);
    } 
    //col = linear2gamma(col);
    //col += exposure(BLUE, 0.1);
    col = vibrance(col, 0.8);
    col += mixSpectral(BLUE, PURPLE, 0.6);
   
   //col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}