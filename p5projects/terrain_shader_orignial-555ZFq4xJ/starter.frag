// Ported to P5.js from "RayMarching starting point" 
// by Martijn Steinrucken aka The Art of Code/BigWings - 2020
// The MIT License
// YouTube: youtube.com/TheArtOfCodeIsCool

// "Over the Moon" by Martijn Steinrucken aka BigWings - 2015
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.


#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;
uniform sampler2D tex0;


#define PI 3.1415
#define S(x,y,z) smoothstep(x,y,z)
#define B(x,y,z,b) S(x, x+b, z)*S(y+b, y, z)
#define saturate(x) clamp(x,0.,1.)

#define MOD3 vec3(.1031,.11369,.13787)

#define MOONPOS vec2(1.3, .8)

#define BROWN vec3(129,93,64)/255.
#define PINK vec3(204,171,170)/255.
#define PINKER vec3(185,142,167)/255.
#define YELLOW vec3(242,214,143)/255.
#define RUST vec3(188,145,136)/255.


#define BG backgroundGradient

vec3 backgroundGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}

vec3 gradient(vec3 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}

float N21( vec2 p) {
    return fract( sin(p.x*100. + p.y*6574.)*5674. );
}


float SmoothNoise(vec2 uv) {
   // lv goes from 0,1 inside each grid
   // check out interpolation for dummies
    vec2 lv = fract(uv);
   
   //vec2 lv = smoothstep(0., 1., fract(uv*10.));  // create grid of boxes 
    vec2 id = floor(uv); // find id of each of the boxes
     lv = lv*lv*(3.-2.*lv); 
    
    // get noise values for each of the corners
    // Use mix function to join together
    float bl = N21(id);
    float br = N21(id+vec2(1,0));
    float b = mix(bl, br, lv.x);
    
    
    float tl = N21(id + vec2(0,1));
    float tr = N21(id+vec2(1,1));
    float t = mix (tl, tr, lv.x);
    
    return mix(b, t, lv.y);
}

float SmoothNoise2 (vec2 uv) {
   float c = SmoothNoise(uv*4.);
     // Layer(or octave) of noise
    // Double frequency of noise; half the amplitude
    c += SmoothNoise(uv*8.)*.5;
    c += SmoothNoise(uv*16.)*.25;
    c += SmoothNoise(uv*32.)*.125;
    c += SmoothNoise(uv*64.)*.0625;
    
    return c/ 2.;  // have to normalize or could go past 1
  
}
mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}


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

// float skewbox(vec2 uv, vec3 top, vec3 bottom, float blur) {
// 	float y = within(top.z, bottom.z, uv.y);
//     float left = mix(top.x, bottom.x, y);
//     float right = mix(top.y, bottom.y, y);
    
//     float horizontal = B(left, right, uv.x, blur);
//     float vertical = B(bottom.z, top.z, uv.y, blur);
//     return horizontal*vertical;
// }

// vec4 pine(vec2 uv, vec2 p, float s, float focus) {
// 	uv.x -= .5;
//     float c = skewbox(uv, vec3(.0, .0, 1.), vec3(-.14, .14, .65), focus);
//     c += skewbox(uv, vec3(-.10, .10, .65), vec3(-.18, .18, .43), focus);
//     c += skewbox(uv, vec3(-.13, .13, .43), vec3(-.22, .22, .2), focus);
//     c += skewbox(uv, vec3(-.04, .04, .2), vec3(-.04, .04, -.1), focus);
    
//     vec4 col = vec4(1.,1.,1.,0.);
//     col.a = c;
   
//     float shadow = skewbox(uv.yx, vec3(.6, .65, .13), vec3(.65, .65, -.1), focus);
//     shadow += skewbox(uv.yx, vec3(.43, .43, .13), vec3(.36, .43, -.2), focus);
//     shadow += skewbox(uv.yx, vec3(.15, .2, .08), vec3(.17, .2, -.08), focus);
    
//     col.rgb = mix(col.rgb, col.rgb*.8, shadow);
    
//     return col;
// }

float getheight(float x) {
    //return sin(x) + sin(x*2.234+.123)*.5 + sin(x*4.45+2.2345)*.25;
    return sin(x) + sin(x)*sin(x) + sin(x*2.234 + .123)*cos(x) + sin(x*4.45 + 2.234)*.25;
}

