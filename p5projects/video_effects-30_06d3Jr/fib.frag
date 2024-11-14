
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2        u_resolution;
uniform float       u_time;

uniform sampler2D   tex0;
uniform vec2        u_tex0Resolution;

// need this line to be able to add loop 
#define PLATFORM_WEBGL

#include "lygia/sample/clamp2edge.glsl"
#define FIBONACCIBOKEH_SAMPLER_FNC(TEX, UV) sampleClamp2edge(TEX, UV)
#include "lygia/filter/fibonacciBokeh.glsl"

#include "lygia/draw/digits.glsl"

void main (void) {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;

    float ix = floor(st.x * 5.0);
    float radius = (ix/6.0) * 0.5;
    color += fibonacciBokeh(tex0, st, pixel, radius).rgb;

    // color -= digits(st - vec2(ix/5.0 + 0.01, 0.01), radius, 2.);
    // color -= step(.99, fract(st.x * 5.0));

    gl_FragColor = vec4(color,1.0);
}