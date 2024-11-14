
#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;
uniform sampler2D tex0;

#define S smoothstep
#define SIZE 4.
#define BRUSH_SIZE 1.
#define SPEED 2  // smaller number goes faster

void main()
{

    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    vec4 old = texture2D(iChannel1, uv)*.95;  // old trails
    vec4 new = texture2D(iChannel0, uv);  // new trails
    
    gl_FragColor = max(old, new);
    //fragColor = mix(old, new, 0.02);  // to leave trail mostly render old 
}