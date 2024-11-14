// ported from https://www.shadertoy.com/view/ctsyzB

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform float u_time;
uniform sampler2D tex0;


#define PLATFORM_WEBGL

#include "lygia/math/const.glsl"
#include "lygia/color/palette/spectral.glsl"

float fractalTree( vec2 st, vec2 center) {
    st -= center - vec2(0.0, 1.7);
    st *= 2.0;
    
    //vec2 st = uv - center - vec2(0.0, 1.3);
	// float a = acos(-1.);
	// float b = .097;
    float a = asin(-1.); // kind of cool
    //float a = acos(0.5); // kind of cool
	float b = .097;
    

	for (int i=0; i <  64 ; i++)

	{
		//st *= 0.6 * mat2(cos(a),sin(a),-sin(a),cos(a));
        st *= 0.6 * mat2(cos(a),sin(a),-sin(a),cos(a));
		st = (st - b) / dot( st - b, st - b ) + b;

		st = abs(st + vec2(-.305, .533)) - 0.5;

	}
    return st.y;
}

void main()
{
    vec2 uv = (gl_FragCoord.xy/u_resolution.xy);
	// vec2 R = u_resolution.xy;
    vec4 color = vec4(vec3(0.), 1.0);
    uv *= 2.;
    float f = fractalTree(uv, vec2(0.0));

    color.rgb = spectral_zucconi(abs(f));
    
	//gl_FragColor = vec4( abs(st.yy),.3, 1.);
    gl_FragColor = color;
}