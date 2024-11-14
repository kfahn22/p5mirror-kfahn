// https://github.com/pedrotrschneider/shader-fractals/blob/main/2D/SierpinskiTriangle.glsl

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform sampler2D u_texture;
uniform float u_time;

#define PLATFORM_WEBGL

#include "lygia/color/palette/spectral.glsl"
#include "lygia/draw/fill.glsl"
#include "lygia/sdf/lineSDF.glsl"
#include "lygia/math/const.glsl"
#include "lygia/space/scale.glsl"


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


// Folds the 2d space to generate the fractal and returns the distance to it
float sierpinskiTriangle ( vec2 uv, vec2 center, int recursionCount) {
  uv -= center;
  float scale = 2.0; // Scale of the UV
  uv *= scale; // Scales the UV to make the fractal fit on the screen
  #ifdef PLATFORM_WEBGL
    for (int i = 0; i< 20; i++) {
        if (i >= recursionCount) break;
    #else
    for (int i = 0; i<recursionCount; i++) {
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
  
void main(void) {
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec4 color = vec4(vec3(0.0), 1.0);
    vec2 uv2 = st; // Creates a copy of the uvs for coloring

    

    st += vec2 (0.0, 0.15); // Offsets the uvs to center the fractal in the middle of the screen

    int recursionCount = 0 + int (mod (u_time, 16.0) * 0.5); // Number of iterations of the fractal (increases with time)

    float d = sierpinskiTriangle (st, vec2(0.5), recursionCount); // Distance to the fractal

    // Coloring the fractal
    float lineSmoothness = 3.0 / u_resolution.y; // Smoothness of the line (higher number = smoother, lower numbers = sharper)
    float offset = 0.5; // Offset for the blending of the colors in the middle
    // Red channel
    float r = smoothstep (lineSmoothness, 0.0, d) * 0.5 * (uv2.x * 0.5 + 0.5 + offset); // Generates a gradient of red on the positive x axis
  color.r += r;
  // Blue channel
    float b = smoothstep (lineSmoothness, 0.0, d) * 0.5 * (uv2.y * 0.5 + 0.5 + offset); // Generates a gradient of blue on the positive y axis
  color.b += b;
  // Green channel
    float g = smoothstep (lineSmoothness, 0.0, d) * 0.5 * (-uv2.x * 0.5 + 0.5 + offset); // Generates a gradient of green on the negative x axis
    color.g += g;

  // Drawing the axis
    lineSmoothness = 2.0 / u_resolution.y; // Descreases line smoothness for sharper / thinner lines
    color.rb += smoothstep (lineSmoothness, 0.0, length (st.y)); // x axis
    color.bg += smoothstep (lineSmoothness, 0.0, length (st.x)); // y axis

    
    
    gl_FragColor = color;
}