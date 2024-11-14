#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;
varying vec2    v_texcoord;

#define PLATFORM_WEBGL
#define RAYMARCH_BACKGROUND ( vec3(0.7, 0.9, 1.0) + ray.y * 0.8 )
#define RAYMARCH_AMBIENT    vec3(0.7, 0.9, 1.0)

#include "lygia/lighting/raymarch.glsl"
#include "lygia/space/ratio.glsl"
#include "lygia/sdf/sphereSDF.glsl"
#include "lygia/sdf/kochSDF.glsl"
#include "lygia/sdf/opUnion.glsl"
#include "lygia/color/space/linear2gamma.glsl"

vec2 N(float angle)
  {
  return vec2( sin(angle), cos(angle) );
}

// // From the Art of Code
// vec2 kochSDF( vec2 uv ) {
//      float angle = (5.0/6.0)*PI;
//     uv = uv * 2.0 - 1.0;
//     uv.x = abs(uv.x); 
//     uv.y += tan(angle)*0.5;
//     vec2 n = vec2(sin(angle), cos(angle));
//     float d = dot(uv- vec2(0.5,0.0), n);
//     uv -= n * max(0.0, d) * 2.0;
//     n = N((2.0/3.0)*PI);
//     float scale = 1.0;
//     uv.x += 0.5; 
//     uv *= 3.0;
//     scale *= 3.0;
//     uv.x -= 1.5; 
//     uv.x = abs(uv.x) - 0.5;;
//     d = dot(uv, n);
//     uv -= n * min(0.0, d) * 2.0;
//     return uv / scale;
// }

vec4 raymarchMap( in vec3 pos ) {
    vec4 res = vec4(1.0);
    float d = mix(kochSDF(pos.xy, 2), sphereSDF(pos), 0.5);
    res = opUnion( res, vec4(0.2, 0.2, 0.8, d));
    return res;
}
  
void main(void) {
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec4 color = vec4(vec3(0.0), 1.0);
  
     st = ratio(st, u_resolution);
  
    //vec2 mo = u_mouse * pixel;
    vec2 mo = u_mouse / u_resolution;
	float time = 32.0 + u_time * 1.5;

    // camera	
    vec3 ro = vec3( 4.5*cos(0.1*time + 7.0*mo.x), 2.2, 4.5*sin(0.1*time + 7.0*mo.x) ) * 5.;

    color.rgb = raymarch(ro, st).rgb;
    
    color = linear2gamma(color);

    gl_FragColor = color;
}