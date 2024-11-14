#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif


#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D   u_tex0;
uniform vec2        u_resolution;
uniform float       u_time;

varying vec2        v_texcoord;

#define PLATFORM_WEBGL
#include "lygia/filter/sharpen/contrastAdaptive.glsl"
#include "lygia/filter/sharpen/fast.glsl"

void main (void) {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = v_texcoord;

    float radius = fract(st.x * 2.0) * 5.0;


    if (st.x < .5)
        color = sharpenContrastAdaptive(u_tex0, uv, pixel * max(1.0, radius)).rgb;

    else 
        color = sharpenFast(u_tex0, uv, pixel).rgb;

        
    color -= step(.95, fract(radius) ) * 0.1;
    color -= step(.98, fract(st.x * 2.0));

    gl_FragColor = vec4(color,1.0);
}
