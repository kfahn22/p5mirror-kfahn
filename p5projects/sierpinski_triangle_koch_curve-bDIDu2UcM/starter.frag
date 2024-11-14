// Mixture of Koch curve and Sierpinski curve
// Sierpinski curve code from Inigo Quilez
// Koch Curve code from The Art of Code


#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;


#define PI 3.14159
#define S smoothstep

// Color scheme
#define RASPBERRY vec3(217,3,104) / 255.
#define PURPLE vec3(130, 2, 99) / 255.

mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}


float sdBox(vec3 p, vec3 s) {
    p = abs(p)-s;
	return length(max(p, 0.))+min(max(p.x, max(p.y, p.z)), 0.);
}

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

vec2 Koch( vec2 uv) {
  
    uv.x = abs(uv.x);  // Reflect around y axis
    uv.y += tan((5./6.)*3.1415)*.5;
    vec2 n = N((5./6.)*3.1415);
    float d = dot(uv- vec2(.5,0), n);  //remap to right-most side of Koch curve
    uv -= n * max(0., d) * 2.; // Code for a reflection about a line
  
    n = N((2./3.)*3.1415);
    float scale = 1.;  // keeps track of how mnay times we compress the uvs
    uv.x += .5; // adjustment to reorient Koch curve
   
    for (int i = 0; i < 4; i++) {
    
        // Remap uv so that one line segment [-.5,.5]
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

void main(  )
{
	vec2 uv = (gl_FragCoord.xy-0.5*u_resolution.xy) / u_resolution.y;
       vec2 st = uv*1.5;
       vec3 col = RASPBERRY;
       
       
       vec2 k = Koch( st );
       vec2 s = Sierpinski( k );
       float m = S(0.008, 0.0, s.x);
  
       col = mix(col, PURPLE, m);
       

    gl_FragColor = vec4( col, 1.0 );
}
