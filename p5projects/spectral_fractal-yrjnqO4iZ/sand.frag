// Port of  https://www.shadertoy.com/view/ctByWz
// shadertoyjiang 

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform float u_time;


#define PLATFORM_WEBGL

#include "lygia/color/space/gamma2linear.glsl"
#include "lygia/color/palette/spectral.glsl"
#include "lygia/color/pigments.glsl"

// m > 0.4
float fractal( vec2 uv, vec2 center, float m ) {
    uv -= center;
    vec3 r = u_resolution.xxx;
    vec3 u = vec3((uv.xyy + uv.xyy - r)/r.y * 5.);

    u.z = sin(u_time * .25 + 71.)*.5-.5;
	u *= .17;
	for(int i = 0;i < 9; i++)
	{
		u = abs( u ) / dot(u, u) - 1.5 ;
		//r.x = length(u);
        u = u + m;
	}
 	u = vec3(dot(u, u) * 0.5) ;
    //u = vec3(dot(u, u) * .75) ;
    return u.y;
}

void main()
{
    vec2 uv = gl_FragCoord.xy;
    //vec4 color = vec4(vec3(0), 1.);
    vec4 color = vec4(COBALTE_BLUE, 1.);
    float f = fractal(uv, vec2(0.5), 0.6);
    
    
    color.rgb = spectral_zucconi(f);
    
	// color.rgb = (1.-f)*COBALTE_BLUE + SAP_GREEN*f;
	
    gl_FragColor = color;
}