// Port of https://www.shadertoy.com/view/WdKXDt

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_tex0;

#define PLATFORM_WEBGL
#define AA 3

#include "lygia/color/space/gamma2linear.glsl"
#include "lygia/color/palette/spectral.glsl"
#include "lygia/color/pigments.glsl"
#include "lygia/color/palette/water.glsl"
#include "lygia/math/const.glsl"
#include "lygia/sdf/flowerSDF.glsl"

float modulo(in float x, in float y) { return x - y * floor(x / y); }

float sn; 	// index of snowflake

vec3 fractal(vec2 st, float ch, int N){
    //st.x=-st.x-(cos(u_time)+5.0)/3.0;
    st.x=-st.x-(cos(u_time)+5.0)/3.0;
    vec3 col=vec3(0);
    vec2 z = vec2(0.0);
    // int i;
    float h;
    #ifdef PLATFORM_WEBGL
    for (int i = 0; i< 64; i++) {
        if (i >= N) break;
    #else
    for (int i = 0; i< N; i++) {
    #endif
        z=vec2(z.x*z.x-z.y*z.y, ch*z.x*z.y)+st;
        h = dot(z,z);
        if (h>1.8447e+19){
            float n = float(i)-log2(.5*log2(h))+4.;
            float m = exp(-n*n/20000.);
            n = mix(4.*pow((log(n+1.)+1.),2.),n,m);
            m = 5.*sin(.1*(n-6.))+n;
            //m = 5.*sin(.1*(n-6.))+n;
            col = sin(m)*vec3(1.)*0.5 + 0.5;
            //col = (1.0 - sin(m+0.))*vec3(1.);
            break;
        }
      //if (i==64) col=vec3(0.);
    }
    return col*0.1;
}

vec3 snowflake( vec2 st, vec2 pixel, float spokes, int N) {
    float s = 0.3*length(pixel);
    vec3 color = vec3(0);
    vec2 uv;
    #ifdef PLATFORM_WEBGL
    for (int i = 0; i< 10; i++) {
        for (int j = 0; j < 10; j++) {
            if (i >= N || j >= N) break;
    #else
    for (int i = 0; i< N; i++) {
         for (int j = 0; j < N; j++){
    #endif
            vec2 p =  (st+vec2(float(i),float(j))/3.0-0.5*pixel)/s;
            // rotation and mirroring
    		float m = length(p);
    		float a = abs(mod(atan(p.y,p.x)+u_time,PI/spokes)-PI/2.0*spokes); 

            color = fractal(vec2(m*cos(a),m*sin(a)), 2.0, 64);
            //uv = vec2(m*cos(a), m*sin(a));
         }
    }
           return color;
          
}
    
void main()
{
    vec2 st = gl_FragCoord.xy;
    vec2 pixel = u_resolution.xy;
    float s = 0.45*length(pixel);
    //float s = 0.3*length(pixel);
    vec4 color = vec4(vec3(0), 1.0);
    //float sn = modulo(u_time/(2.0*PI), 5.0);
    
    for (int u=0; u<3; u++){
        for (int v=0;v<3;v++){
            vec2 p =  (st+vec2(float(u),float(v))/3.0-0.5*pixel)/s;
            // rotation and mirroring
    		float m = length(p);
    		//float a = abs(mod(atan(p.y,p.x)+u_time,PI/4.0)-PI/8.0);
          float a = abs(mod(atan(p.y,p.x),PI/4.0)-PI/8.0);
    		color.rgb += fractal(vec2(m*cos(a),m*sin(a)), -2.0, 32);
          
        }
    }
    
    
   
    
    
    gl_FragColor = color;
}
