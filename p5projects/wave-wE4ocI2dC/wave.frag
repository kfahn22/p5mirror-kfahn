// Port of  https://www.shadertoy.com/view/ctByWz
// shadertoyjiang 

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


#define PLATFORM_WEBGL

#include "lygia/color/space/gamma2linear.glsl"
#include "lygia/color/palette/spectral.glsl"
#include "lygia/color/pigments.glsl"
#include "lygia/generative/gerstnerWave.glsl"
#include "lygia/color/palette/water.glsl"

void main()
{
    vec2 uv = gl_FragCoord.xy;
    vec3 r = u_resolution.xxx;
    float zoom = 5.;
    vec3 p = vec3((2.0 * uv.xyy - r)/u_resolution.x * zoom);
    //vec3 p = gl_FragCoord.xyy;
    //vec2 mouse = u_mouse.xy;
    vec4 color = vec4(vec3(0), 1.);
    
    vec2 dir = vec2(0.5, 0.5);
    float steepness = 1.5;
    float wl = 10.;
    p += gerstnerWave(uv*0.5, vec2(1.0, -0.5), 0.2, 30., u_time);
    p += gerstnerWave(uv, vec2(0.8, 0.1), 0.4, 10., u_time*0.5);
     p -= gerstnerWave(uv, vec2(0.9, 0.2), 0.5, 12., u_time);
    //color.rgb = spectral_zucconi(f);
    
	// color.rgb = (1.-f)*COBALTE_BLUE + SAP_GREEN*f;
	//color.rgb = p;
    color.rgb = mix(water(p.x), p * COBALTE_BLUE, 0.5);
  // color.rgb = water(p.x);
  //  color.rgb = p * COBALTE_BLUE;
    gl_FragColor = color;
}