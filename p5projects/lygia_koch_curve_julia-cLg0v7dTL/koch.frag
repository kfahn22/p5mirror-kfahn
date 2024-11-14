// https://editor.p5js.org/kfahn/sketches/ujLsCeNRb

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
#define EGGPLANT vec3(87, 31,78) / 255.

// From Art of Code
float juliaSDF( vec2 uv, float k, vec2 m, vec2 js ) {
    
    float zoom = pow(k, -m.x*k);
  
    vec2 c = uv*zoom;
    //c +=  vec2(0.27334, .00742);
    c += js;
  
    float a = 0.0;
    float b = 0.0;
    vec2 z = vec2(a, b);
    float iter = 0.0;
    const float maxiterations = 100.;
    for (float n = 0.0; n < maxiterations; n++) {
   
     z = vec2 (z.x*z.x - z.y*z.y, 2.*z.x*z.y) + c;
     // if further away from 4 break
     if ( length(z) > 4.0) break;
        iter++;
   }
   float bright = iter/maxiterations;
   float power = 0.75;
   bright = pow(bright, power);
   return bright;
}


 // Create a normal line that rotates around origin
vec2 N(float angle)
  {
  return vec2( sin(angle), cos(angle) );
}

// From the Art of Code
vec2 kochSDF( vec2 uv) {
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
   // d = juliaSDF( uv, 10.0, mouse, vec2(0.27334, .00742));
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
     //uv /= scale;
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
     //uv /= scale;
     return uv;
}

// Julia Set Values
// vec2(0.27334, .00742)
// vec2(0.285, 0.01)
// vec2(-0.835, -0.2321)

void main(void) {
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec3 color = vec3(0.0);
    vec2 mo = u_mouse.xy/u_resolution.xy;

    st = koch3SDF(st);
    float d = juliaSDF( st, 10.0, mo, vec2(-0.835, -0.2321));
  
    color = vec3(0.5-cos(d * 20.0)/2.0,0.5-cos(d * 30.0)/2.0,0.5-cos(d * 40.0)/2.0);
    gl_FragColor = vec4(color, 1.0);
}