// Starting point "RayMarching starting point" 
// by Martijn Steinrucken aka The Art of Code/BigWings - 2020

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;

#define S smoothstep
#define PI 3.14159


// Color scheme
// The uvs are floating point with a range of [0.0,1.0] so we normalize by dividing by 255.
#define PURPLE vec3(83, 29,109) / 255.
#define RED vec3(191, 18, 97) / 255.
#define ORANGE vec3(251,162, 100) / 255.
#define BLUE vec3(118, 212, 229) / 255.


vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}  

 // Create a normal line that rotates around origin
vec2 N(float angle)
  {
  return vec2( sin(angle), cos(angle) );
}

float ndot(vec2 a, vec2 b ) { return a.x*b.x - a.y*b.y; }


float N21( vec2 p) {
    return fract( sin(p.x*100. + p.y*6574.)*5674. );
}


//From Inigo Quilez
float sdBox( vec2 uv, vec2 b )
{
    vec2 d = abs(uv)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

vec2 Koch( vec2 uv) {
  
    uv.x = abs(uv.x);  // Reflect around y axis to consider only half of the line
    uv.y += tan((5./6.)*3.1415)*.5;
    vec2 n = N((5./6.)*3.1415);
    float d = dot(uv- vec2(.5,0), n);  //remap to right-most side of Koch curve
    uv -= n * max(0., d) * 2.; // Code for a reflection about a line
  
    n = N((2./3.)*3.1415);
    float scale = 1.;  // keeps track of how mnay times we compress the uvs
    uv.x += .5; // adjustment to reorient Koch curve
   
    for (int i = 0; i < 64; i++) {
    
        // Remap uv so that one line segment [-.5,.5]
        // Instead of dividing segment by 3, we multiply the uvs by 3.
        uv *= 3.;
        scale *= 3.;
        // put (0,0) in middle of line segment
        uv.x -= 1.5; 

        // Fold x coordinates in half by taking absolute value 
        uv.x = abs(uv.x);

        // Substract 0.5 on either side to increase the length of line to 3 units
        uv.x -= .5;
        d = dot(uv, n);
        uv -= n * min(0., d) *  2.;
     }
  uv /= scale;
  return uv;
}

// Sierpinski triangle
const vec2 va = vec2(  -0.25, -0.25);
const vec2 vb = vec2(  0.0, 0.25 );
const vec2 vc =  vec2( 0.25, -0.25 );

// returns distance, and coordinates
vec2 Sierpinski( vec2 uv)
{
    //vec2 uv = uv*2.0;
	float a = 0.0;
    float s = 1.0; 
    float r = 1.0;
    float dm;
    vec2 v;
    //const int maxiterations = n;
   for( int i=0; i < 74; i++ )
	{
	    float d, t;
		d = dot(uv-va,uv-va);              v=va; dm=d; t=0.0;
        d = dot(uv-vb,uv-vb); if( d<dm ) { v=vb; dm=d; t=1.0; }
        d = dot(uv-vc,uv-vc); if( d<dm ) { v=vc; dm=d; t=2.0; }
          
		uv = v + 2.0*(uv - v); r*= 2.0; 
		a = t + 4.0*a; s*= 4.0; 
	}
	return vec2( (sqrt(dm)-1.0)/r, a/s ); 
}
// From Inigo Quilez
float sdStar( vec2 p,  float r,  int n, float m)
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

// Function to remap uv space from the Art of Code 
// bottom, left, top, right
vec2 Remap( vec2 uv, float b, float l, float t, float r) {
  return vec2( (uv.x-l) / (r-l) , (uv.y - b) / (t - b));
}

vec3 drawShape( vec2 uv, float n, float r ) {
  vec3 col = vec3(0.);
  vec3 col1 = colorGradient(uv, BLUE, PURPLE, 0.5);
  if ( uv.x > 0. && uv.x < 1. && uv.y > 0. && uv.y < 1.) {
           vec2 rm = uv*vec2(n, n);
           vec2 gv = fract( rm) -0.5;
           float s = sdBox( gv - vec2(0., 0.), vec2(r));
           col =  mix( col, col1, S( .1, .05, s ) );
  }
  return col;
}

vec3 fractal( vec2 st, float m, float n, float r) {
  vec3 col = vec3(0.);
  
 
 // if ( st.x > 0. && st.x < 1. && st.y > 0. && st.y < 1.) {
     vec2 rm = st*vec2(m, n);
     vec2 gv = fract( rm) -0.5;
     vec2 id = floor ( rm );
    
    for (float y=0.; y <= 1.; y++) {
      for (float x=0.; x <= 1.; x++) {
       if (x == 0. && y == 0.) {
        vec2 uv1 = Remap(gv, 0.0, -0.5, 0.5, 0.0);
        if ( uv1.x > 0. && uv1.x < 1. && uv1.y > 0. && uv1.y < 1.)       {
           vec2 rm = uv1*vec2(n, n);
           vec2 gv = fract( rm ) -0.5;
           float s = sdBox( gv - vec2(0., 0.), vec2(r));
           col +=  mix( col, ORANGE, S( .1, .05, s ) );
      }   
       }
      else if (x == 1. && y == 0.) {
        vec2 uv2 = Remap(gv, 0.0, 0.0, 0.5, 0.5);
        col += drawShape(uv2, m*n, r);
      }
      else if (x == 0. && y == 1.) {
        vec2 uv3 = Remap(gv, -0.5, -0.5, 0.0, 0.0);
        col += drawShape(uv3, m*n, r);
      }
      else if (x == 1. && y == 1.) {
        vec2 uv4 = Remap(gv, -0.5, 0.0, 0.0, 0.5);
        col += drawShape(uv4, m*n*n, r);
      }
      } 
    }
  
  return col ;
}

void main( )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = (gl_FragCoord.xy- 0.5*u_resolution.xy)/u_resolution.y;
    
    vec3 col = PURPLE;
    float m = 2.;
  
    const float maxIter = 9.;
    for ( float i = 0.; i <= maxIter; i++) {
    vec2 st = Remap( uv- vec2(0.5, 0.0), 0.0, -0.5, 0.5, 0.0);
        float r = i/5.; 
        vec2 k = Koch(st);
        vec3 f = fractal( k, i*m, i*m, r);
      col = mix(col, f, 0.8) ;
     
    }
 
    gl_FragColor = vec4(col, 1.0);
}
