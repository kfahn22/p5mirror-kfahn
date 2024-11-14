// Created by inigo quilez - iq/2019
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

// Step #3 of the LIVE Shade Deconstruction tutorial for "Happy Jumping"
// https://www.youtube.com/watch?v=Cfe5UQ-1L9Q

// Step 1: https://www.shadertoy.com/view/Wl2SRw
// Step 2: https://www.shadertoy.com/view/3ljSzw
// Step 3: https://www.shadertoy.com/view/ttjXDz
// Step 4: https://www.shadertoy.com/view/tljSDz
// Final:  https://www.shadertoy.com/view/3lsSzf

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;
uniform sampler2D tex0;

// Global variables
const vec3  kSunDir = vec3(-0.624695,0.468521,-0.624695);
const float kMaxTreeHeight = 2.4;
const float kMaxHeight = 120.0;

#define S smoothstep
#define CG colorGradient
#define DL diagonalLine
#define PI 3.14159
#define DARK vec3(11,19,39)/255.
#define NAVY vec3(0,3,105)/255.
//#define BLUE vec3(97,95,221)/255.


#define NUM_LAYERS 4.
#define ZERO (min(iFrame,0))
#define LOWQUALITY
#define LOWQUALITY_SHADOWS
#define BG backgroundGradient
#define S smoothstep

// Define colors scheme
#define LTBROWN vec3(170, 124, 100)/255.
#define BROWN vec3(117,79,68)/255.
#define PINK vec3(255,146,194)/255.
#define YELLOW vec3(251,217,125)/255.
#define BLUE vec3(161,198,211)/255.
#define GREEN vec3(9,56,38)/255.

vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}  

mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

float smin( float a, float b, float k )
{
    float h = max(k-abs(a-b),0.0);
    return min(a, b) - h*h*0.25/k;
}

// vec2 smin( vec2 a, vec2 b, float k )
// {
//     float h = clamp( 0.5+0.5*(b.x-a.x)/k, 0.0, 1.0 );
//     return mix( b, a, h ) - k*h*(1.0-h);
// }

float smax( float a, float b, float k )
{
    float h = max(k-abs(a-b),0.0);
    return max(a, b) + h*h*0.25/k;
}
	
float sdSphere( vec3 p, float s )
{
    return length(p)-s;
}

float sdCappedCone( vec3 p, float h, float r1, float r2 )
{
  vec2 q = vec2( length(p.xz), p.y );
  vec2 k1 = vec2(r2,h);
  vec2 k2 = vec2(r2-r1,2.0*h);
  vec2 ca = vec2(q.x-min(q.x,(q.y<0.0)?r1:r2), abs(q.y)-h);
  vec2 cb = q - k1 + k2*clamp( dot(k1-q,k2)/dot(k2, k2), 0.0, 1.0 );
  float s = (cb.x<0.0 && ca.y<0.0) ? -1.0 : 1.0;
  return s*sqrt( min(dot(ca,ca),dot(cb,cb)) );
}

float sdRoundBox( vec3 p, vec3 b, float r )
{
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0) - r;
}

float sdEllipsoid( in vec3 p, in vec3 r )
{
    float k0 = length(p/r);
    float k1 = length(p/(r*r));
    return k0*(k0-1.0)/k1;
}

float sdPyramid( vec3 p, float h)
{
  float m2 = h*h + 0.25;
    
  p.xz = abs(p.xz);
  p.xz = (p.z>p.x) ? p.zx : p.xz;
  p.xz -= 0.5;

  vec3 q = vec3( p.z, h*p.y - 0.5*p.x, h*p.x + 0.5*p.y);
   
  float s = max(-q.x,0.0);
  float t = clamp( (q.y-0.5*p.z)/(m2+0.25), 0.0, 1.0 );
    
  float a = m2*(q.x+s)*(q.x+s) + q.y*q.y;
  float b = m2*(q.x+0.5*t)*(q.x+0.5*t) + (q.y-m2*t)*(q.y-m2*t);
    
  float d2 = min(q.y,-q.x*m2-q.y*0.5) > 0.0 ? 0.0 : min(a,b);
    
  return sqrt( (d2+q.z*q.z)/m2 ) * sign(max(q.z,-p.y));
}

