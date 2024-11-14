//Ported from https://www.shadertoy.com/view/XtjXW3

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;


#define S smoothstep
#define plot(U,l) ( dot(U,l) > 0.  ? abs( dot(U , vec2(-l.y,l.x)) ) : 0. )
#define plotC(U,l)  abs( length(U-(l)/2.) - .5 )

// Color scheme
// The uvs are floating point with a range of [0.0,1.0] so we normalize by dividing by 255.
#define PURPLE vec3(83, 29,109) / 255.
#define RED vec3(191, 18, 97) / 255.
#define ORANGE vec3(251,162, 100) / 255.
#define BLUE vec3(118, 212, 229) / 255.

vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}  

void main( )
{
    vec2 uv = (gl_FragCoord.xy-0.5*u_resolution.xy)/u_resolution.y;
    vec2 U = gl_FragCoord.xy;
    vec4 col = vec4(colorGradient(uv, BLUE, ORANGE, 0.5), 1.);
   vec4 o = vec4(0); 
   
    float s = 1.;  // mat2 R = mat2(0,-1,-1,0);
  
    (U - 0.5 * u_resolution.xy )/u_resolution.y;
    U /= u_resolution.y; 
  U.x -= .3; U+=1e-5; // or bug at depth 2. why ?
    vec2 P = vec2(.5), I=vec2(1,0),J=vec2(0,1), fU, l=-I,r=l, k;
    
    for (float i=0.; i<10.; i++) {
        if (i > mod(iTime,7.) ) break;
       //fU = min(U,1.-U); if (min(fU.x,fU.y) < 4./H) { o.r++; break; } // cell border

        fU = step(.5,U);         // select child
        bvec2 c = bvec2(fU);     
        U = 2.*U - fU;           // go to new local frame
        l = c.x ? c.y ? -J : -I            // node left segment
                : c.y ?  l :  J;
        r = (c.x==c.y)?  I : c.y ?-J:J;    // node right segment
        // the heart of Hilbert curve : 
        if (c.x) { U.x = 1.-U.x;  l.x=-l.x;  r.x=-r.x;  k=l;l=r;r=k; }      // sym
        if (c.y) { U   = 1.-U.yx; l  =-l.yx; r  =-r.yx; }  // .5+(U-.5)*R   // rot+sym
        s++;
    }

    o += length(l+r) > 0. ?   plotC (U-P, l+r) :  plot (U-P, l) + plot (U-P, r); 
    o = S(.33+.01*s,.33-.01*s,o);
 // col += o;
   
    fU = min(U,1.-U);            // clamp or color
    o *= min(fU.x,fU.y)<0. ? o-o : vec4(PURPLE,1);
    col = mix(col, o, 0.8);
   gl_FragColor = col;
}