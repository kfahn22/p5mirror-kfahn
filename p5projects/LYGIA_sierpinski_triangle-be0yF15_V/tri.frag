#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform float u_time;

#define PLATFORM_WEBGL

#include "lygia/math/const.glsl"
#include "lygia/draw/fill.glsl"
#include "lygia/sdf/triSDF.glsl"

void main () {
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec4 color = vec4(vec3(0.0), 1.0);

    float sdf = triSDF(st)-1.0;
    color.rgb = fill(sdf, 0.01)*vec3(1.);
    gl_FragColor = color;
}