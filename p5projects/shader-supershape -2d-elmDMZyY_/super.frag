// This file renders the supershape
// The code for the superformula and supershape3D are based primarily on Daniel Shiffman's 3d Supershape Coding CHallenge
// The code for the spherical coordinates is based on the one from 
// Mandelbulb Coding Challenge by Daniel Shiffman 
// https://www.youtube.com/watch?v=NJCiUVGiNyA

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
#define RASPBERRY vec3(236,1,90) / 255.

vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}  

// Spherical function modified from Daniel Shiffman
vec2 Spherical( vec2 pos) 
{
   float r = sqrt(pos.x*pos.x + pos.y*pos.y);
   float theta = atan(pos.y, pos.x);
   vec2 w = vec2(r, theta);
   return w;
}

float superFormula(float theta) {
  float t1 = abs((1.0/aa) * cos(m * theta / 4.0));
  t1 = pow(t1, n2);
  
  float t2 = abs((1.0/bb) * sin(m * theta / 4.0));
  t2 = pow(t2, n3);
  
  float t3 = t1 + t2;
  float r = pow(t3, -1.0 / n1);
  return r;
}

float Supershape2D( vec2 uv ) {
  vec2 q;
  float d = Spherical( uv ).x;
  float theta = Spherical( uv ).y;
  float radius = superFormula( theta );
  q.x = rr * radius * cos(theta);
  q.y = rr * radius * sin(theta);
  return d -= length(q); 
}

void main( )
{
    vec2 uv = (gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
	vec2 m = iMouse.xy/u_resolution.xy;
    vec3 col = vec3(0);
    
    col = colorGradient(uv,BLUE, PURPLE, 0.75);
    //col = ORANGE;
  
    float d = Supershape2D( uv );
    float s = S(0.008, 0.0, d);
    
    vec3 col1 = vec3(re,gr,bl); 
    col += s*vec3(re,gr,bl); 
   // col = (1.0-s)*col + s*col1;
    col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}