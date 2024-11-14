#ifdef GL_ES
precision highp float;
#endif

varying vec2 pos;
uniform vec2 u_resolution;
uniform sampler2D currBuff;
uniform sampler2D prevBuff;
uniform float iFrame;
uniform float u_time;

#define PLATFORM_WEBGL

#include "lygia/distort/stretch.glsl"
#include "lygia/distort/pincushion.glsl"
#include "lygia/math/lerp.glsl"

#define PURPLE vec3(112, 50, 126) / 255.
#define GREEN vec3(102, 211, 52) / 255.
#define YELLOW vec3(252, 238, 33) / 255.
#define ORANGE vec3(248, 158, 79) / 255.
#define RASPBERRY vec3(236, 1, 90) / 255.

#define damping 0.999

// vec2 blob(vec2 uv, vec2 blobbie) {
//   vec2 blob0_uv = blobbie.xy /  u_resolution.xy;
//   return uv.xy - blob0_uv.xy;
// }

// float blob(vec2 uv, vec2 blobbie) {
//   float r = 0.1;
//   float sum = 0.0;
//   vec2 blob0_uv = blobbie.xy /  u_resolution.xy;
//   vec2 diff0 = uv.xy - blob0_uv.xy;
//   float d0 = length(diff0);
//   sum += 1.0 * r / d0;
//   return sum;
// }

vec3 marble(vec2 uv, vec3 col1, vec3 col2, vec3 col3, vec3 col4) {
    
    //float t = u_time;
    float t = iFrame*0.01;
    float n = 1.825;
	float freq = cos(u_time*0.01)/n;

  
    for(float i=1.;i<75.;i++)  {
      uv.x += freq/i*cos(i*uv.y+t) + 0.494*i;
      uv.y += freq/i*sin(i*uv.x+t) - 0.458*i;}
    
	float bias2 = abs(sin(uv.y*2.));
    float bias3 = abs(sin(uv.y*3.));
    float bias4 = abs(sin(uv.y*4.));
   
    // yellow and purple
    vec3 m1 = mix(col1*col1, col2*col2, bias2);
    // green and raspberry
    vec3 m2 = mix(col3*col3, col4*col4, bias3);
   
    return mix(m1, m2, bias4);
}

void main()	{
	vec2 uv = (gl_FragCoord.xy - 0.5*u_resolution.xy)/u_resolution.xy;
     
    vec2 pixel = 1./u_resolution.xy;
  
  
  // get state
  vec3 prev = texture2D(prevBuff, pos).rgb;
  
  // get previous neighbour states
  vec3 u = texture2D(currBuff, pos + vec2(0.0, pixel.y)).rgb;
  vec3 d = texture2D(currBuff, pos - vec2(0.0, pixel.y)).rgb;
  vec3 l = texture2D(currBuff, pos + vec2(pixel.x, 0.0)).rgb;
  vec3 r = texture2D(currBuff, pos - vec2(pixel.x, 0.0)).rgb;

  // calculate the next state value
 // vec3 next = ((u + d + l + r)/2.0) - prev;
  vec3 next = (u + d + l + r ) * 0.5 - prev;
  next = next * damping;
  
  
  
  gl_FragColor = vec4(next, 1.0);
  
}

