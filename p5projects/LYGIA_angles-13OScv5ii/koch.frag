/**
 * @file KochCurve.glsl
 *
 * @brief This shader targets to achieve a mathematical render of Koch's Curve, a fractal defined by a rule of
 * geometrical substitution, wich results in a snow-flake-shaped fractal. It is also known as Koch's Snow
 * Flake.
 *
 * @author Pedro Schneider <pedrotrschneider@gmail.com>
 *
 * @date 06/2020
 *
 * Direct link to ShaderToy: <not available yet>
*/

//https://github.com/pedrotrschneider/shader-fractals/blob/main/2D/KochCurve.glsl

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform float   u_time;
uniform sampler2D u_texture;

#define PLATFORM_WEBGL

#include "lygia/color/palette/spectral.glsl"
#include "lygia/draw/fill.glsl"
#include "lygia/sdf/lineSDF.glsl"
#include "lygia/math/const.glsl"
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
  vec4 color = vec4( vec3(0.), 1.0); // Color to be drawn on screen

  // Bending the world
  int recursionCount = -1 + int (mod (u_time, 14.0) * 0.5); // Number of iterations for the fractal
  float d = kochCurve (uv, recursionCount); // Distance from the fractal

  // Drawing the fractal
  float lineSmoothness = 4.0 / u_resolution.y; // Smoothness / thickness of the line (higher number = smoother / thicker, lower numbers = sharper / thinner)
  color.r += smoothstep (lineSmoothness, 0.0, d) * 0.5;

  // Drawing the axis
  lineSmoothness = 1.0 / u_resolution.y; // Descreases line smoothness for sharper / thinner lines
  color.rb += smoothstep (lineSmoothness, 0.0, length (uv.y)); // x axis
  color.bg += smoothstep (lineSmoothness, 0.0, length (uv.x)); // y axis

  gl_FragColor = color;
}