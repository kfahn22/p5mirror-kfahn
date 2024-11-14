
#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_vol;
uniform float u_bass;
uniform float u_treble;
uniform float u_mid;
uniform vec2 u_blob0;
uniform vec2 u_blob1;

#define REDPURPLE vec3(153, 8, 147) / 255.
#define PURPLE vec3(85, 20, 187) / 255.
#define BLUE vec3(45, 57, 193) / 255.
#define GREEN vec3(42, 192, 60) / 255.
#define RED vec3(217, 68, 66) / 255.

// #define NOISED_QUINTIC_INTERPOLATION
// #include "lygia/generative/noised.glsl"
// #include "lygia/color/palette/pigments.glsl"
// #include "lygia/color/palette/spectral.glsl"
// #include "lygia/color/blend/overlay.glsl"
#include "lygia/generative/curl.glsl"
//#include "lygia/color/space/linear2gamma.glsl"
//#include "lygia/sdf/superShapeSDF.glsl"
//#include "lygia/sdf/gearSDF.glsl"
#include "lygia/sdf/flowerSDF.glsl"
#include "lygia/math/smootherstep.glsl"
#include "lygia/math/rotate2d.glsl"
// #include "lygia/math/map.glsl"
#include "lygia/space/hexTile.glsl"

#include "lygia/space/scale.glsl"

void main()
{
	vec2 uv = (gl_FragCoord.xy-0.5*u_resolution.xy)/u_resolution.y;
    vec2 blob0_uv = u_blob0.xy /  u_resolution.xy;
    vec2 blob1_uv = u_blob1.xy /  u_resolution.xy;
	vec2 pixel = 1.0/u_resolution;
    float t = u_time*0.1;
    vec2 st = uv * rotate2d(t);  // add rotation
	vec2 mo = u_mouse.xy/u_resolution.xy;
    vec4 color = vec4(vec3(0.0), 1.0);
	
    vec2 diff0 = st.xy - blob0_uv.xy;
    vec2 diff1 = st.xy - blob1_uv.xy;
    float d0 = length(diff0);
    vec4 hc1 = hexTile(diff0*4.0);
    vec4 hc2 = hexTile(diff1*4.0);
     
    float c;
    for (int y = -1; y < 1; y++){ 
        for (int x = -1; x < 1; x++){ 
        vec2 offs = vec2(x,y);
        float d1 = flowerSDF(hc1.xy- offs- vec2(u_mid, u_mid), 6);
        float d2 = flowerSDF(hc2.xy- offs, 6) - 0.1;
      
        float d = mix(d1, d2, u_bass);
        c = smootherstep( .05, 0.01, d*sin(hc1.x*hc1.x+u_time));
        }
    }
  
    vec3 d3 = curl(vec3(st * 2.0, 0.2*u_time)) * 0.5 + 0.5;
    //vec3 d3 = noised(vec3(st * 5., u_time)).yzw * 0.5 + 0.5;
    //color.rgb = mix(d3, PURPLE, c);
    //color.rgb = mix(d3, BLUE, c);
    
 
    color.rgb = mix(d3, vec3(0.0), c); // black
    gl_FragColor = color;
}