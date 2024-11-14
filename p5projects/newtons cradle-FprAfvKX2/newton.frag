
// by Martijn Steinrucken aka The Art of Code/BigWings - 2020


#ifdef GL_ES
precision mediump float;
#endif

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .001

#define S smoothstep
#define T iTime

uniform vec2 u_resolution; // This is passed in as a uniform from the sketch.js file
uniform vec2 iMouse;
uniform float iFrame;

const int MAT_BASE = 1;
const int MAT_BARS = 2;
const int MAT_BALL = 3;
const int MAT_LINE = 4;

mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

float sdBox(vec3 p, vec3 s) {
    p = abs(p)-s;
	return length(max(p, 0.))+min(max(p.x, max(p.y, p.z)), 0.);
}

float sdBox(vec2 p, vec2 s) {
    p = abs(p)-s;
	return length(max(p, 0.))+min(max(p.x, p.y), 0.);
}

float sdLineSeg( vec3 p, vec3 a, vec3 b)
{
     vec3 ap = p-a,  ab = b-a;
  
     // t = 0 at ball, 1 at bar
     float t = clamp(dot(ap,ab)/dot(ab,ab), 0., 1.);;
     vec3 c = a + ab*t;
     return length(p-c);
}

vec2 sdBall(vec3 p, float a)
{
   p.y -= 1.01;  // remap so that rotates from attatchment point on bar
   p.xy *= Rot(a);
   p.y += 1.01;  // undo remapping
   float ball = length(p) - .15;
   
   // Add ring (torus)
   float ring = length(vec2(length(p.xy- vec2(0., .15)) - .03, p.z))-.01;
   
   ball = min(ball, ring);
   
   p.z = abs(p.z);
   float line = sdLineSeg( p, vec3(0., .15, 0.), vec3(0., 1.01, .4) ) - .005;
   
   float d = min(ball, line);
  
   // use ternary operator to return id for ball or line
   return vec2(d, d==ball ? MAT_BALL : MAT_LINE);
}

float GetDist(vec3 p) {
    float base = sdBox(p, vec3(1.,.1,.5))-.1; // subtract .1 to round edges
    
    // slice in half
   
    
    // Add bars; check out torus SDF
    // Subtract .04 to add dimension to bar
    // Subtract .15 to smooth out bar
    // remap z to move bar over
    float bar = length( vec2(sdBox(p.xy, vec2(.8, 1.4))-.15, abs(p.z)-.4) )- .04;  
    
    // Add rotation
    float a = sin(iFrame*.1);
    float a1 = min(0., a);  // take min to cut off half of animation
    float a5 = max(0., a);
    
    // Add balls (add .x to just get distance to ball)
    
    float b1 = sdBall(p-vec3(.6,.5,0.), a1).x;  
    float b2 = sdBall(p-vec3(.3,.5,0.), (a+a1)*.05).x;
    float b3 = sdBall(p-vec3(0.,.5,0.), a*.05).x;
    float b4 = sdBall(p-vec3(-.3,.5,0.), (a+a5)*.05).x;
    float b5 = sdBall(p-vec3(-.6,.5,0.), a5).x;
    
    float balls = min(b1, min(b2, min(b3, min(b4,b5))));
    float d = min(base, bar);
    
    d = min(d, balls);
    
    base = max(base, -p.y);
    d = max(d, -p.y); // p.y is a plane, cut off buttom
    return d;
}


vec2 Min(vec2 a, vec2 b)
{
  return a.x < b.x ? a:b; 
}

int GetMat(vec3 p) {
    float base = sdBox(p, vec3(1.,.1,.5))-.1; // subtract .1 to round edges
    
    // slice in half
   
    
    // Add bars; check out torus SDF
    // Subtract .04 to add dimension to bar
    // Subtract .15 to smooth out bar
    // remap z to move bar over
    float bar = length( vec2(sdBox(p.xy, vec2(.8, 1.4))-.15, abs(p.z)-.4) )- .04;  
    
    float a = sin(iFrame*.5);
    float a1 = min(0., a);  // take min to cut off half of animation
    float a5 = max(0., a);
    
    // Add balls
    
    vec2 b1 = sdBall(p-vec3(.6,.5,0.), a1);  
    vec2 b2 = sdBall(p-vec3(.3,.5,0.), (a+a1)*.05);
    vec2 b3 = sdBall(p-vec3(0.,.5,0.), a*.05);
    vec2 b4 = sdBall(p-vec3(-.3,.5,0.), (a+a5)*.05);
    vec2 b5 = sdBall(p-vec3(-.6,.5,0.), a5);
    
    vec2 balls = Min(b1, Min(b2, Min(b3, Min(b4,b5))));
    
    float d = min(base, bar);
    
    d = min(d, balls.x);
    
    base = max(base, -p.y);
    d = max(d, -p.y); // p.y is a plane, cut off buttom
  
    int mat = 0;
    
    if (d == base)
       mat = MAT_BASE;
    else if (d==bar)
       mat = MAT_BARS;
    else if (d==balls.x)
       mat = int(balls.y);
    
    return mat;
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

void main( )
{ 
    vec2 uv = (gl_FragCoord.xy -.5*u_resolution.xy)/u_resolution.y;
	vec2 m = iMouse.xy/u_resolution.xy;

    vec3 ro = vec3(0, 3, -3);
    //ro.yz *= Rot(-m.y*3.14+1.);
   // ro.xz *= Rot(-m.x*6.2831);
    
    vec3 rd = GetRayDir(uv, ro, vec3(0,.75,0), 1.);
    vec3 col = vec3(0);
   
    float d = RayMarch(ro, rd);

    if(d<MAX_DIST) {
        vec3 p = ro + rd * d;
        vec3 n = GetNormal(p);
        vec3 r = reflect(rd, n);

        float dif = dot(n, normalize(vec3(1,2,3)))*.5+.5;
        col = vec3(dif);
        
        int mat = GetMat(p);
        
        if (mat == MAT_BASE)
          col *=.1;
        else if (mat==MAT_BARS)
          col*=vec3(0.,0.,1.);
        else if (mat==MAT_BALL)
           col *= vec3(1., 0., 0.);
        else if (mat==MAT_LINE)
           col *= .05;
    }
   
    col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}