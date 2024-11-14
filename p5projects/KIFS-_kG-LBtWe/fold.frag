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

vec2 fold(vec2 st, float ang){
    //st *= 2.0;
    vec2 n=vec2(cos(-ang),sin(-ang));
    st-=2.*min(0.,dot(st,n))*n;
	return st;
}
// vec3 findColor(vec2 st) {
// 	// Adjust the angle of the fold here
//     st=fold(st,0.284);
//     return vec3(10.*sin(10.*st.x)*sin(10.*st.y));
// }

float d2hline(vec2 st){
    st.x-=max(0.,min(1.,st.x));
    return length(st)*5.;
}

// vec3 findColor(vec2 st) {
//     st=st*2.;
//     return vec3(d2hline(st));
// }

vec2 koch_fold(vec2 st) {
	// Fold horizontally
    //st *= 2.0;
    st.x = abs(st.x);
    st.x-=.5;
    //Fold across PI/6
    st = fold(st,PI/6.);
    return st;
}
// vec3 findColor(vec2 st) {
//     st -= vec2(0.5);
//     st*=2.;
//     st=koch_fold(st);
//     return vec3(d2hline(st));
// }

vec2 koch_curve(vec2 st) {
    //Fold and scale a few times
    for(int i=0;i<3;i++){
        st*=3.;
        st.x-=1.5;
        st=koch_fold(st);
    }
    return st;
}

// vec3 findColor(vec2 st) {
//     //st = st*.5+.5;
//     st = st * 3.0;
//     st -= 1.0;
//     st = koch_curve(st);
//     return vec3(d2hline(st)/3.);
// }

// Koch snowflake
float koch_snowflake(vec2 st, int N) {
    st -= vec2(0.5);
    st = st*2.0;
    st -= vec2(0.5,0.3);
    st = fold(st,-2.0*PI/3.);
    st.x += 1.;
    st = fold(st,-PI/3.);
    #ifdef PLATFORM_WEBGL
    for (int i = 0; i< 10; i++) {
        if (i >= N) break;
    #else
    for (int i = 0; i< N; i++) {
    #endif
        st*=3.;
        st.x-=1.5;
        st.x = abs(st.x);
        st.x-=.5;
        st = fold(st,PI/6.);
    }
    st.x-=max(0.,min(1.,st.x));
    return length(st)/float(N);
}

vec2 tri_fold(vec2 pt) {
    pt = fold(pt,PI/6.);
    pt = fold(pt,-PI/6.);
    return pt;
}
vec2 tri_curve(vec2 pt) {
    for(int i=0;i<7;i++){
        pt*=2.;
        pt.x-=1.;
        pt=tri_fold(pt);
    }
    return pt;
}
// vec3 findColor(vec2 pt) {
//     pt *= 2.0;
//     pt -= vec2(0.9);
//     pt -= vec2(-1,.1);
//     pt *= .5;
//     pt = tri_curve(pt);
//     return vec3(d2hline(pt)/7.);
// }
vec2 gen_fold(vec2 pt) {
    pt = fold(pt,-2.9);
    pt = fold(pt,.9);
    pt.y+=sin(u_time)+1.;
    pt = fold(pt,-1.0);
    return pt;
}
vec2 gen_curve(vec2 pt) {
    for(int i=0;i<9;i++){
        pt*=2.;
        pt.x-=1.;
        pt=gen_fold(pt);
    }
    return pt;
}
vec3 findColor(vec2 pt) {
    pt -= vec2(-0.630,0.000);
    pt *= .8;
    pt = gen_curve(pt);
    return vec3(d2hline(pt)/6.);
}
void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec4 color = vec4(vec3(0.), 1.);
  
  float sdf = koch_snowflake(st, 1);
  color.rgb = fill(sdf, 0.1)*COBALTE_BLUE;
  
  gl_FragColor = color;
}