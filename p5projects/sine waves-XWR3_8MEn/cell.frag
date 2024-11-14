//https://www.shadertoy.com/view/WsjcDz

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;
uniform sampler2D u_tex0;
uniform sampler2D u_tex1;

varying vec2 vTexCoord;

#define S smoothstep
#define N 2.;
#define n 2;
#define RED vec3(255, 0, 0) / 255.

float N21( vec2 p) {
    return fract( sin(p.x*100. + p.y*6574.)*5674. );
}

// float f[32] = float[32]( 2.,1000.,3.,4.,5., 6.,7.,8.,9.,11.,12.,150.,99.,
//                      40.,1.,10000.,2.,1100.,12.,100.,1000.,400.,210.,112.,113.,131.,
//                      1300.,110.,1139.,1108.,1313.,1.);

void main()
{
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    //uv *= vec2(4,4);
    uv *= vec2(4,4);

    vec2   cell =     floor(uv),
             xy = 2.* fract(uv) -1.;
    float index = cell.x + 4.* cell.y,
           time = xy.x + iTime,
            pct = sin(3.1415926 * index * time),
              v = xy.y - .5*pct;
   gl_FragColor =vec4( 1. - abs(v));
 
}