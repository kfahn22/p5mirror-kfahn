// Ported to P5.js from the Inigo Quilez Happy Jumping Livestream

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;

#define NUM_LAYERS 4.
#define S smoothstep
mat2 Rot( float a) 
{
   float s = sin(a);
   float c = cos(a);
   return mat2(c, -s, s, c);
}

// did we hit object with ray
// 0.25 radius of sphere
// surface of zero is at surface

float sdSphere( in vec3 pos, float rad)
{
 return length(pos) - rad;
}

float sdElipsoid( in vec3 pos, vec3 rad)
{
 float k0 = length(pos/rad);
 float k1 = length(pos/rad/rad);
 return k0*(k0-1.0)/k1;
}



float sdStick( in vec3 p, vec3 a, vec3 b, float ra, float rb )
{
  vec3 ba = b - a;
  vec3 pa = p - a;
  
  float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
  //return vec2(length(pa-ba*h) - mix( r1, r2, h*h*(3.0-2.0*h) ), h );
  float r = mix( ra, rb, h);
  return length(pa-ba*h) - r;
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



vec2 sdGuy(  vec3 pos, float iTime )
{

// bouncing in y direction
// get repeating pattern from 0 - 1
 //  float t = 0.5;
   float t1 = fract(iTime); //bouncing
   float t4 = abs(fract(iTime*0.5) - 0.5)/0.5;
  
   
   float y = 4.0*t1*(1.0-t1);
   float dy = 4.0*(1.0-2.0*t1);
  
//    vec3 cen = vec3 (0.5(-1.0 + 2.0*t4),
//                     pow(y, 2.0 - y) + 0.1;
//                     floor(aTime) + pow(t1, 0.7) - 1.0 );
               
   
   
  
   // u and v are perpendicular; dot product get 0
   vec2 uu = normalize(vec2( 1.0, -dy ) );  //tangent
   vec2 vv = vec2( dy, 1.0 );
   
   vec3 cen = vec3(0.0, y, 0.0);
   
   // want object to stretch vertically
   float sy = 0.5 + 0.5 * y;
   float compress = 1.0 - S(.0, .4, y);
   sy = sy*(1.0 - compress) + compress;
   // want to preserve volume; as stretches vertically, expands horizontally
   float sz = 1.0/sy;
  
   vec3 rad = vec3(0.25, 0.25*sy, 0.25*sz);
   
   // q is coordinate system referring to origin
   vec3 q = pos-cen;
   
  // q.yz = vec2 ( dot(uu,q.yz), dot(vv,q.yz) ); // not working properly at this point
  
  // create a head
   float d = sdElipsoid(q, rad);
   vec3 h =  q ;
   vec3 sh = vec3( abs(h.x), h.yz );  //model an eye; by passing an abs value for x coordinate to add a second eye
   
   float d2 = sdElipsoid(h - vec3(0.0,0.28,0.0), vec3(0.15,0.2,0.23));  // second vec3 adds nose
   float d3 = sdElipsoid(h - vec3(0.0,0.28,-0.1), vec3(0.23, 0.2, 0.2)); // add back of head to back
   
   d2 = smin(d2,d3, 0.05); 
   d = smin(d,d2, 0.15); // combines head and eyelashes
   
   // add eyebrow
   // sh - symmetric head
   vec3 eb = sh - vec3(0.12,0.34,0.15);
   // use pythagorium triplets which won't scale; divide by 5b to normalize
   eb.xy = (mat2(3,4,-4,3)/5.0)*eb.xy;  // create rotation matrix to give expression; pythagorim triplets
   d2 = sdElipsoid(eb, vec3(0.06, 0.035, 0.05));
   d = smin(d,d2, 0.04);
   
   // belly wrinkes
  {
    float yy = q.y-0.02 - 2.5*q.x*q.x;
  }
   // ears
   d2 = sdStick( sh, vec3(0.1,0.4,-0.01), vec3(0.2, 0.55, 0.02), 0.01, 0.03);
   d = smin(d,d2,0.03);
   
   //mouth
   // deform space by pulling edges of ellipsoid forming mouth up at edges using x*x
   d2 = sdElipsoid(h - vec3(0.0,0.15 + 3.0*h.x*h.x,0.15), vec3(0.1, 0.04, 0.2)); //adjusted sides of mouth by adjusting y
   d = smax(d,-d2,0.03); 
    
   vec2 res = vec2(d,2.0);  // return distance and object ID
   
   // eyes
   
   float d4 = sdSphere( sh - vec3(0.08,0.28,0.16), 0.05 );
   if ( d4<d ) res = vec2( d4, 3.0 );  //if eye is closest thing return a different identifier
   //d = min(d,d4);
   // make iris
   d4 = sdSphere( sh - vec3(0.09,0.28,0.18), 0.02 );
   if ( d4<d ) res = vec2( d4, 4.0);
   return res;
}

vec2 map(  vec3 pos, float iTime )
{
 
 // "monster"
 vec2 d1 = sdGuy(pos, iTime);
 
 // float fh1 = -0.1 + 0.2* (sin(3.0*pos.x) + sin(2.0*pos.z));
  // float fh2 = -0.1 + 0.2* (sin(4.0*pos.x) - sin(2.0*pos.z )) + .3* sin(2.0*pos.x);
  // float fh = max(fh1, fh2);
 // add a plane as floor; floor is tangent to sphere
 //float d2 = pos.y - fh;
  float d2 = pos.y - (-.25);
 // min operator is way to combine objects
 
 // if the floor is closest return the ID of the floor, otherwise return the monster
 return (d2 < d1.x) ? vec2(d2, 1.0) : d1;
}


// add lighting by approximate derivatives (gradients) to surface
// using small changes in distance field
// need to know origentation of object to lighting
vec3 calcNormal( in vec3 pos )
{
   vec2 e = vec2(0.0001, 0.0);
   return normalize( vec3(map(pos+e.xyy).x - map(pos-e.xyy).x,
                          map(pos+e.yxy).x - map(pos-e.yxy).x,
                          map(pos+e.yyx).x - map(pos-e.yyx).x ) );
}

float castShadow( in vec3 ro, vec3 rd)
{
  float res = 1.0;
  
  float t = 0.001;
  for ( int i = 0; i < 100; i++ )
  {
   vec3 pos = ro + t*rd;
   float h = map( pos, time ).x;  //track how close we were to hitting something
   
   res = min( res, 16.0*h/t );
   if (h<0.0001) break;
   t += h;
   if (t>20.0) break;
  }
  return clamp(res,0.0,1.0);
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
   // break loop if inside sphere
   if ( h.x < 0.001 )
       break;
       t += h.x;
       // break loop if clearly outsize sphere (far Euclidean plane?) and haven't hit anything
      if ( t > 20.0 ) break;
    }
    if ( t > 20.0 ) m=-1.0;  // material is negative if there is no intersection
    return vec2(t,m);
}


void main(  )
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
// add gradient by subtracting off a proportonal amount of the y vector
vec3 col = vec3(0.4, 0.75, 1.0) - 0.7*rd.y;
col = mix( col, vec3(0.7,0.75, 0.8), exp(-10.0*rd.y) );
 
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
         mate = vec3(0.05,0.09,0.02);
        
         float f = 0.2*(-1.0 + 2.0* smoothstep( -0.2, 0.2, sin(18.0*pos.x) + sin(18.0*pos.y) + sin(18.0*pos.z) ) );
        
         col += 0.2*f*vec3(0.06,0.06,0.02);
        
       }
       else if (tm.y < 2.5)  // body
       {
         mate = vec3(0.2,0.1,0.02);
       }
       else if (tm.y < 3.5)  // iris. 
       {
         mate = vec3(0.5, 0.5, 0.4);
       }
        else if (tm.y < 4.5)
       {
         mate = vec3(0.02);
       }
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

