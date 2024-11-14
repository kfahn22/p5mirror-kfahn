//Port of  https://www.shadertoy.com/view/mlBcRh

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform float u_time;
uniform sampler2D tex0;

//#define PLATFORM_WEBGL

// #include "lygia/math/const.glsl"
// #include "lygia/sdf/triSDF.glsl"
// #include "lygia/color/spectral.glsl"
#include "lygia/simulate/fluidSolver.glsl"

float modulo(in float x, in float y) { return x - y * floor(x / y); }

// void main()                               
// {

//     vec2 uv = gl_FragCoord.xy;
//     vec2 R = u_resolution.xy;

//     vec2 u = ( uv + uv - R ) / R.y;

//     vec2 p = vec2(3.625845, 0.0);       

//     float r = 3.485219;
//     float m = 9.0;
//     float d, l; 

//     vec4 color = vec4(0.2);

//     for (int j= 0; j < 99; j++)    
//     {
//          p *= mat2(-0.5, -0.866, 0.866, -0.5),  // rot 2 * PI / 3

//          d = length(p - u),
            
//          l = .01*exp(length(u)),

//          m = d < m 

//              ? R = p ,d   // m = min(m,d), save R=p

//              : modulo(float(j), 4.) < 1.      // every 4 steps:

//              ? u -= abs(m-r) < l    // dist to p ~ radius: draw, reset u

//              ? color += .9*smoothstep(l,0.,abs(m-r)),
//                 u : R,           // else translate to saved p(m)
//                 u = u * r * r / dot(u, u) + R, 9.  // inversion and reset m

//                   : m;
//     }
  
//     gl_FragColor = color;
// }

void main( )
{
    vec2 st = gl_FragCoord.xy/ u_resolution.xy;
    vec2 pixel = 1.0 / u_resolution.xy;
    //vec2 r = u_resolution.xy;
    vec4 color = vec4(vec3(0), 1.);
  
//     vec3 st = 0.45*( 2.0 * uv.xyy  - r );
  
//     st.z = sin(u_time * .25)*.5-.5;
//     st *= 0.17;
  
//     if (r.x / r.y>1.)  {
//         st = st /( r.z +.5);
//     } else {  (st = st / st.z) +.5;
//     }
    color = fluidSolver(tex0, st, pixel, vec2(10., 0.1));
   // color.rgb = (texture2D(tex0, st.xy).rgb) * 0.85;
    
    gl_FragColor = color;
}   
    

