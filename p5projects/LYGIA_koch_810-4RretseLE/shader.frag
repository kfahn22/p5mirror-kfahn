// There are a multitude of ways you can bend uv space.  

// I am not sure which approach is best, but I prefer the first

// You get a different rendering based on whether you passed scaled uv's into the function.  

// You get a different rendering if you call the function (or differnt versions) more than once.

// st = ref(st, vec2(-3.,-r3), -r3, -3.); hexigon
// st = ref(st, vec2(3.,-r3), -r3, -3.); hexigon
// st = ref(st, vec2(r3,3.), r3, 3.); interesting (sw pattern as N increases)
// horizontal part of Koch curve?
// st = ref(st, vec2(-r3,-3.), -r3, -3.);

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
    //st.y = abs(st.y);
    float w = .5;    
    mat2 m = mat2(r3,3,-3,r3)*.5;
    #ifdef PLATFORM_WEBGL
    for (int i = 0; i< 20; i+=1) {
        if (i >= N) break;
    #else
    for (int i = 0; i< N; i+=1) {
    #endif
        st = vec2(-r3,3)*.5 - m*vec2(st.y, abs(st.x));
        w /= r3;
    }
    //float d = length(vec2(st.y,max(0.,abs(st.x)-r3)));  
    float d = sign(st.y)*length(vec2(st.y,max(0.,abs(st.x)-r3)));  
    return (d*w);
}


vec2 ref (vec2 st, vec2 p, float c, float s) {
    //vec2 dir = polarToCartesian (angle); // Direction of the reflection line
    //float r3 = sqrt(3.);
    //mat2 m = mat2(r3, 3., -3., r3)*0.5; // 30
    //mat2 m = mat2(3., r3, -r3, -3.)*0.5; // 60
    //mat2 m = mat2(-3., r3, -r3, -3.)*0.5; // 120
    //mat2 m = mat2(-r3, 3., -3., -r3)*0.5; // 150
     //mat2 m = mat2(-r3, -3., 3., -r3)*0.5; // 210
     //mat2 m = mat2(-3., -r3, r3, -3.)*0.5; // 240
    //mat2 m = mat2(3., -r3, r3, 3.)*0.5; // 300
    mat2 m = mat2(c, s,s, c)*0.5; // 330 tree?
    //vec2 dir = (-r3/3.)*vec2(-st.y,st.x); //330
  //return st - dir * min (dot (st - p, dir), 0.0) * 2.0; 
  // Returns the reflected uv coordinate
  return  st - p - m*vec2(st.y, st.x);
  // return  p*0.5 - m*vec2(st.y, abs(st.x));
}



void main(void) {
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec4 color = vec4(vec3(0.0), 1.0);
    st = ratio(st, pixel);
 
  
    float  sdf = kochSDF(st, vec2(0.5), 4);
    //float sdf = kochSDF(st, vec2(0.5), 3 );
    color.rgb += fill(sdf, 0.01)*vec3(1.);
    
    gl_FragColor = color;
}