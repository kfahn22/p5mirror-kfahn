/// Copyright Patricio Gonzalez Vivo, 2022 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision mediump float;
#endif

// uniform sampler2D   u_buffer0;
// uniform sampler2D   u_buffer1;
uniform sampler2D   u_doubleBuffer0;
// uniform sampler2D   u_doubleBuffer1;
// uniform sampler2D   u_doubleBuffer2; // 2x2

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;
uniform int         u_frame;

uniform vec2        v_texcoord;

#include "lygia/generative/random.glsl"
#include "lygia/sdf/circleSDF.glsl"
#include "lygia/draw/fill.glsl"
#include "lygia/simulate/grayscott.glsl"

// #define FLUIDSOLVER_VELOCITY_DECAY 5e-6
// #define FLUIDSOLVER_VORTICITY 0.01
// #define FLUIDSOLVER_VISCOSITY 0.5
// #define FLUIDSOLVER_DX 0.5
// #define FLUIDSOLVER_DT 0.15
// #include "lygia/simulate/fluidSolver.glsl"

void main(void) {
//     vec4 color = vec4(vec3(0.0),1.0);
//     vec2 pixel = 1.0/u_resolution.xy;
//     vec2 fragCoord = gl_FragCoord.xy;
//     vec2 st = fragCoord * pixel;
//     vec2 uv = v_texcoord;
//     vec2 mouse = u_mouse * pixel;
//     vec2 mouse_prev = texture2D(u_doubleBuffer2, pixel * vec2(0.5)).xy;
//     vec2 mouse_delta = mouse - mouse_prev;
//     float mouse_delta_length = length(mouse_delta);
//     float mouse_area = length(st - mouse);

//     // Calc external force from mouse input
//     vec2 extForce = vec2(0.);
//     if (mouse_delta_length > 0.01) {
//         vec2 dragDir = clamp(mouse_delta * 6.0, -1., 1.) * 100.0;
//         extForce += step(mouse_area, .05) * dragDir;// * (.5 - st);
//     }

// #if defined(DOUBLE_BUFFER_0)
//     color = fluidSolver(u_doubleBuffer0, st, pixel, extForce);

// #elif defined(DOUBLE_BUFFER_1)
//     vec2 vel = texture2D(u_doubleBuffer0, st).xy;
//     color = texture2D(u_doubleBuffer1, st - vel * pixel);
    
//     if (mouse_delta_length > 0.005) {
//         float hue = fract( (atan(vel.y, vel.x) / TAU + 0.5) + u_time * 0.1 );
//         vec4 rgb = vec4( hsv2rgb(vec3(hue, 1., 1.)), 1.);
//         color += 0.001/pow(mouse_area, 1.5) * rgb;
//     }
    
//     color = saturate(color) * 0.995;

// #elif defined(DOUBLE_BUFFER_2)
//     color.rg = mouse;

// #else 
//     color = texture2D(u_doubleBuffer1, st);
//     color.a = 1.0;
    
// #endif
     vec3 color = vec3(0.0);
    vec2 pixel = 1. / u_resolution;
    vec2 mouse = u_mouse * pixel;
    vec2 st = gl_FragCoord.xy * pixel;

#ifdef DOUBLE_BUFFER_0
    float src = fill( circleSDF(st - mouse + 0.5), 0.05 ) * random(st);
    color = grayscott(u_doubleBuffer0, st, pixel, src);

#else
    color = texture2D(u_doubleBuffer0, st).rgb;
    
#endif

    gl_FragColor = vec4(color, 1.0);
    //gl_FragColor = color;
}