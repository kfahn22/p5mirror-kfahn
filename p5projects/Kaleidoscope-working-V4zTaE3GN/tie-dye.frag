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

#include "lygia/color/mixOklab.glsl"
#include "lygia/color/pigments.glsl"
#include "lygia/color/blend.glsl"

#include "lygia/math/lengthSq.glsl"
#include "lygia/math/smootherstep.glsl"

#include "lygia/sdf/superShapeSDF.glsl"
#include "lygia/sdf/flowerSDF.glsl"


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
	uv *= 0.25;
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
vec2 kaleidoscope2(vec2 st, float N){
    #ifdef CENTER_2D
    st -= CENTER_2D;
    #else
    st -= vec2(0.5);
    #endif
    st = abs(st);
   // float n = N/2.;
    float angle = ((N - 1.0) / N) * PI;
    //vec2 dir = vec2(sin(5./6. * PI), cos(5./6. * PI));
    vec2 dir = vec2(sin(angle), cos(angle))*0.5;
    //float d = dot(st, dir);  
    //st -= dir * max(0.0, d) * 2.0; 
    //st.x = abs(st.x);
    //dir = vec2(sin(4./6. * PI), cos(4./6. * PI));
    //angle =( (N - 2.0) / N ) * PI;
    //dir = vec2(sqrt(2.),sqrt(2.))*0.5;
    st -= dir * min(0., dot(st, dir)) * 2.0;
    // angle =( (N - 2.0) / N) * PI;
    // dir = vec2(sin(angle), cos(angle));
    // st -= dir * min(0., dot(st, dir)) * 2.0;
    return st;
}
  
  vec2 kaleidoscope3(vec2 st, float N){
    #ifdef CENTER_2D
    st -= CENTER_2D;
    #else
    st -= vec2(0.5);
    #endif
    //vec2 uv = abs(st);
    st = abs(st);
    float r3 = sqrt(3.);
    // vec2 dir = vec2(1.0, -r3)*0.5;
    //vec2 dir = vec2(sin(5./6. * PI), cos(5./6. * PI));
    float angle = ((N - 1.0) / N) * PI;
    vec2 dir = vec2(sin(angle), cos(angle))*0.5;
    float d = dot(st, dir);  
    st -= dir * max(0.0, d) * 2.0; 
    dir = vec2(r3, -1.0)*0.5;
    // dir = vec2(sin(4./6. * PI), cos(4./6. * PI));
    st -= dir * min(0., dot(st, dir)) * 2.0;

    return st;
}
  
vec2 kaleidoscope(vec2 st){
    #ifdef CENTER_2D
    st -= CENTER_2D;
    #else
    st -= vec2(0.5);
    #endif
    float r3 = sqrt(3.);
    //st.x = abs(st.x);  
    st = abs(st);
    //vec2 dir = vec2(sin(5./6. * PI), cos(5./6. * PI));
    vec2 dir = vec2(1.0, -r3)*0.5;
    float d = dot(st, dir);  
    st -= dir * max(0.0, d) * 2.0; 
    dir = vec2(r3, -1.0)*0.5;
    // dir = vec2(sin(4./6. * PI), cos(4./6. * PI));
    st -= dir * min(0., dot(st, dir)) * 2.0;
    return st;
}
      
void main(void) {
    vec2 pixel = u_resolution.xy;
    vec2 st = gl_FragCoord.xy / pixel;
    vec4 color = vec4(vec3(0.0), 1.0);
    float t = sineIn(u_time*0.3);
  
    //vec2 kv = kaleidoscope(st);
    // vec2 kv = kaleidoscope(st+0.3);
    // vec2 lv = kaleidoscope(st-0.3);
    vec2 kv = kaleidoscope3(st, 6.);
    float sdf = flowerSDF(kv+0.3, 12);
    //sdf += flowerSDF(lv, 6);
    color.rgb = fill(sdf, 0.1)*vec3(1.);
  
  
//     vec2 uv = genKaleidoscope(kv*pixel, pixel, t, 3.0, 1.5, 1.3, 6); // 3.0, 6
//     uv.x = clamp(uv.x, 0.0, 1.0);
//     color.rgb = mixOklab(PURPLE, ORANGE, uv.x);
//     uv = genKaleidoscope(st*pixel, pixel, t, 5.0, 1.5, 1.3, 7);// 5.0, 7
//     uv.x = clamp(uv.x, 0.0, 1.0);
//     color.rgb += mixOklab(COBALTE_BLUE, COBALT_VIOLET, uv.x);
    

    // Add texture to a shape
    // float sdf = superShapeSDF( st, 2.5, 1.0, 1.0, 1.0, 1.0, 1.0, 12.0);
    // float s = smootherstep(0.0, 0.1, sdf);
    // color.rgb = (1.0-s)*color.rgb + s * PURPLE;
    
    gl_FragColor = color;
}