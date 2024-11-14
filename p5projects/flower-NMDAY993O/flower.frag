// "RayMarching starting point" 
// by Martijn Steinrucken aka The Art of Code/BigWings - 2020
// The MIT License
// See Texturing SDFs by The Art of Code


#ifdef GL_ES
precision mediump float;
#endif

#define S smoothstep
#define T iFrame

uniform vec2 u_resolution; // This is passed in as a uniform from the sketch.js file
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;
uniform sampler2D tex0;
uniform sampler2D tex1;
uniform sampler2D tex2;

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .001

#define S smoothstep

mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}


// Function to take r,g,b values to range 0,1
// Remember to input a float!
vec3 rgb( float r, float g, float b) 
{
   return vec3(r/ 255.0, g / 255.0, b / 255.0);
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

// See Gear livestream by Inigo Quilezfor a really good explanation of how the box SDF is derived

// Subtract small amount to round edges
float sdBox1(vec3 p, vec3 r) {
    float round = 0.0;
	return length( max(abs(p)-r, 0.0) ) - round;
}

// From the Art of Code
float sdBox2(vec3 p, vec3 s) {
    p = abs(p)-s;
	return length(max(p, 0.)) + min(max(p.x, max(p.y, p.z)), 0.);
}

float sdSphere( vec3 p, float r)
  {
  return length(p) - r;
}


// // Function that creates gears
// vec4 map( vac3 p, float time)
//   {
//   float angle = 6.283185/12.0;
//   float sector = round(atan(p.z,p.x)/angle);
  
//   vec3 = p;
  
//   float an = sector*angle;
  
//   q.xy = Rot(an)*q.xz;
  
//   float d =  sdBox( q - vec3(.2,.0,.0), vec3(.04,.03,.02) );
//  //return vec4( d, p);
// }


// Function that creates gears
float GetDist( vec3 p)
{
  float no =1.;
  float angle = 6.283185/no;
  float sector = floor(atan(p.z,p.x)/angle);
  
  vec3 q = abs(p);
  
  float an = sector*angle;
  
  q.xz = Rot(an)*q.xz;
  
  return  sdBox1( q - vec3(.3,.0,.0), vec3(.08,.07,.06) );
 // return  sdSphere( q - vec3(.3,.0,.0), .05 );
}

// From https://iquilezles.org/www/articles/distfunctions/distfunctions.htm
float sdEllipsoid( vec3 p, vec3 r)
  {
  float k0 = length(p/r);
  float k1 = length(p/(r*r));
  return k0*(k0-1.0)/k1;
}

// float GetDist(vec3 p) {
//       p.xz *= Rot(iTime*.1);
//       float d1 = sdBox2( p, vec3(1.) );
      
     
//      return d1;
// }
    

vec3 Transform(vec3 p)
{
   // p.xy *= Rot(iFrame*.01);
   // p.xz *= Rot(iFrame*.01);
  
  return p;
}

float RayMarch(vec3 ro, vec3 rd) {
	float dO=0.;
    
    for(int i=0; i<MAX_STEPS; i++) {
    	vec3 p = Transform(ro + rd*dO);
        
        float dS = GetDist(p);
        dO += dS;
        if(dO>MAX_DIST || abs(dS)<SURF_DIST) break;
    }
    
    return dO;
}

vec3 GetNormal(vec3 p) {
	float d = GetDist(p);
    vec2 e = vec2(.001, 0);
    
    vec3 n = d - vec3(
        GetDist(p-e.xyy),
        GetDist(p-e.yxy),
        GetDist(p-e.yyx));
    
    return normalize(n);
}

vec3 GetRayDir(vec2 uv, vec3 p, vec3 l, float z) {
    vec3 f = normalize(l-p),
        r = normalize(cross(vec3(0,1,0), f)),
        u = cross(f,r),
        c = f*z,
        i = c + uv.x*r + uv.y*u,
        d = normalize(i);
    return d;
}

void main()
{
    vec2 uv = (gl_FragCoord.xy -.5*u_resolution.xy)/u_resolution.y;
	vec2 m = iMouse.xy/u_resolution.xy;
   
    
   // Add some color variation
   
    vec3 col1 = rgb(55., 18., 60.);  //purple
    vec3 col2 = rgb(184., 23. ,90.);  // red
    vec3 col3 = rgb(200., 121. , 255.); //violet
    vec3 col4 = rgb(255., 217. , 218.);
    vec3 col5 = rgb(65., 196., 231.);
    
    float f = fbm2( 4.0 * uv ); // Adjust parameter here to make variation more pronounced
    vec3 col12 = mix( col1, col2, f);
    vec3 col23 = mix( col2, col3, f);
    vec3 col34 = mix( col3, col4, f);
    vec3 col45 = mix( col4, col5, f);
    vec3 col15 = mix( col1, col5, f);
    vec3 col25 = mix( col2, col5, f);
  
    vec3 ro = vec3(0, 2, -2);  // these values scale the object
    ro.yz *= Rot(-m.y*3.14+1.);
    ro.xz *= Rot(-m.x*6.2831);
    
    vec3 rd = GetRayDir(uv, ro, vec3(0,0,0),2.);
    vec3 col = vec3(0);
   
    float d = RayMarch(ro, rd);

    if(d<MAX_DIST) {
        vec3 p = Transform(ro + rd * d);
        vec3 n = GetNormal(p);
       // vec3 r = reflect(rd, n);

        float dif = dot(n, normalize(vec3(1,2,3)))*.5+.5;
        col = vec3(dif);
        
        //col += dif*dif;
      
        //uv = gl_FragCoord.xy/u_resolution.xy;

       
       // vec3 colXY = texture2D(tex0, p.xy*.5+0.5).rgb;
       // vec3 colXZ = texture2D(tex1, p.xz*.5+0.5).rgb;
       // vec3 colYZ = texture2D(tex2, p.yz*.5+0.5).rgb;
      vec3 colXY = col1;
      vec3 colXZ = col4;
      vec3 colYZ = col5;
      
      // Tri-planar mapping
        n = abs(n);  // take absolute value to get all faces of cube
        n *= pow(n, vec3(5.));
        n /= n.x + n.y + n.z; // add normalization 
      
       col = colXZ*n.y + colXY*n.z + colYZ*n.x ; 
      
       uv = vec2(atan(p.x, p.z)/ 6.2832 , p.y/3.) + .5;  // remap coordinates
      
       col = n;  // To See how colors are blended together
    }
  
    
  
  
    col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}
    
