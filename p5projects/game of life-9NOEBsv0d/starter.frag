// Ported to P5.js from "Game of Life" Tutorial
// by Martijn Steinrucken aka The Art of Code/BigWings 
// YouTube: youtube.com/TheArtOfCodeIsCool

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

void main( )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;

    
    vec3 col = texture(iChannel1,uv/SIZE).rgb; // multiply by .5 only display half of texture

    // uvs go from 0,1
    // multiply by 10 gvs will go from 0,10 (create 10*10 boxes)
    // take fractional component gv will go from 0,1
    // subtract .5 gvs go from -.5 to .5
    vec2 gv = fract(gl_fragCoord.xy/SIZE)- .5;
    float d = length(gv);
    col *= smoothstep(.1, .0, d-0.4);
    //col.rg = gv; // uncomment to help visualize what gvs are doing
    // Output to screen
    gl_FragColor = vec4(col,1.0);
}