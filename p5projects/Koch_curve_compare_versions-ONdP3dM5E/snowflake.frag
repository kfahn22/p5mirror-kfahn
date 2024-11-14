// Art of Code version

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform sampler2D u_texture;

#define PLATFORM_WEBGL
#include "lygia/color/palette/spectral.glsl"
#include "lygia/draw/fill.glsl"
#include "lygia/sdf/lineSDF.glsl"
#include "lygia/math/const.glsl"
#include "lygia/math/rotate2d.glsl"
#include "lygia/sdf/flowerSDF.glsl"
#include "lygia/sdf/circleSDF.glsl"
#include "lygia/space/scale.glsl"
#include "lygia/space/ratio.glsl"

// Create a normal line that rotates around origin
vec2 rotate(float angle)
  {
  return vec2( sin(angle), cos(angle) );
}

// Function of reflect uvs across a line
// adj remaps line 
// dot(uv,n) =  uv.x*n.x + uv.y*n.y
vec2 Reflect( vec2 uv, vec2 adj, vec2 n ) {
    float d = dot(uv - adj, n); 
    return n*max(0., d)*2.0;
}

// float snowflakeSDF( vec2 st, vec2 center, int N ) {
//     st -= center;
//     st *= 3.25;
//     float r3 = sqrt(3.); 
//     st.y -= r3/6.;
//    // st.y -= r3/3.;
//     st.x = abs(st.x);
//     st = Reflect(st,  vec2(0.5, 0.), vec2(r3, 1.));
   
//     //st = abs(st);
    
//     st += r3*vec2(-st.y,st.x); // 60° rotation, scale 2
//     // st *= 3.;
//     // st.y -= 1.;   
//     float w = 1.0;    
//     mat2 m = mat2(r3,3,-3,r3)*.5;
    
    
//     #ifdef PLATFORM_WEBGL
//     for (int i = 0; i< 20; i++) {
//         if (i >= N) break;
//     #else
//     for (int i = 0; i< N; i++) {
//     #endif
//         //st.x -= 0.5;
//         w *= 3.0;
//         //st *= 3.0;
//         //st.x = abs(st.x);
//         //st.x -= 0.5;
//         //st.y -= r3/3.;
//         //st = Reflect(st, vec2(0), vec2(-1., r3));
//        st = vec2(-r3,3)*.5 - m*vec2(st.y,abs(st.x));
//        //st /= w;
//     }
//    // float d = sign(st.y)*length(vec2(st.y,max(0.,abs(st.x)-r3)));
    
    
      
//     // Other SDFs 
//    //float d = length(st - vec2(min(st.y, 1.0), 0.0)) / w;
//    float d = circleSDF(st+center) - .1;//- 0.45; // size determined by subtracted value
    
//     //float d = length(st - vec2(clamp(st.x, -2., 2.), 0.));
//     return (d);
// }

float snowflakeSDF( vec2 st, vec2 center, int N ) {
    st -= center;
    st *= 3.;
    float r3 = sqrt(3.); 

    st  = abs(st);
    
    st += r3*vec2(-st.y,st.x); // 60° rotation, scale 2

    st.y -= 1.;   
    float w = 0.5;    
    mat2 m = mat2(r3,3,-3,r3)*.5;
    
    
    #ifdef PLATFORM_WEBGL
    for (int i = 0; i< 20; i++) {
        if (i >= N) break;
    #else
    for (int i = 0; i< N; i++) {
    #endif
      
       //st = vec2(-r3,3)*.5;// - m*vec2(st.y,abs(st.x));
       st = vec2(-r3,3)*.5 - m*vec2(st.y, abs(st.x));
       st /= w;
    }
  float d = sign(st.y)*length(vec2(st.y,max(0.,abs(st.x)-r3)));
    
    
      
    // Other SDFs 
   //float d = length(st - vec2(min(st.y, 1.0), 0.0)) / w;
   float d = circleSDF(st+center) - .2;//- 0.45; // size determined by subtracted value
    
    //float d = length(st - vec2(clamp(st.x, -2., 2.), 0.));
    return (d);
}
    
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  
  vec4 color = vec4(vec3(0.), 1.0); 
  
  float sdf = snowflakeSDF(st, vec2(0.5), 2);
  
  color.rgb = fill(sdf, 0.01)*vec3(1.);
  gl_FragColor = color;
}