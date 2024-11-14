// Most of the code adapted from Inigo Quelez
// https://iquilezles.org/www/articles/distfunctions/distfunctions.htm
// https://www.youtube.com/watch?v=Cfe5UQ-1L9Q
// this video from the coding train explains how to port from Shadertoy
// https://www.youtube.com/watch?v=7ZIfXu_iPv4

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 iResolution;
uniform int iFrame;
uniform vec2 iMouse;
uniform float iTime;


float sphereSDF(vec3 samplePoint, float rad) {
    // rad = 0.25;
    return length(samplePoint) - rad;
}

float sdElipsoid( in vec3 pos, vec3 rad )
{
   float k0 = length(pos/rad);  
   float k1 = length(pos/rad/rad);
   return k0*(k0-1.0)/k1;
}

// 
float sdCylinder( in vec3 pos, float rad)
{
  rad  = 0.3; // base size (.4)
  rad += 0.15*pos.y; // adjust size vertically; += narrower on top (0.05)
  rad -= 0.1*(0.5 + 0.15*sin( 32.0*atan(pos.x,pos.z) ) );  // adding wavyness (0.15/32)
  
  //rad += 0.1*pow(0.5 + 0.5*sin( 16.0*atan(pos.x,pos.z)), 2.0);  // make spikier
 // rad -= 0.15*pow(0.5 + 0.5*sin(pos.y*3.0), 0.5) - 0.15;  // make blocks by appplying sin wave vertically
  return length(pos.xz) - rad; 
  
}


float sdPie(in vec3 pos )
{  

 vec3 q = pos;
  float rad = 0.5;
// float rad = 0.25  + 0.5*sin(q.x*3.0);   //*sin(q.y*2.0)*sin(q.z*2.0);
 float d = sdCylinder(q, rad);
 d = max(d, pos.y - 1.0 ); //clamping cylinder through a plane 
 d = max(d, -pos.y + 0.85 ); //clamping cylinder through a plane 
 d*= 0.5;

 return d;
}


//combine so that they smoothly blend
float smin( in float a, in float b, float k)
{
 float h = max( k - abs(a-b), 0.0); // "spike" function look at graphtoy
 return min(a,b) - h*h/(k*4.0);
}


//carve away holes
float smax( in float a, in float b, float k)
{
 float h = max( k - abs(a-b), 0.0); 
 return max(a,b) + h*h*0.25/k;
}


float map( in vec3 pos )
{
  //float d = length(pos) - 0.25;
  float rad = .25; 
  // if you don't pass all required values you will get an error
  // that no matching overleaded function found
  float d1 = sdPie(pos);
  
  float d2 = pos.y -(-0.75); 
  
  // return d1;
  return min(d1,d2);
}

// add lighting by calculating gradients
vec3 calcNormal( in vec3 pos )
{
   vec2 e = vec2(0.0001, 0.0);
   return normalize( vec3(map(pos+e.xyy) - map(pos-e.xyy),
                          map(pos+e.yxy) - map(pos-e.yxy),
                          map(pos+e.yyx)- map(pos-e.yyx) ) );
}


float castRay( in vec3 ro, vec3 rd) 
{
 float t = 0.0;
 for ( int i = 0; i < 100; i ++ )
 {
   vec3 pos = ro + t*rd;
   
   float h = map( pos );
   
   if ( h<0.001 ) 
   break;
   t += h;
   if ( t > 20.0 ) break;
 }
 if ( t>20.0) t = -1.0;
 
 return t;
}


// code from Inigo Quelez
void main( )
{
    // Normalized pixel coordinates (from 0 to 1)
   vec2 p = (2.0*gl_FragCoord.xy-iResolution.xy)/iResolution.y;
    // Time varying pixel color
   
    // add a target for the camera
    vec3 ta = vec3(0.0,0.5,0.0);
    
    float an = 10.0*iMouse.x/iResolution.x; //iTime;
    vec3 ro = ta + vec3(1.5*sin(an),0.0,1.5*cos(an));  // origin of camera (ta moves camera up)
    
   
   
    vec3 ww = normalize( ta - ro); // target minus ray origin
    vec3 uu = normalize( cross(ww,vec3(0.,1.,0.)) );
    vec3 vv = normalize( cross(uu,ww) );
    
    vec3 rd = normalize( p.x*uu +p.y*vv + 1.5*ww );  // lens of camera
  
    vec3 col = vec3(0.4,0.75,1.0) - 0.5*rd.y; // sky with gradient 
    col = mix(col, vec3(0.7,0.75,0.8), exp(-10.0*rd.y) );  // add grey along the horizon by mixing 


// ray marching

   float t = castRay( ro, rd );
   if (t > 0.0 )
  {
      
      vec3 pos = ro + t*rd;
      vec3 nor = calcNormal(pos);
      
      
      vec3 mate = vec3(0.18); // use base color for objects
      
      vec3 sun_dir = normalize(vec3(0.8,0.4,0.2) );
      float sun_dif = clamp( dot(nor,sun_dir),0.0,1.0);
     // add shallows; offset to prevent self intersections
      float sun_sha = step(castRay( pos + nor*0.001, sun_dir ), 0.0); 
      
      float sky_dif = clamp( 0.5 + 0.5*dot(nor,vec3(0.0,1.0,0.0)), 0.0, 1.0);
     
     // add bounce lighting reflecting back; (-) points down
      float bou_dif = clamp( 0.5 + 0.5*dot(nor,vec3(0.0,-1.0,0.0)), 0.0, 1.0); 
      
      //float dif = 0.5 + clamp(0.5* dot(nor,sun_dir), 1.0, 1.0);
      // add key lighting
      
      col = mate*vec3(7.0,4.5,3.0)*sun_dif*sun_sha; 
      col += mate*vec3(0.5,0.8,0.9)*sky_dif; // fill light has a value about 1
      col += mate*vec3(0.7,0.5,0.3)*bou_dif; 
   }
  
     // include gamma correction right from beginning 
     col = pow( col, vec3(0.4545) );  
    // Output to screen
    gl_FragColor = vec4(col,1.0);
}