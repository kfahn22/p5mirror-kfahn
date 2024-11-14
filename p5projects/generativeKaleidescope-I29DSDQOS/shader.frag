// Adapted from  https://www.shadertoy.com/view/ctByWz
// shadertoyjiang 


#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_tex0;

#define PLATFORM_WEBGL
#define CENTER_2D vec2(0.5)

#include "lygia/animation/easing.glsl"
#include "lygia/color/palette/spectral.glsl"
#include "lygia/color/mixOklab.glsl"
#include "lygia/color/palette/pigments.glsl"
#include "lygia/color/blend.glsl"
#include "lygia/math/const.glsl"
#include "lygia/math/smootherstep.glsl"
#include "lygia/math/lengthSq.glsl"
#include "lygia/sdf/superShapeSDF.glsl"
#include "lygia/draw/fill.glsl
#include "lygia/sdf/circleSDF.glsl"
#include "lygia/sdf/flowerSDF.glsl"
#include "lygia/sdf/starSDF.glsl"

#define ORANGE vec3(240, 128, 60) / 255.
#define PURPLE vec3(100, 1, 128) / 255.
#define BLUE vec3(58, 110, 165) / 255.
#define RED vec3(140, 0, 26) / 255.

vec2 kaleidescope( vec2 st, vec2 pixel, float speed, float zoom, float m, float n, int N) {
    #ifdef CENTER_2D
    st -= CENTER_2D;
    #else
    st -= 0.5;
    #endif
    vec3 r = vec3(pixel.x);
    vec3 uv = vec3((2.0 * st.xyy- r)/r.x * zoom);
    uv.z = sineIn(u_time*speed);
	uv *= 0.35;
	#ifdef PLATFORM_WEBGL
    for (int i = 0; i< 10; i++) {
        if (i >= N) break;
    #else
    for (int i = 0; i< N; i++) {
    #endif
		uv = abs( uv ) / lengthSq( uv ) - m; 
        uv = length( uv )*( uv + n); // 1.15
	}
    uv.x = lengthSq( uv ) * 0.5;
    return uv.xy;
}
  
void main()
{
    vec2 st = gl_FragCoord.xy;
    vec2 pixel = u_resolution.xy;
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    vec2 mouse = u_mouse.xy;
    vec4 color = vec4(COBALTE_BLUE, 1.);
    
    
    // Two Colors
    //vec2 f = kaleidescope(st, pixel, 0.2, 3.0, 1.75, 1.15, 5); // 3.0, 6
    // clamp f to get more muted colors
    //f.x = clamp(f.x, 0.0, 1.0);
    //color.rgb = mix(ORANGE, PURPLE, f.x);

    // Adding two additional colors
    // f = kaleidescope(st, pixel, 0.15, 5.0, 1.75, 1.15, 7);// 5.0, 7
    // color.rgb = blendAdd(color.rgb, mix(RED, BLUE, f.x));
    
    // "Tie Dye" Look
    // vec2 f = kaleidescope(st, pixel, 0.1, 3.0, 1.5, 1.3, 6); // 3.0, 6
    // f.x = clamp(f.x, 0.0, 1.0);
    // color.rgb = mixOklab(COBALT_VIOLET, CADMIUM_ORANGE, f.x);
    // f = kaleidescope(st, pixel, 0.1, 5.0, 1.5, 1.3, 5);// 5.0, 7
    // f.x = clamp(f.x, 0.0, 1.0);
    // color.rgb += mixOklab(COBALTE_BLUE, COBALT_VIOLET, f.x);
  
    // 
    vec2 kv = kaleidescope(st, pixel, 0.2, 2.0, 1.75, 1.15, 5); // 3.0, 6
    float sdf = flowerSDF(kv*0.5 + 0.5, 5);
    color.rgb += fill(sdf, 0.1)*QUINACRIDONE_MAGENTA;
  
    // Using as a texture to fill a shape
    // float sdf = superShapeSDF( uv, 2.25, 1.0, 1.0, 1.0, 1.0, 1.0, 8.0);
    // float s = smootherstep(0.0, 0.1, sdf);
    // color.rgb = (1.0-s)*color.rgb + s * PURPLE;
    gl_FragColor = color;
}