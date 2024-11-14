// Example based on https://github.com/patriciogonzalezvivo/lygia_examples/blob/main/filter_radialBlur2D.frag

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2        u_resolution;
uniform float       u_time;
uniform vec2        u_blob0;
uniform vec2        u_blob1;
uniform sampler2D   tex0;
uniform vec2        u_tex0Resolution;

// need this line to be able to add loop 
#define PLATFORM_WEBGL

// You must include a reference to the glsl code for the function
#include "lygia/sample/clamp2edge.glsl"
#define RADIALBLUR_SAMPLER_FNC(TEX, UV) sampleClamp2edge(TEX, UV)
#include "lygia/filter/radialBlur.glsl"

// #include "lygia/draw/digits.glsl"

void main (void) {
    vec3 color = vec3(0.0);
    vec2 pixel = 1.0/u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;
  
    // the texture is loaded upside down and backwards by default so lets flip it
    st.y = 1.0 - st.y;
    
  
    // Optional code from Daniel Shiffman to move center
    vec2 blob0_uv = u_blob0.xy /  u_resolution.xy;
    vec2 blob1_uv = u_blob1.xy /  u_resolution.xy;
    vec2 diff = blob0_uv - blob1_uv;
    vec2 center = diff;
  
    // for radial blur keep center in middle of canvas
    //vec2 center = vec2(0.5, 0.5);

    float cols = 10.0;

    float x = st.x * cols;
    float xi = floor(x);
    float xf = fract(x);
    float strength = max(1.0, xi * 6.0);

    vec2 dir = st - center;
    float angle = atan(dir.y, dir.x);
    angle += u_time;
    dir = vec2(cos(angle), sin(angle));

    color += radialBlur(tex0, st, pixel * dir, strength).rgb;

    vec2 uv = vec2(fract(st.x * cols), st.y * cols) - 0.05;
    uv *= 0.3;

    //color += digits(uv, strength, 0.0);
   //color -= step(.99, xf);

    gl_FragColor = vec4(color,1.0);
}