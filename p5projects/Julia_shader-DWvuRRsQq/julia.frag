

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;

uniform float minI;
uniform float maxI;
uniform float minR;
uniform float maxR;
varying vec2 vPos;

// Thsse are passed in as a uniform from the sketch.js file
uniform vec2 p;
uniform float r;
uniform float angle;
const int I = 500;
const float offset = 0.25;

#define S smoothstep
#define PI 3.14159

float N21( vec2 p) {
    return fract( sin(p.x*100. + p.y*6574.)*5674. );
}


float remap01(float a, float b, float t)
{
 return (t-a) / (b-a);
}

float remap(float a, float b, float c, float d, float  t)
{

  return remap01(a,b,t) * (d-c) + c;
}

// Handy rotation matrix function
mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

void main(){
    
    // fractal code
    vec2 vPos = vec2(
		gl_FragCoord.x * (maxR - minR) / u_resolution.x + minR,
		gl_FragCoord.y * (maxI - minI) / u_resolution.y + minI
	);
    vec2 c = p - (vPos) * r, z = c;
    float n = 0.0;
    
    for (int i = I; i > 0; i --) { 
      if(z.x*z.x+z.y*z.y > 4. ) { 
        n = float(i)/float(I); 
        break;
      } 
     // z = vec2((z.x*z.x-z.y*z.y)+(0.7885 * cos(angle)), (2.0*z.x*z.y)-(sin(angle))); 
       z = vec2( (z.x*z.x-z.y*z.y) + 0.285, (2.0*z.x*z.y)+ 0.01 ); 
    } 
    // Approach to coloring Julia set from https://github.com/vharivinay/julia-set-with-shaders/

    gl_FragColor=vec4(0.5-cos(n*75.0)/2.0,0.5-cos(n* 120.0)/2.0,0.5-cos(n*165.0)/2.0,1.0);
}
