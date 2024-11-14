// Code ported from The Art of Code Tutorial
// Torus Knots Explained 
// 
// YouTube: youtube.com/TheArtOfCodeIsCool
// Ray marching starting point
// https://www.shadertoy.com/view/WtGXDD

// Used "RayMarching starting point" as base
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

#define S smoothstep
#define T iTime
#define PI 3.14159

#define PURPLE vec3(146,83,161) / 255.
#define RED vec3(218, 18, 14) / 255.
#define ORANGE vec3(248,158,79) / 255.
#define BLUE vec3(118, 212, 229) / 255.
#define TEAL vec3(11, 106, 136) / 255.
#define GREEN vec3(36,87,4) / 255.
#define GREY vec3(164,167,162) / 255.
#define GOLD vec3(181, 130, 0) /255.

// Function to add color to shape using x,y,z dimensions
vec3 colXYZ( vec3 col1, vec3 col2, vec3 col3, vec3 n)
  {
        vec3 colXY = col1;  // front and back insdie and outside
        vec3 colXZ = col2;  // top and bottom
        vec3 colYZ = col3;  //  left and right inside and outside
      
       // Tri-planar mapping
        n = abs(n);  // take absolute value to get all faces of cube
        n *= pow(n, vec3(5.));
        n /= n.x + n.y + n.z; // add normalization 
      
       vec3 col = colXZ*n.y + colXY*n.z + colYZ*n.x ; 
       return col;
}

// Function to create background color based on uv.y
vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}  

// Function to create a background color based on ray direction
vec3 Bg(vec3 rd) {
    float k = rd.y*0.5+ 0.5;
    vec3 col = mix(PURPLE, TEAL, 0.8);
    return col;
}

float N21( vec2 p) {
    return fract( sin(p.x*100. + p.y*6574.)*5674. );
}

mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

float sdHexagram( vec2 p,  float r )
{
    const vec4 k = vec4(-0.5,0.8660254038,0.5773502692,1.7320508076);
    p = abs(p);
    p -= 2.0*min(dot(k.xy,p),0.0)*k.xy;
    p -= 2.0*min(dot(k.yx,p),0.0)*k.yx;
    p -= vec2(clamp(p.x,r*k.z,r*k.w),r);
    return length(p)*sign(p.y);
}

float sdBox(vec2 p, vec2 s) {
    p = abs(p) - s;
    return length(max(p, 0.0)) + min(max(p.x, p.y), 0.0);
}

// Creates a wreath like shape with two inter-twined torus knots
float GetDist(vec3 pos) {
    //p.xz *= Rot(iTime*.1);
    // torus
   // pos = abs(pos);
    
    float d, d1, d2;
    float r1 = 1.;
    float r2 = 0.21;
    float va = 0.00;
    // Slice of the torus we are looking at 
    // Revolving a 2d circle 
    float a = atan(pos.x, pos.z);
    vec2 cp = vec2(length(pos.xz)-r1, pos.y);
    vec2 cp1 = vec2(length(pos.xz)-r1, pos.y- va);
    // multiply angle by whole number get one long knot
    // multiply by non-whole number get interconnected tori
    float p = 7.0;
    float q = 2.0;
    // (3,2) trefoil knot, (5,2) Solomon's seal knot, 
    cp *= Rot(a*(p/q));  
    cp1 *= Rot(a*((p + 4.)/q));  
    cp.y = abs(cp.y)- 0.4; // if subtract by 0.0 get a torus
    cp1.y = abs(cp1.y)- 0.4;
   
    // create ribbon like efect
    // multiply times sin(a)*0.5 + 0.5 to vary radius of torus 
    d1 = sdBox(cp, vec2(0.21, 0.21*(sin(a)*0.0 + 0.0))) - r2; // create a ribbon-like effect
    d2 = sdBox(cp1, vec2(0.11, 0.11*(sin(a)*0.0 + 0.0))) - 0.11; // create a ribbon-like effect
   // d = mix(d1,d2, 0.25);
    d = min(d1,d2);

    return d*0.8;
}

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
    vec3 f = normalize(l-p),
        r = normalize(cross(vec3(0,1,0), f)),
        u = cross(f,r),
        c = f*z,
        i = c + uv.x*r + uv.y*u,
        d = normalize(i);
    return d;
}

void main()
{
    vec2 uv = (gl_FragCoord.xy - .5*u_resolution.xy)/u_resolution.y;
	vec2 m = iMouse.xy/u_resolution.xy;
    vec3 col = vec3(0);
    vec3 ro = vec3(0, 3, -3);
    ro.yz *= Rot(-m.y*3.14+1.);
    ro.xz *= Rot(-m.x*6.2831);
    
   // Last parameter--lens of camera
   // Increase to zoom in
    vec3 rd = GetRayDir(uv, ro, vec3(0,0.,0), 1.); 
    
    //col += Bg(rd);
     col += colorGradient(uv, PURPLE, TEAL, 0.35);
    //col += colorGradient(uv, vec3(0), RED, 0.75);
    float d = RayMarch(ro, rd);

    if(d<MAX_DIST) {
        vec3 p = ro + rd * d;
        vec3 n = GetNormal(p);
        vec3 r = reflect(rd, n);
        
        float spec = pow(max(0.0, r.y), 30.); // add specular highlight
        float dif = dot(n, normalize(vec3(1,2,3)))*.5+.5;
        col = mix(TEAL, vec3(dif), 0.15)+spec;
        //col = mix(GREEN, vec3(dif), 0.15)+spec;
    }
    
    col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}