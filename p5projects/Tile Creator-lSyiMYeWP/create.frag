// SDFs from Inigo Quilez
// https://iquilezles.org/articles/distfunctions2d/

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float colorAr;
uniform float colorAg;
uniform float colorAb;
uniform float colorBr;
uniform float colorBg;
uniform float colorBb;
uniform float colorCr;
uniform float colorCg;
uniform float colorCb;

uniform float shape1;
uniform float shape2;
uniform float grid;
uniform float rad1;
uniform float rad2;
uniform vec2 offset1;
uniform vec2 offset2;

#define sm = 1.0;
#define S smoothstep
#define CG colorGradient
#define PI 3.14159

// Define choosen colors
#define colA vec3(colorAr, colorAg, colorAb)/255.
#define colB vec3(colorBr, colorBg, colorBb)/255.

// Grid Colors
#define RED vec3(255,0,0)/255.

// Tile colors

#define GREEN vec3(83,255,69)/255.
#define LAVENDER vec3(163,147,191)/255.
#define ROSE vec3(244,91,105)/255.
#define ORANGE vec3(255,82,27)/255.
#define YELLOW vec3(255,177,0)/255.
#define GREY vec3(89,89,89)/255.
#define BLUE vec3(30,46,222)/255.


// Coding Train colors
#define PURPLE vec3(63,46,86)/255.
#define MAUVE vec3(187,182,223)/255.
#define LTPURPLE vec3(198,200,238)/255.
#define RASPBERRY vec3(222,13,146)/255.

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

// Copied from Inigo Quilez
float sdSegment( vec2 uv, vec2 a, vec2 b) {
  vec2 pa = uv-a, ba = b-a;
  float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
  return length( pa-ba*h );
}

float sdCircle( vec2 uv, float r) {
  return length(uv) - r;
} 

