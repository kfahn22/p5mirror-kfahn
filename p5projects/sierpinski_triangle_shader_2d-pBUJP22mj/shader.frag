//https://github.com/pedrotrschneider/shader-fractals/blob/main/2D/SierpinskiTriangle.glsl

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
precision mediump int;
#endif

#define PLATFORM_WEBGL

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float u_time;
uniform vec2 iMouse;
uniform float iFrame;

#define PI 3.141592653589793238

// Returns a normalized directoin based on an angle
vec2 polarToCartesian (float angle) {
  return vec2 (sin (angle), cos (angle));
}

// Reflects the UV based on a relfection line centered in the point p with a given angle
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

// Folds the 2d space to generate the fractal and returns the distance to it
float sierpinskiTriangle (inout vec2 uv, int recursionCount) {
  float scale = 0.9; // Scale of the UV
  uv *= scale; // Scales the UV to make the fractal fit on the screen
  #ifdef PLATFORM_WEBGL
    for (int i = 0; i< 20; i++) {
        if (i >= recursionCount) break;
    #else
    for (int i = 0; i< recursionCount); i++) {
    #endif
    // for (int i = 0; i < recursionCount; ++i) {
    scale *= 2.0;
    uv *= 2.0; // Scales down the fractal
    uv.y -= 2.0 * sqrt (3.0) / 3.0; // Translates the fractal to the new Y position (sends it to the top)
    uv.x = abs (uv.x); // Makes a reflection plane on the Y axis
    uv = ref (uv, vec2 (1.0, -sqrt (3.0) / 3.0), (11.0 / 6.0) * PI); // Makes a reflection plane on the bototm right vertex of the triangle, with an angle of 330°
  }

  float d = sigendDistTriangle (uv) / scale; // Calculates de tistance to an equilateral triangle centered on the center of the screen
  uv /= scale; // Resets the scale of the uv
  return d; // Returns the distance to the triangle
}

void main () {
  vec2 uv = 2.0 * (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y; // Normalized pixel coordinates (from 0 to 1)
  vec2 uv2 = uv; // Creates a copy of the uvs for coloring

  vec3 col = vec3 (0.0); // Color to be drawn on the screen

  uv += vec2 (0.0, 0.30); // Offsets the uvs to center the fractal in the middle of the screen

  int recursionCount = 0 + int (mod (u_time, 16.0) * 0.5); // Number of iterations of the fractal (increases with time)

  float d = sierpinskiTriangle (uv, recursionCount); // Distance to the fractal

  // Coloring the fractal
  float lineSmoothness = 3.0 / u_resolution.y; // Smoothness of the line (higher number = smoother, lower numbers = sharper)
  float offset = 0.5; // Offset for the blending of the colors in the middle
  // Red channel
  float r = smoothstep (lineSmoothness, 0.0, d) * 0.5 * (uv2.x * 0.5 + 0.5 + offset); // Generates a gradient of red on the positive x axis
  col.r += r;
  // Blue channel
  float b = smoothstep (lineSmoothness, 0.0, d) * 0.5 * (uv2.y * 0.5 + 0.5 + offset); // Generates a gradient of blue on the positive y axis
  col.b += b;
  // Green channel
  float g = smoothstep (lineSmoothness, 0.0, d) * 0.5 * (-uv2.x * 0.5 + 0.5 + offset); // Generates a gradient of green on the negative x axis
  col.g += g;

  // Drawing the axis
  lineSmoothness = 2.0 / u_resolution.y; // Descreases line smoothness for sharper / thinner lines
  col.rb += smoothstep (lineSmoothness, 0.0, length (uv.y)); // x axis
  col.bg += smoothstep (lineSmoothness, 0.0, length (uv.x)); // y axis

  gl_FragColor = vec4 (col.rgb, 1.0); // Outputs the result color to the screen
}