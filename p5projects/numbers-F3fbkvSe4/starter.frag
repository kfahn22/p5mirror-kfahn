// Ported to P5.js from "RayMarching starting point" 
// by Martijn Steinrucken aka The Art of Code/BigWings - 2020
// The MIT License
// YouTube: youtube.com/TheArtOfCodeIsCool

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;
uniform sampler2D tex0;

#define S smoothstep
#define CG colorGradient
#define HL horizontalLine
#define VL verticalLine
#define DL diagonalLine
#define PI 3.14159
#define BLUE vec3(2,8,135)/255.
#define PINK vec3(225,187,201)/255.
#define PURPLE vec3(177,74,237)/255.

vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}  
  
float N21( vec2 p) {
    return fract( sin(p.x*100. + p.y*6574.)*5674. );
}

// // Copied from Inigo Quilez
// float sdSegment( vec2 uv, vec2 a, vec2 b) {
//   vec2 pa = uv-a, ba = b-a;
//   float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
//   return length( pa-ba*h );
// }

float SmoothNoise(vec2 uv) {
   // lv goes from 0,1 inside each grid
   // check out interpolation for dummies
    vec2 lv = fract(uv);
   
   //vec2 lv = smoothstep(0., 1., fract(uv*10.));  // create grid of boxes 
    vec2 id = floor(uv); // find id of each of the boxes
     lv = lv*lv*(3.-2.*lv); 
    
    // get noise values for each of the corners
    // Use mix function to join together
    float bl = N21(id);
    float br = N21(id+vec2(1,0));
    float b = mix (bl, br, lv.x);
    
    
    float tl = N21(id + vec2(0,1));
    float tr = N21(id+vec2(1,1));
    float t = mix (tl, tr, lv.x);
    
    return mix(b, t, lv.y);
}

float SmoothNoise2 (vec2 uv) {
   float c = SmoothNoise(uv*4.);
     // Layer(or octave) of noise
    // Double frequency of noise; half the amplitude
    c += SmoothNoise(uv*8.)*.5;
    c += SmoothNoise(uv*16.)*.25;
    c += SmoothNoise(uv*32.)*.125;
    c += SmoothNoise(uv*64.)*.0625;
    
    return c/ 2.;  // have to normalize or could go past 1
  
}
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


// Shape functions from Inigo Quilez
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
// vec3 verticalLine(vec2 uv, float w, float l) {
//   vec3 col = vec3(0);
//   float d = length(uv - vec2(-0.01, clamp(-l, l, uv.y) ) );
//   float m = S(w, .0, d);
//  // col += m;
//   return col += m;
// }

// vec3 horizontalLine(vec2 uv, float w, float l) {
//   vec3 col = vec3(0);
//   float d = length(uv - vec2(clamp(-l, l, uv.x), -0.01) );
//   float m = S(w, 0., d);
//   return col += m;
// }

// vec3 diagonalLine(vec2 uv) {
//   vec3 col = vec3(0);
//   float a = PI * .85;
 
//   float w = .005; // determines the width of the line
//   float d1 = dot(uv - vec2(-w, w), vec2(cos(a), sin(a) ) );
//   float d2 = dot(uv + vec2(-w, w), vec2(cos(a), sin(a) ) );
//   // change the length of line
//   float l = .1;
//   float d3 = uv.y - l;
//   float d4 = uv.y + l;
  
//   float m1 = S(-w, 0., d1);
//   float m2 = S(-w, 0., d2);
//   float m3 = S(-w, 0., d3);
//   float m4 = S(-w, 0., d4);
//   col +=  m3 - m4;
//   col *=  m1 - m2;
//   return col;
// }

// float sdRoundedBox( vec2 uv, vec2 b, vec4 r) {
//   r.xy = (uv.x>0.0) ? r.xy : r.zw;
//   r.x = (uv.y>0.0) ? r.x : r.y;
//   vec2 q = abs(uv) - b + r.x;
//   return min( max(q.x, q.y), 0.0) + length(max(q, 0.0) ) - r.x;
// }

// vec3 Zero( vec2 uv) {
//    vec3 col = vec3(0);
//    float s1 = sdRoundedBox( uv, vec2(.05,.1), vec4(.05, .05, .05, .05));
//    float m1 = S(.008, .0, s1);
    
//    float s2 = sdRoundedBox( uv, vec2(.04,.09), vec4(.05, .05, .05, .05));
//    float m2 = S(.008, .0, s2);
//   return col + m1 - m2;
// }

