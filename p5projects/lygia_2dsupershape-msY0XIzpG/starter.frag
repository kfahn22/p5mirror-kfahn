#ifdef GL_ES
precision mediump float;
#endif


// SPACE
#include "lygia/space/ratio.glsl"
#include "lygia/sdf.glsl"

// #define RAYMARCH_SAMPLES 100
// #define RAYMARCH_MULTISAMPLE 4

#define RAYMARCH_BACKGROUND ( vec3(0.7, 0.9, 1.0) + ray.y * 0.8 )
#define RAYMARCH_AMBIENT    vec3(0.7, 0.9, 1.0)

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;


#define S smoothstep
#define T iTime

#define PURPLE vec3(83, 29,109) / 255.
#define RED vec3(191, 18, 97) / 255.
#define ORANGE vec3(251,162, 100) / 255.
#define BLUE vec3(118, 212, 229) / 255.
#define TEAL vec3(11, 106, 136) / 255.

// Coloring
#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/color/exposure.glsl"
#include "lygia/sdf/superShapeSDF.glsl"

mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

void main()
{
    vec2 uv = gl_FragCoord.xy/u_resolution.y;
	vec2 m = iMouse.xy/u_resolution.xy;
    vec3 col = vec3(0);
  
    float d = superShapeSDF(uv, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 5.0);
    float c = S(0.01, 0.0, d);
    col = (1.0-c)*col + c*RED;
  
    col = linear2gamma(col);
  
    //col += exposure(TEAL, 0.1);
    gl_FragColor = vec4(col,1.0);
}