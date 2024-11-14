#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform sampler2D u_texture;
uniform vec2    u_mouse;
uniform float   u_time;
varying vec2    v_texcoord;

#include "lygia/math/const.glsl"
#include "lygia/math/smootherstep.glsl"
#include "lygia/space/scale.glsl"
#include "lygia/sdf/starSDF.glsl"
#include "lygia/sdf/superShapeSDF.glsl"

#define S smoothstep
#define PURPLE vec3(175, 77, 152) / 255.
#define PINK vec3(229,169,169) / 255.

 // Create a normal line that rotates around origin
vec2 N(float angle)
  {
  return vec2( sin(angle), cos(angle) );
}

// From the Art of Code
vec2 kochSDF( vec2 uv ) {
    uv = uv * 2.0 - 1.0;
    uv.x = abs(uv.x); 
    uv.y += tan((5.0/6.0)*PI)*0.5;
    vec2 n = N((5.0/6.0)*PI);
    float d = dot(uv- vec2(0.5,0.0), n);
    uv -= n * max(0.0, d) * 2.0;
    n = N((2.0/3.0)*PI);
    float scale = 1.0;
    uv.x += 0.5; 
    uv *= 3.0;
    scale *= 3.0;
    uv.x -= 1.5; 
    uv.x = abs(uv.x) - 0.5;;
    d = dot(uv, n);
    uv -= n * min(0.0, d) * 2.0;
    return uv / scale;
}

vec2 koch2SDF( vec2 uv ) {
    uv = uv * 2.0 - 1.0;
    uv.x = abs(uv.x); 
    uv.y += tan((5.0/6.0)*PI)*0.5;
    vec2 n = N((5.0/6.0)*PI);
    float d = dot(uv- vec2(0.5,0.0), n);
    uv -= n * max(0.0, d) * 2.0;
    n = N((2.0/3.0)*PI);
    float scale = 1.0;
    uv.x += 0.5; 
    for (int i = 0; i < 2; i++) {
        uv *= 3.0;
        scale *= 3.0;
        uv.x -= 1.5; 
        uv.x = abs(uv.x) - 0.5;
        d = dot(uv, n);
        uv -= n * min(0.0, d) * 2.0;
     }
     uv /= scale;
     return uv;
}

vec2 koch3SDF( vec2 uv ) {
    uv = uv * 2.0 - 1.0;
    uv.x = abs(uv.x); 
    uv.y += tan((5.0/6.0)*PI)*0.5;
    vec2 n = N((5.0/6.0)*PI);
    float d = dot(uv- vec2(0.5,0.0), n);
    uv -= n * max(0.0, d) * 2.0;
    n = N((2.0/3.0)*PI);
    float scale = 1.0;
    uv.x += 0.5; 
    for (int i = 0; i < 3; i++) {
        uv *= 3.0;
        scale *= 3.0;
        uv.x -= 1.5; 
        uv.x = abs(uv.x) - 0.5;
        d = dot(uv, n);
        uv -= n * min(0.0, d) * 2.0;
     }
     uv /= scale;
     return uv;
}

void main(void) {
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec3 color = vec3(0.0);
    float d1 = superShapeSDF(st, 0.4, 1.0, 1.0, 1.0, 1.0, 1.0, 10.0);
    float c1 = smootherstep(0.01, 0.0, d1);
    color += (1.0-c1)*color + c1*PINK;
    vec2 uv = koch3SDF(st)*7.0;
    float d2 = superShapeSDF(uv, 0.4, 1.0, 1.0, 1.0, 1.0, 1.0, 10.0);
    float c2 = smootherstep(0.01, 0.0, d2);
    color = (1.0-c2)*color + c2*PURPLE;
    
    
    
    //color += (texture2D(u_texture, st*5.0).rgb);
    gl_FragColor = vec4(color, 1.0);
}