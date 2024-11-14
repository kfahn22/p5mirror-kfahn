// http://roy.red/posts/uniting-spherical-and-hyperbolic-tilings/


#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform float u_time;

//#define PLATFORM_WEBGL

#include "lygia/math/const.glsl"
#include "lygia/sdf/triSDF.glsl"
#include "lygia/color/palette/spectral.glsl"
#include "lygia/color/palette/pigments.glsl"
#include "lygia/sdf/circleSDF.glsl"

#define P 3.
#define Q 4.
#define R 3.
#define SPACE sign(Q*R + P*R + P*Q - P*Q*R)

// Adjust p, q, r
// float p = 3.; float q=4.; float r=3.;
// float space = float(sign(q*r+p*r+p*q-p*q*r));
vec3 fold( vec3 p, in vec3 dir, inout int n) {
// Reflect if we're outside the fundamental region
    float dt = dot(p,dir);
    if (dt < 0.) {
        n = n + 1;
        return p-2.*dt*dir*vec3(1,1,SPACE);
    }
    return p;
}
float poincare(vec2 st) {
    st -= vec2(0.5);
    st *= 2.1;
    // Stereographically project
    vec3 w=vec3(2.*st,1.-SPACE*dot(st,st))*1./(1.+SPACE*dot(st,st));
    // Calculate cutting planes
    float ab = -cos(PI/P);
    float bc = -cos(PI/Q);
    float ac = -cos(PI/R);
    vec3 a = vec3(1,0,0);
    vec3 b = vec3(ab,sin(PI/P),0.);
    float c0 = ac;
    //float c1 = (bc-b[0]*c0)/b[1];
    float c1 = (bc - b.r*c0) / b.g;
    vec3 c = vec3(c0,c1,sqrt(abs(1.-c0*c0-c1*c1)));
    if (SPACE==0.)
        //c[2] = .5;
        c.z = 0.5;
    // Fold across the planes a few times
    int n=0; int m = 0;
    for (int i=0;i<10;i++){
        w = fold(w,a,m);
        w = fold(w,b,m);
        w = fold(w,c,n);
    }
    // Return a color based on where you end up
    //return vec3(2.)*(dot(w,a));
   return (dot(w,a));
}

// vec3 projectPoint(vec2 z) {
//     z *= 20.;
//     vec3 w=vec3(z,sqrt(1.+dot(z,z)));
//     // Calculate the tiling
//     return calc(w);
// }

// vec3 rotatePoincare(vec2 z) {
//     vec3 w = vec3(2.*z,1.-space*dot(z,z))*1./(1.+space*dot(z,z));
//     // Apply hyperbolic rotation
// 	float angle = mod(u_time,1.05);
//     w.xz = w.xz * mat2(cosh(angle),sinh(angle),
//     				   sinh(angle),cosh(angle)); 
//     return calc(w);
// }
void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec2 pixel = u_resolution.xy;
  
  vec4 color = vec4(vec3(0.), 1.);
  
  float sdf = poincare(st);
  
  color.rgb = spectral_zucconi(sdf);
  
  gl_FragColor = color;
}