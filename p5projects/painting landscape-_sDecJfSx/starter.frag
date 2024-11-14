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

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .001

#define S smoothstep
#define T iTime

// Color scheme
#define PURPLE vec3(83,29,109) / 255.
#define RED vec3(191, 18, 97) / 255.
#define ORANGE vec3(251,162,100) / 255.
#define GREEN vec3(111,208,140) / 255.
#define BLUE vec3(118, 212,229) / 255.

#define PI = 3.14159
#define BG backgroundGradient

vec3 backgroundGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}

vec3 gradient(vec3 rd, vec3 col1, vec3 col2, float m) {
  float k = rd.y*m + m;
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



float map( in vec3 pos )
{
 
   // float fh0 = 1. + 1.* pos.x + 1.* pos.z + 1.* pos.x * pos.x + 1.0 * pos.x * pos.z + 1.0* pos.z * pos.z;
   // float fh1 = 1. + 2.* pos.x + 3.* pos.z + 4.* pos.x * pos.x + 5.0 * pos.x * pos.z + 6.0* pos.z * pos.z;
   // float fh2 = 1.45 + 7.89* pos.x + 14.239* pos.z + 20.56* pos.x * pos.x + 192.34 * pos.x * pos.z + 121.321* pos.z * pos.z;
   // float fh3 = 99.99 + 123.45* pos.x + 197.37* pos.z + 79.31* pos.x * pos.x + 43.11 * pos.x * pos.z + 9.191* pos.z * pos.z;
   // float fh = fh0 + fh1 + fh2 + fh3;
   // fh = fh*.5 - .5;
 float fh = -0.1 + 0.2 * (sin(2.*pos.x)+ sin(3.0*pos.z));
 // add a plane as floor; floor is tangent to sphere
 float d2 = pos.y - fh;
 // min operator is way to combine objects
 
 // if the floor is closest return the ID of the floor, otherwise return the monster
 //return (d2 < d1.x) ? vec2(d2, 1.0) : d1;
  return d2;
}


float RayMarch(vec3 ro, vec3 rd) {
	float dO=0.;
    
    for(int i=0; i<MAX_STEPS; i++) {
    	vec3 p = ro + rd*dO;
        float dS = map(p);
        dO += dS;
        if(dO>MAX_DIST || abs(dS)<SURF_DIST) break;
    }
    
    return dO;
}

vec3 GetNormal(vec3 p) {
	float d = map(p);
    vec2 e = vec2(.001, 0);
    
    vec3 n = d - vec3(
        map(p-e.xyy),
        map(p-e.yxy),
        map(p-e.yyx));
    
    return normalize(n);
}

vec3 GetRayDir(vec2 uv, vec3 p, vec3 l, float z) {
    vec3 f = normalize(l-p),  // forward vector
        r = normalize(cross(vec3(0,1,0), f)),  // right vector
        u = cross(f,r),  // up vector 
        c = f*z,  // center of "virtual screen"
        i = c + uv.x*r + uv.y*u,  //intersection point camera ray and virtual screen
        d = normalize(i);
    return d;
}

void main()
{
    vec2 uv = (gl_FragCoord.xy - .5*u_resolution.xy)/u_resolution.y;
	vec2 m = iMouse.xy/u_resolution.xy;

    vec3 col = BG(uv, BLUE, RED, .3);
   
    vec3 ro = vec3(0, 3, -3);  // camera origin
    vec3 lookat = vec3(0);
    float zoom = .1;
  
    ro.yz *= Rot(-m.y*3.14+1.);
    ro.xz *= Rot(-m.x*6.2831);
    
    vec3 rd = GetRayDir(uv, ro, lookat, zoom);

    float d = RayMarch(ro, rd);

    if(d<MAX_DIST) {
        vec3 p = ro + rd * d;
        vec3 n = GetNormal(p);
        vec3 r = reflect(rd, n);

        float dif = dot(n, normalize(vec3(1,2,3)))*.5+.5;
        vec3 col1 = vec3(dif);
        col += col1;
      
    }
    
   col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}
