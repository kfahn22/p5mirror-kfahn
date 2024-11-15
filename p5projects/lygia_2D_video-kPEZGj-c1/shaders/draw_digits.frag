#ifdef GL_ES
precision highp float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

varying vec2    v_texcoord;

#define PLATFORM_WEBGL
#include "lygia/sdf/circleSDF.glsl"
#include "lygia/draw/fill.glsl"
#include "lygia/draw/stroke.glsl"
#include "lygia/draw/digits.glsl"

void main(void) {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 xy = gl_FragCoord.xy * pixel;

    float sdf = circleSDF(xy);
    
    // External ring
    float size1 = 0.5;
    float width = 0.1 + (sin(u_time) * 0.5 + 0.5) * 0.1;
    color += stroke(sdf, size1, width);

    // Inside circle
    float size2 = (size1 - width) * (cos(u_time * 0.25) * 0.5 + 0.5);
    color += fill(sdf, size2);

    // Debug
    color += digits(xy, width);
    color += digits(xy - vec2(0.5, 0.0), size2);
    
    gl_FragColor = vec4(color, 1.0);
}
