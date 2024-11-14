#ifdef GL_ES
precision highp float;
#endif

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .001

uniform vec2        u_resolution;

varying vec2       v_texcoord;
uniform vec4       uMaterialColor;
uniform vec2       uResolution;

uniform sampler2D  u_shadowMap;
uniform sampler2D  u_matcap;
uniform vec2       u_mouse;
uniform float      u_time;

varying vec4       v_lightCoord;
varying vec3       v_camera;

varying vec4       vVertexPosition;
varying vec3       vVertexNormal;
varying vec2       vVertTexCoord;

#define PLATFORM_WEBGL
#define LIGHT_SHADOWMAP       u_shadowMap
#define LIGHT_COORD           v_lightCoord
#define LIGHT_SHADOWMAP_SIZE  512.0 

//#include "lygia/lighting/raymarch/render.glsl"
#include "lygia/lighting/sphereMap.glsl"
#include "lygia/lighting/shadow.glsl"
#include "lygia/color/vibrance.glsl"
#include "lygia/color/mixSpectral.glsl"
// SPACE
#include "lygia/space/ratio.glsl"
#include "lygia/space/cart2polar.glsl"
#include "lygia/sdf.glsl"
#include "lygia/lighting/raymarch.glsl"
#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/color/exposure.glsl"

#include "lygia/sdf/mandelbulbSDF.glsl"

// #define RAYMARCH_SAMPLES 100
// #define RAYMARCH_MULTISAMPLE 4

mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

vec4 raymarchMap( in vec3 pos ) {
    vec4 res = vec4(1.0);
    float d = mandelbulbSDF(pos-vec3(0.0, 0.0, 0.0)).x;
    res = opUnion( res, vec4(0.2, 0.2, 0.8, d));
    return res;
}

void main() {
    vec2 uv = (gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
    // vec2 pixel = 1.0/u_resolution;
    // vec2 st = gl_FragCoord.xy/u_resolution;
  
    uv = ratio(uv, u_resolution);
  
    //vec2 mo = u_mouse * pixel;
    vec2 mo = u_mouse / u_resolution;
	float time = 32.0 + u_time * 1.5;

    // camera	
    vec3 ro = vec3( 4.5*cos(0.1*time + 7.0*mo.x), 2.2, 4.5*sin(0.1*time + 7.0*mo.x) ) * 5.;

    color.rgb = raymarch(ro, uv).rgb;
    
    color = linear2gamma(color);

    gl_FragColor = color;
}
