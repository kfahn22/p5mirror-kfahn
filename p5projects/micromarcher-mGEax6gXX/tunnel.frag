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
    vec4 O = vec4(0,11,-11,0) + u_time;
    vec2 u = (I + I - R) / R.y * mat2(cos(O));
                                     
    for(float i = 0.0;i < 2e2;i++){
        t += s * .4;
        vec3 p = mod(vec3(t * u, t + O.x),  2.0) - 1.;
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
    O *= t * 0.01;
    gl_FragColor = O;
}


// void main(){ 
//     vec2 I = gl_FragCoord.xy;
//     vec3 R = u_resolution.xyy;
//     float t, s = 1.;
    
//     // rotation
//     vec4 color = vec4(0, -11, 11, 0) + u_time;
    
//     // raymarch
//     for(t < 1e2 && s > .02) {
//         t += s * .4;
//         // domain repetition
//         vec3 p = mod( vec3( t * (I + I - R.xy) / R.y
//                           * mat2(cos(color))
//                           //* mat2(cos(color.x), sin(color.y), -sin(color.z), cos((coolor.w)))
//                            , t + color.x)
//                    , 2.
//                  ) - 1. ,
                 
//              q = abs(mod(p, .5) - .25);

//         // sdf Steel Lattice
//         s = L(vec2(
//                  min(L(p.xy), 
//                  min(L(p.yz), 
//                      L(p.zx))) - .5,
                    
//                  min(q.x, min(q.y, q.z))
//             )) - .04;
//     }
    
//     // lights
//     color *= t * .01;
//     gl_FragColor = color;
// }


// void main()
// { 
//     vec3 I = gl_FragCoord.xyy;
//     vec3 R = u_resolution.xxx;
//     float t, s = 1.0;
//     vec4 color = vec4(vec3(0.), 1.);
  
//     color = vec4(0,-11,11,0)+u_time;
    
//     if (t<1e2 && s>.02) {
//         t += s*.4;
//         vec3 p = mod( vec3(t*(I+I-R.xy)/R.y * mat2(cos(color)),t+color.x), 2.) - 1.,
//         vec3 q = abs( mod(p,.5)-.25 );

//         s = L(vec2(min(L(p.xy),min(L(p.yz),L(p.zx))) - .5,
//                    min(  q.x,  min(  q.y,    q.z)))) - .04;
//     }
    
//     color *= t * .01;
//     gl_FragColor = color;
// }