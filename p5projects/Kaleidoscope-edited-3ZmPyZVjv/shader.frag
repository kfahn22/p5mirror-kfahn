#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform sampler2D u_texture;
uniform float u_time;


#define PLATFORM_WEBGL

#define ORANGE vec3(240, 128, 60) / 255.
#define PURPLE vec3(100, 1, 128) / 255.
#define BLUE vec3(58, 110, 165) / 255.
#define RED vec3(140, 0, 26) / 255.

#include "lygia/animation/easing.glsl"

#include "lygia/draw/fill.glsl"

#include "lygia/color/palette/spectral.glsl"
#include "lygia/color/pigments.glsl"
#include "lygia/color/blend.glsl"
#include "lygia/color/mixOklab.glsl"

#include "lygia/math/lengthSq.glsl"
#include "lygia/math/smootherstep.glsl"

#include "lygia/sdf/juliaSDF.glsl"
#include "lygia/sdf/flowerSDF.glsl"
#include "lygia/sdf/superShapeSDF.glsl"


// Adapted from https://www.shadertoy.com/view/ctByWz
vec2 genKaleidoscope( vec2 st, vec2 pixel, float speed, float zoom, float m, float n, int N) {
    #ifdef CENTER_2D
    st -= CENTER_2D;
    #else
    st -= 0.5;
    #endif
    vec3 r = vec3(pixel.x);
    vec3 uv = vec3((2.0 * st.xyy- r)/r.x * zoom);
    uv.z = sineIn(speed);
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
  
// Adapted from KIFS Fractals Explained! by The Art of Code
// https://www.youtube.com/watch?v=il_Qg9AqQkE&t=950s
vec2 kaleidoscope(vec2 st){
    #ifdef CENTER_2D
    st -= CENTER_2D;
    #else
    st -= vec2(0.5);
    #endif
    float r3 = sqrt(3.);
    st.x = abs(st.x);  
    vec2 dir = vec2(1.0, -r3)*0.5;
    float d = dot(st, dir);  
    st -= dir * max(0.0, d) * 2.0; 
    st.x = abs(st.x);
    dir = vec2(r3, -1.0)*0.5;
    st -= dir * min(0., dot(st, dir)) * 2.0;
    return st;
}
      
void main(void) {
    vec2 pixel = u_resolution.xy;
    vec2 st = gl_FragCoord.xy / pixel;
    vec4 color = vec4(vec3(0.0), 1.0);
    float t = sineIn(u_time*0.1);
    
    vec2 uv = kaleidoscope(st);
    //color.rgb = fill(uv.x, 0.1)*vec3(1.);
  
    // float sdf = flowerSDF(st, 10);
    float sdf = flowerSDF(uv+0.2, 8);
    //sdf += flowerSDF(uv, 6);
    //color.rgb = fill(sdf, 0.1)*vec3(1.);
    
    color.rgb = texture2D(u_texture, uv).rgb;
   
  
    // CAN ALSO CALL GENKALEIDOSCOPE AFTER KALEIDOSCOPE 
    //vec2 kv = genKaleidoscope(uv*pixel, pixel, t, 3.0, 1.75, 1.15, 5); // 3.0, 6
    // clamp kv.x to get more muted colors
    // kv.x = clamp(kv.x, 0.0, 1.0);
    // color.rgb = mix(ORANGE, PURPLE, kv.x);
    gl_FragColor = color;
}