// Ported to P5.js from "RayMarching starting point" 
// by Martijn Steinrucken aka The Art of Code/BigWings - 2020
// The MIT License
// YouTube: youtube.com/TheArtOfCodeIsCool

//https://www.alanzucconi.com/2017/07/15/improving-the-rainbow/

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_vol;
uniform float u_bass;
uniform float u_treble;
uniform float u_mid;
uniform vec2 u_blob0;
uniform vec2 u_blob1;

#define GRAY vec3(52) / 255.
#define YELLOW vec3(245, 187, 0) / 255.
#define RASPBERRY vec3(166, 0, 103) / 255.

#define PURPLE vec3(82, 72, 156) / 255.
#define FOAMGREEN vec3(185, 226, 140) / 255.
#define BLACK vec3(12, 23, 19) / 255.
#define LILAC vec3(218, 191, 255) / 255.
#define AQUA vec3(127, 222, 255) / 255.

#define PINK vec3(234, 100, 249) / 255.
#define VIOLET vec3(192, 87, 227) / 255.

#include "lygia/color/pigments.glsl"

#include "lygia/space/brick.glsl"

//#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/sdf/superShapeSDF.glsl"
#include "lygia/sdf/gearSDF.glsl"
#include "lygia/sdf/flowerSDF.glsl"
#include "lygia/sdf/starSDF.glsl"
#include "lygia/sdf/opRepeat.glsl"
#include "lygia/math/smootherstep.glsl"
#include "lygia/color/palette/spectral.glsl"
#include "lygia/color/palette/heatmap.glsl"
//#include "lygia/color/palette/water.glsl"
#include "lygia/color/palette/hue.glsl"
#include "lygia/math/rotate2d.glsl"
#include "lygia/math/parabola.glsl"
#include "lygia/math/map.glsl"

#include "lygia/distort/barrel.glsl"


#include "lygia/color/palette/water.glsl"

//#include "lygia/color/blend.glsl"

//#include "lygia/math/const.glsl"
//#include "lygia/math/rotate2d.glsl"
//#include "lygia/space/ratio.glsl"
#include "lygia/space/hexTile.glsl"
#include "lygia/math/bump.glsl"


// Spektre
vec3 spectral_spektre (float l)
{
    l = map(l, 0.0, 1.0, 400., 700.);
    float r=0.0,g=0.0,b=0.0;
            if ((l>=400.0)&&(l<410.0)) { float t=(l-400.0)/(410.0-400.0); r=    +(0.33*t)-(0.20*t*t); }
    else if ((l>=410.0)&&(l<475.0)) { float t=(l-410.0)/(475.0-410.0); r=0.14         -(0.13*t*t); }
    else if ((l>=545.0)&&(l<595.0)) { float t=(l-545.0)/(595.0-545.0); r=    +(1.98*t)-(     t*t); }
    else if ((l>=595.0)&&(l<650.0)) { float t=(l-595.0)/(650.0-595.0); r=0.98+(0.06*t)-(0.40*t*t); }
    else if ((l>=650.0)&&(l<700.0)) { float t=(l-650.0)/(700.0-650.0); r=0.65-(0.84*t)+(0.20*t*t); }
            if ((l>=415.0)&&(l<475.0)) { float t=(l-415.0)/(475.0-415.0); g=             +(0.80*t*t); }
    else if ((l>=475.0)&&(l<590.0)) { float t=(l-475.0)/(590.0-475.0); g=0.8 +(0.76*t)-(0.80*t*t); }
    else if ((l>=585.0)&&(l<639.0)) { float t=(l-585.0)/(639.0-585.0); g=0.82-(0.80*t)           ; }
            if ((l>=400.0)&&(l<475.0)) { float t=(l-400.0)/(475.0-400.0); b=    +(2.20*t)-(1.50*t*t); }
    else if ((l>=475.0)&&(l<560.0)) { float t=(l-475.0)/(560.0-475.0); b=0.7 -(     t)+(0.30*t*t); }

    return vec3(r,g,b);
}

