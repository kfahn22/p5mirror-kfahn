#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D   u_tex0;
uniform vec2        u_resolution;
uniform float       u_time;

varying vec2        v_texcoord;

#define PLATFORM_WEBGL
#include "lygia/sample/clamp2edge.glsl"
#define EDGE_SAMPLER_FNC(TEX, UV) sampleClamp2edge(TEX, UV).r
#include "lygia/filter/edge.glsl"
#include "lygia/draw/digits.glsl"
#include "lygia/math/saturate.glsl"

void main(void) {
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = v_texcoord;

    float ix = floor(st.x * 5.0);
    float radius = max(0.1, ix * 0.5);

    if (st.y < 0.5)
        color.rgb += edgePrewitt(u_tex0, uv, pixel * radius);
    else
        color.rgb += edgeSobel(u_tex0, uv, pixel * radius);

    color.rgb -= step(st.y, 0.05) * 0.5;
    color.rgb = saturate(color.rgb);
    color.rgb += digits(st - vec2(ix/5.0 + 0.01, 0.01), radius);
    color.rgb -= step(.98, fract(st.x * 5.0));

    gl_FragColor = color;
}
