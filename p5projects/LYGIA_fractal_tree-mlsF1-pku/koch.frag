// https://github.com/pedrotrschneider/shader-fractals/blob/main/2D/SierpinskiTriangle.glsl

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform float u_time;

#define PLATFORM_WEBGL

#include "lygia/color/palette/spectral.glsl"
#include "lygia/draw/fill.glsl"
#include "lygia/sdf/lineSDF.glsl"
#include "lygia/sdf/rectSDF.glsl"
#include "lygia/math/const.glsl"
#include "lygia/math/rotate2d.glsl"
#include "lygia/space/scale.glsl"

//#include "lygia/space/mirrorTile.glsl"
#include "lygia/math/mirror.glsl"

// Returns a normalized directoin based on an angle
vec2 polarToCartesian (float angle) {
  return vec2 (sin (angle), cos (angle));
}

vec2 ref (vec2 uv, vec2 p, float angle) {
  vec2 dir = polarToCartesian (angle); // Direction of the reflection line
  return uv - dir * min (dot (uv - p, dir), 0.0) * 2.0; // Returns the reflected uv coordinate
}

// Returns the signed distance of a point p to a equilateral triangle centered on the screen
float sigendDistTriangle (vec2 p) {
  const float sqrt3 = sqrt (3.0);
  p.x = abs (p.x) - 1.0;
  p.y = p.y + 1.0 / sqrt3;
  if (p.x + sqrt3 * p.y > 0.0) {
    p = vec2 (p.x - sqrt3 * p.y, -sqrt3 * p.x - p.y) / 2.0;
  }
  p.x -= clamp (p.x, -2.0, 0.0);
  return -length (p) * sign (p.y);
}



// // Adapted from https://www.youtube.com/watch?v=__dSLc7-Cpo
// vec2 kaleidescope( vec2 st ) {
//     st = st * 2.0 - 1.0;
//     st = abs(st); 
//     st.y += -0.288;
//     vec2 n = vec2(-0.866, 0.5); // 150
//     float d = dot(st- 0.5, n);
//     st -= n * max(0.0, d) * 2.0;
//     st.y -= -0.433; 
//     n = vec2(-0.5, 0.866); // 120
//     d = dot(st, n);
//     st -= n * min(0.0, d) * 2.0;
//     st.y -= 0.288; 
//     return st;
// }

// Folds the 2d space to generate the fractal and returns the distance to it
float sierpinskiTriangle ( vec2 st, int recursionCount) {
  st = st * 2.0 - 1.0;
  float r3 = sqrt(3.); 
  float scale = 1.0;
  mat2 m = mat2(r3,3,-3,r3)*.5;
  #ifdef PLATFORM_WEBGL
    for (int i = 0; i< 20; i++) {
        if (i >= recursionCount) break;
    #else
    for (int i = 0; i<recursionCount; i++) {
    #endif
    scale *= 2.0;
    st *= 2.0; // Scales down the fractal
    st.y -= 2.0 * r3 / 3.0; // Translates the fractal to the new Y position (sends it to the top)
    st.x = abs (st.x); // Makes a reflection plane on the Y axis
    st = vec2(-r3,3)*.5 - m*vec2(st.y,abs(st.x));
    scale /= r3;
    //st = ref (st, vec2 (1.0, -r3 / 3.0), (11.0 / 6.0) * PI); // Makes a reflection plane on the bototm right vertex of the triangle, with an angle of 330°
    
  }

  float d = sigendDistTriangle (st) / scale; // Calculates de tistance to an equilateral triangle centered on the center of the screen
  st /= scale; // Resets the scale of the uv
  return d; // Returns the distance to the triangle
}
  
void main(void) {
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec4 color = vec4(vec3(0.0), 1.0);
  
    st += vec2 (0.0, 0.15); // Offsets the uvs to center the fractal in the middle of the screen
    
    int recursionCount = 0 + int (mod (u_time, 16.0) * 0.5); // Number of iterations of the fractal (increases with time)

  //float d = sierpinskiTriangle (st, recursionCount); // Distance to the fractal
  float d = rectSDF(st, vec2(0.1, 0.5));
  // Coloring the fractal
  float lineSmoothness = 3.0 / u_resolution.y; // Smoothness of the line (higher number = smoother, lower numbers = sharper)
  float offset = 0.5; // Offset for the blending of the colors in the middle
  // Red channel
  float r = smoothstep (lineSmoothness, 0.0, d) * 0.5 * (st.x * 0.5 + 0.5 + offset); // Generates a gradient of red on the positive x axis
  color.r += r;
  color.rgb = fill(d, 0.01)*vec3(1.);
    gl_FragColor = color;
}