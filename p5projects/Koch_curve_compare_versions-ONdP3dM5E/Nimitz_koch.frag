//https://www.shadertoy.com/view/XsfXDH
//Nimitz (@stormoid)

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

#define PLATFORM_WEBGL
#define time u_time

#include "lygia/color/palette/spectral.glsl"
#include "lygia/color/pigments.glsl"
#include "lygia/draw/fill.glsl"
#include "lygia/sdf/kochSDF.glsl"
#include "lygia/math/const.glsl"
#include "lygia/math/smootherstep.glsl"
#include "lygia/math/rotate2d.glsl"
//#include "lygia/sdf/juliaSDF.glsl"
#include "lygia/space/scale.glsl"
#include "lygia/space/polar2cart.glsl"
#include "lygia/sdf/triSDF.glsl"


float koch(vec2 p)
{
    float r3 = sqrt(3.);
	float rz = 1.;
    mat2 m2 = mat2( 0.5,  0.866, -0.866,  0.5 ); // 60
	const float maxitr = 7.;
	float itnum = maxitr;
    #ifdef PLATFORM_WEBGL
	for (float i=0.;i<maxitr;i++) 
	{
		if (i>mod(time*0.5,maxitr)) break;
    #else
	for (int i = 0; i< maxitr; i++) {
    #endif
     
		//draw triangle
        float d = max(abs(p.x)*r3+p.y, -p.y*2.)-3.;
		//float d = max(abs(p.x)*1.73205+p.y, -p.y*2.)-3.;
		
		//edge scaling
		itnum--;
		d *=exp(itnum)*0.05;
		
		//min blending
		rz= min(rz,d);
		
		//show complete edges half the time
		rz *= rz+(abs(d)*step(mod(time,2.),1.));
		
		//fold both axes
		p = abs(p);
		
		//rotate
		p *= m2;
		
		//fold y axis
		p.y = abs(p.y);
		
		//rotate back
		p.yx*= m2;
		
		//move and scale
		p.y-=2.;
		p*=3.;
	}
	return clamp(rz,0.,1.);
}

void main( )
{
	vec2 p = gl_FragCoord.xy/u_resolution.xy-.5;
	p.x *= u_resolution.x/u_resolution.y;
	p *= 6.;
  
	vec4 color = vec4(vec3(0.0), 1.0);
	float rz = 1.-koch(p);
	color.rgb = vec3(1.)*rz;
	float lp = length(p);
	color.rgb -= pow(lp*.23,2.)*rz;
	
	//background coloring
	vec3 bg = vec3(0.1,0.2,0.3)*1.3;
	color.rgb = mix(bg, color.rgb, rz*rz);
	color.rgb -= lp*.03;
	
	gl_FragColor = color;
}
