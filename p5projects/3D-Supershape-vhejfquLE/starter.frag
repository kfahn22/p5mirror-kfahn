// This sketch is based on the Art of Code tutorial
// How to turn your 2d fractal into 3d
// Ray Marching Starting Point from the Art of Code
// Extrusion/Revolution technique from Inigo Quilez

#ifdef GL_ES
precision mediump float;
#endif

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .001
#define S smoothstep
#define T iTime
#define PI 3.14159
#define aa 1.0
#define bb 1.0
#define total 75.0

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;
// uniform float lat;
// uniform float lon;
uniform float m;
uniform float n1;
uniform float n2;
uniform float n3;

// Color scheme
// The uvs are floating point with a range of [0.0,1.0] so we normalize by dividing by 255.
#define PURPLE vec3(83, 29,109) / 255.
#define RED vec3(191, 18, 97) / 255.
#define ORANGE vec3(251,162, 100) / 255.
#define BLUE vec3(118, 212, 229) / 255.

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

 // Create a normal line that rotates around origin
vec2 N(float angle)
  {
  return vec2( sin(angle), cos(angle) );
}

//float ndot(vec2 a, vec2 b ) { return a.x*b.x - a.y*b.y; }

// vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
//   float k = uv.y*m + m;
//   vec3 col = mix(col1, col2, k);
//   return col;
// }  

// Rotation matrix
mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

// float sdCircle( vec2 p, float r )
// {
//     return length(p) - r;
//}

// function getLat(total) {
//   for (let i = 0; i < total+1; i++) {
//     for (let j = 0; j < total+1; j++) {
//       float perc = (j - 0.0) / (total - 0.0);
//       lat = map(i, 0, total, -HALF_PI, HALF_PI);
//     }
//   }
//   return lat;
// }

// function getLon(total) {
//   float lon;
//   for (let i = 0; i < total+1; i++) {
//     for (let j = 0; j < total+1; j++) {
//       // convert current value to percentage
//       float perc = (j - 0.0) / (total - 0.0);
//       // Do the same operation becakwards with min2 max2
//       lon = perc * ( 2.0 * PI )+ -PI)
//       //lon = map(j, 0, total, -PI, PI);
//     }
//   }
//   return lon;
// }

float superShape(float theta, float m, float n1, float n2, float n3) {
  float t1 = abs((1.0/aa)*cos(m * theta / 4.0));
  t1 = pow(t1, n2);
  float t2 = abs((1.0/bb)*sin(m * theta/4.0));
  t2 = pow(t2, n3);
  float t3 = t1 + t2;
  float r = pow(t3, - 1.0 / n1);
  return r;
}
  
// float getDist(vec3 pos){
//   vec3 ss;
//   float r = 200.0;
//   float lat, lon;
//   for (float i = 0.0; i < total+1.0; i++) {
//       float perc = (i - 0.0) / (total - 0.0);
//       // Reference for map conversion
//       // https://gamedev.stackexchange.com/questions/147890/is-there-an-hlsl-equivalent-to-glsls-map-function
//       // Do the same operation becakwards with min2 max2
//       lat = perc * ( 2.0 * PI ) - PI;
//       float r2 = superShape(lat, m, n1, n2, n3);
//       for (float j = 0.0; j < total+1.0; j++) { 
//         // convert current value to percentage
//         float perc = (j - 0.0) / (total - 0.0);
//         // Do the same operation becakwards with min2 max2
//         lon = perc * ( 2.0 * PI ) - PI;
//         float r1 = superShape(lon, m, n1, n2, n3);
//         float x = r * r1 * cos(lon) * r2 * cos(lat);
//         float y = r * r1 * sin(lon) * r2 * cos(lat);
//         float z = r * r2 * sin(lat);
//         ss = pos - vec3(x,y,z);

//     }
//   }
//   return length(ss);
//}

// in getDist function
// vec2 xy = Koch(vec2(length(p.xy), p.z));
//    vec2 yz = Koch(vec2(length(p.yz), p.x));
//    vec2 xz = Koch(vec2(length(p.xz), p.y));
//    d = max(xy.y, max(yz.y, xz.y));
  
//    d = mix(d, length(p) - .5, 0.5);


// // From the Art of Code Martyn 
// vec2 Koch( vec2 uv) {
  
//     uv.x = abs(uv.x);  // Reflect around y axis
//     uv.y += tan((5./6.)*3.1415)*.5;
//     vec2 n = N((5./6.)*3.1415);
//     float d = dot(uv- vec2(.5,0), n);  //remap to right-most side of Koch curve
//     uv -= n * max(0., d) * 2.; // Code for a reflection about a line
  
