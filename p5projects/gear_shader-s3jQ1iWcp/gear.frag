// Base code based on the Ray Marching Starting Point from the Art of Code
// https://www.youtube.com/watch?v=PGtv-dBi2wE


#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define S smoothstep
#define T iTime
#define PI 3.14159

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;

// Add color
// The uvs are floating point with a range of [0.0,1.0] so we normalize by dividing by 255.
#define EGGPLANT vec3(87, 31,78) / 255.
#define OCEAN vec3(146,201,177) / 255.

// Function to add color to shape using x,y,z dimensions
vec3 colXYZ( vec3 col1, vec3 col2, vec3 col3, vec3 n)
  {
        vec3 colXY = col1;  // front and back insdie and outside
        vec3 colXZ = col2;  // top and bottom
        vec3 colYZ = col3;  //  left and right inside and outside
      
       // Tri-planar mapping
        n = abs(n);  // take absolute value to get all faces of cube
        n *= pow(n, vec3(5.));
        n /= n.x + n.y + n.z; // add normalization 
      
       vec3 col = colXZ*n.y + colXY*n.z + colYZ*n.x ; 
       return col;
}

vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}  


float hyperbolicTan( float theta) {
    float e = 2.71828;
    float l = pow(e, 2.0 * theta);
    return (l - 1.0) / (l + 1.0);
}

// B will determine the length of the spokes
// N is number of spokes
float gearSDF(vec2 st, float s, int B, int N) {
    st = st * 2.0 - 1.0;
    float theta = atan(st.y, st.x);
    float d = length(st) - s;
    float r2 = (1.0/float(B))*(hyperbolicTan(float(B) * sin(float(N)*theta)));
    return d + min(d, r2);
}

void main( )
{
   // vec2 uv = (gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
	
  vec2 uv = (gl_FragCoord.xy)/u_resolution.y;
	
    vec3 col = vec3(0);
  
   
  //float d = flowerSDF(uv, 8);
   float d = gearSDF(uv, 0.5, 8, 10);
    float m = S(0.008, 0.0, d);
    
     col = (1.0 - m)*col + m * EGGPLANT;
  
    col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}