// vec3 SmZero( vec2 uv) {
//    vec3 col = vec3(0);
//    float s1 = sdRoundedBox( uv, vec2(.025,.035), vec4(.03, .03, .03, .03));
//    float m1 = S(.008, .0, s1);
    
//    float s2 = sdRoundedBox( uv, vec2(.02, .03), vec4(.025, .025, .025, .025));
//    float m2 = S(.008, .0, s2);
//   return col + m1 - m2;
// }

// vec3 Box( vec2 uv, float xorg, float yorg, float w, float h) {
//    vec3 col = vec3(0);
//    float y = yorg;
//    float x  = xorg;
//    vec3 l1 = HL(abs(uv)- vec2(.0, y + .00), 0.005, w );
//    vec3 l2 = HL(abs(uv)- vec2(.0, y + .02), 0.005, w + .03);
//    vec3 l3 = VL( abs(uv)- vec2(x, .00), 0.005, h );
//    vec3 l4 = VL( abs(uv)- vec2(x + .03, .0), 0.005, h + .02 );
//    col = l1 + l2 + l3 + l4;
//    return col;
// }

// vec3 percent( vec2 uv ) {
//    vec3 col = vec3(0);
//    vec3 l1 = DL(uv - (vec2(.05, .0)));
//    vec3 z1 = SmZero( uv - vec2(.03, .05) );
//    vec3 z2 = SmZero( uv - vec2(.08, -.05) );
//    col += l1 + z1 + z2;
  
//    return col;
// }

// vec3 complete( vec2 uv) {
//     vec3 col = vec3(0);
//     vec3 one = VL( uv - vec2(-.2, .0), 0.01, 0.09 );
//     col += one;
//     vec3 zero1 = Zero( uv - vec2(-.12, 0.));
//     col += zero1;
//     vec3 zero2 = Zero( uv - vec2(.02, 0.));
//     col += zero2;
//     vec3 percent = percent( uv - vec2(0.10, 0.));
//     col += percent;
//     vec3 box = Box( uv, .39, .18, 0.38, 0.17);
//     col += box;
//     return col;
// }

// vec3 Box( vec2 uv ) {
//    vec3 col = vec3(0);
//   vec3 col4 = mix(BLUE, PINK, .8);
//    //vec2 gv = abs(uv);
//    float d1 = sdSegment(uv, vec2(-.5, .0), vec2(0.5, .0));
//    float s1 = S(.008, .0, d1);
//    float d2 = sdSegment(uv, vec2(0., .0), vec2(0., -.5));
//    float s2 = S(.008, .0, d2);
//    // float d3 = sdSegment(uv, vec2(-.02, .02), vec2(-.02, .5));
//    // float s3 = S(.008, .0, d3);
//    // float d4 = sdSegment(uv, vec2(-.02, .02), vec2(-.5, .02));
//    // float s4 = S(.008, .0, d4);
//   //  float d5 = sdSegment(uv, vec2(.04, .5), vec2(.04,-.5));
//   //  float s5 = S(.008, .0, d5);
//   //  float d6 = sdSegment(uv, vec2(.02, .5), vec2(.02, -.5));
//   //  float s6 = S(.008, .0, d6);
//   // float d5 = sdSegment(uv, vec2(.02,  .02), vec2(.5,.02));
//   //  float s5 = S(.008, .0, d3);
//    float d4 = sdSegment(uv, vec2(.02, -.02), vec2(.02, -.5));
//    float s4 = S(.008, .0, d4);
//    float d5 = sdSegment(uv, vec2(.04, -.04), vec2(.5,-.04));
//    float s5 = S(.008, .0, d5);
//    float d6 = sdSegment(uv, vec2(.04, -.04), vec2(.04, -.5));
//    float s6 = S(.008, .0, d6);
//    float d7 = sdSegment(uv, vec2(-.04, -.04), vec2(-.5, -.04));
//    float s7 = S(.008, .0, d7);
//    float d8 = sdSegment(uv, vec2(-.04, -.04), vec2(-.04, -.5));
//    float s8 = S(.008, .0, d8);
//    float d9 = sdSegment(uv, vec2(.02, -.02), vec2(.5, -.02));
//    float s9 = S(.008, .0, d9);
//    float d10 = sdSegment(uv, vec2(-.02, -.02), vec2(-.5,- .02));
//    float s10 = S(.008, .0, d10);
//    float d11 = sdSegment(uv, vec2(-.02, -.02), vec2(-.02, -.5));
//   float s11 = S(.008, .0, d11);
//   //  float d12 = sdSegment(uv, vec2(-.04, .04), vec2(-.5, .04));
//   //  float s12 = S(.008, .0, d12);
//   //  float d13 = sdSegment(uv, vec2(-.04, .04), vec2(-.04, .5));
//   // float s13 = S(.008, .0, d13);
//   //  float d14 = sdSegment(uv, vec2(.04, .04), vec2(.5, .04));
//   //  float s14 = S(.008, .0, d14);
//   //  float d15 = sdSegment(uv, vec2(.04, .04), vec2(.04, .5));
//   // float s15 = S(.008, .0, d15);
//    float d16 = sdSegment(uv, vec2(-.5, .02), vec2(.5, 0.02));
//    float s16 = S(.008, .0, d16);
//    float d17 = sdSegment(uv, vec2(-.5, .04), vec2(.5, 0.04));
//    float s17 = S(.008, .0, d17);
//    return col += s1*PINK + s2*PINK + s4*PURPLE  + s5*col4 + s6*col4 + s7*col4 + s8*col4 + s9*PURPLE + s10* PURPLE + s11*PURPLE +s16*PURPLE + s17*col4;
//    // return col += s1*PINK + s2*PINK + s3*PURPLE + s4*PURPLE + s5*col4 + s6*PURPLE + s7*col4 + s8*col4 + s9*PURPLE +s10*PURPLE+  s12*col4 + s13*col4;
// }

