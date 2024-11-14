// Code written for the MDN 100% completion moment
// The MIT License
// Copyright © 2019 Inigo Quilez
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// Shows the anisotropic self-similarity of Brownian Motion 
// on the left and the isotropic self-similarity of Fractional
// Brownian Motion if gain=0.5.
//
// On the left, a classical Brownian Motion is generated, which
// is a process with Hurst Exponent H=1/2 (uncorrelated deltas,
// no memory). Such curve has a fractal dimension of 1.5 and
// needs a vertical scaling factor of sqrt(x) when it's scaled
// by x horizontally. It's power spectrum decays as f^-2
//
// On the right, a Fractional Brownian Motion with H=1
// which means a gain G of 0.5. It's a long memory curve
// with positively correlated increments, has a fractal
// of 1, and is naturally isotropically self-similar (non-
// distorted zoom). Because of that, it's what we use to
// mimic mountains. It's power spectrum decays as f^-3
//
// More info: https://iquilezles.org/articles/fbm
#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;
uniform sampler2D tex0;

#define S smoothstep
#define CG colorGradient
#define HL horizontalLine
#define VL verticalLine
#define DL diagonalLine
#define PI 3.14159
#define DARK vec3(11,19,39)/255.
#define NAVY vec3(0,3,105)/255.
#define PINK vec3(255, 57, 255)/255.
#define YELLOW vec3(242,214,65)/255.
#define e = .008
#define MOD3 vec3(.1031,.11369,.13787)


vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}    


// integer hash copied from Hugo Elias
// float hash( int n ) 
// {
// 	n = (n * 13) * n;
//     n = n * (n * n * 15731 + 789221) + 1376312589;
//     return -1.0+2.0*float( (n + n*337 + n * 167 + n *601)/(n * 997) );
// }
// float hash( int n ) 
// {
// 	n = (n << 13) ^ n;
//     n = n * (n * n * 15731 + 789221) + 1376312589;
//     return -1.0+2.0*float( n & ivec3(0x0fffffff))/float(0x0fffffff);
// }

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
    float b = mix(bl, br, lv.x);
    
    
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


// IQ coding an eye livestream
float fbm1( vec2 p)
  {
  float f = 0.0;
   f += 0.5000*SmoothNoise( p ) ; p*= m*2.02;
   f += 0.2500*SmoothNoise( p ) ; p*= m*2.03;
   f += 0.1250*SmoothNoise( p ) ; p*= m*2.01;
   f += 0.0625*SmoothNoise( p ) ; p*= m*2.04;
   f /= 0.9375;
   return f;
}

// IQ coding an eye livestream
// this version creates smoother appearance
float fbm2( vec2 p)
  {
  float f = 0.0;
   f += 0.5000*SmoothNoise2( p ) ; p*= m*2.02;
   f += 0.2500*SmoothNoise2( p ) ; p*= m*2.03;
   f += 0.1250*SmoothNoise2( p ) ; p*= m*2.01;
   f += 0.0625*SmoothNoise2( p ) ; p*= m*2.04;
   f /= 0.9375;
   return f;
}

mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

float hash11(float p) {
    // From Dave Hoskins
	vec3 p3  = fract(vec3(p) * MOD3);
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.x + p3.y) * p3.z);
}

//  1 out, 2 in...
float hash12(vec2 p) {
	vec3 p3  = fract(vec3(p.xyx) * MOD3);
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.x + p3.y) * p3.z);
}

// float hash( int n )
// {
//     return fract( (n * 2) / 131) );
// }

// gradient noise
float gnoise( vec2 uv)
{
    //float i = int(floor(p));
    float f = fract(uv.x*8.);
    float u = f*f*(3.0-2.0*f);
    return mix( SmoothNoise(uv + vec2(0., 0.))*(f-0.0), 
                SmoothNoise(uv + vec2(0., 1.))*(f-1.0), u);
}

// fbm
float fbm( vec2 uv, float G )
{    
    uv += 26.06;
    float n = 0.0;
    float s = 1.0;
    float a = 0.0;
    float f = 1.0;    
    for( int i=0; i<16; i++ )
    {
        n += s*SmoothNoise(uv*f);
        a += s;
        s *= G;
        f *= 2.0;
        uv += 0.31;
    }
    return n;
}

vec3 anim( in vec2 p, float time )
{
    vec3 col = vec3(0.0);
    
    float ani = fract(time/16.);
    //float ani = smoothstep(0.0,1.0,fract(time/4.0));
    //float ani = smoothstep(0.0,1.0,fract(time/4.0));
    float zoom = pow( 2.0, 6.0*ani );
    

        vec2 q = vec2(p.x,p.y);
        float G = 0.5;
        float comp = zoom;
        float comp2 = comp;
        if( p.y<0.0 )
        {
        float y = -0.5+0.5*comp2 * ( fbm1( 1.0*p/comp ) );
        //  float y = -0.5+0.9*comp2*fbm1( 1.0*p/comp);
        y += zoom*0.004;
        col = mix( col, YELLOW, 1.-S( 0.0, 12.0/u_resolution.x, p.y - 1.5*y));
        }
         else
       {
        //float y = 0.5+0.9*fbm1(1.0*q.x, G );
           float y = 0.5+0.9*fbm1(1.0*p );
        col = mix( col, PINK, 1.0-smoothstep( 0.0, 12.0/u_resolution.x,p.y-y));
       }

       
   // col  *= smoothstep(0.01,0.02,abs(p.x) );
    col  *= smoothstep(0.01,0.02,p.y );

    return col;
}


#define AA 5
void main( )
{	
    vec3 col = vec3(0.0);
   for( int m=0; m<AA; m++ )
   for( int n=0; n<AA; n++ )
    {
        vec2 o = vec2(m,n)/float(AA);
        vec2 p = (2.0*(gl_FragCoord.xy)-u_resolution.xy)/u_resolution.y;
        float d = 0.5*sin(gl_FragCoord.x*147.0)*sin(gl_FragCoord.y*131.0);
        float time = iTime + 0.5*(1.0/24.0)*(float(n)+d)/float(AA*AA);

        col += anim(p,iTime);
  }
    col /= float(AA*AA);
    
    gl_FragColor = vec4( col, 1.0 );
   
}


// #define AA 5
// void main( )
// {	
//     vec3 col = vec3(0.0);
    
//         vec2 uv =(gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
//         float d = 0.5*sin(gl_FragCoord.x)*sin(gl_FragCoord.y*131.0);
//         float time = iTime + 0.5*(1.0/24.0);

//         col += anim(uv,time);
//     }
//    // col /= float(AA*AA);
    
//     gl_FragColor = vec4( col, 1.0 );
   
// }
