// This file how to mix shapes 
// This is based on based on a tutorial by Martyn Steinrucken
// https://www.youtube.com/watch?v=__dSLc7-Cpo

// Base code based on the Ray Marching Starting Point from the Art of Code
// https://www.youtube.com/watch?v=PGtv-dBi2wE

#ifdef GL_ES
precision mediump float;
#endif

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .001
#define S smoothstep
#define T iTime
#define PI 3.14159

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;
uniform sampler2D tex0;
uniform float shape1;
uniform float shape2;
uniform float scale;  // scale
uniform float mv;  // mix value

// Add color
// The uvs are floating point with a range of [0.0,1.0] so we normalize by dividing by 255.
#define EGGPLANT vec3(87, 31, 78) / 255.
#define PURPLE vec3(255, 0, 0) / 255.
#define BLUE vec3(79,117,155) / 255.
#define OCEAN vec3(146,201,177) / 255.
#define MINT vec3(162, 250, 163) / 255.

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

vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}  

float ndot(vec2 a, vec2 b ) { return a.x*b.x - a.y*b.y; }

// Rotation matrix
mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

// 2d Circle and Box SDFs from Inigo Quilez
float sdCircle( vec2 uv, float r) {
  return length(uv) - r;
} 

// 3d SDFs from Inigo Quilez
float sdBox(vec3 p, vec3 s) {
    p = abs(p)-s;
	return length(max(p, 0.))+min(max(p.x, max(p.y, p.z)), 0.);
}

float sdSphere(vec3 p, float r) {
	return length(p) - r;
}

float hyperbolicTan( float theta) {
    float e = 2.71828;
    float l = pow(e, 2.0 * theta);
    return (l - 1.0) / (l + 1.0);
}

// a and b are parameters of the gear curve, n is the # of spokes
// a will determine the depth of the spikes
float sdGear( vec2 uv, float a, float b, float n) {
    float theta = atan(uv.y, uv.x);
    float r = (a/b)*(hyperbolicTan(b * sin(n*theta))) ;
    float d = sdCircle(uv, 0.4);
    
    //return d + length(uv) - r;
    return r;
}

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
// Mix 2D sdf with 3D sdf
// From the Art of Code
// Mix two different SDFs
float GetDist(vec3 p) {
    float d, s;
    // Can move the shape by subtracting a vec3()
     vec3 q = p - vec3(0.0, 0.0, 0.0);
     float mv = 0.4;
    
    // Mix gear either a sphere or cube
      d = sdGear(q.xz, 0.3, 10.0, 10.0);
      d = mix(d, sdSphere(p, 0.5), mv);
      //d = mix(d, sdBox(p, vec3(0.5)), mv);
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
    vec2 uv = (gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
	vec2 m = iMouse.xy/u_resolution.xy;
    vec3 col = vec3(0);
    
    vec3 ro = vec3(0, 3, -3);
    ro.yz *= Rot(-m.y*3.14+1.);
    ro.xz *= Rot(-m.x*6.2831);
    
    
    vec3 rd = GetRayDir(uv, ro, vec3(0,0.,0), 2.0);
    // col = colorGradient(uv, OCEAN, EGGPLANT, 0.75);
    col = EGGPLANT;

    float d = RayMarch(ro, rd);

    if(d<MAX_DIST) {
        vec3 p = ro + rd * d;
        vec3 n = GetNormal(p);
        vec3 r = reflect(rd, n);

        float dif = dot(n, normalize(vec3(1,2,3)))*.5+.5;
        vec3 c = vec3(dif);
        col = (1.0 - c)*col + c*BLUE; 
        //col = (1.0 - m)*col + m * EGGPLANT;
    } 
       
    col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}