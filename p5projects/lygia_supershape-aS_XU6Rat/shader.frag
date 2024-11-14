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


#define PURPLE vec3(83, 29,109) / 255.
#define RED vec3(191, 18, 97) / 255.
#define ORANGE vec3(251,162, 100) / 255.
#define BLUE vec3(118, 212, 229) / 255.
#define TEAL vec3(11, 106, 136) / 255.

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
#include "lygia/sdf.glsl"
#include "lygia/lighting/specular/phong.glsl"
//#include "lygia/sdf/mandelbulbSDF.glsl"

// #define RAYMARCH_SAMPLES 100
// #define RAYMARCH_MULTISAMPLE 4

#define RAYMARCH_BACKGROUND ( vec3(0.7, 0.9, 1.0) + ray.y * 0.8 )
#define RAYMARCH_AMBIENT    vec3(0.7, 0.9, 1.0)

// #include "lygia/lighting/atmosphere.glsl"
//#define RAYMARCH_BACKGROUND atmosphere(normal, normalize(u_light))
// #define RAYMARCH_AMBIENT atmosphere(normal, normalize(u_light))

#include "lygia/lighting/raymarch.glsl"
#include "lygia/color/space/linear2gamma.glsl"
#include "lygia/color/exposure.glsl"


vec3 cart2polar( in vec3 st ) {
   float r = length(st);
   float theta = st.z/r;
   //float theta = atan(length(st.xy), st.z);
   float phi = atan(st.y, st.x);
   return vec3(r, theta, phi);
}

mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

float superFormula(in float theta, in float n1, in float n2, in float n3, in float m) {
    float t1 = abs(cos(m * theta / 4.0));
    t1 = pow(t1, n2);

    float t2 = abs(sin(m * theta / 4.0));
    t2 = pow(t2, n3);

    float t3 = t1 + t2;
    float r = pow(t3, -1.0 / n1);
    return r;
}

// Not a true implementation as I needed to use a hack for theta 
float psuedo3DsupershapeSDF( in vec3 st, in float s, float n1, float n2, float n3, float m) {
  float r = cart2polar( st ).x;
  float theta = cart2polar( st ).y;
  float phi = cart2polar( st ).z;
  float r1 = superFormula( phi, n1, n2, n3, m );
  float r2 = superFormula( theta,n1, n2, n3, m );
  float d1 = s * r1 * cos( phi ) * r2 * cos( theta );
  float d2 = s * r1 * sin( phi ) * r2 * cos( theta );
  float d3 = s * r2 * sin( theta ) ;
  vec3 q = vec3(d1, d2, d3);
  return r -= length(q); 
 }

// Appears to break if n1 < n2,n3
// 0.5, 4.0, 3.0, 3.0, 10.0 (squash shape) OK
// 0.5, 0.2, 1.7, 1.7, 5.0 SDF BREAKS
// 0.5, 1.0, 1.0, 1.0, 5.0 SDF (starfish) BREAKS 

vec4 raymarchMap( in vec3 pos ) {
    vec4 res = vec4(1.0);
    res = opUnion( res, vec4( -0.1, 0.3, 0.6, psuedo3DsupershapeSDF(pos, 0.5, 2.0, 1.0, 1.0, 5.0 ) ) );
  
   res = opUnion( res, vec4( 0.1, 0.3, 0.6, pyramidSDF(   pos-vec3( 2.0, 0.10, 2.0), 1.0 ) ) );
  return res;
}

void main() {
   vec2 st = (gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
   vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
   vec2 pixel = 1.0/u_resolution;
   vec2 uv = ratio(st, u_resolution);
   vec2 mo = u_mouse / u_resolution;
   float time = 32.0 + u_time * 1.5;

    // camera	
    vec3 ro = vec3( 4.5*cos(0.1*time + 7.0*mo.x), 1.2, 4.5*sin(0.1*time + 7.0*mo.x) ) * 9.;
  
    color.rgb = raymarch(ro, uv).rgb;
    //color = linear2gamma(color);
    color.rgb = vibrance(color.rgb, 0.2);
   // color.rgb += mixSpectral(RED, PURPLE, 0.5);
  
    gl_FragColor = color;
}
