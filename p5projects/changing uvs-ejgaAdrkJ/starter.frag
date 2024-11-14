// Ported to P5.js from "RayMarching starting point" 
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
uniform sampler2D tex0;

#define S smoothstep
#define CG colorGradient

#define BLUE vec3(2,8,135)/255.
#define PINK vec3(225,187,201)/255.
#define PURPLE vec3(177,74,237)/255.

vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
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
    float b = mix (bl, br, lv.x);
    
    
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

float hill(vec2 uv) {
  float d = length( uv - vec2( 0., clamp(uv.y, -.5, .5) ) );
  float r = mix(.1, .01, S(-.5,.5, uv.y));
  float m = S(.02, .0, d-r);
  float thickness = .45;
  float x = abs(uv.x);
  // Define curvature of hill
  float curvature = (1. - x) * pow(x, 2.) + x * (1. - pow(x, 2.));
  float y = abs(curvature+uv.y);
  //Take abs(uv.y) to get convex shape
  float h= S(.01, .0, abs((y)) - thickness);
  return h;
}

float curves(vec2 uv) {
  float d = length( uv - vec2( 0., clamp(uv.y, -.3, .3) ) );
  float r = mix(.1, .01, S(-.4,.4, uv.y));
  float m = S(.02, .0, d-r);
  float thickness = .01;
  float num = 1.;
  float x = abs(uv.x);
  float curvature = (1. - x) * pow(x, 2.) + x * (1. - pow(x, 2.));
 
  float y = abs(curvature*uv.y);
  
  // Add x and stripes face right, subtract and stripes face left
 // float y = (uv.x - x)*num;
  float stripes = S(.01, .0, abs(fract(y)) + thickness);
  return stripes;
}
void main()
{
    vec2 uv = (gl_FragCoord.xy - .5*u_resolution.xy)/u_resolution.y;
	//vec2 m = iMouse.xy/u_resolution.xy;

    vec3 col = vec3(0);
   
   //vec2 st = uv*2.0;
   //vec2 st = fract(uv*2.) - 0.5;
  
    //vec2 id = floor(uv*2.);
    col = BLUE; 
    //col = CG(uv, BLUE, PINK, .3);
   
    // Making a circle
    vec2 origin = vec2(0.0, -.25);
  
    //float d = length(uv - origin);
    // float d = length(uv - vec2(0., clamp(-0.3, 0.3, uv.y) ) );
   //float m = S(.1, .09, d);
    
    // vec3 col1 = BLUE;
    //col += m*PURPLE;
    
    float  s = hill(uv - origin);
    col += s*PURPLE;
  
    // d = max(d, uv.y - 1.0 ); //clamping box through a plane 
    // d = max(d, -uv.y + 0.85 ); //clamping box through a plane 
    //d*= 0.5;
    //float m = S(-.001,.001, d);
    
  // col.rg += st;

   //col += m;

   //col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}
