//http://roy.red/posts/folding-tilings

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform float u_time;

//#define PLATFORM_WEBGL

#include "lygia/math/const.glsl"
#include "lygia/sdf/triSDF.glsl"
#include "lygia/color/palette/spectral.glsl"
#include "lygia/color/pigments.glsl"
#include "lygia/color/space/hsv2rgb.glsl"
#include "lygia/sdf/circleSDF.glsl"
#include "lygia/math/smootherstep.glsl"

vec3 fold( vec2 st, vec2 dir, float N){
    float dt = dot(st,dir);
    if (dt<0.) {
        st-=2.*dt*dir;
        N++;
    }
    return vec3(st, N);
}
vec3 findColor(vec2 st) {
    float n=0.0;
    vec3 color = fold(st,normalize(vec2(1.,0.)),n);
    color += fold(color.xy,normalize(vec2(0.,1.)),color.z);
    return vec3(fract(float(color.z)/2.));
}

// vec2 cInverse(vec2 st, vec2 center, float radius){
//     st -= center;
//     return st*radius*radius/dot(st,st) + center;
// }

// vec3 fold_circle(vec2 st, vec2 c, float r, float N) {
//     if (distance(st,c)>r) return;
//     st = cInverse(st,c,r);
//     N++;
//   return vec3(st, N);
// }

// vec3 drawCircle(vec2 st, vec2 c, float r) {
//     return vec3(smootherstep(distance(st,c)-r,.01,0.));
// }

// vec3 findColor(vec2 st) {
//     int N=0;
//     vec2 invCent=vec2(1); float invRad=1.122;
// 	vec3 color = drawCircle(st,invCent,invRad);
//     vec3 uv = fold(st,vec2(1,0),N);
//     uv += fold(uv.xy,vec2(0,1),uv.z);
//     uv += fold_circle(uv.xy,invCent,invRad,uv.z); // update
//     color *= hsv2rgb(vec3(fract(float(uv.z)/2.)/4.,1.,1.-float(uv.z)/40.));
//     return color;
// }

// vec3 doFolds(vec2 st, vec2 c, float r, int N) {         	   
//     vec3 uv = fold(st,vec2(1,0),N);
//     uv += fold(uv.xy,vec2(0,1),uv.z);
//     uv += fold_circle(uv.xy,c,r,uv.z);
//     return uv;
// }

// vec3 color(vec2 st) {
//     int N=0;
//     vec2 invCent=vec2(1); float invRad=1.122;
//     vec3 color = drawCircle(st,invCent,invRad);
//     for (int i=0;i<10;i++) {
//         color += doFolds(st,invCent,invRad,N);
//     }
//     color *= hsv2rgb(vec3(fract(float(color.z)/2.)/4., 1., 1.-float(color.z)/40.));
//     return color;
// }

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec4 color = vec4(vec3(0.), 1.);
  color.rgb = findColor(st);
  //color.rgb = doFolds(st, vec2(0.5), 0.5, 3);
  gl_FragColor = color;
}