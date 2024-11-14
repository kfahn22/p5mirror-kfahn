// http://roy.red/posts/folding-the-koch-snowflake/

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
#include "lygia/sdf/triSDF.glsl"

vec2 fold(vec2 st, vec2 p, float ang){
    //st *= 2.0;
   
    vec2 n=vec2(cos(-ang),sin(-ang));
    st-=2.*min(0.,dot(st-p,n))*n;
	return st;
}

vec2 fold(vec2 st, vec2 p, vec2 dir){
    //st *= 2.0;
   
   // vec2 n=vec2(cos(-ang),sin(-ang));
    st-=2.*min(0.,dot(st-p,dir))*dir;
	return st;
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

float sierpinski_carpet(vec2 st, int N) {
    st *= 2.;
    //st -= vec2(0.1, 0.8);  // adjustment to center
    st *= 0.5;
   #ifdef PLATFORM_WEBGL
    for (int i = 0; i< 10; i++) {
        if (i >= N) break;
    #else
    for (int i = 0; i< N; i++) {
    #endif
        st *= 2.0;
        st.x-= 1.0;
        st = fold(st, vec2 (0.), vec2(1., 0.));
        st = fold(st, vec2 (0.), vec2(0., 1.));
    }
    // st.x-=max(0.,min(1.,st.x));
    // return length(st);
      st.x-= max(0.,min(st.x * cos(PI/2.),st.x));
  
  return length(st);
 
    //return vec3(d2hline(pt)/7.);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec4 color = vec4(vec3(0.), 1.);
  
  
  
  color.rgb *= st.x*vec3(1.);
  //color.rgb = findColor(st);
  // float sdf = sierpinski(rotate(st, -PI/6.), 1);
  // color.rgb = fill(sdf, 0.1)*COBALTE_BLUE;
  // color.rgb = sierpinski(rotate(st, -PI/6.), 5);
  gl_FragColor = color;
}