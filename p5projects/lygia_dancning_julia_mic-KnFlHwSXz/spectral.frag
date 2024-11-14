#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;

#define PURPLE vec3(175, 77, 152) / 255.
#define ROSE vec3(214, 107, 160) / 255.
#define PINK vec3(229, 169, 169) / 255.
#define MINT vec3(157, 247, 229) / 255.


#include "lygia/color/palette/spectral.glsl"
#include "lygia/color/palette/hue.glsl"
#include "lygia/color/palette.glsl"
#include "lygia/color/mixOklab.glsl"

void main(void) {
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;

    vec3 c = mixOklab(PURPLE, MINT, 0.5);
    color.rgb = vec3(c);
  
    //color.rgb = palette(0.5, PURPLE, ROSE, PINK, MINT); 
    //color.rgb = spectral(st.y);
    //color.rgb = hue(st.y);
    
    
    gl_FragColor = color;
}