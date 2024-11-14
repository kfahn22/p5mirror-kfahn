#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D currBuff;
uniform sampler2D prevBuff;
uniform sampler2D u_tex;

#define PLATFORM_WEBGL

#include "lygia/distort/stretch.glsl"
#include "lygia/distort/pincushion.glsl"

void main() {
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
  
    //vec4 st = stretch(currBuff, uv, vec2(-1., 1.0), 20);
    vec3 color = texture2D(u_tex, st).rgb;
    //vec3 color = pincushion(u_tex, st, pixel, 0.1);
    //vec3 color = mix(prev, curr, u_time);
  gl_FragColor = vec4(color, 1.0);
}


