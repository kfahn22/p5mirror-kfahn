#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_blob0;
uniform vec2 u_blob1;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 blob0_uv = u_blob0.xy /  u_resolution.xy;
  vec2 blob1_uv = u_blob1.xy /  u_resolution.xy;
  
  float r = 0.1;
  float sum = 0.0;
  vec2 diff0 = uv.xy - blob0_uv.xy;
  float d0 = length(diff0);
  sum += 1.0 * r / d0;

  vec2 diff1 = uv.xy - blob1_uv.xy;
  float d1 = length(diff1);
  sum += 1.0 * r / d1;
  
  vec3 color = vec3(sum);
  gl_FragColor = vec4(color, 1.0);
}


