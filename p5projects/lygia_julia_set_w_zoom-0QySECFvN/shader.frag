
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2  u_resolution;
uniform vec2  u_mouse;

#include "lygia/math/pow2.glsl"

float juliaSDF( vec2 st, float k, vec2 mo, vec2 c, float r) {
    st = st * 2.0 - 1.0;
    vec2 uv = st / k;
    uv = st * pow(k, -mo.x*k);
    uv += c;
    vec2 z = vec2(0.0) - (uv ) * r;
    float n = 0.0;
    const int I = 100;
    for (int i = I; i > 0; i --) { 
        if( length(z) > 4.0 ) { 
            n = float(i)/float(I); 
            break;
      } 
       z = vec2( (pow2(z.x) - pow2(z.y) ) + c.x, (2.0*z.x*z.y) + c.y ); 
    } 
    float power = 0.75;
    //n = pow(n, power);
  return n;
}

// Julia Set Values
// vec2(0.27334, .00742)
// vec2(0.285, 0.01)
// vec2(-0.835, -0.2321)

void main() {
    vec2 pixel = 1.0/u_resolution.xy;
    vec2 st = gl_FragCoord.xy * pixel;
    vec4 color = vec4(vec3(0.0), 1.0);

    vec2 mo = u_mouse.xy/u_resolution.xy;
   
    vec2 c = vec2(-0.8, 0.156);
    //vec2 c = vec2(0.27334, .00742);
    //vec2 c = vec2(-0.835, -0.2321);
    //vec2 c = vec2(0.285, 0.01);
    float n = juliaSDF( st, 10.0, mo, c, 1.75);
    //float n = juliaSDF( st+vec2(0.4, 0.0), 10.0, mo, c, 1.75 );
    //color.rgb = n * vec3(1.0);
   
    color.rgb = vec3(0.5-cos(n * 5.0)/2.0,0.5-cos(n * 30.0)/2.0,0.5-cos(n * 40.0)/2.0);
    gl_FragColor = color;
}