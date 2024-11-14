#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform float u_time;


#define PLATFORM_WEBGL

#include "lygia/color/pigments.glsl"

vec3 fractalReflect(vec2 st, vec2 pixel, vec3 color1, vec3 color2, int N) {
  	//st -= 0.5;
    st = (2.0 * st - pixel) / pixel * 4.;
	//st = st/pixel * 4.0;
  
	#ifdef PLATFORM_WEBGL
	for (int i = 0; i< 20; i++) {
	if (i >= N) break;
	#else
	for (int i = 0; i< N; i++) {
	#endif
	st = sin(st)-2.*cos(st) * dot(sin(st),cos(st));
	}
    return mix(color1, color2, cos(st.x*15.0));
}

void main( )
{
    vec2 st = gl_FragCoord.xy;
    vec2 pixel = u_resolution.xy;
    vec4 color = vec4(vec3(0), 1.0);
    color.rgb = fractalReflect(st, pixel, COBALTE_BLUE, COBALT_VIOLET, 3);
    gl_FragColor = color;
}