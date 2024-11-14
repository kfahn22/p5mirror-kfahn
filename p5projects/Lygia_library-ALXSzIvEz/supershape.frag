#ifdef GL_ES
precision mediump float;
#endif

// SPACE
#include "lygia/space/ratio.glsl"
#include "lygia/sdf.glsl"


// #define RAYMARCH_SAMPLES 100
// #define RAYMARCH_MULTISAMPLE 4

#define RAYMARCH_BACKGROUND ( vec3(0.7, 0.9, 1.0) + ray.y * 0.8 )
#define RAYMARCH_AMBIENT    vec3(0.7, 0.9, 1.0)

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;
varying vec2 vTexCoord;
uniform sampler2D u_texture;
uniform float u_bass;
uniform float u_tremble;
uniform float u_mid;
uniform float u_vol;

#define S smoothstep
#define T iTime
#define NUM_LAYERS 4.

#define EGGPLANT vec3(87, 31,78) / 255.
#define BLUE vec3(0, 0,255) / 255.

#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/sdf/superShapeSDF.glsl"
#include "lygia/math/smootherstep.glsl"
#include "lygia/math/rotate2d.glsl"
#include "lygia/math/const.glsl"
#include "lygia/space/brick.glsl"
#include "lygia/generative/gnoise.glsl"
// #include "lygia/simulate/fluidSolver.glsl"
// #include "lygia/simulate/greyscott.glsl"
#include "lygia/simulate/ripple.glsl"
#include "lygia/distort/barrel.glsl"
#include "lygia/draw/bridge.glsl"

void main()
{
    vec2 uv = gl_FragCoord.xy/u_resolution.y;
    vec2 pixel = 1.0/u_resolution;
    float t = iTime*.02;
	vec2 m = iMouse.xy/u_resolution.xy;
    vec3 col = vec3(0, 0, 0) / 255.;
    
    
//   vec3 grayscott(SAMPLER_TYPE tex, vec2 st, vec2 pixel, float src) {
//     return grayscott(tex, st, pixel, src, 0.25, 0.05, 0.1, 0.063); 
// }
    //col = fluidSolver(u_texture, uv, pixel, vec2(10., 1.)).rgb;
              
    //col = ripple(u_texture, uv, pixel);
  
    //float d = circle(uv, 0.5, 0.05);
    float b = bridge(0.1, 0.1, 0.1, 0.1);
  
    col += b;
  
    //col.rg += barrel(vec2(), 1.0, 0.1);
    
    
  
    col = linear2gamma(col);
                        
    gl_FragColor = vec4(col,1.0);
}