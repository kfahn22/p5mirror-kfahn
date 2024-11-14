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
#include "lygia/sdf/hexSDF.glsl"
#include "lygia/sdf/triSDF.glsl"
#include "lygia/sdf/lineSDF.glsl"
#include "lygia/space/scale.glsl"
#include "lygia/space/ratio.glsl"
//#include "lygia/sdf/kochSDF.glsl"

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
   // float d = sign(st.y)*length(vec2(st.y,max(0.,abs(st.x)-r3)));  
    
    //float d = sign(st.y) * length(st - vec2(clamp(st.x, -2., 2.), 0.));
    float d = st.y;
 
    return d ;
}



void main(void) {
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel; 
    vec4 color = vec4(vec3(0.0), 1.0);
    st = ratio(st, pixel);
  
    // N = 0 yields a diamond
    // N = 1 yields a hexagon (color reversed)
    // N even yields the koch snowflake
    // N odd  yields hexigonal snowflake (colors reversed)
    
    float sdf = kochSDF(st, vec2(0.5), 1);
    //float sdf = 1. - kochSDF(st, vec2(0.5), 5);
    
    
    color.rgb += fill(sdf, 0.05)*vec3(1.);
    gl_FragColor = color;
}