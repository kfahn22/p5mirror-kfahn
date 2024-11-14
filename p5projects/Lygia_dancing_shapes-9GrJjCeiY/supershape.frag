#ifdef GL_ES
precision mediump float;
#endif

// SPACE
#include "lygia/space/ratio.glsl"
#include "lygia/sdf.glsl"
#include "lygia/generative/curl.glsl"

// #define RAYMARCH_SAMPLES 100
// #define RAYMARCH_MULTISAMPLE 4

#define RAYMARCH_BACKGROUND ( vec3(0.7, 0.9, 1.0) + ray.y * 0.8 )
#define RAYMARCH_AMBIENT    vec3(0.7, 0.9, 1.0)

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;
varying vec2 vTexCoord;
//uniform sampler2D u_texture;
uniform float u_bass;
uniform float u_tremble;
uniform float u_mid;
uniform float u_vol;

#define S smoothstep
#define T iTime
#define NUM_LAYERS 4.

#define EGGPLANT vec3(87, 31,78) / 255.
#define BLUE vec3(0, 0,255) / 255.

#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/sdf/superShapeSDF.glsl"
#include "lygia/math/smootherstep.glsl"
#include "lygia/math/rotate2d.glsl"
#include "lygia/math/const.glsl"
#include "lygia/space/brick.glsl"
#include "lygia/generative/gnoise.glsl"


// Function to remap uv space from the Art of Code 
// bottom, left, top, right
vec2 Remap( vec2 uv, float b, float l, float t, float r) {
  return vec2( (uv.x-l) / (r-l) , (uv.y - b) / (t - b));
}

vec3 drawShape( vec2 uv, float n, float r ) {
   
  vec3 col = vec3(0.0);
  vec3 col1 = vec3(u_bass, 100, 100) / 255.;// EGGPLANT;
  //float gn = gnoise(uv);
 
  if ( uv.x > 0. && uv.x < 1. && uv.y > 0. && uv.y < 1.) {
           vec2 rm = uv*vec2(n, n);
           vec2 gv = fract( rm );// -0.5;
           gv = gv * rotate2d(PI/u_vol);// * 0.5 + 0.5;
           float s = superShapeSDF( gv - vec2(0.0, 0.0), r, 1.0, 1.0, 1.0, u_vol, u_vol, u_vol);
          col =  mix( col, col1, s );
          //col =  mix( col, col1, smootherstep( .1, .05, s ) );
  }
  return col;
}

 
void main()
{
    vec2 uv = gl_FragCoord.xy/u_resolution.y;
  // vec2 gv = brick(uv, 2.0);
    float t = iTime*.02;
	vec2 m = iMouse.xy/u_resolution.xy;
    vec3 col = vec3(0, 0, 0) / 255.;
    
  float s = superShapeSDF( uv - vec2(0.0, 0.0), 0.5, 1.0, 1.0, 1.0, u_vol, u_vol, u_vol);
    float c = smootherstep(0.1, 0.0, s);
    //col += drawShape(uv, 8.0, 0.5);
    col = linear2gamma(col);
  
    gl_FragColor = vec4(col,1.0);
}