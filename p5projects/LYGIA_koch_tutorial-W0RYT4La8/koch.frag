

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform float   u_time;
uniform vec2 u_mouse;
uniform sampler2D u_texture;

#define PLATFORM_WEBGL

#include "lygia/color/palette/spectral.glsl"
#include "lygia/color/pigments.glsl"
#include "lygia/draw/fill.glsl"
#include "lygia/sdf.glsl"
#include "lygia/math/const.glsl"
#include "lygia/math/smootherstep.glsl"
#include "lygia/math/rotate2d.glsl"
//#include "lygia/sdf/juliaSDF.glsl"
#include "lygia/space/scale.glsl"
#include "lygia/space/polar2cart.glsl"


// Returns a normalized directoin based on an angle
vec2 polarToCartesian (float angle) {
  return vec2 (sin (angle), cos (angle));
}

// polar.x: angle, polar.y: distance / length(uv)
// vec2 polar2cart(in vec2 polar) {
//     return vec2(cos(polar.x), sin(polar.x)) * polar.y;
// }

// Reflects the UV based on a relfection line centered in the point p with a given angle
vec2 ref (vec2 uv, vec2 p, float angle) {
  vec2 dir = polarToCartesian (angle); // Direction of the reflection line
  //vec2 dir = polar2cart(polar);
  return uv - dir * min (dot (uv - p, dir), 0.0) * 2.0; // Returns the reflected uv coordinate
}

// Folds the 2d space to generate the fractal and returns the distance to it
float kochCurve ( vec2 st, int recursionCount) {
  vec2 uv = st;
  float scale = 1.25; // Scale of the UV
  uv *= scale; // Scales the UV to make the fractal fit on the screen
  float w = 0.5;
  // This is here so that the first image is a straight line in the center
  #ifdef PLATFORM_WEBGL
  if (recursionCount >= 0) {
  #endif
    uv.y -= sqrt (3.0) / 6.0; // Translates the Y coordinate up
    uv.x = abs (uv.x); // Makes a reflection line in the Y axis
   // uv = ref (uv, vec2 (0.5, 0), vec2(10.0 / 6.0 * PI, 1.0)); // Makes a reflection line to form a triangle
     uv = ref (uv, vec2 (0.5, 0), 11.0 / 6.0 * PI); // Makes a reflection line to form a triangle
    uv.x += 0.5; // Translates the X coordinate to the center of the line
  }
   #ifdef PLATFORM_WEBGL
    for (int i = 0; i< 20; i++) {
        if (i >= recursionCount) break;
    #else
    for (int i = 0; i < recursionCount; ++i) {
    #endif
  //for (int i = 0; i < recursionCount; ++i) {
    uv.x -= 0.5; // Translates the X coordinate
    scale *= 3.0; // Increases the scale for each recursion loop
    uv *= 3.0; // Scales down the shape
    uv.x = abs (uv.x); // Creates a reflection line in the Y axis
    uv.x -= 0.5; // Translates the X corrdinate
    //uv = ref (uv, vec2 (0, 0), vec2((2.0 / 3.0) * PI, 1.0)); // uncomment for  polar2cart
     uv = ref (uv, vec2 (0, 0), (2.0 / 3.0) * PI); // Creates an angled reflection line to form the triangle
  }

  uv.x = abs (uv.x); // Creates a reflection line in the Y axis
//float d = length (uv - vec2 (min (uv.x, 1.0), 0.0)) / scale; // Calculates distance to the fractal
     float d = length (uv - vec2 (min (uv.x, 1.0), 0.0)) /scale; // Calculates distance to the fractal
  uv /= scale; // Resets the scaling in the uv
  
  return d; // Returns the distance
}

void main() {
  //vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y; // Centers the UV coordinates on the center of the canvas
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 center = vec2(0.5);
//   uv -= center;
//   float r3 = sqrt(3.);
//   uv *= 3.;
//   vec2 mouse = u_mouse.xy /u_resolution.xy;// [0, 1]
//   float ang = mouse.x*PI;
  
  vec4 color = vec4(vec3(0.), 1.0); // Color to be drawn on screen

//   uv = abs(uv);
//   uv += r3*vec2(-uv.y, uv.x);
//   uv.y -= 1.;
  
//   float w = 0.5;
//   mat2 m = mat2(r3, 3., -3., r3) * 0.5;
//   uv = vec2(-r3, 3.)*0.5 - m * vec2(uv.y, abs(uv.x));
//   w /= r3;
  //uv.x = abs(uv.x);  // reflection around vertical line
 // uv.x -= 1.5; // adjustment to make line 3 units long
  //uv.x -= 1.5;
  //mat2 m = mat2(-3.,r3, -r3, -3.) * 0.5;
  //mat2 m = mat2(ang,  -3., 3., ang) * 0.5;
 ///mat2 m = mat2(r3, 3., -3., r3) * 0.5;
  //vec2 st = vec2(uv.y, abs(uv.x)) * m * 0.5;
  //uv -= st;
  //uv -= uv * m * 0.5;
  //uv -= m * min(vec2(0), st) * 2.0;
  //float d = lineSDF(uv, vec2(-1., 0.0), vec2(0.5, 1.0));
  
   // float d = sign(uv.y)*length(vec2(uv.y, max(0.,abs(uv.x)-r3)));
  
  float sdf = kochSDF(uv, center, 1);
  color.rgb += fill(sdf, 0.03)*vec3(1.0);
  //color.rg += uv;

  
  /*
  float r3 = sqrt(3.);
  
  float angle = mouse.x*PI;
  
  // traces out a circle
  vec2 n = vec2(sin(angle), cos(angle));
  //mat2 m = mat2(cos(angle), sin(angle), -sin(angle), cos(angle));
  mat2 m = mat2(r3, 3., 3., r3) * 0.5;
  float d = dot(uv, n);
  vec2 st = uv * m;
  uv -= n * min(0.0, d) * 2.0;
  float sdf = lineSDF(st, vec2(-1., 0.0), vec2(1., 0.0));
  color.rgb += fill(sdf, 0.05)*vec3(1.);
  color.rg += sin(10.*uv);
  */
  gl_FragColor = color;
}