// Code written for the MDN 100% completion moment

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
#define DARK vec3(11,19,39)/255.
#define NAVY vec3(0,3,105)/255.
#define PINK vec3(255, 57, 255)/255.
#define YELLOW vec3(242,214,65)/255.


vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}    

//combine so that they smoothly blend
float smin( in float a, in float b, float k)
{
 float h = max( k - abs(a-b), 0.0); // "spike" function look at grpahtoy
 return min(a,b) - h*h/(k*4.0);
}


float smax( in float a, in float b, float k)
{
 float h = max( k - abs(a-b), 0.0); 
 return max(a,b) + h*h*0.25/k;
}

// From Inigo Quilez
float sdRoundedBox( vec2 uv, vec2 b, vec4 r) {
  r.xy = (uv.x>0.0) ? r.xy : r.zw;
  r.x = (uv.y>0.0) ? r.x : r.y;
  vec2 q = abs(uv) - b + r.x;
  return min( max(q.x, q.y), 0.0) + length(max(q, 0.0) ) - r.x;
}
// TR, BR, TL, BL
vec3 Cloud( vec2 uv) {
   vec3 col = vec3(0);
   float s1 = sdRoundedBox( uv, vec2(.08,.075), vec4(.075, .025, .075, .025));
   float m1 = S(.008, .0, s1);
   float s2 = sdRoundedBox( uv - vec2(.0, -.05), vec2(.2, .03), vec4(.025, .025, .025, .025));
   float m2 = S(.008, .0, s2);
   // float s2 = sdRoundedBox( uv, vec2(.04,.09), vec4(.05, .05, .05, .05));
   // float m2 = S(.008, .0, s2);
   float s = smax(m1,m2, .5);
  return col += s;
}

vec3 SmCloud( vec2 uv) {
   vec3 col = vec3(0);
   float s1 = sdRoundedBox( uv, vec2(.025,.035), vec4(.03, .03, .03, .03));
   float m1 = S(.008, .0, s1);
    
   float s2 = sdRoundedBox( uv, vec2(.02, .03), vec4(.025, .025, .025, .025));
   float m2 = S(.008, .0, s2);
  return col + m1 - m2;
}

vec2 N22( vec2 p) {
  vec3 a = fract(p.xyx*vec3(123.34, 234.34, 345.65));
  a += dot(a, a + 34.45);
  return fract(vec2( a.x*a.y, a.y*a.z) );
}


void main()
{
    vec2 uv = (gl_FragCoord.xy - .5*u_resolution.xy)/u_resolution.y;
	//vec2 m = iMouse.xy/u_resolution.xy;
    vec3 col = vec3(0);
    vec3 sky = CG(uv, YELLOW, PINK, .4);
  
 float m = 0.;
  
  float t = iTime;
   
  float minDist = 100.;
  float cellIndex = 0.;
  
  if (false) {
  for (float i = 0.; i < 100.; i++) {
    vec2 n = N22(vec2(i));
    vec2 p = sin(n*t);
    
    float d = length(uv-p);
    m += S(.02, .01, d);
    
    if (d<minDist) {
      minDist = d;
      cellIndex = i;
      
    }
  }
  } else {
  uv *= 3.; // change this parameter to change number of grids
  vec2 gv = fract(uv) - .5;
  vec2 id = floor(uv);
  vec2 cid = vec2(0);
    
    for (float y =-1.; y<=1.; y++) {
      for (float x =-1.; x<=1.; x++) {
        vec2 offs = vec2(x, y);
        
        float h = N22(uv.y);
        vec2 p = offs+sin(n*t)*0.5;
        float d = length(gv-p);
       
        if (d<minDist) {
           minDist = d;
           cid = id + offs;
        } 
      }
       col = sky*vec3(minDist);
    }
   
//     vec3 c = Cloud( uv - vec2(.3, .3) );
   
//     col += c;
   //col = pow(col, vec3(.4545));	// gamma correction
  }   
    gl_FragColor = vec4(col,1.0);

}