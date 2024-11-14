#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform sampler2D u_texture;

#define PLATFORM_WEBGL

#include "lygia/color/palette/spectral.glsl"
#include "lygia/color/pigments.glsl"
#include "lygia/sdf/lineSDF.glsl"
#include "lygia/math/const.glsl"
#include "lygia/sdf/juliaSDF.glsl"
#include "lygia/math/smootherstep.glsl"
#include "lygia/sdf/flowerSDF.glsl"
#include "lygia/sdf/superShapeSDF.glsl"
#include "lygia/draw/fill.glsl"

vec2 fold(vec2 st, float ang){
    vec2 dir=vec2(cos(-ang),sin(-ang));
    st-=2.0*min(0.,dot(st,dir))*dir;
	return st;
}

float koch_snowflake(vec2 st, vec2 pixel, int N) {
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
    float d = length(st);
    return smootherstep(float(N)/pixel.y, .0, d/float(N));
}

void main(void) {
    vec2 pixel = u_resolution.xy;
    vec2 st = gl_FragCoord.xy / pixel;
    vec4 color = vec4(vec3(0.0), 1.0);
    
    float sdf = koch_snowflake(st, pixel, 3);
    
    color.rgb = fill(sdf, 0.1)*vec3(1.);
    
    gl_FragColor = color;
}