// The frag shader code is based on code from Daniel Shiffman, Inigo Quilez, and Martijn Steinrucken (aka the Art of Coding)

// Mandelbulb challenge from theCodingTrain
// https://www.youtube.com/watch?v=NJCiUVGiNyA
// Exploration of how to port from Shadertoy to P5.js
// https://www.youtube.com/watch?v=7ZIfXu_iPv4

// https://iquilezles.org/www/articles/mandelbulb/mandelbulb.htm

// YouTube: youtube.com/TheArtOfCodeIsCool
// Refer to the Ray marching starting point video for a good explanation of Ray marching 


#ifdef GL_ES
precision mediump float;
#endif

// Passe the uniforms in from the sketch.js file
uniform vec2 u_resolution; 
uniform vec2 iMouse;
uniform float iFrame;
uniform float iTime;
uniform sampler2D tex0;

// Define some global variables and color scheme
#define S smoothstep
#define CG colorGradient
#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .001

// Color scheme
// The uvs are floating point with a range of [0.0,1.0] so we normalize by dividing by 255.
#define PURPLE vec3(83, 29,109) / 255.
#define RED vec3(191, 18, 97) / 255.
#define ORANGE vec3(251,162, 100) / 255.
#define BLUE vec3(118, 212, 229) / 255.

// This is not really doing anything for this sketch, but this is how you pass in a texture
#define TEXTURE texture2D(tex0, p.yz*.5+0.5).rgb

// Function to create a color gradient
vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}

float dot2( in vec2 v ) { return dot(v,v); }
float dot2( in vec3 v ) { return dot(v,v); }
float ndot( in vec2 a, in vec2 b ) { return a.x*b.x - a.y*b.y; }


// Function to add color to mandelbulb using x,y,z dimensions
vec3 colXYZ( vec3 col1, vec3 col2, vec3 col3, vec3 n)
  {
        vec3 colXY = col1;  // front and back insdie and outside
        vec3 colXZ = col2; // top and bottom
        vec3 colYZ = col3;  //  left and right inside and outside
      
       // Tri-planar mapping
        n = abs(n);  // take absolute value to get all faces of cube
        n *= pow(n, vec3(5.));
        n /= n.x + n.y + n.z; // add normalization 
      
       vec3 col = colXZ*n.y + colXY*n.z + colYZ*n.x ; 
       return col;
}

// Handy rotation matrix function
mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

float sdSphere( vec3 p, float s )
{
  return length(p)-s;
}


float sdRoundBox( vec3 p, vec3 b, float r )
{
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0) - r;
}

float sdBoxFrame( vec3 p, vec3 b, float e )
{
       p = abs(p  )-b;
  vec3 q = abs(p+e)-e;
  return min(min(
      length(max(vec3(p.x,q.y,q.z),0.0))+min(max(p.x,max(q.y,q.z)),0.0),
      length(max(vec3(q.x,p.y,q.z),0.0))+min(max(q.x,max(p.y,q.z)),0.0)),
      length(max(vec3(q.x,q.y,p.z),0.0))+min(max(q.x,max(q.y,p.z)),0.0));
}

float sdCappedCylinder( vec3 p, float h, float r )
{
  vec2 d = abs(vec2(length(p.xz),p.y)) - vec2(h,r);
  return min(max(d.x,d.y),0.0) + length(max(d,0.0));
}


float sdCappedCone( vec3 p, float h, float r1, float r2 )
{
  vec2 q = vec2( length(p.xz), p.y );
  vec2 k1 = vec2(r2,h);
  vec2 k2 = vec2(r2-r1,2.0*h);
  vec2 ca = vec2(q.x-min(q.x,(q.y<0.0)?r1:r2), abs(q.y)-h);
  vec2 cb = q - k1 + k2*clamp( dot(k1-q,k2)/dot2(k2), 0.0, 1.0 );
  float s = (cb.x<0.0 && ca.y<0.0) ? -1.0 : 1.0;
  return s*sqrt( min(dot2(ca),dot2(cb)) );
}

