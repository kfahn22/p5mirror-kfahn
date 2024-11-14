#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform float u_time;

#define PLATFORM_WEBGL

#include "lygia/color/palette/spectral/zucconi6.glsl"
#include "lygia/draw/fill.glsl"
#include "lygia/sdf/juliaSDF.glsl"
#include "lygia/sdf/lineSDF.glsl"
#include "lygia/sdf/circleSDF.glsl"
#include "lygia/math/const.glsl"
#include "lygia/math/rotate2d.glsl"
#include "lygia/space/scale.glsl"

float kochSDF( vec2 st, vec2 center, int N ) {
    st -= center;
    st *= 3.0;
    float r3 = sqrt(3.);  
    st = abs(st);
    st += r3*vec2(-st.y,st.x); // 60° rotation, scale 2
    st.y -= 1.;   
    float w = .5;    
    mat2 m = mat2(r3,3,-3,r3)*.5;
    #ifdef PLATFORM_WEBGL
    for (int i = 0; i< 20; i++) {
        if (i >= N) break;
    #else
    for (int i = 0; i< N; i++) {
    #endif
        st = vec2(-r3,3)*.5 - m*vec2(st.y,abs(st.x));
        w /= r3;
    }
    float d = sign(st.y)*length(vec2(st.y,max(0.,abs(st.x)-r3)));  
    return (d*w);
}
  
  
vec2 kaleidescope( vec2 st, vec2 center) {
    st -= center;
    st *= 3.0;
    float r3 = sqrt(3.);
    st = abs(st);
    st += r3*vec2(-st.y,st.x); // 60° rotation, scale 2
    st.y -= 1.;  
    float w = .5;    
    mat2 m = mat2(r3,3,-3,r3)*.5;
    return vec2(-r3,3)*.5 - m*vec2(st.y,abs(st.x));
}
  
void main(void) {
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec4 color = vec4(vec3(0.0), 1.0);
    
    st = kaleidescope(st, vec2(0.5));
    float n = juliaSDF(st, vec2(-0.8, 0.156), 0.25);
    color.rgb = spectral_zucconi6(cos( n*15.0 ));
    //color.rgb = spectral_zucconi6(st.y);
  
    gl_FragColor = color;
}