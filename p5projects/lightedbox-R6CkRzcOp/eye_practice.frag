// From Painting an eye with maths Inigo Quilez


#ifdef GL_ES
precision mediump float;
#endif

#define S smoothstep
#define T iFrame

uniform vec2 u_resolution; // This is passed in as a uniform from the sketch.js file
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;


float N21( vec2 p) {
    return fract( sin(p.x*100. + p.y*6574.)*5674. );
}


float SmoothNoise(vec2 uv) {
   // lv goes from 0,1 inside each grid
   // check out interpolation for dummies
    vec2 lv = fract(uv);
   
   //vec2 lv = smoothstep(0., 1., fract(uv*10.));  // create grid of boxes 
    vec2 id = floor(uv); // find id of each of the boxes
     lv = lv*lv*(3.-2.*lv); 
    
    // get noise values for each of the corners
    // Use mix function to join together
    float bl = N21(id);
    float br = N21(id+vec2(1,0));
    float b = mix (bl, br, lv.x);
    
    
    float tl = N21(id + vec2(0,1));
    float tr = N21(id+vec2(1,1));
    float t = mix (tl, tr, lv.x);
    
    return mix(b, t, lv.y);
}

float SmoothNoise2 (vec2 uv) {
   float c = SmoothNoise(uv*4.);
     // Layer(or octave) of noise
    // Double frequency of noise; half the amplitude
    c += SmoothNoise(uv*8.)*.5;
    c += SmoothNoise(uv*16.)*.25;
    c += SmoothNoise(uv*32.)*.125;
    c += SmoothNoise(uv*64.)*.0625;
    
    return c/ 2.;  // have to normalize or could go past 1
}

// From IQ
// Add rotation matrix to improve noise function
// using coordinates for right triangle
mat2 m = mat2( 0.8, .6, -.6, 0.8);


// // IQ coding an eye livestream
// float fbm( vec2 p)
//   {
//   float f = 0.0;
//    f += 0.5000*SmoothNoise2( p ) ; p*= m*2.02;
//    f += 0.2500*SmoothNoise2( p ) ; p*= m*2.03;
//    f += 0.1250*SmoothNoise2( p ) ; p*= m*2.01;
//    f += 0.0625*SmoothNoise2( p ) ; p*= m*2.04;
//    f /= 0.9375;
//    return f;
// }


// IQ coding an eye livestream
float fbm( vec2 p)
  {
  float f = 0.0;
   f += 0.5000*SmoothNoise( p ) ; p*= m*2.02;
   f += 0.2500*SmoothNoise( p ) ; p*= m*2.03;
   f += 0.1250*SmoothNoise( p ) ; p*= m*2.01;
   f += 0.0625*SmoothNoise( p ) ; p*= m*2.04;
   f /= 0.9375;
   return f;
}
mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}



void main()
{
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
	vec2 p = -1. + 2.*uv;
  
    float background = smoothstep( -.25, .25, p.x);
   
    float r = sqrt( dot(p,p) );
    float a = atan( p.y, p.x);
  
    //float f = fbm( 1.0 * p );
  
   
  
    vec3 col = vec3( 1.0 );
  
  
   if ( r < 0.8 )
   {
     col = vec3(0.2, 0.3, 0.4);
     float f = fbm( 2.0 * p ); // Adjust parameter here to make variation more pronounced
     col = mix( col, vec3(.2, .5, .4), f);
     
     f = 1.- smoothstep( 0.2, 0.5, r);
     col  = mix(col, vec3(.9, .6, .2), f);
     
     // Add distortion to pattern ( not as cool as IQs ?)
     // Mine -- more of a circular pattern, IQs "mixed paint" like effect
     //a += 0.5* fbm( 20.0*p );
     
     // Add white fibers and compress pattern
     f = smoothstep( 0.3, 1., fbm( vec2( 6.*r, 20. * a) ) );
     col = mix( col, vec3(1.0), f);
     
      
     // Add black fibers
     f = smoothstep( 0.4, .9, fbm( vec2( 10.*r, 15. *a) ) );
     col *= 1.0 - f;
     
     
     // Darken the edges of the eye
     f = smoothstep( .5, .8, r);
     col *= 1. - .5*f;
     
     // add an iris
     f = smoothstep(.2, .25, r); 
     col *= f;
     
     
     // Add reflection
     f = 1. - smoothstep( 0., .5, length( p - vec2(.2, .15) ) );
     col += vec3(1., .9, .8)*f*.8;
     
     // fix border of iris
     f = smoothstep(.75, .8, r);
     col = mix(col, vec3(1.), f);
     
   }
  
     
    //col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}