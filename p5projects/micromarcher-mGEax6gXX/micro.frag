// https://www.shadertoy.com/view/DlBcz1

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform float u_time;
//uniform sampler2D tex0;


//#define PLATFORM_WEBGL

#include "lygia/math/const.glsl"
#include "lygia/sdf/triSDF.glsl"
#include "lygia/draw/fill.glsl"

// The MIT License
// Copyright © 2023 Inigo Quilez
// https://www.youtube.com/c/InigoQuilez
// https://iquilezles.org/
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// Original was 161 chars long. -1 by SnoopethDuckDuck. -4 chars by Xor.
// A raymarching shader using no more than the two input variables. Idea:
//
// p += f(p)*rd              Start with a regular SDF raymarcher
// p += f(p)*normalized(p)   and note ray direction is normalized position.
// p += f(p)*p/p.z           But our Signed Field f(p) need NOT be an SDF,
// p += f(p)*p*step          so we migh as well use a constant here.
// p *= 1+f(p)*step          Then factor out ray position.
// p *= (1-k*step)+step*g(p) Now, if f(p) has some level set constant k,
//                           f(p)=g(p)-k, we can propagate it out of f(p).

// void main(){
//     vec2 st = gl_FragCoord.xy;
//     vec4 p = 0.1 * vec4(st/u_resolution.y,1.,0.)-0.06;   
//     //for (int i = 0; i < 5; i++){
//                                          //           // First setup camera
//         // Then while not done
//         if (st.x >= 0.0) {
//           p *=0.9+0.1*length(cos(0.7*p.x+vec3(p.z+u_time,p.xy)))+0.01*cos(4.0*p.y);
//         // march forward
//           p = (p + p.z)*0.1;
//         }
//    // }
//     gl_FragColor = p;
// }                                                   // Finally, do color


void main()
{
    vec2 p = gl_FragCoord.xy;
    vec4 color = vec4(vec3(0.0), 1.0);
    for(color=.4-vec4(p,1,0)/u_resolution.x; p.x-->0.;)
             color*=.9+.1*length(cos(color.yxz+sin(color.x)+vec3(0,0,u_time)))+.01*cos(9.*color.y);

    gl_FragColor=(color+color.z)*.1;
}

// +4 chars, to fix clipping issue:       p=.1*vec4(f/iResolution.y,1,0)-.06;
// +2 chars, to fix screen-left issue:    f.x-->-2e2;
// +2 chars, to fix compatibility issues: vec3(p.z+iTime,p.xy)
//
// These fixes above together is 165 chars:
//
// void mainImage(out vec4 p,vec2 f){for(
// p=.1*vec4(f/iResolution.y,1,0)-.06;
// f.x-->-2e2;
// p*=.9+.1*length(cos(.7*p.x+vec3(p.z+iTime,p.xy)))+.01*cos(4.*p.y));
// p=(p+p.z)*.1;}