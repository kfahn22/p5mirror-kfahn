//https://www.shadertoy.com/view/4sjczm
//http://roy.red/posts/folding-tilings/

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
#include "lygia/color/pigments.glsl"
#include "lygia/color/blend.glsl"
#include "lygia/math/rotate2d.glsl"
#include "lygia/math/const.glsl"
#include "lygia/math/smootherstep.glsl"
#include "lygia/draw/fill.glsl"
#include "lygia/sdf/flowerSDF.glsl"


vec2 cInverse(vec2 z, vec2 center, float radius){
    z -= center;
    return z*radius*radius/dot(z,z) + center;
}

vec2 toUV( vec2 p )
{
    vec2 uv = -1.1 + 2.2 * p / u_resolution.xy;
    uv.x *= u_resolution.x / u_resolution.y;
    return uv;
}

vec3 transform( vec2 st, float zoom, float speed)
{ 
    #ifdef CENTER_2D
    st -= CENTER_2D;
    #else
    st -= 0.5;
    #endif
    vec3 r = u_resolution.xxx;
    vec3 uv = vec3((2.0 * st.xyy- r)/r.x * zoom);
    uv.z = sineIn(u_time*speed);
	uv *= 0.35;
    return uv;
}

void main( )
{
    
   // vec2 uv = toUV(gl_FragCoord.xy);
    vec3 uv = transform(gl_FragCoord.xy, 3., 0.5);
   // vec2 muv = toUV(u_mouse.xyy);
    vec4 color = vec4(vec3(1., 0., 1.), 1.);

    //float f = dot(uv, muv);
   for (int i = 0; i < 6; i++) { 
       uv = abs(uv)/dot(uv, uv) - 1.75;
       uv = length( uv )*( uv + 1.3); // 1.15
       uv = vec3(dot( uv, uv ) * 0.5) ;
   }
    //color.rgb 
    //color.rgb = fill(uv.x, 0.1)*COBALTE_BLUE;
	gl_FragColor = color;
}