float sdCone( in vec3 p, in vec2 c, float h )
{
  // c is the sin/cos of the angle, h is height
  // Alternatively pass q instead of (c,h),
  // which is the point at the base in 2D
  vec2 q = h*vec2(c.x/c.y,-1.0);
    
  vec2 w = vec2( length(p.xz), p.y );
  vec2 a = w - q*clamp( dot(w,q)/dot(q,q), 0.0, 1.0 );
  vec2 b = w - q*vec2( clamp( w.x/q.x, 0.0, 1.0 ), 1.0 );
  float k = sign( q.y );
  float d = min(dot( a, a ),dot(b, b));
  float s = max( k*(w.x*q.y-w.y*q.x),k*(w.y-q.y)  );
  return sqrt(d)*sign(s);
}

vec2 sdStick(vec3 p, vec3 a, vec3 b, float r1, float r2)
{
    vec3 pa = p-a, ba = b-a;
	float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
	return vec2( length( pa - ba*h ) - mix(r1,r2,h*h*(3.0-2.0*h)), h );
}

vec2 opU( vec2 d1, vec2 d2 )
{
	return (d1.x<d2.x) ? d1 : d2;
}

float N21( vec2 p) {
    return fract( sin(p.x*100. + p.y*6574.)*5674. );
}

