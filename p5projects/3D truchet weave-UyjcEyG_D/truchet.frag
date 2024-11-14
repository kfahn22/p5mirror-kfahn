// "RayMarching starting point" 
// by Martijn Steinrucken aka The Art of Code/BigWings - 2020
// The MIT License
// Email: countfrolic@gmail.com
// Twitter: @The_ArtOfCode
// YouTube: youtube.com/TheArtOfCodeIsCool
// Facebook: https://www.facebook.com/groups/theartofcode/
//
// You can use this shader as a template for ray marching shaders


// Live Coding: 3d Truchet Weave by the Art of Code

// Use Minkoski distance to calculate distance function

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;


#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .001
#define TAU 6.283185
#define PI 3.141592
#define S smoothstep
#define T iTime

mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

float sdBox(vec3 p, vec3 s) {
    p = abs(p)-s;
	return length(max(p, 0.))+min(max(p.x, max(p.y, p.z)), 0.);
}

// Using this function to "straighten" out torus
// Analygous to Pythagorus but with any power
float Length( vec2 p, float k) {
  // Take absolute value to avoid negative values for p.x, p.y
  p = abs(p);
  return pow(pow(p.x, k) + pow(p.y, k), 1.0/k);
}

// SDF from Art of Code
float sdTorus(vec3 p, float r1, float r2, float k) {
  return Length(vec2(Length(p.xz, k)-r1, p.y), k)-r2;
}

// function to return a pseudo random number
float Hash21(vec2 p) {
  p = fract(p*vec2(576.343, 124.671));
  p += dot(p, p + 4584.567);
  return fract(p.x*p.y);
}

float TruchetLayer(vec3 p, float k, float wobble) {
    
    // Substract 0.01 b/c otherwise have an infinitely thin plane
    float grid = abs(p.y) - 0.01; 
  
    vec3 P = p;
    // get id value to get a random value for tiles
  
    vec2 id = floor(P.xz);
    // repeat box in xz plane
    // reorient box by subtracting 0.5
    
    P.xz = fract(P.xz)-0.50; 
    
    // Make a ground plane
    // subtract box from plane using boolean difference
    grid = max(grid, -sdBox(P, vec3(0.49)));
   
    float n = Hash21(id);
    
    if (n < 0.5) P.x *= -1.;
    // s evaluates to 1. in lower left part of grid and -1 in right part of grid
    // use s to add another quarter torus in upper right corner
  // add Truchet effect by flipping tiles by flipping coordinate system
    P.x *= -1.;
    float s = P.x > -P.z ? 1.0 : -1.0;
  
    // subtract by 0.5 to move torus to corner
    P.xz -= 0.5*s; 
    
    // use polar coordinates to figure out where you are on torus
    float a = atan(P.x, P.z); // -PI to PI
  
    // wobble adjustment to how much weaves in y direction
    P.y += cos(2.0*a)*wobble; // mulitply by 2.0 to double phase & fix discontinuities
    // multiply by 0.05 -- thickness of torii (replaced by wobble)
  
    float d = sdTorus(P, 0.5, 0.05, k);
  
    return d;
}

vec2 Truchet(vec3 p) {
  float t1 = TruchetLayer(p, 2.0, 0.1);
  // multiply by 0.7 --adjustment to fix glitches
  float t2 = TruchetLayer(p-vec3(0.5, 0.0, 0.5), 1.0, 0.0) * 0.7 - 0.04; // shift in the xz plane direction
  return vec2(t1,t2);
}

vec3 Transform(vec3 p) {
  p.x += iTime;
  return p;
}
float GetDist( vec3 p ) {
  p = Transform(p);
  vec2 t = Truchet(p);
  float d = min(t.x,t.y)*0.9;
  
  d = min(d, p.y);
  return d;
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
    vec2 e = vec2(.001, 0.0);
    vec3 n = GetDist(p) - 
        vec3(GetDist(p-e.xyy), GetDist(p-e.yxy),GetDist(p-e.yyx));
    
    return normalize(n);
}

vec3 GetRayDir(vec2 uv, vec3 p, vec3 l, float z) {
    vec3 
        f = normalize(l-p),
        r = normalize(cross(vec3(0,1,0), f)),
        u = cross(f,r),
        c = f*z,
        i = c + uv.x*r + uv.y*u;
    return normalize(i);
}

void main()
{
    vec2 uv = (gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
	vec2 m = iMouse.xy/u_resolution.xy;

    vec3 ro = vec3(0, 3, -3);
    ro.yz *= Rot(-m.y*PI+1.);
    ro.xz *= Rot(-m.x*TAU);
    
    vec3 rd = GetRayDir(uv, ro, vec3(0.0,0.0,0.0), 1.0);
    vec3 col = vec3(0);
   
    float d = RayMarch(ro, rd);

    if(d<MAX_DIST) {
        vec3 p = ro + rd * d;
        vec3 n = GetNormal(p);
        vec3 r = reflect(rd, n);

        p = Transform(p);
        float dif = dot(n, normalize(vec3(1,2,3)))*0.5+0.5;
        col = vec3(dif);
      
        vec2 t = Truchet(p);
        if (p.y < -0.25) {
        col *= t.y*2.0; // add shadow effect
         }
        else if (t.x<t.y) {
        col *= vec3(1.0, 0.05, 0.05);
        }
    }
    
    col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}