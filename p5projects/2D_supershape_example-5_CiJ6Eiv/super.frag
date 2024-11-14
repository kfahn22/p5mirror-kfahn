// This file renders the supershape
// The code for the superformula and supershape2D are based primarily on Daniel Shiffman's 2d Supershape Coding CHallenge
// The code for the spherical coordinates is based on the one from 
// Mandelbulb Coding Challenge by Daniel Shiffman 
// https://www.youtube.com/watch?v=NJCiUVGiNyA

// Base code based on the Ray Marching Starting Point from the Art of Code
// https://www.youtube.com/watch?v=PGtv-dBi2wE

#ifdef GL_ES
precision mediump float;
#endif

#define S smoothstep
#define T iTime
#define PI 3.14159

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;

// supershape parameters
uniform float a;
uniform float b;
uniform float s; 
uniform float m;  
uniform float n1;
uniform float n2;
uniform float n3;

vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}  

vec2 cart2polar(in vec2 st) {
    return vec2(atan(st.y, st.x), length(st));
}

// float superFormula(in float theta, in float a, in float b, in float n1, in float n2, in float n3, in float m) {
//   float t1 = abs((1.0/a) * cos(m * theta / 4.0));
//   t1 = pow(t1, n2);
  
//   float t2 = abs((1.0/b) * sin(m * theta / 4.0));
//   t2 = pow(t2, n3);
  
//   float t3 = t1 + t2;
//   float r = pow(t3, -1.0 / n1);
//   return r;
// }

// float supershapeSDF( in vec2 st, in float s, in float a, in float b, in float n1, in float n2, in float n3, in float m ) {
//   vec2 q;
//   float d = spherical( st ).x;
//   float theta = spherical( st ).y;
//   float r = superFormula(theta, a, b, n1, n2, n3, m);
//   q.x = s * r * cos(theta);
//   q.y = s * r * sin(theta);
//   return d -= length(q); 
// }

float superShapeSDF( in vec2 st, in float s, in float a, in float b, in float n1, in float n2, in float n3, in float m ) {
    //st = st * 2. - 1.0;
    vec2 polar = cart2polar( st );
    float d = polar.y;
    float theta = polar.x;
    float t1 = abs((1.0/a) * cos(m * theta / 4.0));
    t1 = pow(t1, n2);
    float t2 = abs((1.0/b) * sin(m * theta / 4.0));
    t2 = pow(t2, n3);
    float t3 = t1 + t2;
    float r = pow(t3, -1.0 / n1);
    vec2 q = s * r * vec2(cos(theta), sin(theta));
    return d - length(q); 
}

void main( )
{
    vec2 uv = (gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
	vec2 m = iMouse.xy/u_resolution.xy;
    vec3 col = vec3(0);
  
    float d = superShapeSDF( uv, 0.2, 1.0, 1.0, 6.0, 1.0, 1.0, 5.0);
    float s = S(0.008, 0.0, d);
    
    col += s*vec3(1);
    col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}