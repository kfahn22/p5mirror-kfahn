
// Ported to P5.js from 
// "Over the Moon" by Martijn Steinrucken aka BigWings - 2015
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
// Email:countfrolic@gmail.com Twitter:@The_ArtOfCode
// Facebook: https://www.facebook.com/groups/theartofcode
//
// Music: A Miserable Heart - Marek Iwaszkiewicz
// Soundcloud: https://soundcloud.com/shyprince/a-miserable-heart-piano
//
// I made a video tutorial about this effect which you can see here:
// https://youtu.be/LLZPnh_LK8c
// by Martijn Steinrucken aka The Art of Code/BigWings - 2020
// The MIT License
// YouTube: youtube.com/TheArtOfCodeIsCool


#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;


#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .001

//#define S smoothstep
#define T iTime


// Function to take r,g,b values to range 0,1
// Remember to input a float!
vec3 rgb( float r, float g, float b) 
{
   return vec3(r/ 255.0, g / 255.0, b / 255.0);
}


#define PI 3.1415
#define S(x,y,z) smoothstep(x,y,z)
#define B(x,y,z,b) S(x, x+b, z)*S(y+b, y, z)
#define saturate(x) clamp(x,0.,1.)

#define MOD3 vec3(.1031,.11369,.13787)

#define MOONPOS vec2(1.3, .8)

//----------------------------------------------------------------------------------------
//  1 out, 1 in...
float hash11(float p) {
    // From Dave Hoskins
	vec3 p3  = fract(vec3(p) * MOD3);
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.x + p3.y) * p3.z);
}

//  1 out, 2 in...
float hash12(vec2 p) {
	vec3 p3  = fract(vec3(p.xyx) * MOD3);
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.x + p3.y) * p3.z);
}

float remap(float a, float b, float c, float d, float t) {
	return ((t-a) / (b-a)) * (d-c) + c;
}

float within(float a, float b, float t) {
	return (t-a) / (b-a); 
}

float getheight(float x) {
    return sin(x) + sin(x*2.234+.123)*.5 + sin(x*4.45+2.2345)*.25;
}

vec4 landscape(vec2 uv, float d, float p, float f, float a, float y, float seed, float focus) {
	uv *= d;
    float x = uv.x*PI*f+p;
    float c = getheight(x)*a+y;
    
    float b = floor(x*5.)/5.+.1;
    float h =  getheight(b)*a+y;
    
    float e = 0.001;//fwidth(uv.y);
    
    vec4 col = vec4(S(c+e, c-e, uv.y));
    col.rgb *= mix(0.9, 1., abs(uv.y-c)*20.);
    
    return saturate(col);
}

vec4 gradient(vec2 uv) {
    
	float c = 1.-length(MOONPOS-uv)/1.4;
    
    vec4 col = vec4(c);
    
    return col;
}

void main( )
{
	vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float t = iTime*.05;
     
    vec2 bgUV = uv*vec2(u_resolution.x/u_resolution.y, 1.);
    vec4 col = gradient(bgUV)*.8;
    
    float dist = .1;
    float height = -.01;
    float amplitude = .03;
    
    dist = .995; // adjusts placement on screen
    height = .45;
    
    vec4 layers = vec4(0.);
    for(float i=0.; i<15.; i+=3.) {    
    	vec4 layer = landscape(uv, dist, t+i, 3.0, amplitude, height, i, .01);
    	layer.rgb *= mix(vec3(.1, .1, .2), vec3(.3)+gradient(uv).x, 1.-i/10.);
        layers = mix(layers, layer, layer.a);
        
        dist -= .1;
        height -= .06;
    }
   
    col = mix(col, layers, layers.a);
    
    
    col = saturate(col);
    
    vec4 foreground = landscape(uv, .02, t, 3., .0, -0.04, 1., .1);
    foreground.rgb *= vec3(.1, .1, .2)*.5;
    
   // col = mix(col, foreground, foreground.a);
    
    gl_FragColor = vec4(col);
}