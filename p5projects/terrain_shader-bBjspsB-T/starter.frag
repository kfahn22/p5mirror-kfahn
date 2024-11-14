// Starting point for frag code is the "RayMarching starting point" and "Over the Moon"
// by Martijn Steinrucken aka The Art of Code/BigWings - 2020
// YouTube: youtube.com/TheArtOfCodeIsCool

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;

#define PI 3.1415
#define S(x,y,z) smoothstep(x,y,z)
#define B(x,y,z,b) S(x, x+b, z)*S(y+b, y, z)
#define saturate(x) clamp(x,0.,1.)
#define BG backgroundGradient
#define MOD3 vec3(.1031,.11369,.13787)


// Define colors scheme
#define LTBROWN vec3(170, 124, 100)/255.
#define DKBROWN vec3(50,42,38)/255.
#define PINKER vec3(185,85,167)/255.
#define YELLOW vec3(242,214,65)/255.


// Function to add background color
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
// From IQ
// Add rotation matrix to improve noise function
// using coordinates for right triangle
mat2 m = mat2( 0.8, .6, -.6, 0.8);


// IQ coding an eye livestream
float fbm1( vec2 p)
  {
  float f = 0.0;
   f += 0.5000*SmoothNoise( p ) ; p*= m*2.02;
   f += 0.2500*SmoothNoise( p ) ; p*= m*2.03;
   f += 0.1250*SmoothNoise( p ) ; p*= m*2.01;
   f += 0.0625*SmoothNoise( p ) ; p*= m*2.04;
   f /= 0.9375;
   return f;
}

// IQ coding an eye livestream
// this version creates smoother appearance
float fbm2( vec2 p)
  {
  float f = 0.0;
   f += 0.5000*SmoothNoise2( p ) ; p*= m*2.02;
   f += 0.2500*SmoothNoise2( p ) ; p*= m*2.03;
   f += 0.1250*SmoothNoise2( p ) ; p*= m*2.01;
   f += 0.0625*SmoothNoise2( p ) ; p*= m*2.04;
   f /= 0.9375;
   return f;
}

mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

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

// Use psuedo random noise to get the height of the mountains
float getHeight(float x) {
//  return sin(x) + sin(x*2.234+.123)*.5 + sin(x*4.45+2.2345)*.25;
 return sin(x)  + sin(x*2.234 + .123)*cos(x) + sin(x*4.45 + 2.234)*.25;
}

vec4 Layer(vec2 uv, float blur)
  {
  vec4 col = vec4(0);
  float y = getHeight(uv.x);
  col += S(blur, -blur, uv.y + .7*y);
  return col;
}


//  float cl = sin(0.5*time);
//     float an = 1.57 + 0.7*sin(0.15*time);
//    // vec3  ta = vec3( 0.0, 0.65, -0.6+time*1.0 - 0.4*cl);
//   vec3  ta = vec3( 0.0, 0.75, 0.6+time*1.0 + 0.4*cl);
  
//     // change z coordinate to - and camera will move toward horizon
//     vec3  ro = ta + vec3( 1.3*cos(an), -0.250, -1.3*sin(an) );
void main( )
{
	vec2 uv = (gl_FragCoord.xy-.5*u_resolution.xy) / u_resolution.y;
    //float t = iTime*.15;
//     uv *= 2.;
//    // add a target for the camera
//     vec3 ta = vec3(0.0,0.5,0.0);
    
//     vec3 ro = ta + vec3(1.3*sin(iTime),-0.25,-1.3*cos(iTime));  // origin of camera (ta moves camera up)
    
    float cl = sin(0.5*iTime);
    float an = 1.57 + 0.7*sin(0.15*iTime);
    // vec3  ta = vec3( 0.0, 0.65, -0.6+time*1.0 - 0.4*cl);
    vec3  ta = vec3( 0.0, 0.75, 0.6+iTime*1.0 + 0.4*cl);
  
    // change z coordinate to - and camera will move toward horizon
    vec3  ro = ta + vec3( 1.3*cos(an), 0.250, -1.3*sin(an) );
    
  
  vec3 ww = normalize( ta - ro); // target minus ray origin
    vec3 uu = normalize( cross(ww,vec3(0.,1.,0.)) );
    vec3 vv = normalize( cross(uu,ww) );
    
    vec3 rd = normalize( uv.x*uu + uv.y*vv + 1.5*ww*iTime*.01 );  // lens of camera
  
    vec3 col1 = BG(uv, YELLOW, PINKER, .3) - 0.5*rd.y; // sky with gradient 
    col1 = mix(col1, vec3(0.7,0.75,0.8), exp(-10.0*rd.y) );  // add grey along the horizon by mixing 
    col1 = mix(col1, vec3(1.), .8*SmoothNoise(uv)); // Add some clouds
  
    vec4 col = vec4(col1, 1.);
  
    float f = fbm2( 5.0 * uv ); // Adjust parameter here to make variation more pronounced
    //vec3 BROWN = mix( LTBROWN, DKBROWN, f); // Mix two colors of brown
  
    float blur = .005;
    for(float i=0.; i<1.; i+=1./9.) {  
        float scale = mix(30., 1., i );  // make layers further away smaller
        //vec4 layer = Layer(uv*scale+vec2( i*75., iTime*.1 + i + .05)-.2, blur); 
    	vec4 layer = Layer(uv*scale+vec2( i*75., iTime *.2*i), blur); 
        // Add some brown color for the mountains
        // Make more distant peaks lighter in color
    	layer.rgb *= (1. - i)*LTBROWN; 
        col = mix(col, layer, layer.a); // Mix the sky with the mountains
    
    }
  
    col = saturate(col);
    
    gl_FragColor = vec4(col);
}
