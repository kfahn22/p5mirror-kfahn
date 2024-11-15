// Frag shader creates train tiles for wave function collapse

#ifdef GL_ES
precision mediump float;
#endif

// Pass in resolution from the sketch.js file
uniform vec2 u_resolution; 
uniform float bkcolor;
uniform float railcolor;
uniform float trackcolor;
uniform float trackchoice;

#define S smoothstep
#define CG colorGradient
#define PI 3.14159

// Coding train colors
#define AQUA vec3(160,223,247)/255.
#define RASPBERRY vec3(253,96,182)/255.
#define PURPLE vec3(196,103,236)/255.

#define GREEN vec3(83,255,69)/255.
#define GREY vec3(89,89,89)/255.
#define BLUE vec3(30,46,222)/255.

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

//From Inigo Quilez
float sdBox( vec2 uv, vec2 b )
{
    vec2 d = abs(uv)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

float sdCircle( vec2 uv, float r) {
  return length(uv) - r;
} 

// From Inigo Quilez
float sdRoundedBox( vec2 uv, vec2 b, vec4 r) {
  r.xy = (uv.x>0.0) ? r.xy : r.zw;
  r.x = (uv.y>0.0) ? r.x : r.y;
  vec2 q = abs(uv) - b + r.x;
  return min( max(q.x, q.y), 0.0) + length(max(q, 0.0) ) - r.x;
}

// Function to choose colors 
vec3 chooseColor( float choice ) {
    vec3 colchoice;
    
    if ( choice == 0.0 )  { //white
      colchoice = vec3( 1.0 ); 
    } // blank tile
    else if ( choice  == 1.0 ) { //black
      colchoice = vec3(0.0);
          }
    else if ( choice  == 2.0 ) { //grey
      colchoice = GREY;
    }
    else if ( choice  == 3.0 ) { //red
      colchoice = vec3(255, 0, 0)/255.0;
    }
    else if ( choice  == 4.0 ) { //orange
      colchoice = vec3(255,127,0)/255.0;
    }
    else if ( choice  == 5.0 ) { //yellow
      colchoice = vec3(255,255,0)/255.0;
    }
    else if ( choice  == 6.0 ) { //green
      colchoice = vec3(0,255,0)/255.0;
    }
    else if ( choice  == 7.0 ) { // blue
      colchoice = vec3(0,0,255)/255.0;
    }
    else if ( choice == 8.0 ) { // violet
      colchoice = vec3(255,0,255)/255.0;
    }
  return colchoice;
}

// Code for cross tracks
float crossTrackRail( vec2 uv, float x1, float x2 ) {
  float s1 = sdBox(uv - vec2(x1, 0.), vec2(.04, 1.));
  float m1 = S(.008, .0, s1);
  float s2 = sdBox(uv - vec2(x2, 0.), vec2(.04, 1.));
  float m2= S(.008, .0, s2);
  return m1 + m2;
}

float crosstracks( vec2 uv, float x) {
  float s = sdBox(vec2(uv.x, abs(uv.y)) - vec2(x, .5), vec2(.16, .075));
  float m = S(.008, .0, s);
  return m;
}

// Code for curved track
float biggerCurvedRails( vec2 uv) {
   float s1 = abs(sdCircle(uv- vec2(.475, .475), .9)) - .04;
   float m1 = S(.008, .0, s1);
   float s2 = abs(sdCircle(uv- vec2(.475, .475), .75)) - .04;
   float m2 = S(.008, .0, s2);
   return m1 + m2;
}

// Code for curved tracks and rails
float ctracks( vec2 uv) {
   float s1 = sdBox(Rot(PI*1./4.)*uv - vec2(-.16, .0), vec2(.16, .075));
   float m1 = S(.008, .0, s1);
   float s2 = sdBox(uv - vec2(.5, -.345), vec2(.075, .16));
   float m2 = S(.008, .0, s2);
   float s3 = sdBox(uv - vec2(-.345, .5), vec2(.16, .075));
   float m3 = S(.008, .0, s3);
   return m1 + m2 + m3;
}

// Code to create junction track and rails
float tConnect( vec2 uv, float x1, float x2 ) {
  vec2 gv = vec2( uv.x, abs(uv.y) );
  float s1 = sdBox(uv - vec2(x1, 0.), vec2(.04, 1.));
  float m1 = S(.008, .0, s1);
  float s2 = sdBox(uv - vec2(x2, 0.), vec2(.04, 1.));
  float m2= S(.008, .0, s2);
  float s3 =  abs(sdRoundedBox( gv - vec2(.57, .5), vec2(.5, .425), vec4(.35, .15, .25, .41)) ) -  .04;
  float m3 = S(.008, .0, s3);
  float s4 =  abs(sdRoundedBox( uv - vec2(.44, .5), vec2(.52, .575), vec4(.35, .15, .25, .51)) ) -  .04;
  float m4 = S(.008, .0, s4);
  float s5 =  abs(sdRoundedBox( uv - vec2(.44, -.5), vec2(.52, .575), vec4(.50, .15, .51, .51)) ) -  .04;
  float m5 = S(.008, .0, s5);
  float s6 =  abs(sdRoundedBox( uv - vec2(.57, .5), vec2(.5, .425), vec4(.35, .15, .25, .41)) ) -  .04;
  float m6 = S(.008, .0, s6);
  float m11 = max(max(m1, m2), m3);
  float m12 = max(max(m3, m4), m5);
  return max(m11, m12);
}

float tcTracks( vec2 uv, float x) {
  float s1 = sdBox(Rot(PI*2./4.)*uv - vec2(0.0, -0.5), vec2(.16, .075));
  float m1 = S(.008, .0, s1);
  float s2 = sdBox(vec2(uv.x, abs(uv.y)) - vec2(x, .5), vec2(.16, .075));
  float m2 = S(.008, .0, s2);
  float s3 = sdBox(Rot(PI*2./4.)*uv - vec2(x, -0.5), vec2(.16, .075));
  float m3 = S(.008, .0, s3);
  float s4 = sdBox(uv - vec2(0.0, 0.5), vec2(.16, .075));
  float m4 = S(.008, .0, s4);
  return m1 +  m2;
}

// Code for quarter curve connector
float quarterCurve( vec2 uv, float x1, float x2 ) {
  float s1 =  abs(sdRoundedBox( uv - vec2(.44, .5), vec2(.52, .575), vec4(.35, .15, .25, .51)) ) -  .04;
  float m1 = S(.008, .0, s1);
  float s2 =  abs(sdRoundedBox( uv - vec2(.57, .5), vec2(.5, .425), vec4(.35, .15, .25, .41)) ) -  .04;
  float m2 = S(.008, .0, s2);
  return  m1 + m2; 
 
}

float qcTracks( vec2 uv, float x) {
  float s1 = sdBox(Rot(PI*2./4.)*uv - vec2(x, -0.5), vec2(.16, .075));
  float m1 = S(.008, .0, s1);
  float s2 = sdBox(uv - vec2(0.0, 0.5), vec2(.16, .075));
  float m2 = S(.008, .0, s2);
  return m1 +  m2;
}

// Code for small tracks
float sdTrack( vec2 uv, float r) {
  vec2 gv = uv;
  vec2 st = uv;
  vec2 md = uv;
  uv.y = abs(uv.y);
  float s1 =  abs(sdRoundedBox( uv - vec2(.4, .4), vec2(.3, .3), vec4(.175, .175, .175, .25)) ) -  r;
  float m1 = S(.008, .0, s1);
  float s2 =  abs(sdRoundedBox( uv - vec2(.45, .45), vec2(.3, .3), vec4(.175, .175, .175, .22)) ) -  r;
  float m2 = S(.008, .0, s2);
  float s3 = sdBox((Rot(PI* 3./4.)*(md - vec2(.195, .195)) - vec2(.0, .0)), vec2(.01, .05) );
  float m3 = S(.008, .0, s3);
  float s4 = sdBox((Rot(PI* 13./16.)*(uv - vec2(.25, .15)) - vec2(.0, .0)), vec2(.01, .05) );
  float m4 = S(.008, .0, s4);
   float s5 = sdBox((Rot(PI* 15./16.)*(uv - vec2(.32, .13)) - vec2(.0, .0)), vec2(.01, .05) );
  float m5 = S(.008, .0, s5);
   gv.x = abs(gv.x);
  float s6 = sdBox((uv - vec2(.46, .125)), vec2(.01, .05) );
  float m6 = S(.008, .0, s6);
  float s7 = sdBox((uv - vec2(.39, .125)), vec2(.01, .05) );
  float m7 = S(.008, .0, s7);
   float s8 = sdBox((Rot(PI* 1./4.)*(md - vec2(.195, -.195)) - vec2(.0, .0)), vec2(.01, .05) );
  float m8 = S(.008, .0, s8);
  float s9 = sdBox((Rot(PI* 11./16.)*(uv - vec2(.15, .25)) - vec2(.0, .0)), vec2(.01, .05) );
  float m9 = S(.008, .0, s9);
   float s10 = sdBox((Rot(PI* 9.5/16.)*(uv - vec2(.13, .32)) - vec2(.0, .0)), vec2(.01, .05) );
  float m10 = S(.008, .0, s10);
  float s11 = sdBox((vec2(gv.x, uv.y) - vec2(.125, .46)), vec2(.05, .01) );
  float m11 = S(.008, .0, s11);
  float s12 = sdBox((vec2(gv.x, uv.y) - vec2(.125, .39)), vec2(.05, .01) );
  float m12 = S(.008, .0, s12);
  st.y = abs(st.y);
  // Straight train tracks
  float s13 = sdBox(uv - vec2(-.15, 0.), vec2(.001, 1.));
  float m13 = S(.008, .0, s13);
  float s14 = sdBox(uv - vec2(-.10, 0.), vec2(.001, 1.));
  float m14 = S(.008, .0, s14);
  float s15 = sdBox((st - vec2(-.125, .04)), vec2(.05, .01) );
  float m15 = S(.008, .0, s15);
  float s16 = sdBox((st - vec2(-.125, .11)), vec2(.05, .01) );
  float m16 = S(.008, .0, s16);
  float s17 = sdBox((st - vec2(-.125, .18)), vec2(.05, .01) );
  float m17 = S(.008, .0, s17);
  float s18 = sdBox((st - vec2(-.125, .25)), vec2(.05, .01) );
  float m18 = S(.008, .0, s18);
  float s19 = sdBox((st - vec2(-.125, .32)), vec2(.05, .01) );
  float m19 = S(.008, .0, s19);
  float m =  m1 + m2 + m3 + m4 + m5 + m6 + m7 + m8 + m9 + m10 
        + m11 + m12 + m13 + m14 + m15 + m16 + m17 + m18 + m19;
  return m ;;
}

// Code for straight tracks and rails
float biggerRails( vec2 uv, float x1, float x2 ) {
  float s1 = sdBox(uv - vec2(x1, 0.), vec2(.04, 1.));
  float m1 = S(.008, .0, s1);
  float s2 = sdBox(uv - vec2(x2, 0.), vec2(.04, 1.));
  float m2= S(.008, .0, s2);
  return m1 + m2;
}

float stracks( vec2 uv, float x) {
  float s1 = sdBox(uv - vec2(x, 0.), vec2(.16, .075));
  float m1 = S(.008, .0, s1);
  float s2 = sdBox(vec2(uv.x, abs(uv.y)) - vec2(x, .5), vec2(.16, .075));
  float m2 = S(.008, .0, s2);
  return m1 + m2;
}
// Choose track
vec3 chooseTrack( float choice, vec2 uv, vec3 col1, vec3 col2, vec3 col3 ) {
  vec3 col = vec3(0.0);
  // vec3 bkcol = chooseColor( col1 ); 
  // vec3 railcol = chooseColor( col2 );
  // vec3 trackcol = chooseColor( col3 );

   if (trackchoice == 0.0) {
     col = col1;
   }
   if (trackchoice == 1.0) {
    float crTR = crossTrackRail(uv, -0.075, 0.075);
    float str = crosstracks(uv, 0.0); 
    
    // Cross track
    float rotcrTR = crossTrackRail(Rot(PI*2./4.)*uv, -0.075, 0.075);
    float bb = max(crTR, rotcrTR);
    float strr = crosstracks(Rot(PI*2./4.)*uv, 0.0); 
    col += (1. - bb  - str - strr) * col1 + bb * col2 + (str + strr) * col3;
  }
  else if (trackchoice == 2.0) {
    // Curved track
    float bc = biggerCurvedRails(uv);
    float ctr = ctracks(uv); 
    col += (1. - bc - ctr) * col1 + bc * col2 + ctr * col3;
  }
  else if (trackchoice == 3.0) {
    // junction track
    float bcn = tConnect(Rot(PI*0./4.)*uv, -0.075, 0.075);
    float tct = tcTracks(uv, 0.0);
    col += (1. - bcn - tct) * col1 + bcn * col2 +  tct * col3;
  }
 else if (trackchoice == 4.0) {
     // center corner connector
    float ccn = quarterCurve(Rot(PI*0./4.)*uv, -0.075, 0.075);
    float ct = qcTracks(uv, 0.0);
    col += (1. - ccn - ct) * col1 + ccn * col2 +  ct * col3;
 }
 else if (trackchoice == 5.0) {
     // Side train rails
    float side = biggerRails(uv, -0.42, -0.275);
  
    // Side train tracks
    float sstr = stracks(uv, -0.35); 
    col += (1. - side - sstr) * col1 + side * col2 + sstr * col3;
 }
 else if (trackchoice == 6.0) {
     // Smaller train tracks
     float t = sdTrack(uv, .001);
     col += (1. - t) * col1 + t * col2;
 }
 else if (trackchoice == 7.0) {
    // Straight train tracks
    float b = biggerRails(uv, -0.075, 0.075);
    float str = stracks(uv, -.0); 
    col += (1. - b - str) * col1 + b * col2 + str * col3;
 }
 return col;
}

void main()
{
  vec2 uv = (gl_FragCoord.xy - .5*u_resolution.xy)/u_resolution.y;
  
  vec3 col = vec3(0.0);
  vec3 bkcol = chooseColor( bkcolor ); 
  vec3 railcol = chooseColor( railcolor );
  vec3 trackcol = chooseColor( trackcolor );

  col += chooseTrack( trackchoice, uv, bkcol, railcol, trackcol );
  gl_FragColor = vec4(col,1.0);
}
