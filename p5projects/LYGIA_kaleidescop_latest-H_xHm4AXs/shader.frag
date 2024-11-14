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
#include "lygia/sdf/lineSDF.glsl"
#include "lygia/math/const.glsl"
#include "lygia/math/rotate2d.glsl"
#include "lygia/sdf/juliaSDF.glsl"
#include "lygia/space/scale.glsl"

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

// vec2 kaleidescope2( vec2 st, float sc, vec2 center ) {
//     st -= center;
//     st *= sc;
//     st = abs(st);
//     st.y += tan((5.0/6.0)*PI)*0.5;
//     vec2 n = vec2(cos((5.0/6.0)*PI), sin((5.0/6.0)*PI));
//     float d = dot(st- 0.5, n);
//     st -= n * max(0.0, d) * 2.0;
//     st.y -= tan((2.0/3.0)*PI) * 0.25; 
//     n = vec2(cos((2.0/3.0)*PI), sin((2.0/3.0)*PI));
//     d = dot(st, n);
//     st -= n * min(0.0, d) * 2.0;
//     st -= min(0.0, d) * 2.0;
//     st.y -= 0.288; 
//     return st;
// }

vec2 butterfly( vec2 st, float sc, vec2 center ) {
    st -= center;
    float r3 = sqrt(3.);
    st *= sc;
    st = abs(st);
    st += r3*vec2(-st.y,st.x);
    st.y -= 1.;   
    float w = .5; 
    // 
    mat2 m = mat2(r3,3,-3,r3)*.5; // 30
    vec2 uv =  vec2(-r3,3)*.5 - m*vec2(st.y,abs(st.x));
    st = mix(uv, st, 0.5);
  
//     st.y += 1.;
  
//     st *= (-r3/3.)*vec2(-st.y,st.x);
    
    // m = mat2(-r3, 3., -3., r3)*.5; // 150
    // vec2 uv =  vec2(-r3,3)*.5 - m*vec2(st.y,abs(st.x));
  
    //st = mix(uv, st, 0.5);
    //st = max(uv, st);
    
    return st;
}

// vec2 kaleidescope2( vec2 st, float sc, vec2 center ) {
//     st -= center;
//     float r3 = sqrt(3.);
//     st *= sc;
//     st = abs(st);
    
//     vec2 uv = st + (-r3)*vec2(-st.y,st.x); // 60
//     st += (r3)*vec2(-st.y,st.x);
//     st.y -= 1.;   
//     mat2 m = mat2(r3,3,-3,r3)*.5; // 30
//     st +=  vec2(-r3,3)*.5 - m*vec2(st.y,abs(st.x));

// //     uv.y -= 1.;
// //     m = mat2(-3., r3, -r3, -3.)*.5; // 120
// //     uv += vec2(-r3,3)*.5 - m*vec2(uv.y,abs(uv.x));
  
//     //st = st + max(uv, st);
//     st = mix(st, uv, 0.5);
     
//     return st;
// }

vec2 kaleidescope2( vec2 st, float sc, vec2 center ) {
    st -= center;
    float r3 = sqrt(3.);
    st *= sc;
    st = abs(st);
    
    vec2 uv = st - r3*vec2(-st.y,st.x); // 120
   
    st += (r3)*vec2(-st.y,st.x);
    st.y -= 1.;   
    mat2 m = mat2(r3,3,-3,r3)*.5; // 30
    st +=  vec2(-r3,3)*.5 - m*vec2(st.y,abs(st.x));

    //uv.y -= 1.;
//     m = mat2(-3., r3, -r3, -3.)*.5; // 120
//     uv += vec2(-r3,3)*.5 - m*vec2(uv.y,abs(uv.x));
  
    //st = st + max(uv, st);
    st = mix(st, uv, 0.5);
     
    return st;
}


vec2 kaleidescope3( vec2 st, float sc, vec2 center ) {
    st -= center;
    float r3 = sqrt(3.);
    st *= sc;
    st = abs(st);
    st += (r3)*vec2(-st.y,st.x);
    st.y -= 1.;   
    mat2 m = mat2(r3,3,-3,r3)*.5; // 30
    vec2 uv =  vec2(-r3,3)*.5 - m*vec2(st.y,abs(st.x));
    st = mix(st, uv, 0.5);
    return st;
}

//returns hexigon pattern
vec2 koch( vec2 st, vec2 center) {
    st -= center;
    st *= 3.0;
    float r3 = sqrt(3.);  
    st = abs(st);
    st += r3*vec2(-st.y,st.x); // 60° rotation, scale 2
    st.y -= 1.;    
    mat2 m = mat2(r3,3,-3,r3)*.5;
    st = vec2(-r3,3)*.5 - m*vec2(st.y,abs(st.x));
    return st;
}
  
void main(void) {
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec4 color = vec4(vec3(0.0), 1.0);
    
    //st = koch(st, vec2(0.5));
    // Passing scaled uv's creates a bounded shape.
    st = scale(st, 3.);
    st = kaleidescope1(st);
  
    // Version 2
    //st = kaleidescope2(st, 2.0, vec2(0.5));
    color.rgb = spectral_zucconi6(st.y);
  
    //vec2 uv = kaleidescope3(st, 2.0, vec2(0.5));
    //color.rgb = spectral_zucconi6(uv.y);
  
    float n = juliaSDF(st, vec2(-0.8, 0.156), 0.25);
    //color.rgb = spectral_zucconi6(cos( n*15.0 ));
    //color.rgb += texture2D(u_texture, st).rgb;
    gl_FragColor = color;
}