#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D   u_tex0;
// uniform vec2        u_resolution;
// uniform float       u_time;

// grab texcoords from vert shader
varying vec2        v_texcoord;

#define PLATFORM_WEBGL
#define GAUSSIANBLUR_2D
#include "lygia/sample/clamp2edge.glsl"
#define GAUSSIANBLUR_SAMPLER_FNC(TEX, UV) sampleClamp2edge(TEX, UV)
#include "lygia/filter/gaussianBlur/2D.glsl"

#include "lygia/draw/digits.glsl"

// void main (void) {
//     vec3 color = vec3(0.0);
//     vec2 pixel = 1.0/u_resolution;
//     vec2 st = gl_FragCoord.xy * pixel;
//     vec2 uv = v_texcoord;
//     //vec2 uv = vTexCoord;
    
//     // the texture is loaded upside down and backwards by default so lets flip it
//     uv.y = 1.0 - uv.y;
    
//     //vec4 tex = texture2D(u_tex0, uv);
//     float ix = floor(st.x * 5.0);
//     float kernel_size = max(1.0, ix * 4.0);

//     color += gaussianBlur2D(u_tex0, uv, pixel, int(kernel_size)).rgb;

//     color += digits(st - vec2(ix/5.0 + 0.01, 0.01), kernel_size, 0.0);
//     color -= step(.99, fract(st.x * 5.0));

//     gl_FragColor = vec4(color,1.0);
// }

void main() {
    vec2 uv = v_texcoord;
    
    // the texture is loaded upside down and backwards by default so lets flip it
    uv.y = 1.0 - uv.y;
    
    vec4 tex = texture2D(u_tex0, uv);
    
    float gray = (tex.r + tex.g + tex.b) / 3.0;
    
    float res = 20.0;
    float scl = res / (10.0);
    
    float threshR = (fract(floor(tex.r*res)/scl)*scl) * gray ;
    float threshG = (fract(floor(tex.g*res)/scl)*scl) * gray ;
    float threshB = (fract(floor(tex.b*res)/scl)*scl) * gray ;
    vec3 thresh = vec3(threshR, threshG, threshB);
    
    // render the output
    gl_FragColor = vec4(thresh, 1.0);
}

