//https://www.youtube.com/watch?v=r1UOB8NVE8I

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform float   u_time;
uniform sampler2D u_texture;

#define PLATFORM_WEBGL

#include "lygia/color/palette/spectral.glsl"
#include "lygia/color/pigments.glsl"
#include "lygia/draw/fill.glsl"
#include "lygia/sdf/lineSDF.glsl"
#include "lygia/math/const.glsl"
#include "lygia/math/smootherstep.glsl"
#include "lygia/math/rotate2d.glsl"
#include "lygia/sdf/juliaSDF.glsl"
#include "lygia/space/scale.glsl"


// Returns a normalized directoin based on an angle
vec2 polarToCartesian (float angle) {
  return vec2 (sin (angle), cos (angle));
}

// Reflects the UV based on a relfection line centered in the point p with a given angle
vec2 ref (vec2 uv, vec2 p, float angle) {
  vec2 dir = polarToCartesian (angle); // Direction of the reflection line
  return uv - dir * min (dot (uv - p, dir), 0.0) * 2.0; // Returns the reflected uv coordinate
}

// Folds the 2d space to generate the fractal and returns the distance to it
float kochCurve ( vec2 uv, int recursionCount) {
  float scale = 1.25; // Scale of the UV
  uv *= scale; // Scales the UV to make the fractal fit on the screen

  // This is here so that the first image is a straight line in the center
  #ifdef PLATFORM_WEBGL
  if (recursionCount >= 0) {
  #endif
    uv.y -= sqrt (3.0) / 6.0; // Translates the Y coordinate up
    uv.x = abs (uv.x); // Makes a reflection line in the Y axis
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
    uv = ref (uv, vec2 (0, 0), (2.0 / 3.0) * PI); // Creates an angled reflection line to form the triangle
  }

  uv.x = abs (uv.x); // Creates a reflection line in the Y axis
  float d = length (uv - vec2 (min (uv.x, 1.0), 0.0)) / scale; // Calculates distance to the fractal
  uv /= scale; // Resets the scaling in the uv
  return d; // Returns the distance
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y; // Centers the UV coordinates on the center of the canvas
  vec4 color = vec4(vec3(0.), 1.0); // Color to be drawn on screen

   //twist
  vec2 st = vec2(atan(uv.x, uv.y), length(uv));
  uv = vec2(st.x/(PI) +   u_time*0.2 +st.y*3., st.y* 2.);
  // flower
  // uv = vec2(st.x/(2.*PI) + 0.5 , st.y);
  float x = uv.x * 5.;
  float m = min(fract(x), fract(1.-x)) ;
  float c = smootherstep(0., 0.1, m*0.8 +0.2 - uv.y);
  color.rgb = (1. - c)*CADMIUM_ORANGE + c*ULTRAMARINE_BLUE;
  gl_FragColor = color;
}