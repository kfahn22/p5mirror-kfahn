/**
 * @file SierpinskiTriangle.glsl
 *
 * @brief This shader targets to achieve a mathematical render of Sierpinski's Triangle, a well known fractal
 * defined by a rule of geometrical substitution discovered by Waclaw Sierpinski.
 *
 * @author Pedro Schneider <pedrotrschneider@gmail.com>
 *
 * @date 06/2020
 *
 * Direct link to ShaderToy: <not available yet>
*/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform float u_time;


#define PLATFORM_WEBGL

#include "lygia/math/const.glsl"
#include "lygia/sdf/triSDF.glsl"
#include "lygia/draw/fill.glsl"

// Returns a normalized direction based on an angle
vec2 polarToCartesian (float angle) {
  return vec2 (sin (angle), cos (angle));
}

// Reflects the UV based on a relfection line centered in the point p with a given angle
vec2 ref (vec2 uv, vec2 p, float angle) {
  vec2 dir = polarToCartesian (angle); // Direction of the reflection line
  return uv - dir * min (dot (uv - p, dir), 0.0) * 2.0; // Returns the reflected uv coordinate
}

// Returns the signed distance of a point p to a equilateral triangle centered on the screen
float signedDistTriangle (vec2 p) {
  float r3 = sqrt (3.0);
  p.x = abs (p.x) - 1.0;
  p.y = p.y + 1.0 / r3;
  if (p.x + r3 * p.y > 0.0) {
    p = vec2 (p.x - r3 * p.y, -r3 * p.x - p.y) / 2.0;
  }
  p.x -= clamp (p.x, -2.0, 0.0);
  return -length (p) * sign (p.y);
}

// Folds the 2d space to generate the fractal and returns the distance to it
float sierpinskiTriangle ( vec2 st, vec2 center, int recursionCount) {
  st -= center;
  float scale = 2.0; // Scale of the UV
  st *= scale; // Scales the UV to make the fractal fit on the screen
  float r3 = sqrt(3.);
  #ifdef PLATFORM_WEBGL
  for (int i = 0; i< 10; i++) {
      if (i >= recursionCount) break;
  #else
      for (int i = 0; i< recursionCount; i++) {
  #endif
          scale *= 2.0;
          st *= 2.0; // Scales down the fractal
          st.y -= 2.0 * r3 / 3.0; // Translates the fractal to the new Y position (sends it to the top)
          st.x = abs (st.x); // Makes a reflection plane on the Y axis
          st = ref (st, vec2 (1.0, -r3 / 3.0), (11.0 / 6.0) * PI); // Makes a reflection plane on the bototm right vertex of the triangle, with an angle of 330°
}

  //float d = signedDistTriangle (st) / scale; 
  float d = (triSDF(st+center) - 2.66) ;
  st /= scale; // Resets the scale of the uv
  return d; // Returns the distance to the triangle
}

void main () {
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 uv2 = st; 
    st += vec2(0.0, .15);
  

  float d = sierpinskiTriangle (st,  vec2(0.5), 2);

  color.rgb = fill(d, 0.01)*vec3(1.);
  gl_FragColor = color;
}