//From Inigo Quilez
float sdBox( vec2 uv, vec2 b )
{
    vec2 d = abs(uv)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

// From Inigo Quilez
float sdRoundedBox( vec2 uv, vec2 b, vec4 r) {
  r.xy = (uv.x>0.0) ? r.xy : r.zw;
  r.x = (uv.y>0.0) ? r.x : r.y;
  vec2 q = abs(uv) - b + r.x;
  return min( max(q.x, q.y), 0.0) + length(max(q, 0.0) ) - r.x;
}

// From Inigo Quilez
float sdEquilateralTriangle( in vec2 p )
{
    const float k = sqrt(3.0);
    p.x = abs(p.x) - 1.0;
    p.y = p.y + 1.0/k;
    if( p.x+k*p.y>0.0 ) p = vec2(p.x-k*p.y,-k*p.x-p.y)/2.0;
    p.x -= clamp( p.x, -2.0, 0.0 );
    return -length(p)*sign(p.y);
}

// // From Inigo Quilez
// float sdHexagram( vec2 p, float r )
// {
//     const vec4 k = vec4(-0.5,0.8660254038,0.5773502692,1.7320508076);
//     p = abs(p);
//     p -= 2.0*min(dot(k.xy,p),0.0)*k.xy;
//     p -= 2.0*min(dot(k.yx,p),0.0)*k.yx;
//     p -= vec2(clamp(p.x,r*k.z,r*k.w),r);
//     return length(p)*sign(p.y);
// }

// Function to check for symmetry of design
vec3 checkSymmetry( vec2 uv, float g ) {
    vec3 col =  vec3(0.0);
    float d1 = sdSegment(uv, vec2(-.5, .0), vec2(0.5, .0));
    float l1 = S(.03, .0, d1); // horizontal center line
    float d2 = sdSegment(uv, vec2(-.5, -.25), vec2(0.5, -.25));
    float l2 = S(.03, .0, d2); // horizontal line
    float d3 = sdSegment(uv, vec2(-.5, .25), vec2(0.5, .25));
    float l3 = S(.03, .0, d3); // horizontal line
    float d4 = sdSegment(uv, vec2(-.5, -.125), vec2(0.5, -.125));
    float l4 = S(.008, .0, d4); // horizontal line
    float d5 = sdSegment(uv, vec2(-.5, .125), vec2(0.5, .125));
    float l5 = S(.008, .0, d5); // horizontal line
    float d6 = sdSegment(uv, vec2(-.5, -.0625), vec2(0.5, -.0625));
    float l6 = S(.008, .0, d6); // horizontal line
    float d7 = sdSegment(uv, vec2(-.5, .0625), vec2(0.5, .0625));
    float l7 = S(.008, .0, d7); // horizontal line  
    float d8 = sdSegment(uv, vec2(-.5, -.1875), vec2(0.5, -.1875));
    float l8 = S(.008, .0, d8); // horizontal line
    float d9 = sdSegment(uv, vec2(-.5, .1875), vec2(0.5, .1875));
    float l9 = S(.008, .0, d9); // horizontal line  
    float d10 = sdSegment(uv, vec2(-.5, -.3125), vec2(0.5, -.3125));
    float l10 = S(.008, .0, d10); // horizontal line
    float d11 = sdSegment(uv, vec2(-.5, .3125), vec2(0.5, .3125));
    float l11 = S(.008, .0, d11); // horizontal line  
    float d12 = sdSegment(uv, vec2(-.5, -.375), vec2(0.5, -.375));
    float l12 = S(.008, .0, d12); // horizontal line
    float d13 = sdSegment(uv, vec2(-.5, .375), vec2(0.5, .375));
    float l13 = S(.008, .0, d13); // horizontal line  
    float d14 = sdSegment(uv, vec2(-.5, -.4375), vec2(0.5, -.4375));
    float l14 = S(.008, .0, d14); // horizontal line
    float d15 = sdSegment(uv, vec2(-.5, .4375), vec2(0.5, .4375));
    float l15 = S(.008, .0, d15); // horizontal line  
    // vec3 l = (l1 + l2 + l3) * RED  + ( l4 + l5 + l6 + l7 + l8 + l9 
    //       + l10 + l11 + l12 + l13 + l14 + l15) * YELLOW;
    vec3 l = (l1 + l2 + l3) * BLUE;
    // vertical lines
    float d16 = sdSegment(uv, vec2(0.0, -0.5), vec2(0.0, 0.5));
    float v16 = S(.03, .0, d16); // vertical center line
    float d17 = sdSegment(uv, vec2(0.25, 0.5), vec2(.25, -0.5));
    float v17 = S(.03, .0, d17); // vertical  line
    float d18 = sdSegment(uv, vec2(-0.25, 0.5), vec2(-0.25, -0.5));
    float v18 = S(.03, .0, d18); // vertical  line
    float d20 = sdSegment(uv, vec2(0.125, -.5), vec2(0.125, .5));
    float v20 = S(.008, .0, d20); // vertical line
    float d21 = sdSegment(uv, vec2(-0.125, .5), vec2(-0.125, -.5));
    float v21 = S(.008, .0, d21); // vertical  line
    float d22 = sdSegment(uv, vec2(0.0625, -.5), vec2(0.0625, .5));
    float v22 = S(.008, .0, d22); // vertical line
    float d23 = sdSegment(uv, vec2(-0.0625, .5), vec2(-0.0625, -.5));
    float v23 = S(.008, .0, d23); // vertical  line
    float d24 = sdSegment(uv, vec2(.1875, .5), vec2(.1875, -.5));
    float v24 = S(.008, .0, d24); // vertical  line
    float d25 = sdSegment(uv, vec2(-0.1875, -.5), vec2(-0.1875, .5));
    float v25 = S(.008, .0, d25); // vertical line
    float d26 = sdSegment(uv, vec2(.3125, .5), vec2(.3125, -.5));
    float v26 = S(.008, .0, d26); // vertical  line
    float d27 = sdSegment(uv, vec2(.375, .5), vec2(.375, -.5));
    float v27 = S(.008, .0, d27); // vertical  line
    float d28 = sdSegment(uv, vec2(-0.375, -.5), vec2(-0.375, .5));
    float v28 = S(.008, .0, d28); // vertical line
    float d29 = sdSegment(uv, vec2(-.3125, .5), vec2(-.3125, -.5));
    float v29 = S(.008, .0, d29); // vertical  line
    float d30 = sdSegment(uv, vec2(.4375, .5), vec2(.4375, -.5));
    float v30 = S(.008, .0, d30); // vertical  line
    float d31 = sdSegment(uv, vec2(-.4375, .5), vec2(-.4375, -.5));
    float v31 = S(.008, .0, d31); // vertical  line
    // vec3 v = (v16 + v17 + v18) * RED + ( v20 + v21 + v22
    //  + v23 + v24 + v25 + v26 + v27 + v28 + v29 + v30 + v31) * YELLOW;
    vec3 v = (v16 + v17 + v18) * BLUE ;
    if (g == 1.0) {
    return col += l + v;
    } else {
      return col;
    }
}

// Functions to call the sdf and allow for translations
float circle(vec2 uv, vec2 os, float r ) {
  float s1 = sdCircle( uv - os, r );
  return  S(0.008, 0.0, s1);
}

float square( vec2 uv, vec2 os, vec2 s ) {
  float s1 = sdBox( uv - os, s );
  return  S(0.008, 0.0, s1);
}

float triangle( vec2 uv, vec2 os) {
  float s1 = sdEquilateralTriangle( uv - os);
  return  S(0.008, 0.0, s1);
}
  
  
// Choose the shape for each of the canvases.
vec3 chooseShape( float shapechoice1, float shapechoice2, vec2 uv, vec3 col1, vec3 col2 ) {
  vec3 col = vec3(0.0);
  if (shapechoice1 == 2.0 && shapechoice2 == 2.0) {
    col += col1;
  }
  if (shapechoice1 == 0.0 && shapechoice2 == 0.0) {
    float c1 = circle( uv, offset1, rad1 );
    float c2 = circle( uv, vec2(offset1.x + offset2.x, offset1.y + offset2.y), rad2 );
    float c = c1 - c2;
    col += (1. - c) * col1 + c * col2;
  }
  else if (shapechoice1 == 0.0 && shapechoice2 == 1.0) {
    float cb1 = circle( uv, offset1, rad1 );
    float cb2 = square( uv, vec2(offset1.x + offset2.x, offset1.y + offset2.y), vec2(rad2, rad2));
    float cb = cb1 - cb2;
    col += (1. - cb) * col1 + cb * col2;
  }
 else if (shapechoice1 == 1.0 && shapechoice2 == 0.0) {
   float cc1 = square( uv, offset1, vec2(rad1, rad1) );
   float cc2 = circle( uv, vec2(offset1.x + offset2.x, offset1.y + offset2.y), rad2 );
   float cc = cc1 - cc2;
   col += (1. - cc) * col1 + cc * col2;
  }
  else if (shapechoice1 == 1.0 && shapechoice2 == 1.0) {
    float cd1 = square( uv, offset1, vec2(rad1, rad1) );
    float cd2 = square( uv, vec2(offset1.x + offset2.x, offset1.y + offset2.y),  vec2(rad2, rad2) );
    float cd = cd1 - cd2;
    col += (1. - cd) * col1 + cd * col2;
  }
else if (shapechoice1 == 2.0 && shapechoice2 == 1.0) {
    float cd1 = triangle( uv, offset1 );
    float cd2 = square( uv, vec2(offset1.x + offset2.x, offset1.y + offset2.y),  vec2(rad2, rad2) );
    float cd = cd1 - cd2;
    col += (1. - cd) * col1 + cd * col2;
  }
 return col;
}

void main()
{
     vec2 uv = (gl_FragCoord.xy -.5*u_resolution.xy)/u_resolution.y;

     vec3 col = vec3(0);

     vec3 cs = checkSymmetry( uv, grid);
     col += cs;

     col += chooseShape(shape1, shape2, uv, colA, colB);

    gl_FragColor = vec4(col,1.0);
}
