// http://blog.hvidtfeldts.net/index.php/2011/06/distance-estimated-3d-fractals-part-i/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform float u_time;

#define PLATFORM_WEBGL

#include "lygia/math/const.glsl"
#include "lygia/sdf/triSDF.glsl"
#include "lygia/color/palette/spectral.glsl"
#include "lygia/color/pigments.glsl"
#include "lygia/sdf/circleSDF.glsl"
#include "lygia/draw/fill.glsl"
#include "lygia/math/smootherstep.glsl"
#include "lygia/color/space/hsv2rgb.glsl"

vec3 fold(vec2 st, vec2 dir, float n){
    
    float dt = dot(st,dir);
    if (dt<0.) {
        st-=2.0*dt*dir;
        n++;
    }
  return vec3(st, n);
}

// vec3 findColor(vec2 st) {
//     st -= vec2(0.5);
//     float n=0.0;
//     vec3 uv = fold(st,normalize(vec2(1.,0.)),n);
//     uv = fold(uv.xy,normalize(vec2(0.,1.)),uv.z);
//     return vec3(fract(float(uv.z)/2.));
// }

vec2 cInverse(vec2 st, vec2 center, float radius){
    st -= center;
    return st*radius*radius/dot(st,st) + center;
}

// Need to fix
// Edited 
vec3 fold_circle(vec2 st, vec2 c, float r, float n) {
    if (distance(st,c)>r) return vec3(st, n);
    st = cInverse(st,c,r);
    n++;
    return vec3(st, n);
}

vec3 drawCircle(vec2 st, vec2 c, float r) {
    return vec3(smootherstep(distance(st,c)-r,.01,0.));
}

// vec3 findColor(vec2 st) {
//     //float n=0;
//     vec2 invCent=vec2(1); float invRad=1.122;
// 	vec3 color = drawCircle(st,invCent,invRad);
//     vec3 uv = fold(st,vec2(1.,0.),0.0);
//     uv = fold(uv.xy,vec2(0.,1.),uv.z);
//     uv = fold_circle(uv.xy,invCent,invRad,uv.z);
//     color *= hsv2rgb(vec3(fract(float(uv.z)/2.)/4.,1.,1.-float(uv.z)/40.));
//     return color;
// }

vec3 doFolds( vec2 st,vec2 c,float r, float n) {         	 
    vec3 uv = fold(st,vec2(1,0),n);
    uv = fold(uv.xy,vec2(0,1),uv.z);
    uv = fold_circle(uv.xy,c,r,uv.z);
    return uv;
}

// vec3 findColor(vec2 st) {
//     float n=0.;
//     vec3 uv;
//     vec2 invCent=vec2(1); float invRad=1.122;
//     vec3 color = drawCircle(st,invCent,invRad);
//     for (int i=0;i<10;i++) {
//         uv = doFolds(st,invCent,invRad,n); 
//         st = uv.xy;
//         n = uv.z;
//     }
//     // color *= hsv2rgb(vec3(fract(float(n)/2.)/4.,1.,1.-float(n)/40.));
//     //color *= spectral_zucconi(fract(float(n)/6.));
//    //color *= spectral_zucconi(fract(float(n)/6.));
//     return n;
// }

float findColor1(vec2 st) {
    float n=0.;
    vec3 uv;
    vec2 invCent=vec2(1); float invRad=1.122;
    vec3 color = drawCircle(st,invCent,invRad);
    for (int i=0;i<6;i++) {
        uv = doFolds(st,invCent,invRad,n); 
        st = uv.xy;
        n = uv.z;
    }
    // color *= hsv2rgb(vec3(fract(float(n)/2.)/4.,1.,1.-float(n)/40.));
    //color *= spectral_zucconi(fract(float(n)/6.));
   //color *= spectral_zucconi(fract(float(n)/6.));
    return cos(uv.z*16.);
    
}

float findColor2(vec2 st) {
    float n=0.0;
    st *= 2.;
    vec3 uv;
    vec2 invCent=vec2(1); float invRad=2.00;
    vec3 color = drawCircle(st,invCent,invRad);
    for (int i=0;i<3;i++) {
        uv = doFolds(st,invCent,invRad,n);
        st = uv.xy;
        n = uv.z;
    }
    color *= hsv2rgb(vec3(fract(float(n)/2.)/4.,1.,1.-float(n)/40.));
   // return color;
  return cos(uv.z*6.);
}

