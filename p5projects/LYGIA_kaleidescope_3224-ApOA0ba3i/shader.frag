// There are a multitude of ways you can bend uv space.  

// I am not sure which approach is best, but I prefer the first

// You get a different rendering based on whether you passed scaled uv's into the function.  

// YOu get a different rendering if you call the function (or differnt versions) more than once.


#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform sampler2D u_texture;

#define PLATFORM_WEBGL

#include "lygia/color/palette/spectral.glsl"
#include "lygia/color/pigments.glsl"
#include "lygia/sdf/lineSDF.glsl"
#include "lygia/math/const.glsl"
#include "lygia/math/rotate2d.glsl"
#include "lygia/sdf/juliaSDF.glsl"
#include "lygia/space/scale.glsl"
#include "lygia/sdf/flowerSDF.glsl"
#include "lygia/sdf/superShapeSDF.glsl"
#include "lygia/draw/fill.glsl"
#include "lygia/generative/worley.glsl"

// Adapted from https://www.youtube.com/watch?v=__dSLc7-Cpo
vec2 kaleidescope1( vec2 st ) {
    st = st * 2.0 - 1.0;
    st = abs(st); 
    st.y += -0.288;
    vec2 n = vec2(-0.866, 0.5); // 150 degrees
    float d = dot(st- 0.5, n);
    st -= n * max(0.0, d) * 2.0;
    st.y -= -0.433; 
    n = vec2(-0.5, 0.866); // 120
    d = dot(st, n);
    st -= n * min(0.0, d) * 2.0;
    st.y -= 0.288; 
    return st;
}

// vec3 fold(vec2 st, vec2 p, vec2 dir, float iter){
//     #ifdef p
//     st -= p;
//     #endif
//    // vec2 dir = vec2(cos(angle),sin(angle));
//     float dt = dot(st, dir);
//     vec3 uv = vec3(st, iter);
//     if (dt<0.) {
//         uv.xy-=2.0*dt*dir;
//         uv.z++;
//     }
//     return uv;
// }
vec2 fold(vec2 st,  vec2 p, float angle){
    vec2 dir = vec2(cos(angle),sin(angle));
    float dt = dot(st-p, dir);
    if (dt<0.) {
        st-=2.0*dt*dir;  
    }
    return st;
}
// vec2 fold(vec2 st,  vec2 p, vec2 dir){
//    // vec2 dir = vec2(cos(angle),sin(angle));
//     float dt = dot(st-p, dir);
//     if (dt<0.) {
//         st-=2.0*dt*dir;  
//     }
//     return st;
// }
// vec2 kaleidoscope1( vec2 st ) {
//     st = st * 2.0 - 1.0;
//     st = abs(st); 
//     st.y += -0.288;
//     vec2 n = vec2(-0.866, 0.5); // 150 degrees
//     float d = dot(st- 0.5, n);
//     st -= n * max(0.0, d) * 2.0;
//     st.y -= -0.433; 
//     n = vec2(-0.5, 0.866); // 120
//     d = dot(st, n);
//     st -= n * min(0.0, d) * 2.0;
//     st.y -= 0.288; 
//     return st;
// }

// vec2 kaleidoscope2( vec2 st ) {
//     float r3 = sqrt(3.);
//     st = st * 2.0 - 1.0;
//     st = abs(st); 
//     st.y += -0.288;
//     st = fold(st, vec2(0.5), vec2(-0.866, 0.5));
//     // vec2 n = vec2(-0.866, 0.5); // 150 degrees
//     // float d = dot(st- 0.5, n);
//     // st -= n * max(0.0, d) * 2.0;
//     st.y -= -0.433; 
//     st += fold(st, vec2(0.), vec2(-0.5, 0.866));
//     // n = vec2(-0.5, 0.866); // 120
//     // d = dot(st, n);
//     // st -= n * min(0.0, d) * 2.0;
//     st.y -= 0.288; 
//     return st;
// }

vec2 kaleidoscope3( vec2 st, float angle1, float angle2, int N ) {
    #ifdef CENTER_2D
    st -= CENTER_2d;
    #else
    st -= vec2(0.5);
    #endif
    //st /=3.0;
    st /= 3.0;
    
    // st.y-=0.5;
    // st = fold(st, vec2(0.0), PI/2.);
    st = abs(st);
    #ifdef PLATFORM_WEBGL
    for (int i = 0; i< 10; i++) {
        if (i >= N) break;
    #else
    for (int i = 0; i< N; i++) {
    #endif
    //st.y += -0.288;
    
    //st.y = abs(st.y);
    st.y += tan(angle1)*0.5;
    st = fold(st, vec2(0.5), angle1);
    // st.y -= -0.433; 
    st.y -= tan(angle2)*0.25;
    st += fold(st, vec2(0.), angle2);
   st.y += tan(angle1)*0.5;
    
    
    }
    return st/ float (N);
}
  
void main(void) {
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec4 color = vec4(vec3(0.0), 1.0);
    
    //st = koch(st, vec2(0.5));
    // Passing scaled uv's creates a bounded shape.
    //st = scale(st, 3.);
    //st = kaleidescope2(st);
  
    //st = kaleidoscope3(st, (5./6.)*PI, (2./3.)*PI, 1);
    st = kaleidoscope3(st, (5./6.)*PI, (2./3.)*PI, 1);
  
    //color.rgb  += texture2D(u_texture, st*2.).rgb;
    
    //color.rgb = spectral_zucconi6(sdf);
  
    //float n = juliaSDF(st, vec2(-0.8, 0.156), 0.25);
    //float sdf = superShapeSDF(st+0.5, 1.5, 1.0, 1.0, 1.0, 1.0, 1.0, 5.0);
    //float sdf = flowerSDF(st+0.5, 8);
    color.rgb = fill(st.y, 0.1)*COBALTE_BLUE;
  
  
    //color.rgb = spectral_zucconi6(cos( n*15.0 ));
    
    gl_FragColor = color;
}