void main()
{
    vec2 uv = (gl_FragCoord.xy - .5*u_resolution.xy)/u_resolution.y;
	//vec2 m = iMouse.xy/u_resolution.xy;
    //uv = abs(uv);
    vec3 col = vec3(0);
    col  += BLUE;
    col += complete(uv);
  
  
//    float d1 = sdSegment(uv, vec2(0., -.5), vec2(0., .5));
//    float d2 = sdSegment(uv, vec2(0.02, -.5), vec2(0.02, .5));
//    float d13 = sdSegment(uv, vec2(-0.02, -.5), vec2(-.02, .5));
//    float d14 = sdSegment(uv, vec2(-0.04, -.5), vec2(-.04, .5));
//    float d5 = sdSegment(uv, vec2(0.04, -.5), vec2(.04, .5));
//    float m1 = S(.008, .0, d1);
//    float m2 = S(.008, .0, d2);
//    float m13 = S(.008, .0, d13);
//    float m14 = S(.008, .0, d14);
//    float m5 = S(.008, .0, d5);
  
 // float d1 = sdSegment(uv, vec2(-.5, -.5), vec2(.5, .5));
 //   float d2 = sdSegment(uv - vec2(.02,.02), vec2(-.5, -.5), vec2(.5, .5)) ;
 //   float d3 = sdSegment(uv, vec2(-.52, -.52), vec2(.52, .52));
 //   float d4 = sdSegment(uv, vec2(-.54, -.54), vec2(.54, .54));
 //   float d5 = sdSegment(uv, vec2(-.46, -.46), vec2(.46, .46));
 //   float m1 = S(.008, .0, d1);
 //   float m2 = S(.008, .0, d2);
 //   float m3 = S(.008, .0, d3);
 //   float m4 = S(.008, .0, d4);
 //   float m5 = S(.008, .0, d5);
  // col += m13*PURPLE + m14*col4;
   // float d6 = sdSegment(uv, vec2(-.5, 0.), vec2(.5, 0.));
   // float d7 = sdSegment(uv, vec2(-.5, 0.02), vec2(.5, 0.02));
   // float d8 = sdSegment(uv, vec2(-.5, -0.02), vec2(.5, -0.02));
   // float d9 = sdSegment(uv, vec2(-.5, -0.04), vec2(.5, -0.04));
   // float d10 = sdSegment(uv, vec2(-.5, 0.04), vec2(.5, 0.04));
   // float m6 = S(.008, .0, d6);
   // float m7 = S(.008, .0, d7);
   // float m8 = S(.008, .0, d8);
   // float m9 = S(.008, .0, d9);
   // float m10 = S(.008, .0, d10);
//   vec3 diag = Box(uv);
//   col += diag;
   
  // col += m1*PINK;
  // col += m2*PURPLE;
  //  col += m3*PURPLE;
  //  col += m4*col4;
  //  col += m5*col4;  
  //  col += m6*PINK;
  //  col += m7*PURPLE;
  //  col += m8*PURPLE;
  //  col += m9*col4;
  //  col += m10*col4;
  
   //col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}
