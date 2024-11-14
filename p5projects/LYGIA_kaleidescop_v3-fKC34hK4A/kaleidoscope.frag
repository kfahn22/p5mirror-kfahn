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
#include "lygia/sdf/opRepeat.glsl"

#include "lygia/sdf/flowerSDF.glsl"
#include "lygia/sdf/superShapeSDF.glsl"
#include "lygia/draw/fill.glsl"

vec2 fold(vec2 st, float ang){
    vec2 dir=vec2(cos(-ang),sin(-ang));
    st-=2.0*min(0.,dot(st,dir))*dir;
	return st;
}

float koch_snowflake(vec2 st, int N) {
    st -= vec2(0.5);
    st = st*2.0;
    
    st -= vec2(0.5,0.3);
    st = fold(st,-2.0*PI/3.);
    st.x += 1.;
    st = fold(st,-PI/3.);
    #ifdef PLATFORM_WEBGL
    for (int i = 0; i< 10; i++) {
        if (i >= N) break;
    #else
    for (int i = 0; i< N; i++) {
    #endif
        st*=3.;
        st.x-=1.5;
        st.x = abs(st.x);
        st.x-=.5;
        st = fold(st,PI/6.);
    }
    st.x-=max(0.,min(1.,st.x));
    return length(st)/(float(N)/3. + 1.);
}

vec2 kaleidoscope(vec2 st){
    #ifdef CENTER_2D
    st -= CENTER_2D;
    #else
    st -= vec2(0.5);
    #endif
    st *= 2.0;
    st.x = abs(st.x);  // Reflect around y axis
    st.y += tan((5./6.)*PI)*0.5;
   // st = fold(st, (5./6.)*PI);
  vec2 dir = vec2( sin((5./6.)*PI), cos((5./6.)*PI) );
  // //  vec2 n = N((5./6.)*PI);
  float d = dot(st- vec2(.5,0), dir);  //remap to right-most side of Koch curve
  st -= dir * max(0., d) * 2.; // Code for a reflection about a line
    
    //col += smoothstep(.01, .0, abs(d));  / used to visualize the reflection lines
   dir = vec2( sin((2./3.)*PI), cos((2./3.)*PI) );
  // n = N((2./3.)*PI);
    float scale = 1.;  // keeps track of how mnay times we compress the uvs
    st.x += 0.5; // adjustment to reorient Koch curve
    
        // Remap uv so that one line segment [-.5,.5]
        st *= 3.;
        scale *= 3.;
        // put (0,0) in middle of line segment
        st.x -= 1.5; 

        // Fold x coordinates in half by taking absolute value 
        st.x = abs(st.x);

        // Substract 0.5 on either side to increase the length of line to 3 units
        st.x -= .5;
      // st = fold(st, (2./3.)*PI);
     st -= dir * min(0., dot(st, dir)) * 2.;
    /* Add line segment by drawing the difference of the position of a 
    pixel and a position on the line segment.  Lying on x-axis.  */
    
    //float d = length(st - vec2(clamp(st.x, -1., 1.), 0));
    
    // Use smoothstep to cut out actual line
    // Divide by 9 to compensate for 
    // col += smoothstep(2./u_resolution.y, .0, d/scale); // draws Koch curvle
    // col *= col1;  // add color to Koch curve
    
   // col += texture2D(tex0, uv*2.).rgb;
   return st;
   
}


// float kochSnowflake( vec2 st, float N) {
//     #ifdef CENTER_2D
//     st -= CENTER_2D;
//     #else
//     st -= vec2(0.5);
//     #endif
//     st *=2.;
//     st = opRepeat(kaleidoscope(st), N);
//     return st.x/N;
//     //return length(st - vec2(clamp(st.x, -1., 1.), 0))/N;    
// }
      
void main(void) {
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec4 color = vec4(vec3(0.0), 1.0);
    
  
    //float sdf = koch_snowflake(st, 5);
    vec2 uv = kaleidoscope(st);
    float sdf = flowerSDF(uv + 0.5, 8);
    sdf += flowerSDF(uv, 6);
    //float sdf = kaleidoscope(uv.x);
    color.rgb = fill(sdf, 0.1)*vec3(1.);
    
    gl_FragColor = color;
}