// Version on LYGIA

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
#include "lygia/sdf/juliaSDF.glsl"
#include "lygia/sdf/triSDF.glsl"
#include "lygia/sdf/heartSDF.glsl"
#include "lygia/space/scale.glsl"
#include "lygia/space/ratio.glsl"
//#include "lygia/sdf/kochSDF.glsl"

float kochSDF( vec2 st, vec2 center, int N ) {
    st -= center;
    st *= 3.0;
    float r3 = sqrt(3.);  
    st = abs(st);
    st += r3*vec2(-st.y,st.x); // 60° rotation, scale 2
    st.y -= 1.;   
    float w = .5;    
    mat2 m = mat2(r3,3,-3,r3)*.5;
    #ifdef PLATFORM_WEBGL
    for (int i = 0; i< 20; i++) {
        if (i >= N) break;
    #else
    for (int i = 0; i< N; i++) {
    #endif
        st = vec2(-r3,3)*.5 - m*vec2(st.y,abs(st.x));
        w /= r3;
    }
    float d = sign(st.y)*length(vec2(st.y,max(0.,abs(st.x)-r3)));  
    return (d*w);
}

  float koch(vec2 st, vec2 center) {
    st -= center;
    float r3 = sqrt(3.);
    st = st * 6.;
    st = abs(st);
    mat2 m2;
    m2 = mat2(r3, 3, -3, r3)*0.5;  // rotates tri upside down / scales 
    m2 = mat2(0.5, 0.866, -0.866, 0.5)*1.5;
    st *= m2; // rotate 180
  //st.y = abs(st.y);
    //st = vec2(-st.y, st.x) * m2;
    
   // float d = max(st.y + abs(st.x) * sqrt(3.), -st.y* 2.)-3.;
    //st *= m2;
    float d = max(st.y + abs(st.x) * sqrt(3.), -st.y* 2.)-3.;
   //d = mix(d, max(st.y + abs(st.x) * sqrt(3.), -st.y* 2.)-3., 0.5);
    return d;
  }

void main(void) {
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel; 
    vec4 color = vec4(vec3(0.0), 1.0);
    st = ratio(st, pixel);
    // float sdf = kochSDF(st, vec2(0.5), 4);
    // color.rgb += fill(sdf, 0.01)*vec3(1.);
  
  
    st -= vec2(0.5);
    st *= 3.0;
    float r3 = sqrt(3.);  
    st = abs(st);
    st += (r3)*vec2(-st.y,st.x); // 60° rotation, scale 2
    st.y -= 1.;
    float w = .5;    
    mat2 m = mat2(r3, 1, -1,r3)*0.5;
    st = vec2(-r3,1)*0.5 - m*vec2(st.y,abs(st.x));
    // st *= 3.;
//     st = vec2(-r3,3)*.5 - m*vec2(st.y,abs(st.x));
//    w /= r3;
//   st = vec2(-r3,3)*.5 - m*vec2(st.y,abs(st.x));
//     w /= r3;
  
   // w = 1.;
    float d = sign(st.y)*length(vec2(st.y,max(0.,abs(st.x)-r3)));
   
    
    
    color.rgb += fill(d, 0.01)*vec3(1.);
    gl_FragColor = color;
}