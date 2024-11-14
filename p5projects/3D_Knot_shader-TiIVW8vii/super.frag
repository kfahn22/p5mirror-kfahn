// This file renders the supershape
// The code for the superformula and supershape3D are based primarily on Daniel Shiffman's 3d Supershape Coding CHallenge

// The code for the spherical coordinates is based on the one from 
// Mandelbulb Coding Challenge by Daniel Shiffman 
// https://www.youtube.com/watch?v=NJCiUVGiNyA
// Exploration of how to port from Shadertoy to P5.js
// https://www.youtube.com/watch?v=7ZIfXu_iPv4

// Base code based on the Ray Marching Starting Point from the Art of Code
// https://www.youtube.com/watch?v=PGtv-dBi2wE


 // let r = 100 * (0.8 + 1.6 * sin(6 * beta));
 //    let theta = 2 * beta;
 //    let phi = 0.6 * PI * sin(12 * beta);


#ifdef GL_ES
precision mediump float;
#endif

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .001
#define S smoothstep
#define T iTime
#define PI 3.14159
#define iter 10


// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;

// supershape parameters
uniform float aa;
uniform float bb;
uniform float rr; 
uniform float m;  
uniform float n1;
uniform float n2;
uniform float n3;
uniform float re;  // value for red
uniform float gr;  // value for green
uniform float bl;  // value for blue

// Add color
// The uvs are floating point with a range of [0.0,1.0] so we normalize by dividing by 255.
#define PURPLE vec3(83, 29,109) / 255.
#define RED vec3(191, 18, 97) / 255.
#define ORANGE vec3(251,162, 100) / 255.
#define BLUE vec3(118, 212, 229) / 255.
#define TEAL vec3(11, 106, 136) / 255.

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

// Rotation matrix
mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

//Spherical function from Daniel Shiffman
//I modified the function to change theta bsed on code from https://www.shadertoy.com/view/4llGWM
// vec3 Spherical( vec3 pos) 
// {
//    float r = sqrt(pos.x*pos.x + pos.y*pos.y + pos.z*pos.z);
//    //float theta = atan( sqrt(pos.x*pos.x + pos.y*pos.y), pos.z);
//    float theta =clamp(pos.z/r, -PI/2.0, PI/2.0);
//    float phi = clamp(atan(pos.y, pos.x), -PI, PI);
//    vec3 w = vec3(r, theta, phi);
//    return w;
// }

// from Inigo Quilez
float sdSphere( vec3 p, float s )
{
  return length(p)-s;
}


// uniform int iterations;

// for(int i=0; i<10; i++){
//      if(i<iterations){
//           //do your thing...
//      }
// }


// Paul Bourke
// int main(argc,argv)
// int argc;
// char **argv;
// {
//    int i;
//    double x,y,z,xlast,ylast,zlast;
//    double mu;

//    for (i=0;i<=NSEGMENTS;i++) {
//       mu = i * TWOPI / (double)NSEGMENTS;
//       x = 10 * (cos(mu) + cos(3*mu)) + cos(2*mu) + cos(4*mu);
//       y = 6 * sin(mu) + 10 * sin(3*mu);
//       z = 4 * sin(3*mu) * sin(5*mu/2) + 4*sin(4*mu) - 2 * sin(6*mu);

//       /*
//          Write the geometry in any format you like
//          Here I create sphere and cylinder combinations for Radiance
//       */
//       if (i < NSEGMENTS)
//          printf("surf sphere s%d\n0 0 4 %g %g %g %g\n",i,x,y,z,RADIUS);
//       if (i != 0)
//          printf("surf cylinder c%d\n 0 0 7 %g %g %g %g %g %g %g\n",
//             i,xlast,ylast,zlast,x,y,z,RADIUS);
//       xlast = x;
//       ylast = y;
//       zlast = z;
//    }
// }





float Knot( vec3 p ) {
   float beta = 0.01; // beta < PI
   float dd = 0.0;
   float d;
   for (int i = 0; i < 4; i ++)
      {
      vec3 offset;
      float r = 0.01 * (0.8 + 1.6 * sin(6.0 * beta));
      float theta = 2.0 * beta;
      float phi = 0.6 * PI * sin(12.0 * beta);
      vec3 w = vec3(r, theta, phi);
      offset.x = r * cos(phi) * cos(theta);
      offset.y = r * cos(phi) * sin(theta);
      offset.z = r * sin(phi);
      d = sdSphere(p, 0.05);
      dd = max(dd, d);
      beta += 0.1;
      }
   return dd;
}


/////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

float GetDist(  vec3 p ) {
   float d = Knot( p );
  return d;
}

// Both methods are the same from this point on
float RayMarch(vec3 ro, vec3 rd) {
	float dO=0.;
    float dS;
    for(int i=0; i<MAX_STEPS; i++) {
      for (int j=0; j<4;  j++) {
    	vec3 p = ro + rd*dO;
        dS = GetDist(p);
        dO += dS;
        if(dO>MAX_DIST || abs(dS)<SURF_DIST) break;
      } 
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
    
    float lens = 1.0;
    vec3 rd = GetRayDir(uv, ro, vec3(0,0.,0), lens);
    col = colorGradient(uv,BLUE, PURPLE, 0.75);
    //col = ORANGE;
    
    float d = RayMarch(ro, rd);

    if(d<MAX_DIST) {
        vec3 p = ro + rd * d;
        vec3 n = GetNormal(p);
        vec3 r = reflect(rd, n);

        float dif = dot(n, normalize(vec3(1,2,3)))*.5+.5;
        vec3 c = vec3(dif);
         
       // col = vec3(dif*0.8, 0.0, 1.0 ); //very nice purple
       // col = vec3(0.5, dif*0.8, 1.0 ); // purple
       // col = vec3(0.0, 0.5*dif, dif*1.0); // aqua
       col = vec3( dif*re, dif*gr, dif*bl );
    } 
       
    col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}