float sdCapsule( vec3 p, vec3 a, vec3 b, float r )
{
  vec3 pa = p - a, ba = b - a;
  float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
  return length( pa - ba*h ) - r;
}

float sdTorus( vec3 p, vec2 t )
{
  vec2 q = vec2(length(p.xz)-t.x,p.y);
  return length(q)-t.y;
}

float opSmoothUnion( float d1, float d2, float k ) {
    float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
    return mix( d2, d1, h ) - k*h*(1.0-h); }


// If you add two objects add them here and then use min() to get the min distance to both objects 
// This function is also often referred to as the sceneSDF() or map()
float GetDist(vec3 p) {
    
    float d1 = sdCappedCone( p , 0.25, 0.25, 0.05);
    float d2 = sdSphere( p - vec3(0.0, 0.25, 0.0), 0.175);
    float d = opSmoothUnion( d1, d2, 0.15 );
    float d3 = sdCappedCylinder( p - vec3(0.0, 0.55, 0.0), 0.2, .025);
    d = opSmoothUnion( d, d3, 0.15 );
    return d;
}


// The render gets a little pixelated when animated
vec3 Transform(vec3 p)
{
   // p.xy *= Rot(iFrame*.005);
   // p.xz *= Rot(iFrame*.005);
  
  return p;
}

// Function to raymarch.  
float RayMarch(vec3 ro, vec3 rd) {
	float dO=0.;
    
    for(int i=0; i<MAX_STEPS; i++) {
    	vec3 p = Transform(ro + rd*dO);
        
        float dS = GetDist(p);
        dO += dS;
        if(dO>MAX_DIST || abs(dS)<SURF_DIST) break;
    }
    return dO;
}

// Function to get the normals at the intersection of the ray and surface of mandelbulb
vec3 GetNormal(vec3 p) {
	float d = GetDist(p);
    vec2 e = vec2(.001, 0);
    
    vec3 n = d - vec3(
        GetDist(p-e.xyy),
        GetDist(p-e.yxy),
        GetDist(p-e.yyx));
    
    return normalize(n);
}

// This function creates a set of basis vectors in local space that can be commpared to the global space
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
    // Remap uvs to center of screen
    vec2 uv = (gl_FragCoord.xy -.5*u_resolution.xy)/u_resolution.y;
	vec2 m = iMouse.xy/u_resolution.xy;
   
    // Camera origin -- best to leave this alone 
    vec3 ro = vec3(0, 3, -3);  
  
    // Location of object--mandelbulb is placed in the center of screen.
    // Note that vec3(0) is equivalent to vec3(0,0,0)
    vec3 lookat = vec3(0);  
  
    // Add a rotation using the mouse
    ro.yz *= Rot(-m.y*3.14+1.);
    ro.xz *= Rot(-m.x*6.2831);
    
   // Adjust this value to change size of the mandelbulb
    float zoom = 1.3;  
  
   // Get the ray direction from camera origin to point on mandelbulb
    vec3 rd = GetRayDir(uv, ro, lookat, zoom);
  
    // Add a background color with gradient
    vec3 col = CG(uv, PURPLE, BLUE, .4);
   
    // Find distance to the mandelbulb
    float d = RayMarch(ro, rd);

    // If we have hit the mandelbulb with a ray, add color
    if(d<MAX_DIST) {
        vec3 p = Transform(ro + rd * d);
        vec3 n = GetNormal(p);
        vec3 r = reflect(rd, n);
        
        // Add diffuse lighing to the scene
        float dif = dot(n, normalize(vec3(1,2,3)))*.5+.5;
        col = vec3(dif);
        
        // Add color to the mandelbulb
        // This is not true color mapping as there is no edge detection
        // Any texture added to the mandelbulb gets added "inside"
        // Change code in the sketch file to clearbeads.png to see the difference
        // The TEXTURE code is provided as a guide to add it to other objects
        col = colXYZ(PURPLE, RED, TEXTURE, n);
    }
    // Add 1.0 for alpha and pass final color to gl_FragColor.  You must pass a vec4 to gl_Fragcolor. 
    gl_FragColor = vec4(col,1.0);
}