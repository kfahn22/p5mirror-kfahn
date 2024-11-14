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

#define S smoothstep
#define CG colorGradient
#define DL diagonalLine
#define PI 3.14159
#define DARK vec3(11,19,39)/255.
#define NAVY vec3(0,3,105)/255.
#define BLUE vec3(97,95,221)/255.
#define GREEN vec3(127, 184, 0)/255.
#define YELLOW vec3(255, 180, 0)/255.

vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}  

float smin( float a, float b, float k )
{
    float h = max(k-abs(a-b),0.0);
    return min(a, b) - h*h*0.25/k;
}

vec2 smin( vec2 a, vec2 b, float k )
{
    float h = clamp( 0.5+0.5*(b.x-a.x)/k, 0.0, 1.0 );
    return mix( b, a, h ) - k*h*(1.0-h);
}

float smax( float a, float b, float k )
{
    float h = max(k-abs(a-b),0.0);
    return max(a, b) + h*h*0.25/k;
}
	
float sdSphere( vec3 p, float s )
{
    return length(p)-s;
}

float sdEllipsoid( in vec3 p, in vec3 r )
{
    float k0 = length(p/r);
    float k1 = length(p/(r*r));
    return k0*(k0-1.0)/k1;
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

vec2 map( in vec3 pos, float atime )
{   
    float t1 = .5;//fract(atime);
    float t4 = abs(fract(atime*0.5)-0.5)/0.5;

  
    float p = 4.0*t1*(1.0-t1);
    float pp = 4.0*(1.0-2.0*t1);
    
    vec3 cen = vec3(0.0, .25, 0.0);
  
//     vec3 cen = vec3( 0.5*(-1.0 + 2.0*t4),
//                     pow(p,2.0-p) + 0.1,
//                     floor(atime) + pow(t1,0.7) -1.0 );
  
//     // body
    vec2 uu = normalize(vec2( 1.0, -pp ));
    vec2 vv = vec2(-uu.y, uu.x);
    
       float sy = 0.5 + 0.5*p;
//     float compress = 1.0-smoothstep(0.0,0.4,p);
//     sy = sy*(1.0-compress) + compress;
       float sz = 1.0/sy;

       vec3 q = pos - cen;
//     float rot = -0.25*(-1.0 + 2.0*t4);
//     float rc = cos(rot);
//     float rs = sin(rot);
//     q.xy = mat2(rc,rs,-rs,rc)*q.xy;
      vec3 r = q;
  
	
//     q.yz = vec2( dot(uu,q.yz), dot(vv,q.yz) );
       vec3 rad = vec3(0.01, 0.115*sy, 0.01*sz);
       vec2 res = vec2( sdEllipsoid( q, rad), 2.0 );
    //float d = sdEllipsoid( q, rad);
    float t2 = fract(atime+0.8);
    float p2 = 0.5-0.5*cos(6.2831*t2);
    // r.z += 0.05-0.2*p2;
    // r.y += 0.2*sy-0.2;
    vec3 sq = vec3( abs(r.x), r.yz );

	// head
    vec3 h = r;
    vec3 hq = vec3( abs(h.x), h.yz );
   	float d1  = sdEllipsoid( h-vec3(0.0,0.125,0.02), vec3(0.002,0.002,0.002) );
    res.x = smin( res.x, d1, 0.05);
   
        
    // wings
    {
    float w1 = sdEllipsoid( sq - vec3(0.065, 0.04, 0.0), vec3(0.065, 0.065, 0.01 ));
    float w2 = sdEllipsoid( sq - vec3(0.04, -0.02, 0.0), vec3(0.045, 0.08, 0.01 ));
  // res.x = smin( res.x, w
  // res.x = smin( res.x, wing.x, 0.01+0.04*(1.0-wing.y)*(1.0-wing.y)*(1.0-wing.y) );
    //  float wing = smin(w1,w2, 0.5);
    res.x = smin( res.x, w1, 0.01);
    res.x = smin( res.x, w2, 0.01);
    }
        
    // ears
    {
    // float t3 = fract(atime+0.9);
    // float p3 = 4.0*t3*(1.0-t3);
    // vec2 ear = sdStick( hq, vec3(0.15,0.32,-0.05), vec3(0.2+0.05*p3,0.2+0.2*p3,-0.07), 0.01, 0.01 );
    // res.x = smin( res.x, ear.x, 0.01 );
    }
    
    
        
//     // eye
//     {
//     float blink = pow(0.5+0.5*sin(2.1*iTime),20.0);
//     float eyeball = sdSphere(hq-vec3(0.08,0.27,0.06),0.065+0.02*blink);
//     res.x = smin( res.x, eyeball, 0.03 );
    
//     vec3 cq = hq-vec3(0.1,0.34,0.08);
//     cq.xy = mat2(0.8,0.6,-0.6,0.8)*cq.xy;
//     d = sdEllipsoid( cq, vec3(0.06,0.03,0.03) );
//     res.x = smin( res.x, d, 0.03 );

//     res = opU( res, vec2(sdSphere(hq-vec3(0.08,0.28,0.08),0.060),3.0));
//     res = opU( res, vec2(sdSphere(hq-vec3(0.075,0.28,0.102),0.0395),4.0));
//     }
        
    // ground
    float fh = -0.1 - 0.05*(sin(pos.x*2.0)+sin(pos.z*2.0));

    float d = pos.y - fh;
    
    // bubbles
    {
//     vec3 vp = vec3( mod(abs(pos.x),3.0),pos.y,mod(pos.z+1.5,3.0)-1.5);
//     vec2 id = vec2( floor(pos.x/3.0), floor((pos.z+1.5)/3.0) );
//     float fid = id.x*11.1 + id.y*31.7;
//     float fy = fract(fid*1.312+atime*0.1);
//     float y = -1.0+4.0*fy;
//     vec3  rad = vec3(0.7,1.0+0.5*sin(fid),0.7);
//     rad -= 0.1*(sin(pos.x*3.0)+sin(pos.y*4.0)+sin(pos.z*5.0));    
//     float siz = 4.0*fy*(1.0-fy);
//     float d2 = sdEllipsoid( vp-vec3(2.0,y,0.0), siz*rad );
    
//     d2 *= 0.6;
//     d2 = min(d2,2.0);
//     d = smin( d, d2, 0.32 );
//     if( d<res.x ) res = vec2(d,1.0);
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

        if( res.y>3.5 ) // eyeball
        { 
            col = vec3(0.0);
        } 
        else if( res.y>2.5 ) // iris
        { 
            col = vec3(0.4);
        } 
        else if( res.y>1.5 ) // body
        { 
            col = vec3(0.144,0.09,0.0036);
        }
		else // terrain
        {
            col = vec3(0.05,0.09,0.02);
            float f = 0.2*(-1.0+2.0*smoothstep(-0.2,0.2,sin(18.0*pos.x)+sin(18.0*pos.y)+sin(18.0*pos.z)));
            col += f*vec3(0.06,0.06,0.02);
            ks = 0.5 + pos.y*0.15;
        }
        
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

    //time *= 0.9;
    time = 0.0;
    // camera	
    float cl = sin(0.5*time);
    float an = 1.57 + 0.7*sin(0.15*time);
    vec3  ta = vec3( 0.0, 0.25, -0.6+time*1.0 - 0.4*cl);
    vec3  ro = ta + vec3( 1.3*cos(an), -0.250, 1.3*sin(an) );

    mat3 ca = setCamera( ro, ta, 0.0 );

    vec3 rd = ca * normalize( vec3(p,1.8) );

    vec3 col = render( ro, rd, time );

    col = pow( col, vec3(0.4545) );

    gl_FragColor = vec4( col, 1.0 );
}