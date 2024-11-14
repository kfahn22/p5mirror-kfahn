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

float fractal( vec2 uv, vec2 center, float m, float zoom, float speed, int N) {
    uv -= center;
    vec3 r = u_resolution.xxx;
    vec3 u = vec3((2.0 * uv.xyy - r)/u_resolution.x * zoom);

    //u.z = sin(u_time * zoom)*.5-.5;
    u.z = sin(u_time * speed + 75.)*.5-.5;
	u *= .17;
    #ifdef PLATFORM_WEBGL
    for (int i = 0; i< 20; i++) {
        if (i >= N) break;
    #else
    for (int i = 0; i< N; i++) {
    #endif
		//u = abs( u ) / dot(u, u) - sqrt(3.);
        u = abs( u ) / dot(u, u) - 1.5 ;
		r.x = length(u);
        u = u + m;
	}
 	u = vec3(dot(u, u) * 0.5) ;
    return u.y;
}

// m > 0.4
// float fractal( vec2 uv, vec2 center, float m, float zoom, int N) {
//     uv -= center;
//     vec3 r = u_resolution.xxx;
//     vec3 u = vec3((2.0 * uv.xyy - r)/u_resolution.x * zoom);

//     u.z = sin(u_time * .25 + 71.)*.5-.5;
// 	u *= .17;
//     #ifdef PLATFORM_WEBGL
//     for (int i = 0; i< 20; i++) {
//         if (i >= N) break;
//     #else
//     for (int i = 0; i< N; i++) {
//     #endif
// 		u = abs( u ) / dot(u, u) - 1.5 ;
// 		r.x = length(u);
//         u = u + m;
// 	}
//  	u = vec3(dot(u, u) * 0.5) ;
//     return u.y;
// }

void main()
{
    vec2 uv = gl_FragCoord.xy;
    vec2 mouse = u_mouse.xy;
    vec4 color = vec4(vec3(0), 1.);
    //float f = fractal(uv, vec2(0.5), 0.6, mouse.x*0.1, 9);
    float f = fractal(uv, vec2(0.5), 0.6, 3., 0.10, 5);
    //float f = fractal2(uv, vec2(0.5));
    
    //float f = what(uv, vec2(0.5));
    color.rgb = spectral_zucconi(f);
    color.rgb = 
	// color.rgb = (1.-f)*COBALTE_BLUE + SAP_GREEN*f;
	
    gl_FragColor = color;
}