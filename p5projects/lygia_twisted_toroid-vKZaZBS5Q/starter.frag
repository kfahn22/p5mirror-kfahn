// Ported to P5.js from "RayMarching starting point" 
// by Martijn Steinrucken aka The Art of Code/BigWings - 2020
// The MIT License
// YouTube: youtube.com/TheArtOfCodeIsCool
// Port of ShaderToy FX Coding:  Twisted Toroid by the Art of Code

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;
//uniform sampler2D tex0;

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .001
#define S smoothstep

// Define colors here
#define PURPLE vec3(155,72,155) / 255.
#define MINT vec3(169,251,195) / 255.
#define LILAC vec3(181,148,182) / 255.
#define ROSE vec3(238, 148, 128) / 255.
#define LTBLUE vec3(176,198, 206) / 255.
#define BLACK vec3(0,5,0) / 255.

//#include "lygia/lighting/raymarch/normal.glsl"
//#include "lygia/lighting/raymarch/cast.glsl"
#include "lygia/math/rotate2d.glsl"
#include "lygia/sdf/torusSDF.glsl"
#include "lygia/sdf/ellipsoidSDF.glsl"
#include "lygia/sdf/cubeSDF.glsl"


// map
float GetDist(vec3 p) {
    //float d = torusSDF(p, vec2(0.5), 0.2, 0.2);
    float d = ellipsoidSDF(p, vec3(0.3));
    //float d = cubeSDF(p, 0.5);
    return d;
}

float RayMarch(vec3 ro, vec3 rd) {
	float dO=0.;
    
    for(int i=0; i<MAX_STEPS; i++) {
    	vec3 p = ro + rd*dO;
        float dS = GetDist(p);
        if(abs(dS)<SURF_DIST) break;
          dO += dS;
    }
    return dO;
}

vec3 GetNormal(vec3 p) {
	float d = GetDist(p);
    vec2 e = vec2(.001, 0);
    vec3 n = d - vec3(
        GetDist(p-e.xyy),
        GetDist(p-e.yxy),
        GetDist(p-e.yyx));
    
    return normalize(n);
}

vec3 GetRayDir(vec2 uv, vec3 pos, vec3 l, float z) {
    vec3 f = normalize(l-pos),  // forward vector
        r = normalize(cross(vec3(0,1,0), f)),  // right vector
        u = cross(f,r),  // up vector 
        c = pos + f*z,  // center of "virtual screen"
        i = c + uv.x*r + uv.y*u,  //intersection point camera ray and virtual screen
        rd = normalize(i-pos);  // ray direction
    return rd;
}

void main()
{
    vec2 uv = (gl_FragCoord.xy - .5*u_resolution.xy)/u_resolution.y;
	vec2 m = iMouse.xy/u_resolution.xy;
    float t = iTime*.2;
    uv *= rotate2d(t);  // add rotation
  
    // change z to -1 to get inside torus
    vec3 ro = vec3(0, 0, -1);  // camera origin
  
    // change the look at point so that it goes left and right
    vec3 lookat = mix(vec3(0), vec3(-1,0, -1), sin(t*1.56)*.5+.5);
    //vec3 lookat = vec3(0);  // look point -- looks at origin
  
    //float zoom = .5;
    //zoom in and out
    float zoom = mix(.2, .7, sin(t)*.5 + .5);
    
    vec3 rd = GetRayDir(uv, ro, lookat, zoom);
    float radius = mix(.3, 1.5, sin(t*.4)*.5 + .5);;
    float dS, dO;
    vec3 p;
  
    for(int i=0; i<MAX_STEPS; i++) {
    	p = ro + rd*dO;
        // add - to get inside torus
        dS = -(length(vec2( length(p.xz) - 1., p.y) ) - radius);
        if(dS<SURF_DIST) break; // did we hit anything?
          dO += dS;
    }
  
    vec3 col = vec3(0);
  
    if (dS<SURF_DIST) {
       float x = atan(p.x, p.z)  + t*.5;  // -pi to pi
       float y = atan( length(p.xz)-1., p.y );

       // Add spirals around torus
       // y term adds rings around torus
       // x term creates twists around torus
       float bands = sin(y*10. + x*30.); // coefficients need to be whole number 
       float ripples = sin((x*10. - y*30.)*3.) *.5 + .5;

       //coefficients need to stay in same ratio
       float waves = sin(x*2. - y*6. + t*20.); // can change direction of waves by changing sign of y
       // make bands crisper
       float b1 = S(-.2, .2, bands);
       float b2 = S(-.2, .2, bands - .5);

       float m = b1*(1.-b2);  // only show edges to add grooves

       // only show ripples inside of grooves
       // use max so that uvs don't go negative
       m = max(m, ripples*b2*max(0., waves));
       m += max(0., waves* .3 * b2);

       // mix m and its inverse, use smoothstep to transition smoothly

       float c = mix ( m , 1.-m, S( -.3, .3, sin(x*2.+t) ) ) ;
       col = mix(PURPLE, LTBLUE, c);
    }
     gl_FragColor = vec4(col,1.0);  
}