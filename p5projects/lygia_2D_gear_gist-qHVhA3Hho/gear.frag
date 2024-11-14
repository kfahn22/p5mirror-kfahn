#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution; 

#include "lygia/draw/fill.glsl"
#include "lygia/sdf/gearSDF.glsl"
#include "lygia/math/rotate2d.glsl"

void main()
{
	vec2 uv = (gl_FragCoord.xy-0.5*u_resolution.xy) / u_resolution.y;
    vec4 color = vec4(vec3(0.0), 1.0);
  
    float sdf = gearSDF(uv, 12.0, 10);
    color.rgb += fill(sdf, 0.01);
  
    gl_FragColor = color;
}

