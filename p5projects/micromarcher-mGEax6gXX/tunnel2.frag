// https://www.shadertoy.com/view/cd2BDG

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform float u_time;
uniform sampler2D tex0;


//#define PLATFORM_WEBGL
#define L length

#include "lygia/math/const.glsl"
#include "lygia/sdf/triSDF.glsl"
#include "lygia/draw/fill.glsl" 

void main()
{ 
    float i,
          s,
          t,
          T = u_time;
    vec2 I = gl_FragCoord.xy;    
    vec2 R = u_resolution.xy;
    vec2 u = (I + I - R) / R.y * mat2(cos(T+vec4(0,11,-11,0)));
                                     
    for(float i = 0.0;i < 2e2;i++){
        vec3 p = vec3(t * u, -t - T);
        vec3 q = mod(p, 2.) - 1.;
        I.x = min(L(q.xy), min(L(p.yz), 
                                                 L(p.xz))) - .5;
        I.y = min((p=abs(mod(p, .5) - .25)).x, min(p.y, p.z));

        s = L(I) - .04;
    
        t += s * .4;
        if (t > 1e2 || s < .02) break;
    }
    gl_FragColor = t * vec4(6, 7, 9, 0) * .05;
}