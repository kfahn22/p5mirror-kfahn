#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform sampler2D u_texture;

#define PLATFORM_WEBGL

#include "lygia/color/palette/spectral.glsl"
#include "lygia/color/palette/pigments.glsl"

#include "lygia/space/kaleidoscope.glsl"
#include "lygia/sdf/lineSDF.glsl"
#include "lygia/draw/fill.glsl"
      
void main(void) {
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    st *= 2.0 - 1.0;
    vec4 color = vec4(vec3(0.0), 1.0);
    
    vec2 uv = kaleidoscope(st, 8.);
    float sdf = lineSDF(uv, vec2(1.5, 0.25), vec2(0., 1.0));
    
    
    color.rgb = fill(sdf, 0.1)*vec3(1.);
    
    gl_FragColor = color;
}