vec4 landscape(vec2 uv, float d, float p, float f, float a, float y, float seed, float focus) {
	uv *= d;
    float x = uv.x*PI*f+p;
    float c = getheight(x)*a+y;
    
    float b = floor(x*5.)/5.+.1;
    float h =  getheight(b)*a+y;
    
    float e = 0.001;
    vec4 col = vec4(S(c+e, c-e, uv.y));
    //col.rgb *= mix(0.9, 1., abs(uv.y-c)*20.);
    
//     x *= 5.;
//     float id = floor(x);
//     float n = hash11(id+seed);
    
//     x = fract(x);
    
//     y = (uv.y - h)*mix(5., 3., n)*3.5;
//     float treeHeight = (.07/d) * mix(1.3, .5, n);
//     y = within(h, h+treeHeight, uv.y);
//     x += (n-.5)*.6;
//     vec4 pineCol = pine(vec2(x, y/d), vec2(0.), 1., focus+d*.1);
//     //col += pineCol;
//     col.rgb = mix(col.rgb, pineCol.rgb, pineCol.a);
//     col.a = max(col.a, pineCol.a);
    
    return saturate(col);
}

vec4 gradient(vec2 uv) {
    
	float c = 1.-length(MOONPOS-uv)/1.4;
    
    vec4 col = vec4(c);
    
    return col;
}

float circ(vec2 uv, vec2 pos, float radius, float blur) {
	float dist = length(uv-pos);
    return S(radius+blur, radius-blur, dist);
}

vec4 moon(vec2 uv) {
   	float c = circ(uv, MOONPOS, .07, .001);
    
    c *= 1.-circ(uv, MOONPOS+vec2(.03), .07, .001)*.95;
    c = saturate(c);
    
    vec4 col = vec4(c);
    col.rgb *=.8;
    
    return col;
}

vec4 moonglow(vec2 uv, float foreground) {
    
   	float c = circ(uv, MOONPOS, .1, .2);
    
    vec4 col = vec4(c);
    col.rgb *=.2;
    
    return col;
}

float stars(vec2 uv, float t) {
    t*=3.;
    
    float n1 = hash12(uv*10000.);
    float n2 = hash12(uv*11234.);
    float alpha1 = pow(n1, 20.);
    float alpha2 = pow(n2, 20.);
    
    float twinkle = sin((uv.x-t+cos(uv.y*20.+t))*10.);
    twinkle *= cos((uv.y*.234-t*3.24+sin(uv.x*12.3+t*.243))*7.34);
    twinkle = (twinkle + 1.)/2.;
    return alpha1 * alpha2 * twinkle;
}

void main( )
{
	vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float t = iTime*.05;
     
    vec2 bgUV = uv*vec2(u_resolution.x/u_resolution.y, 1.);
  
    //vec4 col = gradient(bgUV)*.8;
  vec4 col = vec4(BG(uv, PINK, YELLOW, .2), 1.);
    col += moon(bgUV);
    col += stars(uv, t);
    
    float dist = .10; // blur
    float height = -.01;
    float amplitude = .02;
    
    dist = 1.;
    height = .55;
    
    vec4 mountain = vec4(0.);
    for(float i=0.; i<10.; i++) {  
      
      //float scale = mix(20., 1, i);
    	vec4 layer = landscape(uv, dist, t+i, 3., amplitude, height, i, .01);
    	layer.rgb *= mix(BROWN, vec3(.3)+gradient(uv).x, 1.-i/10.);
        mountain = mix(mountain, layer, layer.a);
        
        dist -= .1;
        height -= .06;
    }
   col = mix(col, mountain, mountain.a);
    
    //col += moonglow(bgUV, 1.);
    col = saturate(col);
    
    vec4 foreground = landscape(uv, .02, t, 3., .0, -0.04, 1., .1);
    foreground.rgb *= vec3(.1, .1, .2)*.5;
    
    col = mix(col, foreground, foreground.a);
    
    gl_FragColor = vec4(col);
}
// void main()
// {
//     vec2 uv = (gl_FragCoord.xy - .5*u_resolution.xy)/u_resolution.y;
// 	vec2 m = iMouse.xy/u_resolution.xy;

 
//     }
    
//    col = pow(col, vec3(.4545));	// gamma correction
    
//     gl_FragColor = vec4(col,1.0);
// }