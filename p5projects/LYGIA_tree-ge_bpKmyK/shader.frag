// There are a multitude of ways you can bend uv space.  

// I am not sure which approach is best, but I prefer the first

// You get a different rendering based on whether you passed scaled uv's into the function.  

// YOu get a different rendering if you call the function (or differnt versions) more than once.


#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform sampler2D u_texture;

#define PLATFORM_WEBGL

#include "lygia/color/palette/spectral.glsl"
#include "lygia/sdf/lineSDF.glsl"
#include "lygia/math/const.glsl"
#include "lygia/draw/fill.glsl"
#include "lygia/math/rotate2d.glsl"
#include "lygia/sdf/juliaSDF.glsl"
#include "lygia/space/scale.glsl"

// Adapted from https://www.youtube.com/watch?v=__dSLc7-Cpo
// vec2 kaleidescope1( vec2 st ) {
//     st = st * 2.0 - 1.0;
//     st = abs(st); 
//     st.y += -0.288;
//     vec2 n = vec2(-0.866, 0.5); // 150 degrees
//     float d = dot(st- 0.5, n);
//     st -= n * max(0.0, d) * 2.0;
//     st.y -= -0.433; 
//     n = vec2(-0.5, 0.866); // 120
//     d = dot(st, n);
//     st -= n * min(0.0, d) * 2.0;
//     st.y -= 0.288; 
//     return st;
// }

float tree( vec2 st, vec2 center ) {
    st -= center;
    float r3 = sqrt(3.);
    st.y += 0.5;
    float d = lineSDF(st, vec2(0.0), vec2(0.0, 0.5));
//     //st * 1.66;
//     float d1 = lineSDF(st, vec2(0.0, 0.5), vec2(-0.866, 0.5));
//     //d += lineSDF(st, vec2(0.0, 0.5), vec2(0.0, -0.288));
    
//     d = mix(d, d1, 0.5);
    
    //st *= 2.0;
    
    return d;
}

void main(void) {
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec4 color = vec4(vec3(0.0), 1.0);
    
    float d  = tree(st, vec2(0.5));
    color.rgb = fill(d, 0.01)*vec3(1.);
    
    
    gl_FragColor = color;
}