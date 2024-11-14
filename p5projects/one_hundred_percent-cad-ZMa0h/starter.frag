// Code written for the MDN 100% completion moment
// Basic SDFs from Inigo Quilez
// https://iquilezles.org/articles/distfunctions2d/

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;

#define S smoothstep
#define CG colorGradient
#define PI 3.14159
#define DARK vec3(11,19,39)/255.
#define NAVY vec3(0,3,105)/255.

vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}  

// From from Inigo Quilez
float sdSegment( vec2 uv, vec2 a, vec2 b) {
  vec2 pa = uv-a, ba = b-a;
  float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
  return length( pa-ba*h );
}

// From from Inigo Quilez
float sdEllipse( in vec2 p, in vec2 ab )
{
    p = abs(p); if( p.x > p.y ) {p=p.yx;ab=ab.yx;}
    float l = ab.y*ab.y - ab.x*ab.x;
    float m = ab.x*p.x/l;      float m2 = m*m; 
    float n = ab.y*p.y/l;      float n2 = n*n; 
    float c = (m2+n2-1.0)/3.0; float c3 = c*c*c;
    float q = c3 + m2*n2*2.0;
    float d = c3 + m2*n2;
    float g = m + m*n2;
    float co;
    if( d<0.0 )
    {
        float h = acos(q/c3)/3.0;
        float s = cos(h);
        float t = sin(h)*sqrt(3.0);
        float rx = sqrt( -c*(s + t + 2.0) + m2 );
        float ry = sqrt( -c*(s - t + 2.0) + m2 );
        co = (ry+sign(l)*rx+abs(g)/(rx*ry)- m)/2.0;
    }
    else
    {
        float h = 2.0*m*n*sqrt( d );
        float s = sign(q+h)*pow(abs(q+h), 1.0/3.0);
        float u = sign(q-h)*pow(abs(q-h), 1.0/3.0);
        float rx = -s - u - c*4.0 + 2.0*m2;
        float ry = (s - u)*sqrt(3.0);
        float rm = sqrt( rx*rx + ry*ry );
        co = (ry/sqrt(rm-rx)+2.0*g/rm-m)/2.0;
    }
    vec2 r = ab * vec2(co, sqrt(1.0-co*co));
    return length(r-p) * sign(p.y-r.y);
}


// From Inigo Quilez
float sdBox( vec2 uv, vec2 b )
{
    vec2 d = abs(uv)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

float Zero( vec2 uv, float r) {
  return abs( sdEllipse( uv, vec2(.0425,.085)) ) - .001;
}

vec3 sdOutline( vec2 uv) {
  vec3 col = vec3(0);
  float d1 = abs( sdBox(uv, vec2(.30, .17)) ) - .001;
  float m1 = S(.008, .0, d1);
  float d2 = abs( sdBox(uv, vec2(.32, .19)) ) - .001;
  float m2 = S(.008, .0, d2);
  return col += m1 + m2;
}


vec3 percent( vec2 uv, float scale ) {
   vec3 col = vec3(0);
   float d1 = sdSegment( uv, vec2(.00, -.09), vec2(.1, 0.1) );
   float s1 = S(.008, .0, d1);
   vec2 gv = uv*scale;
   float d2 = Zero(gv - vec2(.03, .1), .01 );
   float s2 = S(.008, .0, d2);
   float d3 = Zero(gv - vec2(.18, -.1), .01 );
   float s3 = S(.008, .0, d3);
   col += s1 + s2 + s3;
   return col;
}

vec3 complete( vec2 uv) {
    vec3 col = vec3(0);
    float d1 = sdSegment( uv,  vec2(-.2, .09), vec2(-.2, -.09) );
    float s1 = S(.008, .0, d1);
    float d2 = Zero( uv - vec2(-.11, 0.), .01 );
    float s2 = S(.008, .0, d2);
    float d3 = Zero( uv - vec2(.02, 0.), .01 );
    float s3 = S(.008, .0, d3);
    vec3 percent = percent( uv - vec2(0.10, 0.), 2.);
    vec3 box = sdOutline(uv);
    col += s1 + s2 + s3 + percent + box;
    return col;
}

void main()
{
    vec2 uv = (gl_FragCoord.xy - .5*u_resolution.xy)/u_resolution.y;

    vec3 col = DARK;
  
    vec3 col1 = complete(uv - vec2(0.01, 0.00));

   col += col1;
   //col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}
