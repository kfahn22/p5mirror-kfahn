// https://www.shadertoy.com/view/ctByWz

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform float u_time;
uniform sampler2D tex0;


#define PLATFORM_WEBGL

#include "lygia/math/const.glsl"
#include "lygia/sdf/triSDF.glsl"
#include "lygia/draw/fill.glsl"


// void main( )
// {
//     vec2 uv = gl_FragCoord.xy;
// 	vec2 R = u_resolution.xy;
//     vec2 u = (uv + uv -R)/R.y * 4.;
	
// 	for(int i=0; i < 3; i++){
//       u = sin(u)-2.*cos(u) * dot(sin(u),cos(u));
//     }
// 	  vec4 color = vec4(cos(u.x*10.)*.5,
//              cos(u.y * 10.)*.5+.5,
//              cos(length(u)*4.)*.5+.5,
// 		     0.);
  
//     gl_FragColor = color;
// }

 vec2 fractalImage() {
v =.45*( 2.0*uv-u_resolution.xy)  ;
    if (R.x/R.y>1.)  v = v / R.y+.5;
    else v = v / R.x +.5;
 }

void main( )
{
    vec2 uv = gl_FragCoord.xy;
    vec2 R = u_resolution.xy;
    vec2 v =.45*( 2.0*uv-u_resolution.xy)  ;
    if (R.x/R.y>1.)  v = v / R.y+.5;
    else v = v / R.x +.5;
    
    gl_FragColor = texture2D(tex0,v)*.85;
}

