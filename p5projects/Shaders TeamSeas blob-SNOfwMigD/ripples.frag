#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_blob0;
uniform vec2 u_blob1;

#define PURPLE vec3(146, 83, 161);
#define S smoothstep


void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 blob0_uv = u_blob0.xy /  u_resolution.xy;
  vec2 blob1_uv = u_blob1.xy /  u_resolution.xy;
  
  vec3 col = vec3(0.);
  
  float r = 0.04;
  float sum0 = 0.0;
  vec2 diff0 = uv.xy - blob0_uv.xy;
  float d0 = length(diff0);
  sum0 +=  1.0*r/d0;
  vec3 col0 = vec3(0.1, sum0, 0.6);
  col += col0;

  float sum1 = 0.0;
  float r1 = 0.04;
  vec2 diff1 = uv.xy - blob1_uv.xy;
  float d1 = length(diff1);
  sum1 += 1.0 * r1 / d1;
  vec3 col1 = vec3(0.1, 0.6, sum1);
  col = mix(col0, col1, 0.5);
  
  gl_FragColor = vec4(col, 1.0);
}

// float sum = 0.5 + 0.5 * (
// 		cos(length(p1d) / 30.0) +
// 		cos(length(p2d) / 20.0) +
// 		sin(length(p3d) / 25.0) * sin(p3d.x / 20.0) * sin(p3d.y / 15.0));
