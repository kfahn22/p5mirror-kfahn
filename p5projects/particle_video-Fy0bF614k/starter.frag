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


#define NOISED_QUINTIC_INTERPOLATION
#include "lygia/generative/noised.glsl"
#include "lygia/color/pigments.glsl"
#include "lygia/color/palette/spectral.glsl"
// #include "lygia/color/blend/overlay.glsl"
#include "lygia/generative/curl.glsl"
//#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/sdf/superShapeSDF.glsl"
//#include "lygia/sdf/gearSDF.glsl"
#include "lygia/sdf/flowerSDF.glsl"
#include "lygia/math/smootherstep.glsl"
#include "lygia/math/rotate2d.glsl"
#include "lygia/math/map.glsl"
#include "lygia/space/hexTile.glsl"

#include "lygia/space/scale.glsl"

void main()
{
  
  vec2 st = vTexCoord;
   vec4 color = vec4(vec3(0.0), 1.0); 
    // the texture is loaded upside down and backwards by default so lets flip it
    st.y = 1.0 - st.y;
    
    vec4 tex = texture2D(tex0, st);
    
    float gray = (tex.r + tex.g + tex.b) / 3.0;
    
    float res = 20.0;
    float scl = res / (10.0);
    
    float threshR = (fract(floor(tex.r*res)/scl)*scl) * gray ;
    float threshG = (fract(floor(tex.g*res)/scl)*scl) * gray ;
    float threshB = (fract(floor(tex.b*res)/scl)*scl) * gray ;
    vec3 thresh = vec3(threshR, threshG, threshB);
    
   
  
	vec2 uv = (gl_FragCoord.xy-0.5*u_resolution.xy)/u_resolution.y;
    vec2 blob0_uv = u_blob0.xy /  u_resolution.xy;
    vec2 blob1_uv = u_blob1.xy /  u_resolution.xy;
	vec2 pixel = 1.0/u_resolution;
   
     vec2 diff0 = st.xy - blob0_uv.xy;
    vec2 diff1 = st.xy - blob1_uv.xy;
    float d0 = length(diff0);
    vec4 hc1 = hexTile(diff0*4.0);
    vec4 hc2 = hexTile(diff1*4.0);
     
    float c;
    for (int y = -1; y < 1; y++){ 
        for (int x = -1; x < 1; x++){ 
        vec2 offs = vec2(x,y);
        float d1 = flowerSDF(hc1.xy- offs, 8);
        //float d2 = flowerSDF(hc2.xy- offs, 6);
      
        // float d = mix(d1, d2, u_treble);
        c = smootherstep( .05, 0.01, d1*sin(hc1.x*hc1.x+u_time));
        }
    }
//     float c;
//     for (int y = -1; y < 1; y++){ 
//         for (int x = -1; x < 1; x++){ 
//         vec2 offs = vec2(x,y);
//         float d1 = flowerSDF(hc1.xy- offs- vec2(u_mid, u_mid), 8);
//         float d2 = flowerSDF(hc2.xy- offs, 6);
      
//         float d = mix(d1, d2, u_treble);
//         c = smootherstep( .05, 0.01, d*sin(hc1.x*hc1.x+u_time));
//         }
//     }
  
    //vec3 d3 = curl(vec3(st * 2.0, 0.2*u_time)) * 0.5 + 0.5;
    vec3 d3 = noised(vec3(st * 5., u_time)).yzw * 0.5 + 0.5;
    
  // original
    color.rgb = mix(d3, thresh, c); // black
  
   //color.rgb = mix(d3, vec3(0.0), c); // black
   // render the output
    //gl_FragColor = vec4(thresh, 1.0);
    gl_FragColor = color;
}