// Ported to P5.js from "Torus Snots explained" 
// by Martijn Steinrucken aka The Art of Code/BigWings -
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
#define BLACK vec3(0.)
#define FUSHIA vec3(191,18,241) / 255.
#define ORANGE vec3(191,18,241) / 255.
#define BLUE vec3(0, 0, 174) / 255.
#define YELLOW vec3(255,255,0) / 255.
#define PURPLE vec3(105, 0, 255) / 255.
#define S smoothstep
#define T iTime


float N21( vec2 p) {
    return fract( sin(p.x*100. + p.y*6574.)*5674. );
}

vec3 colXYZ( vec3 col1, vec3 col2, vec3 col3, vec3 n)
  {
        vec3 colXY = col1;  // front and back insdie and outside
        vec3 colXZ = col2; // top and bottom
        vec3 colYZ = col3;  //  left and right inside and outside
      
       // Tri-planar mapping
        n = abs(n);  // take absolute value to get all faces of object
        n *= pow(n, vec3(5.));
        n /= n.x + n.y + n.z; // add normalization 
      
       vec3 col = colXZ*n.y + colXY*n.z + colYZ*n.x ; 
       return col;
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

float sdBox(vec3 p, vec3 s) {
    p = abs(p)-s;
	return length(max(p, 0.))+min(max(p.x, max(p.y, p.z)), 0.);
}


// Add multiple objects 
float GetDist(vec3 p) {
    float r1 = .4, r2 = .1, r3 = .05;
    vec2 cp = vec2(length(p.xz)-r1, p.y);  // creates a torus
   
    float offset = .2;
    cp.y = abs(cp.y) - offset; // move from origin to get more tori
    float d = length(cp) - r2;
    //float d = min( length(cp-vec2(0,-.4)), length(cp-vec2(0,.4)) ) -.2;
    return d;
}
// // Add multiple objects efficienty
// float GetDist(vec3 p) {
//     float r1 = 1.7; r2 = .2;
//     float r3 = .05;
//     vec2 cp = vec2(length(p.xz)-r1, p.y);  // creates a torus
//     float a = atan(p.x, p.z);  // polar angle between -PI, PI
//     // get two interlocking tori
//     cp *= Rot(a);
//     // Get two connected tori
//     //cp *= Rot(a*.5);
//     cp.y = abs(cp.y) - .3;
//     float d =length(cp) - r2;
//     return d;
// }

float RayMarch(vec3 ro, vec3 rd) {
	float dO=0.;
    
    for(int i=0; i<MAX_STEPS; i++) {
    	vec3 p = ro + rd*dO;
        float dS = GetDist(p);
        dO += dS;
        if(dO>MAX_DIST || abs(dS)<SURF_DIST) break;
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

    vec3 ro = vec3(0, 3, -3);  // camera origin
    vec3 lookat = vec3(0);
    float zoom = 1.;
  
    ro.xz *= Rot(-m.x*3.14+1.);
  
  // Add background color with gradient
    // vec3 bg = FUSHIA*(uv.y +.50);
    // bg += BLUE*(-uv.y+.50);
    // vec3 col = bg;
    // col *= BLACK;
    vec2 gv = vec2(fract(uv.x), uv.y)*1. - .5;
    vec3 col = vec3(0);
    vec3 rd = GetRayDir(gv, ro, lookat, zoom);


    float d = RayMarch(ro, rd);

    if(d<MAX_DIST) {
        vec3 p = ro + rd * d;
        vec3 n = GetNormal(p);
        vec3 r = reflect(rd, n);

        float dif = dot(n, normalize(vec3(1,2,3)))*.5+.5;
       
        col = vec3(dif);
        col += dif*dif;
 
        col = colXYZ(BLACK,FUSHIA, FUSHIA, n);
       
    }
    
  // col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}
