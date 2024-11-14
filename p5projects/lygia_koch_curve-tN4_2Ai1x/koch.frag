#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform sampler2D u_texture;
uniform vec2    u_mouse;
uniform float   u_time;
varying vec2    v_texcoord;

#include "lygia/math/const.glsl"
//#include "lygia/sdf/opRepeat.glsl"

 // Create a normal line that rotates around origin
vec2 N(float angle)
  {
  return vec2( sin(angle), cos(angle) );
}

// From the Art of Code
vec2 koch( vec2 uv) {
    uv = uv * 2.0 - 1.0;
    uv.x = abs(uv.x);  // Reflect around y axis to consider only half of the line
    uv.y += tan((5.0/6.0)*PI)*0.5;
    vec2 n = N((5.0/6.0)*PI);
    float d = dot(uv- vec2(0.5,0.0), n);  //remap to right-most side of Koch curve
    uv -= n * max(0.0, d) * 2.0; // Code for a reflection about a line
  
    n = N((2.0/3.0)*PI);
    float scale = 1.0;  // keeps track of how mnay times we compress the uvs
    uv.x += 0.5; // adjustment to reorient Koch curve
    for (int i = 0; i < 1; i++) {
        // Remap uv so that one line segment [-.5,.5]
        // Instead of dividing segment by 3, we multiply the uvs by 3.
        uv *= 3.0;
        scale *= 3.0;
        // put (0,0) in middle of line segment
        uv.x -= 1.5; 

        // Fold x coordinates in half by taking absolute value 
        uv.x = abs(uv.x);

        // Substract 0.5 on either side to increase the length of line to 3 units
        uv.x -= 0.5;
        d = dot(uv, n);
        uv -= n * min(0.0, d) * 2.0;
     }
     uv /= scale;
     return uv;
}

void main(void) {
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec3 color = vec3(0.0);

    st = koch(st);
    color += texture2D(u_texture, st*5.0).rgb;
    
    
    gl_FragColor = vec4(color, 1.0);
}