#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform vec2    u_mouse;
uniform float   u_time;
varying vec2    v_texcoord;

#define AA_EDGE 0.004

#include "lygia/draw/circle.glsl"

// Spherical function from Daniel Shiffman
// I modified the function to change theta bsed on code from https://www.shadertoy.com/view/4llGWM
vec3 cart2polar( vec3 pos) 
{
   float r = length(pos);
   //float theta = atan( length(pos.xy), pos.z );
   float theta = pos.z/r;
   float phi = atan(pos.y, pos.x);
   vec3 w = vec3(r, theta, phi);
   return w;
}

// float superFormula(in float theta, in float a, in float b, in float n1, in float n2, in float n3, in float m) {
//     float t1 = abs((1.0/1.0) * cos(m * theta / 4.0));
//     t1 = pow(t1, n2);

//     float t2 = abs((1.0/1.0) * sin(m * theta / 4.0));
//     t2 = pow(t2, n3);

//     float t3 = t1 + t2;
//     float r = pow(t3, -1.0 / n1);
//     return r;
// }

float superFormula(in float theta, in float n1, in float n2, in float n3, in float m) {
    float t1 = abs( cos(m * theta / 4.0));
    t1 = pow(t1, n2);

    float t2 = abs( sin(m * theta / 4.0));
    t2 = pow(t2, n3);

    float t3 = t1 + t2;
    float r = pow(t3, -1.0 / n1);
    return r;
}


void main(void) {
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec3 color = vec3(1.0);

    color -= vec3(circle(st, 0.5));
    
    gl_FragColor = vec4(color, 1.0);
}