// Dan Bruton
// https://www.alanzucconi.com/2017/07/15/improving-the-rainbow/
vec3 spectral_bruton (float w)
{
    vec3 c;

    if (w >= 380. && w < 440.)
        c = vec3
        (
            -(w - 440.) / (440. - 380.),
            0.0,
            1.0
        );
    else if (w >= 440. && w < 490.)
        c = vec3
        (
            0.0,
            (w - 440.) / (490. - 440.),
            1.0
        );
    else if (w >= 490. && w < 510.)
        c = vec3
        (    0.0,
            1.0,
            -(w - 510.) / (510. - 490.)
        );
    else if (w >= 510. && w < 580.)
        c = vec3
        (
            (w - 510.) / (580. - 510.),
            1.0,
            0.0
        );
    else if (w >= 580. && w < 645.)
        c = vec3
        (
            1.0,
            -(w - 645.) / (645. - 580.),
            0.0
        );
    else if (w >= 645. && w <= 780.)
        c = vec3
        (    1.0,
            0.0,
            0.0
        );
    else
        c = vec3
        (    0.0,
            0.0,
            0.0
        );

    return saturate(c);
}

vec3 purple (float x) {
    return bump(vec3(   4. * (x - 0.4),    // Red
                        4. * (x - 0.7),     // Green
                        4. * (x - 0.4)     // Blue
                    ) );
}

vec3 spectral_soft2(float x) {
    float delta = 0.15;
    vec3 color = vec3(127, 222, 255) / 255.;
    float freq = x * PI;
    color.r = sin(freq - delta) + 0.4;
    color.g = sin(freq);
    color.b = sin(freq + delta) + 0.4;
    return pow(color, vec3(4.0));
}

vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}  

void main()
{
	vec2 uv = (gl_FragCoord.xy-0.5*u_resolution.xy)/u_resolution.y;
    vec2 blob0_uv = u_blob0.xy /  u_resolution.xy;
    vec2 blob1_uv = u_blob1.xy /  u_resolution.xy;
	vec2 pixel = 1.0/u_resolution;
    float t = u_time*0.1;
    uv *= rotate2d(t);  // add rotation
	vec2 mo = u_mouse.xy/u_resolution.xy;
    vec4 color = vec4(vec3(0.0), 1.0);
	
  
    float r = 0.1;
    float sum = 0.0;
    vec2 diff0 = uv.xy - blob0_uv.xy;
    vec2 diff1 = uv.xy - blob1_uv.xy;
    float d0 = length(diff0);
    // vec2 br1 = brick(uv,5.);
    // vec2 br2 = brick(uv,3.);
    // vec4 hc1 = hexTile(uv*5.0);
    // vec4 hc2 = hexTile(uv*5.0);
    vec4 hc1 = hexTile(diff0*5.0);
    vec4 hc2 = hexTile(diff1*5.0);
     
    float c;
    for (int y = -1; y < 1; y++){ 
        for (int x = -1; x < 1; x++){ 
        vec2 offs = vec2(x,y);
        float d1 = flowerSDF(hc1.xy- offs- vec2(u_mid, u_mid), 8);
        float d2 = flowerSDF(hc2.xy- offs, 6);
      
        
          
        // float d1 = gearSDF(hc1.xy- offs, u_mid, 8);
        // float d2 = gearSDF(hc2.xy- offs, u_mid*0.75, 6);
       // float d1 = superShapeSDF(hc1.xy - offs, u_bass, 1.0, 1.0, 1.0, 1.0, 1.0, 7.);
        //float d2 = superShapeSDF(hc2.xy - offs, u_bass, 1.0, 1.0, 1.0, 1.0, 1.0, 8.);
        //float d3 = superShapeSDF(hc2.xy - offs, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, u_vol);
         float d = mix(d1, d2, u_treble);
         c = smootherstep( .05, 0.01, d*sin(hc1.x*hc1.x+u_time));
    }
    }

    
    //vec3 sp = heatmap(uv.y);
    //vec3 sp = spectral(uv.x*uv.y);
    // vec3 sp = spectral_gems(length(uv)*u_treble);
    
    
   // vec3 cg = colorGradient(uv*u_treble, PURPLE, LILAC, u_mid );
  
    
    //color.rgb = spectral_zucconi6(length(uv.xy)*u_treble);
   // vec3 sp =  spectral_soft2(0.55 - length(uv.xy)*u_treble);
  vec3 sp = spectral_spektre(length(uv.xy)*u_bass);
   //vec3 bu = spectral_bruton(length(u_bass));
  
   //vec3 sp =  purple(length(uv.xy)*u_treble);
    // color.rgb = mix(cg, FOAMGREEN, c);
  
    //vec4 white = vec4(vec3(1.0), 0.1);
    
    color.rgb = mix(sp, vec3(0), c);
    //color = mix(color, white, c);
  
    
    // vec3 sp = spectral(length(uv)*u_treble);
    //color.rgb = mix(sp, YELLOW, c);
 
    gl_FragColor = color;
}