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
#include "lygia/sdf/triSDF.glsl"
#include "lygia/draw/fill.glsl"
#include "lygia/math/const.glsl"

float modulo(in float x, in float y) { return x - y * floor(x / y); }

float sn; 	// index of snowflake

float fractal(vec2 p){
    p.x=-p.x-(cos(u_time)+5.0)/3.0;
    vec3 col=vec3(0.0);
    vec2 z = vec2(0.0);
    float m;
    // int i;
    float h;
    for (int i=0;i<64;i++){

        // different iteration functions generate different snowflakes
        if (sn==0.0) z=vec2(z.x*z.x-z.y*z.y,2.0*z.x*z.y)+p;
        else if (sn==3.0) z=vec2(z.x*z.x-z.y*z.y,-2.0*z.x*z.y)+p;
        else if (sn==1.0) z=vec2(abs(z.x*z.x-z.y*z.y),2.0*z.x*z.y)+p;
        else if (sn==4.0) z=vec2(abs(z.x*z.x-z.y*z.y),-2.0*z.x*z.y)+p;
        else if (sn==2.0) z=vec2(z.x*z.x-z.y*z.y,-abs(2.0*z.x*z.y))+p;

        // color function for Mandelbrot (https://www.shadertoy.com/view/wl2SWt)
        h = dot(z,z);
        if (h>1.8447e+19){
            float n = float(i)-log2(.5*log2(h))+4.;
            float m = exp(-n*n/20000.);
            n = mix(4.*pow((log(n+1.)+1.),2.),n,m);
            m = 5.*sin(.1*(n-6.))+n;
            col += vec3(
                pow(sin((m-8.)/20.),6.),
                pow(sin((m+1.)/20.),4.),
                (.8*pow(sin((m+2.)/20.),2.)+.2)*(1.-pow(abs(sin((m-14.)/20.)),12.))
            );
            break;
        }
    }
    //if (i==64) col=vec3(1.0);
    //return col;
   return m;
}


float snowflake( vec2 st, vec2 pixel, int N) {
    float s = 0.3*length(pixel);
    vec3 color = vec3(0);
    vec2 uv;
    float c;
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
    		float a = abs(mod(atan(p.y,p.x)+u_time,PI/3.0)-PI/6.0);

           
            //color = fractal(vec2(m*cos(a),m*sin(a)));
            float c = fractal(vec2(m*cos(a),m*sin(a)));
            //uv = vec2(m*cos(a), m*sin(a));
         }
    }
           return c;
          //return uv;
}
    
void main()
{
    vec2 st = gl_FragCoord.xy;
    vec2 pixel = u_resolution.xy;
    //float s = 0.3*length(u_resolution.xy);
    vec4 color = vec4(vec3(0.0), 1.0);
    float sn = modulo(u_time/(2.0*PI), 5.0);
   
    float c = snowflake(st, pixel, 3);
    //float c = d.x * cos(d.y);
   // color.rgb = spectral_zucconi(d.x);  // yields a hexagon
    // color.rgb = spectral_zucconi(d.y);  // yields a pinwheel
    color.rgb = spectral_zucconi(cos(c*15.));
    //color.rgb = fractal(d);
    //color.rgb = mix(col1, col2)
    //color = vec4(color.rgb/float(AA*AA),1.0);
    gl_FragColor = color;
}
