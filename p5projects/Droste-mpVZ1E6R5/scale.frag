#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform float u_time;

#define PLATFORM_WEBGL

#define LIGHT vec3(0.995,0.964,0.573)
#define MID vec3(0.995,0.663,0.261)
#define DARK vec3(0.995,0.390,0.314)

#include "lygia/math/const.glsl"
#include "lygia/sdf/triSDF.glsl"
#include "lygia/color/palette/spectral.glsl"
#include "lygia/color/pigments.glsl"
#include "lygia/sdf/circleSDF.glsl"
#include "lygia/draw/fill.glsl"
#include "lygia/math/smootherstep.glsl"
#include "lygia/color/space/hsv2rgb.glsl"
#include "lygia/math/rotate2d.glsl"


vec2 scale_f(vec2 x){
    return exp2(-floor(log2(x)));
}
// vec3 findColor(vec2 st) {
//     st -= vec2(0.5);
//     st *= 2.0;
//     st = (st+1.)*.75; 
//     vec2 scale = scale_f(.75-abs(st-.75));
//     if (scale.x == scale.y) {
//         if (scale.x == 2.) // Center square
//             return CADMIUM_RED;
//         return SAP_GREEN; // 'Corner' squares
//     } else if (scale.x < scale.y){
//         // Top and bottom
//         return COBALTE_BLUE;
//     } else { //scale.x > scale.y
//         // Left and right
//         return CADMIUM_YELLOW; 
//     }
// }

vec3 center_tile(vec2 z){
    vec3 color = vec3(0);
    z = z.yx;
    z = z*4.-2.;
    z *= mat2(.5,.5,-.5,.5);
    for (int n=0;n<=1;n++){
        // modulo(int) doesn't seem to exist, two loops
        // seems to be the cleanest way to do this.
        for (int m=0;m<=1;m++){
            color += three_birds(z*2.+2.,m+1,m==1);
            z *= mat2(0,1,-1,0);
        }
    }
    return color;
}
vec3 corner_tile(vec2 z,bool type){
    z = z.yx;
    z = z*4.-2.;
    int t = int(type);
    vec3 color = vec3(0);
    z *= mat2(.5,.5,-.5,.5);
    if ( t == 1 )
        z *= mat2(0,1,-1,0);
    //
    color += three_birds(z*2.+2.,1+t,0+t ==1);
    z *= mat2(0,1,-1,0);
    color += three_birds(z*2.+2.,2-t,1-t ==1);
    z *= mat2(0,1,-1,0) * mat2(1,1,-1,1);
    color = mix(color,colors(0,true),bird(z));
    z *= mat2(0,-1,1,0);
    color = mix(color,colors(2-t,true),bird(z));
    z *= mat2(0,-1,1,0);
    color = mix(color,colors(1+t,true),
                bird(z+vec2(0.,-4.)));
    z *= mat2(0,-1,1,0);
    color = mix(color,colors(2,false),
                bird(z+vec2(0.,-4.)));
    return vec3(color);
}
// vec3 color(vec2 z) {
//     return vec3(center_tile(z+.5));
// }
vec3 findColor(vec2 z) {
    // 180 degree rotational symmetry:
    if (z.y < 0.) z=-z; 
    // The lower half is a 180-degree rotated copy
    z = (z+1.)*.75; 
    vec2 a_z = .75-abs(z-.75);
    vec2 scale = scale_f(a_z);
    if (scale.x == scale.y) {
        if (scale.x == 2.)// Center square
              return center_tile(z*2.-1.);
        else // 'Corner' squares
            return corner_tile(mod(z*scale,1.),z.x>1.); 
    } else if (scale.x < scale.y){
        // Top and bottom
        return vec3(0,1,0);
    } else { //scale.x > scale.y
        // Left and right
        return vec3(1,1,0); 
    }
}
void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec4 color = vec4(vec3(0.), 1.);
  color.rgb = findColor(st);
  
  gl_FragColor = color;
}