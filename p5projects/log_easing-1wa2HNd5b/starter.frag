// Ported to P5.js from "Lets get bouncy!!" 
// by Martijn Steinrucken aka BigWings/The Art of Code - 2022
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

// YouTube: youtube.com/TheArtOfCodeIsCool
// https://youtu.be/BRR7x-uLoWE

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform int iFrame;

float Dot(vec2 uv, float x, float y) {
    x = mix(-.8, .8, x);
    return smoothstep(.003,.0, length(uv-vec2(x,y))-.02);
}

float Bounce(float x) {
    float
        b1 = -4.*(x+.5)*(x-.5),
        b2 = -16.*(x-.5)*(x-.8),
        b3 = -8.*(x-.8)*(x-1.);
        
    return .4*max(b1, max(b2, b3));    
}

float Bounce2(float x, float r) {
    float
        start = -.5,
        end = .5,
        width = end-start,
        center,
        val = 0.;
    
    int NUM = 16;
    
    x *= 1./(1.-r) -.5;
    
    for( int i=0; i<16; i+=1) {
        center = (start+end)/2.;

        float bounce = -(x-start)*(x-end);
        bounce /= -(center-start)*(center-end);
        bounce *= width;
        val = max(val, bounce);

        start = end;
        width *= r;
        end += width;
        center = (start+end)/2.;
        
        if(width<1e-3) break;
    }
    
    return .4*val;
}

float Bounce3(float x, float base) {
    
    x = -log(1.-x)/log(base);
    x -= log(1.-(1.-base)/2.)/log(base);

    float i = floor(x);

    x = fract(x);
    
    x = (1.-pow(base, -x)) / (1.-1./base);
    float bounce = -4.*x*(x-1.);
    
    bounce /= pow(base*.8, i+1.);
    return .4*bounce;
    
}

void main(  )
{
    vec2 uv = (gl_FragCoord.xy-0.5*u_resolution.xy)/u_resolution.y;
    vec2 M = iMouse.xy/u_resolution.xy;
    
    vec3 col = vec3(0);
    
    float t = fract(iTime*.3);//min(1., iTime);
    float x = (uv.x+.8)/1.6;    
    float r = 1.-M.x;
    
    // draw a green circle
    col += vec3(0,0,0)*Dot(uv, t, Bounce3(t, r)); // bounce
   
   // if(uv.y<0.)
    //    col += fract(log(1.-x)/log(r)); 
   
    // draw curve that ball bounces on
    col += smoothstep(.01,.0,abs(uv.y-Bounce3(x, r))); 
  
    // draw line
    if(abs(uv.y)<.002) col += 1.;
    if(abs(abs(uv.x)-.8)<.002) col += 1.;
    
    gl_FragColor = vec4(col,1.0);
}