vec3 findColor3(vec2 st) {
    float n=0.0;
    vec3 uv;
    vec2 invCent=vec2(sqrt(.5)); float invRad=1.;
    vec3 color = drawCircle(st,invCent,invRad);
    for (int i=0;i<10;i++) {
        uv = doFolds(st,invCent,invRad,n);
        st = uv.xy;
        n = uv.z;
    }
    color *= hsv2rgb(vec3(fract(float(n)/2.)/4.,0.,1.-float(n)/40.));
    
   return color;
  //return cos(uv.z*16.);
}

vec3 tiling(vec2 st, int N) {
    float n=0.0;
    vec3 uv;
    st *= 3.0; // 3.0
    //st = abs(st);
    st = abs(st)/dot(st,st);
    //st = cInverse(st*3.,vec2(0),1.);
    vec2 invCent=vec2(sqrt(0.5));
    // invCent.x += mix(-0.054,0.1,sin(u_time));
    invCent.x += 0.1;
    float invRad=1.;
    vec3 color = drawCircle(st,invCent,invRad);
    #ifdef PLATFORM_WEBGL
    for (int i = 0; i< 10; i++) {
        if (i >= N) break;
    #else
    for (int i = 0; i< N; i++) {
    #endif
        uv = doFolds(st,invCent,invRad,n);
        st = uv.xy;
        n = uv.z;
    }
    color *= vec3(fract(n/6.));
    //color *= vec3(fract(n/6.));
    return color;
}

  vec3 spherical_tiling(vec2 st, int N) {
    float n=0.0;
    st *= float(N); // 3.0
    st = abs(st)/dot(st,st);
    //st = cInverse(st*3.,vec2(0),1.);
    vec2 invCent=vec2(sqrt(0.5));
    invCent.x += -0.054;
    float invRad=1.;
    vec3 color = drawCircle(st,invCent,invRad);
    vec3 uv = vec3(st, 0.0);
    #ifdef PLATFORM_WEBGL
    for (int i = 0; i< 10; i++) {
        if (i >= N) break;
    #else
    for (int i = 0; i< N; i++) {
    #endif
        uv = doFolds(uv.xy,invCent,invRad,uv.z);
        // st = uv.xy;
        // n = uv.z;
    }
    color *= vec3(fract(uv.z/float(N)));
    //color *= vec3(fract(n/6.));
    return color;
}

// vec3 fold_circle(vec2 st, vec2 c, float r, float n) {
//     if (distance(st,c)>r) return vec3(st, n);
//     st = cInverse(st,c,r);
//     n++;
//     return vec3(st, n);
// }
// vec3 doFolds( vec2 st,vec2 c,float r, float n) {         	 
//     vec3 uv = fold(st,vec2(1,0),n);
//     uv = fold(uv.xy,vec2(0,1),uv.z);
//     uv = fold_circle(uv.xy,c,r,uv.z);
//     return uv;
// }
// vec2 cInverse(vec2 st, vec2 center, float radius){
//     st -= center;
//     return st*radius*radius/dot(st,st) + center;
// }
vec3 hyperbolic_tiling(vec2 st) {
    float n=0.0;
    vec3 uv;
    st *= 3.0;
    st = abs(st)/dot(st,st);
    vec2 invCent = vec2(sqrt(0.5));
    invCent.x += 0.1;
    // invCent.x += mix(-0.054,0.1,sin(u_time));
    float invRad=1.0;
    vec3 color = vec3(smootherstep(distance(st,invCent)-1.0,.01,0.));
    //vec3 color = drawCircle(st,invCent,invRad);
    for (int i=0;i<10;i++) {
        uv = fold(st,vec2(1,0),n);
        uv = fold(uv.xy,vec2(0,1),uv.z);
       // uv = fold_circle(uv.xy,invCent,invRad,uv.z);
        if (distance(uv.xy,invCent)>1.0) return vec3(fract(n/3.0));
        uv.xy -= invCent;
        uv.xy = uv.xy/dot(uv.xy,uv.xy) + 1.0;
        uv.z+=1.;
        //uv = cInverse(st,c,r);
//     n++;
//     st = cInverse(st,c,r);
//     n++;
        //uv = doFolds(st,invCent,invRad,n);
        st = uv.xy;
        n = uv.z;
    }
    return vec3(fract(n/4.));
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st -= vec2(0.5);
  st *= 2.0;
  vec4 color = vec4(vec3(0.), 1.);
  //color.rgb = fold_circle(st, vec2(0.5), 0.1, 0.0);
  color.rgb = spherical_tiling(st, 3);
  //color.rgb = hyperbolic_tiling(st);
  
  //float sdf = findColor3(st);
  //color.rgb += fill(sdf, 0.01)*COBALTE_BLUE;
   
  gl_FragColor = color;
}