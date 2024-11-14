#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D   u_tex0;
uniform vec2        u_resolution;
uniform float       u_time;

varying vec2        v_texcoord;

// #define PLATFORM_WEBGL
// #define GAUSSIANBLUR_2D
//#include "lygia/sample/clamp2edge.glsl"
//#define GAUSSIANBLUR_SAMPLER_FNC(TEX, UV) sampleClamp2edge(TEX, UV)
//#include "lygia/sdf/gearSDF.glsl"
//#include "lygia/sdf/spiralSDF.glsl"
#include "lygia/sdf/flowerSDF.glsl"

//#include "lygia/draw/digits.glsl"

void main (void) {
    vec3 color = vec3(0.0);
    //vec2 uv = (gl_FragCoord.xy -.5* u_resolution.xy)/u_resolution.y;
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;
    vec2 uv = v_texcoord;

    // float ix = floor(st.x * 5.0);
    // float kernel_size = max(1.0, ix * 4.0);
    color += flowerSDF(uv, 10);
    //color += gearSDF(uv, 0.2, 1.0, 10.0, 10.0);
    // color += gaussianBlur2D(u_tex0, uv, pixel, int(kernel_size)).rgb;

    // color += digits(st - vec2(ix/5.0 + 0.01, 0.01), kernel_size, 0.0);
    // color -= step(.99, fract(st.x * 5.0));

    gl_FragColor = vec4(color,1.0);
}
