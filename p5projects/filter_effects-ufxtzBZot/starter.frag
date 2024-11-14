// Ported to P5.js from "RayMarching starting point" 
// by Martijn Steinrucken aka The Art of Code/BigWings - 2020
// The MIT License
// YouTube: youtube.com/TheArtOfCodeIsCool

//https://www.alanzucconi.com/2017/07/15/improving-the-rainbow/

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_blob0;
uniform vec2 u_blob1;

// grab texcoords from vert shader
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;

// need this line to be able to add loop (in stretch)
#define PLATFORM_WEBGL

#define NOISED_QUINTIC_INTERPOLATION
#include "lygia/generative/noised.glsl"
#include "lygia/color/pigments.glsl"
#include "lygia/color/palette/spectral.glsl"

#include "lygia/math/smootherstep.glsl"



#include "lygia/simulate/ripple.glsl"
#include "lygia/simulate/grayscott.glsl"
#include "lygia/simulate/fluidSolver.glsl"

#include "lygia/distort/barrel.glsl"
#include "lygia/distort/grain.glsl"
#include "lygia/distort/pincushion.glsl"
#include "lygia/distort/stretch.glsl"

#include "lygia/filter/gaussianBlur.glsl"
#include "lygia/filter/radialBlur.glsl"
#include "lygia/filter/edge.glsl"

#include "lygia/color/dither/shift.glsl"

void main()
{
  
    vec2 st = vTexCoord;
    vec4 color = vec4(vec3(0.0), 1.0); 
    vec2 pixel = 1.0/u_resolution.xy;
    // the texture is loaded upside down and backwards by default so lets flip it
    st.y = 1.0 - st.y;
    
  vec2 uv = (gl_FragCoord.xy-0.5*u_resolution.xy)/u_resolution.y;
    vec2 blob0_uv = u_blob0.xy /  u_resolution.xy;
    vec2 blob1_uv = u_blob1.xy /  u_resolution.xy;
   
     vec2 diff0 = st.xy - blob0_uv.xy;
    vec2 diff1 = st.xy - blob1_uv.xy;
    float d0 = length(diff0);
    
  
    //vec3 tex = barrel(tex0, st, 0.1);
    //vec3 tex = pincushion(tex0, st, pixel, 0.1);
    //vec4 tex = stretch(tex0, st, diff0, 2);
    //vec4 tex = gaussianBlur(tex0, st, diff0, 2);
    //vec4 tex = radialBlur(tex0, st, diff0, 0.25);
    
    
    float gray = tex.r;
  
    //float gray = (tex.r + tex.g + tex.b) / 3.0;
  
    // res = 20.0; scl = res / (10.0);
  
    float res = 15.0;
    float scl = res / (10.0);
  
    float threshR = (fract(floor(tex.r*res)/scl)*scl) * gray ;
    float threshG = (fract(floor(tex.g*res)/scl)*scl) * gray ;
    float threshB = (fract(floor(tex.b*res)/scl)*scl) * gray ;
    
   // vec3 thresh = vec3(threshR, threshG, threshB);
    
  
  vec3 thresh = vec3(threshR);
  
  vec3 tex = texture2D(tex0, st).rgb
  vec3 dith = ditherShift(tex, u_time);
  gl_FragColor = vec4(dith, 1.0);
   // render the output
  //gl_FragColor = vec4(thresh, 1.0);
 
}