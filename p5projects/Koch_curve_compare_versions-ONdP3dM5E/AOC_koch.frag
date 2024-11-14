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


float koch ( vec2 uv, vec2 adj) {
     // Code for the Koch curve
    // We use a reflection to add two more Koch curves reflected across a line of angle 5./6.*PI
    uv.x = abs(uv.x);
    uv.y += tan(5./6.*PI)*0.5; //adjustment to reorient Koch snowflake back in center
    vec2 n = rotate(5./6.*PI); //orientation of line 
    // adjustment to move reflection line to end of Koch curve
   
    uv -= Reflect(uv, adj, n);

    n = rotate(2./3. * PI); // angle to give "hat"
    // we add a scaling factor so line does not change as uvs are divided
    float scale = 1.0;
    uv.x += 0.5;
    // Change the number of iterations for Koch curve here!
    for (int i = 0; i < 10; i++ ) {
    uv *= 3.0; // we multiply by 3. to divide the uvs
    scale *=3.0;
    uv.x  -= 1.5; // adjustment to translate uvs back to origin
     
    uv.x = abs(uv.x);  // reflect uvs across line (uvs go from 1.0 - 0.0 - 1.0)
    uv.x -= 0.5;  // adjust length of line so that it is 3 units long
     
    // mirror uvs around line 
    uv -= n*min(0.0, dot(uv - vec2(0.0, 0.0), n))*2.; 
      
    }
   return uv.y;
}

float kochSDF( vec2 st, vec2 center, int N) {
    st -= center;
    st *= 3.0;

    // We use a reflection to add two more Koch curves reflected across a line of angle 5./6.*PI
    st.x = abs(st.x);
    st.y +=  tan(5./6.*PI)*0.5; //adjustment to reorient Koch snowflake back in center
    vec2 n = rotate(5./6.*PI); //orientation of line 
    // adjustment to move reflection line to end of Koch curve
    vec2 adj = vec2(0.5, 0.0); 
    st -= Reflect(st, adj, n);

    n = rotate(2./3. * PI); // angle to give "hat"
    // we add a scaling factor so line does not change as uvs are divided
    float scale = 1.0;
    st.x += 0.5;
    #ifdef PLATFORM_WEBGL
    for (int i = 0; i< 10; i++) {
        if (i >= N) break;
    #else
    for (int i = 0; i< N; i++) {
    #endif
    st *= 3.0; // we multiply by 3. to divide the uvs
    scale *=3.0;
    st.x  -= 1.5; // adjustment to translate uvs back to origin
     
    st.x = abs(st.x);  // reflect uvs across line (uvs go from 1.0 - 0.0 - 1.0)
    st.x -= 0.5;  // adjust length of line so that it is 3 units long
     
    // mirror uvs around line 
    st -= n*min(0.0, dot(st - vec2(0.0), n))*2.; // uv.x*n.x + uv.y*n.y
    }
   //return circleSDF(st) - 0.3;
  return st.y;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  
  vec4 color = vec4(vec3(0.), 1.0); 
  
  float d = kochSDF(st, vec2(0.5), 3);
  
  //float d = koch(st, vec2(0.5));
  
  color.rgb = fill(d, 0.01)*vec3(1.);
  gl_FragColor = color;
}