// return smoothstep and its derivative
vec2 smoothstepd( float a, float b, float x)
{
	if( x<a ) return vec2( 0.0, 0.0 );
	if( x>b ) return vec2( 1.0, 0.0 );
    float ir = 1.0/(b-a);
    x = (x-a)*ir;
    return vec2( x*x*(3.0-2.0*x), 6.0*x*(1.0-x)*ir );
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

float hash1( vec2 p )
{
    p  = 50.0*fract( p*0.3183099 );
    return fract( p.x*p.y*(p.x+p.y) );
}

float hash1( float n )
{
    return fract( n*17.0*fract( n*0.3183099 ) );
}

vec2 hash2( vec2 p ) 
{
    const vec2 k = vec2( 0.3183099, 0.3678794 );
    float n = 111.0*p.x + 113.0*p.y;
    return fract(n*fract(k*n));
}


// value noise, and its analytical derivatives
vec4 noised( in vec3 x )
{
    vec3 p = floor(x);
    vec3 w = fract(x);
    #if 1
    vec3 u = w*w*w*(w*(w*6.0-15.0)+10.0);
    vec3 du = 30.0*w*w*(w*(w-2.0)+1.0);
    #else
    vec3 u = w*w*(3.0-2.0*w);
    vec3 du = 6.0*w*(1.0-w);
    #endif

    float n = p.x + 317.0*p.y + 157.0*p.z;
    
    float a = hash1(n+0.0);
    float b = hash1(n+1.0);
    float c = hash1(n+317.0);
    float d = hash1(n+318.0);
    float e = hash1(n+157.0);
	float f = hash1(n+158.0);
    float g = hash1(n+474.0);
    float h = hash1(n+475.0);

    float k0 =   a;
    float k1 =   b - a;
    float k2 =   c - a;
    float k3 =   e - a;
    float k4 =   a - b - c + d;
    float k5 =   a - c - e + g;
    float k6 =   a - b - e + f;
    float k7 = - a + b + c - d + e - f - g + h;

    return vec4( -1.0+2.0*(k0 + k1*u.x + k2*u.y + k3*u.z + k4*u.x*u.y + k5*u.y*u.z + k6*u.z*u.x + k7*u.x*u.y*u.z), 
                      2.0* du * vec3( k1 + k4*u.y + k6*u.z + k7*u.y*u.z,
                                      k2 + k5*u.z + k4*u.x + k7*u.z*u.x,
                                      k3 + k6*u.x + k5*u.y + k7*u.x*u.y ) );
}

float noise( in vec3 x )
{
    vec3 p = floor(x);
    vec3 w = fract(x);
    
    #if 1
    vec3 u = w*w*w*(w*(w*6.0-15.0)+10.0);
    #else
    vec3 u = w*w*(3.0-2.0*w);
    #endif
    


    float n = 111.0*p.x + 317.0*p.y + 157.0*p.z;
    
    float a = hash1(n+(  0.0+  0.0+  0.0));
    float b = hash1(n+(111.0+  0.0+  0.0));
    float c = hash1(n+(  0.0+317.0+  0.0));
    float d = hash1(n+(111.0+317.0+  0.0));
    float e = hash1(n+(  0.0+  0.0+157.0));
	float f = hash1(n+(111.0+  0.0+157.0));
    float g = hash1(n+(  0.0+317.0+157.0));
    float h = hash1(n+(111.0+317.0+157.0));

    float k0 =   a;
    float k1 =   b - a;
    float k2 =   c - a;
    float k3 =   e - a;
    float k4 =   a - b - c + d;
    float k5 =   a - c - e + g;
    float k6 =   a - b - e + f;
    float k7 = - a + b + c - d + e - f - g + h;

    return -1.0+2.0*(k0 + k1*u.x + k2*u.y + k3*u.z + k4*u.x*u.y + k5*u.y*u.z + k6*u.z*u.x + k7*u.x*u.y*u.z);
}

vec3 noised( in vec2 x )
{
    vec2 p = floor(x);
    vec2 w = fract(x);
    #if 1
    vec2 u = w*w*w*(w*(w*3.0-10.0)+5.0); //w*6.0-15.0)+10.0)
    vec2 du = 50.0*w*w*(w*(w-2.0)+1.0);
    #else
    vec2 u = w*w*(3.0-2.0*w);
    vec2 du = 3.0*w*(1.0-w);
    #endif
    
    // four corners of each random tile
    float a = hash1(p+vec2(0,0));
    float b = hash1(p+vec2(1,0));
    float c = hash1(p+vec2(0,1));
    float d = hash1(p+vec2(1,1));

    float k0 = a;
    float k1 = b - a;
    float k2 = c - a;
    float k4 = a - b - c + d;

    return vec3( -1.0+2.0*(k0 + k1*u.x + k2*u.y + k4*u.x*u.y), 
                 2.0*du * vec2( k1 + k4*u.y,
                            k2 + k4*u.x ) );
}

float noise( in vec2 x )
{
    vec2 p = floor(x);
    vec2 w = fract(x);
    #if 1
    vec2 u = w*w*w*(w*(w*6.0-15.0)+10.0); //I broke the code changing these parameters
    #else
    vec2 u = w*w*(3.0-2.0*w);
    #endif

    float a = hash1(p+vec2(0,0));
    float b = hash1(p+vec2(1,0));
    float c = hash1(p+vec2(0,1));
    float d = hash1(p+vec2(1,1));
    
    return -1.0+2.0*(a + (b-a)*u.x + (c-a)*u.y + (a - b - c + d)*u.x*u.y);
}

// Rotation matrices using pythagorian triples

const mat3 m3  = mat3( 0.00,  0.80,  0.60,
                      -0.80,  0.36, -0.48,
                      -0.60, -0.48,  0.64 );
const mat3 m3i = mat3( 0.00, -0.80, -0.60,
                       0.80,  0.36, -0.48,
                       0.60, -0.48,  0.64 );
const mat2 m2 = mat2(  0.80,  0.60,
                      -0.60,  0.80 );
const mat2 m2i = mat2( 0.80, -0.60,
                       0.60,  0.80 );

//------------------------------------------------------------------------------------------

float fbm_4( in vec2 x )
{
    // float f = 1.9;
    // float s = 0.55;
    // float a = 0.0;
    // float b = 0.5;
  float f = 1.1;
    float s = 0.86;
    float a = 0.0;
    float b = 0.5;
    for( int i=0; i<4; i++ )
    {
        float n = noise(x);
        a += b*n;
        b *= s;
        x = f*m2*x;
    }
	return a;
}

float fbm_4( in vec3 x )
{
    float f = 2.0;
    float s = 0.5;
    float a = 0.0;
    float b = 0.5;
    for( int i=0; i<4; i++ )
    {
        float n = noise(x);
        a += b*n;
        b *= s;
        x = f*m3*x;
    }
	return a;
}

vec2 terrainMap( in vec2 pos )
{
  
    float t1 =fract(iTime);
    float p = 4.0*t1*(1.0-t1);
    float pp = 4.0*(1.0-2.0*t1);
    vec2 cen = vec2(p + 0.1, p - iTime) ;   
    vec2 q = pos - cen;
    const float sca = 0.010; // scaling factor
    q /= 1.0;
    float e = 1.0*noise( q + vec2(1.0,-1.0) ); //fbm_9
    float a = 1.0-smoothstep( 0.12, 0.13, e ); // flag high-slope areas (-0.25, 0.0)
   // float a = 1.0-0.9*smoothstep( 0.12, 0.13, 0.12 ); // flag high-slope areas (-0.25, 0.0)
    e += 2.0*smoothstep( -20.0, -3.0, e );
    return vec2(e,a);
}


vec2 map( in vec3 pos, float atime )
{
    float t1 = 0.5*fract(atime);
    float t4 = abs(fract(atime*0.5)-0.5)/0.5;

    float p = 4.0*t1*(1.0-t1);
    float pp = 4.0*(1.0-2.0*t1);

  
    vec3 cen = vec3( 0.5*(-1.0 + 2.0*t4),
                     pow(p,2.0-p) + 0.2,
                    floor(atime) + pow(t1,0.7) -1.0 );
  
        
    // ground
    float fh = -0.1 - 0.1*(sin(pos.x*2.0)+sin(pos.z*2.0));
    float d = pos.y - fh;
    vec2 res = vec2(d, 1.0);
    
    // mountains
    // domain undistorted original world coordinates: vec3(pos.x, pos.y, pos.z)
    // add  mod (pos.z + 1.5, 3.0)-1.5 to add more ellipsoids
    {
      float offset = noise( pos );
      vec3 qos = vec3(mod(abs(pos.x), 3.)-1.5, pos.y, mod(pos.z + 1.5, 3.0)-1.5);
      //vec3 qos = vec3(mod(abs(pos.x), 3.)-1.5, pos.y, mod(pos.z + 1.5, 3.0)-1.5);
      // mountains are in 2d space
      vec2 id = vec2( floor(pos.x/3.0), floor((pos.z+1.5)/3.0) );
      
      // use really big numbers to fake randomness
       float fid = id.x*313.1 + id.y*139.3;
       float fy = fract ( fid*1.312+ atime * 0.1);
       float y = -1.0+4.0*fy;
       vec3  rad = vec3(0.7,1.0+0.5*sin(fid),0.7);
       //rad -= 0.1*pow(pos.y, .5); 
      rad -= 0.1*sin(pos.y*2.25); 
       float  d1 = sdEllipsoid( qos - vec3(0.01 + 0.3, -0.02, 0.02), rad);
      float rand = max(noise(vec2(qos.x, qos.y)), 0.05 );
   float d2 = sdRoundBox( qos - vec3(-0.01, -0.025, 0.01), vec3((1.+rand)*0.43, 0.23, .04), .08);
      float d3 = sdPyramid( qos - vec3(0.02, 0.01, -0.01), 0.9);
      float d4 = sdCappedCone( qos - vec3(10.02, 0.025, 0.1), .8*offset, 0.15, .15);
   //  vec3 vp = vec3( mod(abs(pos.x),3.0),pos.y,mod(pos.z+1.5,3.0)-1.5);
   //  vec2 id = vec2( floor(pos.x/3.0), floor((pos.z+1.5)/3.0) );
   //  float fid = id.x*11.1 + id.y*31.7;
   //  float fy = fract(fid*1.312+atime*0.1);
   //  float y = -1.0+4.0*fy;
   //  vec3  rad = vec3(0.7,1.0+0.5*sin(fid),0.7);
   //  rad += 0.1*(sin(pos.x*3.0)+sin(pos.y*4.0)+sin(pos.z*5.0));    
   //  float siz = 4.0*fy*(1.0-fy);
   //  float d2 = sdCone( vp-vec3(2.0,y,0.0), siz*vec2(0.,1.0+0.5*sin(fid)), y );
   // // float d2 = sdEllipsoid( vp-vec3(2.0,y,0.0), siz*rad );
   //  d2 *= 0.6;
   
  // float dd1 = smin(d1, d2, .2);  
   float dd2 = smin(d1, d3, .7);  
   d  = smin(d, d2, 0.2);
   d = smin( d, d3, 0.8);
   d = smin( d, d4, 0.5);  
    if( d<res.x ) res = vec2(d,1.0);
    }
    
    return res;
}

vec2 castRay(  vec3 ro, vec3 rd, float time)
{
 float m = -1.0;
 float t = 0.0;
 
 for ( int i=0; i < 100; i++)
 {
   vec3 pos = ro + t * rd;
   
   vec2 h = map( pos, time );
   m = h.y;
   // break look if inside sphere
   if ( h.x < 0.001 )
       break;
       t += h.x;
       // break loop if clearly outsize sphere (far Euclidean plane?) and haven't hit anything
      if ( t > 20.0 ) break;
    }
    if ( t > 20.0 ) m=-1.0;  // material is negative if there is no intersection
    return vec2(t,m);
}
// vec2 castRay( in vec3 ro, in vec3 rd, float time )
// {
//     vec2 res = vec2(-1.0,-1.0);

//     float tmin = 0.5;
//     float tmax = 20.0;
    
//     float t = tmin;
//     for( int i=0; i<256 && t<tmax; i++ )
//     {
//         vec2 h = map( ro+rd*t, time );
//         if( abs(h.x)<(0.0005*t) )
//         { 
//             res = vec2(t,h.y); 
//             break;
//         }
//         t += h.x;
//     }
    
//     return res;
// }

vec3 calcNormal( in vec3 pos, float time )
{

    vec2 e = vec2(0.0005,0.0);
    return normalize( vec3( 
        map( pos + e.xyy, time ).x - map( pos - e.xyy, time ).x,
		map( pos + e.yxy, time ).x - map( pos - e.yxy, time ).x,
		map( pos + e.yyx, time ).x - map( pos - e.yyx, time ).x ) );
    // vec3 n = vec3(0.0);
    // for( int i=min(iFrame,0); i<4; i++ )
    // {
    //     vec3 e = 0.5773*(2.0*vec3((((i+3)>>1)&1),((i>>1)&1),(i&1))-1.0);
    //     n += e*map(pos+0.0005*e,time).x;
    // }
    //return normalize(n);    
}

float calcOcclusion( in vec3 pos, in vec3 nor, float time )
{
	float occ = 0.0;
    float sca = 1.0;
    for( int i=0; i<5; i++ )
    {
        float h = 0.01 + 0.11*float(i)/4.0;
        vec3 opos = pos + h*nor;
        float d = map( opos, time ).x;
        occ += (h-d)*sca;
        sca *= 0.95;
    }
    return clamp( 1.0 - 2.0*occ, 0.0, 1.0 );
}

vec3 render( in vec3 ro, in vec3 rd, float time )
{ 
    // sky dome
    vec3 col = vec3(0.5, 0.8, 0.9) - max(rd.y,0.0)*0.5;
    
    vec2 res = castRay(ro,rd, time);
    if( res.y>-0.5 )
    {
        float t = res.x;
        vec3 pos = ro + t*rd;
        vec3 nor = calcNormal( pos, time );
        vec3 ref = reflect( rd, nor );
        
		col = vec3(0.2);
        float ks = 1.0;

		// if( res.y>3.5 ) // eyeball
		// { 
		// col = vec3(0.0);
		// } 
		// else if( res.y>2.5 ) // iris
		// { 
		// col = vec3(0.4);
		// } 
		// else if( res.y>1.5 ) // body
		// { 
		// col = vec3(0.144,0.09,0.0036);
		// }
		// else // terrain
		// {
            col = vec3(42,12,8)/ 255.;
            // float f = 0.21*(-1.0+2.0*smoothstep(-0.2,0.23,sin(213.11*pos.x)+sin(126.99*pos.y)+sin(333.11*pos.z)));
            // col += f*vec3(0.06,0.06,0.02);
            // ks = 0.5 + pos.y*0.15;
        //}
        
        // lighting
        vec3  sun_lig = normalize( vec3(0.6, 0.35, 0.5) );
        float sun_dif = clamp(dot( nor, sun_lig ), 0.0, 1.0 );
        vec3  sun_hal = normalize( sun_lig-rd );
        float sun_sha = step(castRay( pos+0.001*nor, sun_lig,time ).y,0.0);
		float sun_spe = ks*pow(clamp(dot(nor,sun_hal),0.0,1.0),8.0)*sun_dif*(0.04+0.96*pow(clamp(1.0+dot(sun_hal,rd),0.0,1.0),5.0));
		float sky_dif = sqrt(clamp( 0.5+0.5*nor.y, 0.0, 1.0 ));
        float bou_dif = sqrt(clamp( 0.1-0.9*nor.y, 0.0, 1.0 ))*clamp(1.0-0.1*pos.y,0.0,1.0);

		vec3 lin = vec3(0.0);
        lin += sun_dif*vec3(8.10,6.00,4.20)*sun_sha;
        lin += sky_dif*vec3(0.50,0.70,1.00);
        lin += bou_dif*vec3(0.40,1.00,0.40);
		col = col*lin;
		col += sun_spe*vec3(8.10,6.00,4.20)*sun_sha;
        
        col = mix( col, vec3(0.5,0.7,0.9), 1.0-exp( -0.0001*t*t*t ) );
    }

    return col;
}

mat3 setCamera( in vec3 ro, in vec3 ta, float cr )
{
	vec3 cw = normalize(ta-ro);
	vec3 cp = vec3(sin(cr), cos(cr),0.0);
	vec3 cu = normalize( cross(cw,cp) );
	vec3 cv =          ( cross(cu,cw) );
    return mat3( cu, cv, cw );
}

void main( )
{
    vec2 p = (-u_resolution.xy + 2.0*gl_FragCoord.xy)/u_resolution.y;
    float time = iTime;

    time *= 0.8;

    // camera	
    float cl = sin(0.5*time);
    float an = 1.57 + 0.7*sin(0.15*time);
   // vec3  ta = vec3( 0.0, 0.65, -0.6+time*1.0 - 0.4*cl);
  vec3  ta = vec3( 0.0, 0.75, 0.6+time*1.0 + 0.4*cl);
  
    // change z coordinate to - and camera will move toward horizon
    vec3  ro = ta + vec3( 1.3*cos(an), 0.55, -1.3*sin(an) );

    mat3 ca = setCamera( ro, ta, 0.0 ); // last parameter affects slope of ground

    vec3 rd = ca * normalize( vec3(p,1.8) );

    vec3 col = render( ro, rd, time );

    col = pow( col, vec3(0.4545) );

    gl_FragColor = vec4( col, 1.0 );
}