//     n = N((2./3.)*3.1415);
//     float scale = 1.;  // keeps track of how mnay times we compress the uvs
//     uv.x += .5; // adjustment to reorient Koch curve
   
//     for (int i = 0; i < 4; i++) {
    
//         // Remap uv so that one line segment [-.5,.5]
//         uv *= 3.;
//         scale *= 3.;
//         // put (0,0) in middle of line segment
//         uv.x -= 1.5; 

//         // Fold x coordinates in half by taking absolute value 
//         uv.x = abs(uv.x);

//         // Substract 0.5 on either side to increase the length of line to 3 units
//         uv.x -= .5;
//         d = dot(uv, n);
//         uv -= n * min(0., d) *  2.;
//      }
//   uv /= scale;
//   return uv;
// }


// // From Inigo Quilez
// float sdOctogon(vec2 p,  float r )
// {
//     const vec3 k = vec3(-0.9238795325, 0.3826834323, 0.4142135623 );
//     p = abs(p);
//     p -= 2.0*min(dot(vec2( k.x,k.y),p),0.0)*vec2( k.x,k.y);
//     p -= 2.0*min(dot(vec2(-k.x,k.y),p),0.0)*vec2(-k.x,k.y);
//     p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);
//     return length(p)*sign(p.y);
// }

float sdStar(in vec2 p, in float r, in int n, in float m)
{
    // next 4 lines can be precomputed for a given shape
    float an = 3.141593/float(n);
    float en = 3.141593/m;  // m is between 2 and n
    vec2  acs = vec2(cos(an),sin(an));
    vec2  ecs = vec2(cos(en),sin(en)); // ecs=vec2(0,1) for regular polygon

    float bn = mod(atan(p.x,p.y),2.0*an) - an;
    p = length(p)*vec2(cos(bn),abs(sin(bn)));
    p -= r*acs;
    p += ecs*clamp( -dot(p,ecs), 0.0, r*acs.y/ecs.y);
    return length(p)*sign(p.x);
}

//Extruded star
//looks kind of like a seed
float getDist(vec3 p) {
   vec3 q = p - vec3(0.0, 0.0, 0.0);
   float s = sdStar(p.xy, 0.2, 8, 4.);
   vec2 w1 = vec2( s, abs(p.z) - 0.1);
   float star =  min(max(w1.x,w1.y),0.0) + length(max(w1,0.0));
   float d = mix(s, length(p) - .3, 0.5);
  
   return d;
}


// Revolution
// if mix with sphere get something that looks like a bee hive
// float GetDist(vec3 p) {
//   // vec3 q = pos - vec3(0.0, 0.0, 0.0);
//   // increasing o creates while 
//   // mixed with sphere it creates a ridged torus
//   // mixed with box, get very interesting shape

//    float o = 0.1; //.1
//    float oo = clamp(o, 0.01, 3.0);
//    vec2 q = vec2( length(p.xz) - oo*sin(2.*iTime) , p.y );

//    //Can use different 2dsdfs
//  //float d = sdHexagram(q, 0.3);
//   //float d = sdRoundedX(q, 0.4, 0.1);
//   float d = sdStar(q, 0.3, 15, 6.);
 
   
 
//    d = mix(d, sdBox(p, vec3(0.2)), 0.3);
//   //d = mix(d, length(p) - .5, 0.2);
//    return d;
// }

float RayMarch(vec3 ro, vec3 rd) {
	float dO=0.0;
    
    for(int i=0; i<MAX_STEPS; i++) {
    	vec3 p = ro + rd*dO;
        float dS = getDist(p);
        dO += dS;
        if(dO>MAX_DIST || abs(dS)<SURF_DIST) break;
    }
    
    return dO;
}

vec3 GetNormal(vec3 p) {
	float d = getDist(p);
    vec2 e = vec2(.001, 0);
    
    vec3 n = d - vec3(
        getDist(p-e.xyy),
        getDist(p-e.yxy),
        getDist(p-e.yyx));
    
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
  
    vec3 ro = vec3(0, 3, -3);
    ro.yz *= Rot(-m.y*3.14+1.);
    ro.xz *= Rot(-m.x*6.2831);
    
    vec3 rd = GetRayDir(uv, ro, vec3(0,0.,0), 2.0);
    vec3 col = vec3(0);

     
   float d = RayMarch(ro, rd);

    if(d<MAX_DIST) {
        vec3 p = ro + rd * d;
        vec3 n = GetNormal(p);
        vec3 r = reflect(rd, n);

        float dif = dot(n, normalize(vec3(1,2,3)))*.5+.5;
        col = vec3(dif);
        //col = n*.5 + .5;
        col += PURPLE;
        
    } 
      
   col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}