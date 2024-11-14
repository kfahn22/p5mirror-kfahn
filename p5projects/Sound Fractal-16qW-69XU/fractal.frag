// Port of  https://www.shadertoy.com/view/ctByWz
// shadertoyjiang 

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_vol;
uniform float  u_bass;
uniform float u_treble;
uniform int u_mid;

#define PLATFORM_WEBGL

#define PURPLE vec3(119, 45, 139) / 255.
#define DKPURPLE vec3(100, 1, 128) / 255.

#include "lygia/color/space/gamma2linear.glsl"
#include "lygia/color/palette/spectral.glsl"
#include "lygia/color/palette/pigments.glsl"
#include "lygia/color/palette/water.glsl"

float fractal( vec2 st, float speed, float zoom, int N) {
    #ifdef CENTER_2D
    st -= CENTER_2D;
    #else
    st -= 0.5;
    #endif
    vec3 r = u_resolution.xxx;
    vec3 u = vec3((2.0 * st.xyy- r)/r.x * zoom);
    u.z = cos(mix(u_bass, u_time*0.5, 0.25))*.5-.5;
   
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
    return clamp(abs(u.x), 0.0, 1.25);
}

void main()
{
    vec2 uv = gl_FragCoord.xy;
    vec2 mouse = u_mouse.xy;
    vec4 color = vec4(DKPURPLE, 1.);
    
    // Two colors, more detail
    float f = fractal(uv, u_vol, 4.0, 6);
    color.rgb += f * PURPLE;
   
    // Spectral color, less detail
    // float f = fractal(uv, 0.15, u_vol, 6);
    // color.rgb = spectral_zucconi(f);
    gl_FragColor = color;
}