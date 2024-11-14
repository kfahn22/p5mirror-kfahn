// http://roy.red/posts/folding-the-koch-snowflake/
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
#include "lygia/space/rotate.glsl"
#include "lygia/math/rotate2d.glsl"
#include "lygia/sdf/circleSDF.glsl"
#include "lygia/sdf/triSDF.glsl"

// vec2 fold(vec2 st, vec2 p, float ang){
//     //st *= 2.0;
   
//     vec2 dir=vec2(cos(-ang),sin(-ang));
//     st-=2.*min(0.,dot(st-p,dir))*dir;
// 	return st;
// }
vec3 fold(vec2 st, vec2 p, float angle, float iter){
    #ifdef p
    st -= p;
    #endif
    vec2 dir = vec2(cos(-angle),sin(-angle));
    float dt = dot(st,dir);
    vec3 uv = vec3(st, iter);
    if (dt<0.) {
        uv.xy-=2.0*dt*dir;
        uv.z++;
    }
  //return vec3(st, n);
    return uv;
}
// vec2 reflect(vec2 st,float ang){
//     //st *= 2.0;
   
//     vec2 n=vec2(cos(ang),sin(ang));
//     st-=2.*min(0.,dot(st-p,n))*n;
// 	return st;
// }
// float d2hline(vec2 st){
//     st.x-=max(0.,min(1.,st.x));
//     return length(st)*5.;
// }

// vec2 tri_fold(vec2 pt) {
//     pt = fold(pt,PI/6.);
//     pt = fold(pt,-PI/6.);
//     return pt;
// }
// vec2 tri_curve(vec2 st) {
//     for(int i=0;i<7;i++){
//         st*=2.;
//         st.x-=1.;
//         st=tri_fold(st);
//     }
//     return pt;
// }
// vec3 findColor(vec2 pt) {
//     pt *= 2.0;
//     pt -= vec2(0.9);
//     pt -= vec2(-1,.1);
//     pt *= .5;
//     pt = tri_curve(pt);
//     return vec3(d2hline(pt)/7.);
// }

float sierpinski(vec2 st, int N) {
    float r3 = sqrt(3.);
    vec2 uv = st;
    st *= 2.;
    st -= vec2(0.1, 0.8);  // adjustment to center
    st *= 0.5;
   #ifdef PLATFORM_WEBGL
    for (int i = 0; i< 10; i++) {
        if (i >= N) break;
    #else
    for (int i = 0; i< N; i++) {
    #endif
        st *= 2.0;
        st.x-= 1.0;
        // st = fold(st, vec2 (0.),  PI/6.);
        // st = fold(st, vec2 (0.), -PI/6.);
        st = fold(st, vec2 (0.),  -PI/6., 0.0).xy;
        st = fold(st, vec2 (0.), PI/6., 0.0).xy;
  }  
   st.x-= max(0.,min(st.x * cos(PI/3.),st.x))*0.5;
   
  return  length(st) ;//)/pow2(2.0, 7.0);
  // return st.x; // get triangles not at right poitns
    //return vec3(d2hline(pt)/7.);
    
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec4 color = vec4(vec3(0.), 1.);
  
  // float sdf = sierpinski(rotate(st, -PI/6.), 2);
  // color.rgb = fill(sdf, 0.2)*COBALTE_BLUE;
  
   float sdf = sierpinski(st,3);
  color.rgb = fill(sdf, 0.1)*COBALTE_BLUE;
  
  
  //color.rgb = spectral_zucconi(sdf);
  gl_FragColor = color;
}