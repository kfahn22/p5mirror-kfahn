// Started with a port of  https://www.shadertoy.com/view/ctByWz
// shadertoyjiang 

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PLATFORM_WEBGL
#define ORANGE vec3(240, 128, 60) / 255.
#define PURPLE vec3(100, 1, 128) / 255.
#define BLUE vec3(58, 110, 165) / 255.
#define RED vec3(140, 0, 26) / 255.

#include "lygia/color/palette/spectral.glsl"
#include "lygia/color/pigments.glsl"
#include "lygia/color/blend.glsl"
#include "lygia/sdf/juliaSDF.glsl"
#include "lygia/color/palette/water.glsl"

vec2 fractal( vec2 st, float speed, float zoom, int N) {
    #ifdef CENTER_2D
    st -= CENTER_2D;
    #else
    st -= 0.5;
    #endif
    vec3 r = u_resolution.xxx;
    vec3 u = vec3((2.0 * st.xyy- r)/r.x * zoom);
    u.z = sin(u_time * speed + 75.0)*.5-.5;
	u *= 0.25;
	#ifdef PLATFORM_WEBGL
    for (int i = 0; i< 10; i++) {
        if (i >= N) break;
    #else
    for (int i = 0; i< N; i++) {
    #endif
		u = abs( u ) / dot( u, u ) - 1.75;
        u = length( u )*( u + 1.15 );
	}
    u = vec3(dot( u, u ) * 0.5) ;
    return u.xy;
}
  
void main()
{
    vec2 uv = gl_FragCoord.xy;
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 mouse = u_mouse.xy;
    vec4 color = vec4(vec3(0), 1.);
    
    vec2 fr = fractal(uv, 0.19, 5., 6);
    float sdf = juliaSDF(fr, vec2(0.285, 0.0), 1.24); 
    
    color.rgb = spectral(cos(sdf*7.659));
    gl_FragColor = color;
}