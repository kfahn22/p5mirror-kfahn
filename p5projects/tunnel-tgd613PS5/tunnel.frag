// Ported from IQ's piece of wizardry
// https://www.shadertoy.com/view/cd2BDG

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform float u_time;
uniform sampler2D tex0;

#define L length
#define ORANGE vec3(240, 128, 60) / 255.
#define PURPLE vec3(100, 1, 128) / 255.
#define BLUE vec3(58, 110, 165) / 255.
#define RED vec3(140, 0, 26) / 255.

#include "lygia/color/palette/spectral.glsl"

void main()
{ 
    float i,
          s,
          t,
          T = u_time;
    vec2 I = gl_FragCoord.xy;    
    vec2 R = u_resolution.xy;
    vec4 color = vec4(0,11,-11,0) + u_time;
    vec2 u = (I + I - R) / R.y * mat2(cos(color));
                                     
    for(float i = 0.0;i < 2e2;i++){
        t += s * .4;
        vec3 p = mod(vec3(t * u, t + color.x),  2.0) - 1.;
        vec3 q = abs(mod(p, 0.5) - 0.25);
        
      
      // sdf Steel Lattice
        s = L(vec2(
                 min(L(p.xy), 
                 min(L(p.yz), 
                     L(p.zx))) - .5,
                    
                 min(q.x, min(q.y, q.z))
            )) - .04;
        
        if (t > 1e2 || s < .02) break;
    }
    //color.rgb = spectral_zucconi(t*0.1);
    color.rgb = mix(PURPLE, ORANGE, t*0.1);
    
    gl_FragColor = color;
}