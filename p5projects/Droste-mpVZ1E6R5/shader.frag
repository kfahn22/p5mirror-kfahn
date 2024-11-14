//http://roy.red/posts/fractal-droste-images/

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform float u_time;

//#define PLATFORM_WEBGL

#define LIGHT vec3(242, 193, 78) / 255.
#define MID vec3(247, 129, 84) / 255.
#define DARK vec3(180, 67, 108) / 255.

#define PI 3.14159

// #include "lygia/math/const.glsl"
// #include "lygia/sdf/triSDF.glsl"
// #include "lygia/color/palette/spectral.glsl"
// #include "lygia/color/pigments.glsl"
// #include "lygia/sdf/circleSDF.glsl"
// #include "lygia/draw/fill.glsl"
// #include "lygia/math/smootherstep.glsl"
// #include "lygia/color/space/hsv2rgb.glsl"
// #include "lygia/math/rotate2d.glsl"


// vec3 spectral(const in float x) {
//     return  (vec3( 1.220023e0,-1.933277e0, 1.623776e0) +
//             (vec3(-2.965000e1, 6.806567e1,-3.606269e1) +
//             (vec3( 5.451365e2,-7.921759e2, 6.966892e2) +
//             (vec3(-4.121053e3, 4.432167e3,-4.463157e3) +
//             (vec3( 1.501655e4,-1.264621e4, 1.375260e4) +
//             (vec3(-2.904744e4, 1.969591e4,-2.330431e4) +
//             (vec3( 3.068214e4,-1.698411e4, 2.229810e4) +
//             (vec3(-1.675434e4, 7.594470e3,-1.131826e4) +
//              vec3( 3.707437e3,-1.366175e3, 2.372779e3)
//             *x)*x)*x)*x)*x)*x)*x)*x)*x;
// }

// vec3 domain(vec2 z){
//   //  return vec3(hsv2rgb(vec3(atan(z.y,z.x)/2.0 * PI,1.,1.)));
//   return spectral(atan(z.y,z.x)/2.*PI);
//   }
// vec3 findColor(vec2 z) {
//     z -= vec2(0.5);
//     z *= 2.0;
//     return domain(z);
// }
vec3 domain(vec2 z){
    z = droste_(z,0.5,1.0);
	return planetaryLinkage(z);
}
vec2 f(vec2 z){
	z = z * 2.;
	return cDiv(z-vec2(1.,0), cMul(z,z)+z+vec2(1.,0));
}
vec3 color(vec2 z) {
    //float onSphere;
    //z = sphereViewer(z,onSphere); 
    //if (onSphere > 0.)
	return domain(f(z));
	//return vec3(0);
}
void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  
  vec4 color = vec4(vec3(0.), 1.);
 
    color.rgb = findColor(st);
  
  gl_FragColor = color;
}