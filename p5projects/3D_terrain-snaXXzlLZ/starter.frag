// Ported to P5.js from the Inigo Quilez Happy Jumping Livestream

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;
uniform float tex0;

#define NUM_LAYERS 4.
// Define colors scheme
#define BROWN vec3(75, 29, 2)/255.
#define DKBROWN vec3(57,47,45)/255.
#define PINKER vec3(185,85,167)/255.
#define YELLOW vec3(242,214,65)/255.
#define BG backgroundGradient
#define SCALE  .00005

// Function to add background color
vec3 backgroundGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}

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

float sdEllipsoid( in vec3 pos, vec3 rad)
{
 float k0 = length(pos/rad);
 float k1 = length(pos/rad/rad);
 return k0*(k0-1.0)/k1;
}

float sdBox(vec3 p, vec3 s) {
    p = abs(p)-s;
	return length(max(p, 0.))+min(max(p.x, max(p.y, p.z)), 0.);
}

// Use psuedo random noise to get the height of the mountains
float getHeight(float x) {
//  return sin(x) + sin(x*2.234+.123)*.5 + sin(x*4.45+2.2345)*.25;
 return sin(x)  + sin(x*2.234 + .123)*cos(x) + sin(x*4.45 + 2.234)*.25;
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

//combine so that they smoothly blend
float smin( in float a, in float b, float k)
{
 float h = max( k - abs(a-b), 0.0); // "spike" function look at grpahtoy
 return min(a,b) - h*h/(k*4.0);
}


//carve away holes
float smax( in float a, in float b, float k)
{
 float h = max( k - abs(a-b), 0.0); 
 return max(a,b) + h*h*0.25/k;
}

// float terrainD( in vec2 p, float r)
// {
// 	p *= SCALE;
//     r = r * r*.01;
    
//  	float n = texture2D( tex0, p            ).r;
//     if (n > 0.0)
//     {
//     	n += smoothstep(.0, 1.,texture2D( tex0, p)*.01;
//         n += smoothstep(.0, 1.,texture2D( tex0, p)*.1;
//     }
//     else
//     {
//     	n -= texture2D( tex0, fract(p*13.0)+iTime*.05, r*.25).x*.002-
//              texture2D( tex0, fract(p*30.0)-+iTime*.05, r*.25).x*.001;
//     }
//     return n * HEIGHT;
// }

// //--------------------------------------------------------------------------
// float Map(in vec3 p)
// {
//     float r = .1;
// 	float h = terrain(p.xz, r); 
//     return p.y - h;
// }


float map( in vec3 pos )
{
 

   float fh = -0.1 + 0.2 * (sin(2.*pos.x)+ sin(3.0*pos.z));
   //float fh = -0.1 + 0.3 * getHeight(pos.x) + .4 * getHeight(pos.z) ;//+  0.1*sin(2.0*pos.z) - .1 * cos(2.0 * pos.z)*cos(3.0* pos.x);
   // add a plane as floor; floor is tangent to sphere
   float d = pos.y - fh;

   vec3 qos = vec3(mod(abs(pos.x), 3.0)-1.5, pos.y, mod(pos.z+4., 3.0)-1.5);

   
  
   float d2 = sdEllipsoid( qos- vec3(0.2, 0.1, 0.0), vec3(.5,1.5,.7) );
   
   d = smin(d ,d2, 0.3);
  
   float d3 = sdCone(qos - vec3(0.6, 0.1, 0.0), vec2(.6,2.5),.7);
   d = smin(d, d3, 0.3);
  
  // float d4 = sdBox(qos -  vec3(1.2, .3, 0.1), vec3(.2, .8, .4) );
  // d = smin(d, d4, 0.6);
   // if the floor is closest return the ID of the floor, otherwise return the monster
 return d;
}


// add lighting by approximate derivatives (gradients) to surface
// using small changes in distance field
// need to know origentation of object to lighting
vec3 calcNormal( in vec3 pos )
{
   vec2 e = vec2(0.0001, 0.0);
   return normalize( vec3(map(pos+e.xyy) - map(pos-e.xyy),
                          map(pos+e.yxy) - map(pos-e.yxy),
                          map(pos+e.yyx) - map(pos-e.yyx)) );
}

float castShadow( in vec3 ro, vec3 rd)
{
  float res = 1.0;
  
  float t = 0.001;
  for ( int i = 0; i < 100; i++ )
  {
   vec3 pos = ro + t*rd;
   float h = map( pos );  //track how close we were to hitting something
   
   res = min( res, 16.0*h/t );
   if (h<0.0001) break;
   t += h;
   if (t>20.0) break;
  }
  return clamp(res,0.0,1.0);
}

vec2 castRay( in vec3 ro, vec3 rd)
{
 float m = -1.0;
 float t = 0.0;
 
 for ( int i=0; i < 100; i++)
 {
   vec3 pos = ro + t * rd;
   
   float h = map( pos );
   m = h;
   // break look if inside sphere
   if ( h < 0.001 )
       break;
       t += h;
       // break loop if clearly outsize sphere (far Euclidean plane?) and haven't hit anything
      if ( t > 20.0 ) break;
    }
    if ( t > 20.0 ) m=-1.0;  // material is negative if there is no intersection
    return vec2(t,m);
}


void main( )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 p = (2.0*gl_FragCoord.xy - u_resolution.xy)/u_resolution.y;


  // adjust these parameters to bring shape further or nearer
  //float f = smoothstep(0.2, 0.3, length(p)*0.5 );
    // Time varying pixel color
  // vec3 col = vec3(f, f, f);


// add camera
//float an = iTime;
//float an = 0.0;  //center at origin to figure out where you are
float an = 10.0*iMouse.x/u_resolution.x;

// add target for camera
vec3 ta = vec3(0.0,0.95,0.0);

// ray marching  

// ro ray origin (camera position); adjust position of camera by changing the coefficient on cos(an)
// rd ray direction; second parameter depth of view cone (lens); 
//  p (-1, 1); negative because looking at origin
// adding ta move camera up
vec3 ro = ta + vec3(1.5*sin(an), 0.0, 1.5*cos(an));


vec3 ww = normalize( ta - ro );
vec3 uu = normalize( cross(ww,vec3(0,1,0)) );
vec3 vv = normalize( cross(uu,ww) );

// x coordinate moves us on the u vector, y coordinate moves us on the v vector, depth is constant
// parameter * ww approximates length of lens
vec3 rd = normalize( vec3(p.x*uu +p.y*vv + 1.8*ww) );


// add sky color
vec3 col = PINKER; //BG(p, PINKER, YELLOW, .2) ;
// add gradient by subtracting off a proportonal amount of the y vector
  
//vec3 col = vec3(0.4, 0.75, 1.0) - 0.7*rd.y;
col = mix( col, YELLOW, exp(-3.*rd.y) );
 
 vec2 tm = castRay( ro, rd );
    if( tm.y > 0.0 ) 
    {
       float t = tm.x;
       vec3 pos = ro + t*rd;
       vec3 nor = calcNormal(pos);
       
       vec3 mate =vec3(0.10);  // default color
       
       
       // add colors
       if ( tm.y<1.5 )  // terrain
       {
         mate = mix( DKBROWN, BROWN, .8);
         float f = -1.0 + 2.0* smoothstep( -0.2, 0.2, sin(36.0*pos.x)+sin(18.0*pos.y) + sin(18.0*pos.z) ) ;
         //float f = -1.0 + 2.0* smoothstep( -0.2, 0.2, sin(18.0*pos.x)+sin(18.0*pos.y) + sin(18.0*pos.z) ) ;
        col += 0.2*f*vec3(0.06,0.06,0.02);
       }
      
       //  else if (tm.y < 4.5)
       // {
       //   mate = vec3(0.02);
       // }
       // x component pointing up right 
       // y compoenent pointing up
       // z component pointing towards us 
       // col = nor.zzz;
       // putting sun lower (12 noon rig makes lighting harsh)
       // key light
       vec3 sun_dir = normalize(vec3(0.8,0.4,0.2) );  
       
       // how aligned two vectors are (more aligned brighter color)
       float sun_dif = clamp( dot(nor, sun_dir), 0.0, 1.0);
       
       // add shallows -- can the object be seen from the light source
       // offset a little to avoid self intersections
       float sun_sha = castShadow( pos + nor*0.001, sun_dir );
       
       // added bias to get a little light on the bottom side
       // the more it is facing up the brighter it will be
       float sky_dif = clamp( 0.5 + 0.5 * dot(nor, vec3(0.0,1.0,0.0)), 0.0, 1.0);
       float bou_dif = clamp( 0.5 + 0.5 * dot(nor, vec3(0.0,-1.0,0.0)), 0.0, 1.0);
       
       col  = mate*vec3(7.0, 4.5, 3.0)*sun_dif*sun_sha;
       col += mate*vec3(0.5, 0.8, 0.9)*sky_dif;
       
       /// add bounce lights; don't want 0 can't control
       col += mate*vec3(0.7, 0.3, 0.2)*bou_dif;
     }
     
     
    // camera correction; brights will become brighter;  important to do right from the beginning!!!
     col = pow( col, vec3(0.4545) );
    // Output to screen
    
    gl_FragColor = vec4(col,1.0);
}

