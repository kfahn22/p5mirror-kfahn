#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mover0;
uniform vec2 u_mover1;
uniform vec2 u_sun;
uniform sampler2D u_tex;

//attributes, in
varying vec4 var_centerGlPosition;
varying vec3 var_vertNormal;
varying vec2 var_vertTexCoord;

// Define some global variables and color scheme
#define S smoothstep
#define CG colorGradient
#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .001

#define PURPLE vec3(146,83,161) / 255.
#define TEAL vec3(11, 106, 136) / 255.
#define DPURPLE vec3(112, 50, 126) / 255.
#define BLACK vec3(0) / 255.

// Function to create a color gradient
vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
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

float sdMover( vec2 p, vec2 uv, float r )
{
    float sum = 0.0;
    vec2 diff0 = p.xy - uv.xy;
    float d0 = length(diff0);
    return 1.0 * r / d0;
}

float sdCircle( vec2 p, float r )
{
    return length(p) - r;
}

// vec3 Transform(vec3 p)
// {
//    // p.xy *= Rot(iFrame*.005);
//    // p.xz *= Rot(iFrame*.005);
  
//   return p;
// }

// float sdSphere( vec3 p, vec2 uv, float s) {
//   vec3 cen = vec3(uv.x, uv.y, 0.0);
//   vec3 q = p-cen;
//   return length(q)-s;
// }

// // If you add two objects add them here and then use min() to get the min distance to both objects 
// // This function is also often referred to as the sceneSDF() or map()
// float GetDist(vec3 p, vec2 mover_uv) {
//     float d = sdSphere(p, mover_uv, 0.1);
//     return d;
// }


// // Function to raymarch.  
// float RayMarch(vec3 ro, vec3 rd, vec2 mover_uv) {
// 	float dO=0.;
    
//     for(int i=0; i<MAX_STEPS; i++) {
//     	vec3 p = Transform(ro + rd*dO);
        
//         float dS = GetDist(p, mover_uv);
//         dO += dS;
//         if(dO>MAX_DIST || abs(dS)<SURF_DIST) break;
//     }
//     return dO;
// }

// // Function to get the normals at the intersection of the ray and surface of mandelbulb
// vec3 GetNormal(vec3 p, vec2 mover_uv) {
// 	float d = GetDist(p, mover_uv);
//     vec2 e = vec2(.001, 0);
    
//     vec3 n = d - vec3(
//         GetDist(p-e.xyy, mover_uv),
//         GetDist(p-e.yxy, mover_uv),
//         GetDist(p-e.yyx, mover_uv));
    
//     return normalize(n);
// }

// // Function to get the ray direction from the camera to a point on the mandelbulb
// // This function creates a set of basis vectors in local space that can be commpared to the global space
// vec3 GetRayDir(vec2 uv, vec3 p, vec3 l, float z) {
//     vec3 f = normalize(l-p),
//         r = normalize(cross(vec3(0,1,0), f)),
//         u = cross(f,r),
//         c = f*z,
//         i = c + uv.x*r + uv.y*u,
//         d = normalize(i);
//     return d;
// }

void main()
{
    // Remap uvs to center of screen
    vec2 uv = (gl_FragCoord.xy -0.5*u_resolution.xy)/u_resolution.y;
    vec2 st = var_vertTexCoord.xy / u_resolution.xy;
	//vec2 m = iMouse.xy/u_resolution.xy;
    //vec2 mover0_uv = u_mover0.xy /  u_resolution.xy;
    vec2 mover1_uv = u_mover1.xy /  u_resolution.xy;
//     vec2 sun_uv = u_sun.xy /  u_resolution.xy;
  
    vec3 texColor = texture2D(u_tex,st).rgb;
    // Add a background color with gradient
    vec3 col = CG(uv, PURPLE, BLACK, .4);
   
  
    // float r = 0.1;
    // float sum = 0.0;
    // vec2 diff0 = uv.xy - mover0_uv.xy;
    // float d0 = length(diff0);
    // sum += 1.0 * r / d0;

   //float d = sdMover(uv, mover0_uv, 0.1);
  // float m = S(0.008, 0.0, d);
    float d = sdCircle(uv,  0.1);
    float m = S(0.008, 0.0, d);
//     // Camera origin -- best to leave this alone 
//     vec3 ro = vec3(0, 3, -3);  
  
//     // Location of object--mandelbulb is placed in the center of screen.
//     // Note that vec3(0) is equivalent to vec3(0,0,0)
//     vec3 lookat = vec3(0);  
  
//     // Add a rotation using the mouse
//     // ro.yz *= Rot(-m.y*3.14+1.);
//     // ro.xz *= Rot(-m.x*6.2831);
    
//    // Adjust this value to change size of the mandelbulb
//    // float zoom = 1.3;  
//     float zoom = 1.4;  
  
//    // Get the ray direction from camera origin to point on mandelbulb
//     vec3 rd = GetRayDir(uv, ro, lookat, zoom);
  
//     // Add a background color with gradient
//     vec3 col = CG(uv, PURPLE, BLACK, .4);
   
//     // Find distance to the mandelbulb
//     float d = RayMarch(ro, rd, mover0_uv);

//     // If we have hit the mandelbulb with a ray, add color
//     if(d<MAX_DIST) {
//         vec3 p = Transform(ro + rd * d);
//         vec3 n = GetNormal(p, mover0_uv);
//         vec3 r = reflect(rd, n);
        
//         // Add diffuse lighing to the scene
//         float dif = dot(n, normalize(vec3(1,2,3)))*.5+.5;
//         col = vec3(dif);
        
//        col = vec3(255);
//     }
    // Add 1.0 for alpha and pass final color to gl_FragColor.  You must pass a vec4 to gl_Fragcolor. 
    //col += m*vec3(0);
    //vec4 texColor0 = texture2D(u_tex,vec2(sum));
    //col +=  vec3(sum);
    gl_FragColor = vec4(texColor.rgb, 1.0);
}

// void main() {
//   vec2 uv = (gl_FragCoord.xy-0.5*u_resolution.xy) / u_resolution.y;
//   vec2 mover0_uv = u_mover0.xy /  u_resolution.xy;
//   vec2 mover1_uv = u_mover1.xy /  u_resolution.xy;
//   vec2 sun_uv =u_sun.xy /  u_resolution.xy;
  
//   vec3 c = colorGradient(uv, PURPLE, BLACK, 0.4);
  
//   float r = 0.1;
//   float sum = 0.0;
//   vec2 diff0 = uv.xy - mover0_uv.xy;
//   float d0 = length(diff0);
//   sum += 1.0 * r / d0;

//   vec2 diff1 = uv.xy - mover1_uv.xy;
//   float d1 = length(diff1);
//   sum += 1.0 * r / d1;
  
//  // vec3 color = vec3(sum);
//   gl_FragColor = vec4(c, 1.0);
// }


