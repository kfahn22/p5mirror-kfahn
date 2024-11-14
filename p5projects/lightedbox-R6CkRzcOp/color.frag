// frag shader code is based on code from Daniel Shiffman, Inigo Quilez, and Martijn Steinrucken (aka the Art of Coding)

#ifdef GL_ES
precision mediump float;
#endif

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .001

#define S smoothstep
#define T iTime


uniform vec2 u_resolution; // This is passed in as a uniform from the sketch.js file
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;
uniform sampler2D tex0;


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

vec3 Transform(vec3 p)
{
   //p.xy *= Rot(iFrame*.01);
   //p.xz *= Rot(iFrame*.01);
  
  return p;
}

mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

// function to extract polar coordinates
// from Daniel Shiffman
vec3 Spherical( in vec3 pos) 
{
   float r = sqrt(pos.x*pos.x + pos.y*pos.y + pos.z*pos.z);
   float theta = atan( sqrt(pos.x*pos.x + pos.y*pos.y), pos.z);
   float phi = atan(pos.y, pos.x);
   vec3 w = vec3(r, theta, phi);
   return w;
}

// mapping function
// adapted from IQ, incorporatin Coding Train variable names
float mandelbulbSDF( in vec3 pos) 
{
  vec3 zeta = pos;
  float m = dot(pos,pos);
  float dz = 1.0;
  float n = 8.0;
  const int maxiterations = 20;
  
  float r = 0.; 
   
   float dr = 1.;
   for ( int i = 0; i < maxiterations; i+=1) {
     dz = n*pow(m, 3.5)*dz + 1.0;
     vec3 sphericalZ = Spherical( zeta ); 
     float newx = pow(sphericalZ.x, n) * sin(sphericalZ.y*n) * cos(sphericalZ.z*n);
     float newy = pow(sphericalZ.x, n) * sin(sphericalZ.y*n) * sin(sphericalZ.z*n);
     float newz = pow(sphericalZ.x, n) * cos(sphericalZ.y*n);
     zeta.x = newx + pos.x;
     zeta.y = newy + pos.y;
     zeta.z = newz + pos.z;

      m = dot (zeta, zeta);
      if ( m > 2.0)
         break;
   }
 
  // distance estimation through the Hubbard-Douady potential from IQ
   return 0.25*log(m) * sqrt(m) / dz;
   
}



float sdBox(vec3 p, vec3 s) {
    p = abs(p)-s;
	return length(max(p, 0.))+min(max(p.x, max(p.y, p.z)), 0.);
}

float sdSphere( vec3 p, float s ) 
{
   return length(p) - s;
}

//From IQ
float sdTorus( vec3 p, vec2 t)
  {
  vec2 q = vec2(length(p.xz) - t.x, p.y);
  return length(q)-t.y;
}

float sdRoundedCylinder( vec3 p, float ra, float rb, float h)
{
  vec2 d = vec2( length(p.xz) - 2.0*ra + rb, abs(p.y) - h);
  return min(max(d.x, d.y), 0.0) + length(max(d,0.0) )- rb;
}

float GetDist(vec3 p) {
    
    //p.xz *= Rot(iTime*.1);
  float d = sdBox( p, vec3(.5));
   // float d = sdRoundedCylinder( p, .25, .25, .25);
  //float d = sdTorus( p, vec2(.4, .5) );
  // float d = sdSphere( p, .25);
  //float d = mandelbulbSDF(p);
    
    return d;
}



// Add side to RayMarch that can either be +1 or -1
float RayMarch(vec3 ro, vec3 rd, float side) {
	float dO=0.;
    
    for(int i=0; i<MAX_STEPS; i++) {
    	vec3 p = ro + rd*dO;
        float dS = GetDist(p)*side;
        //float dS = mandelbulbSDF(p)*side;
        dO += dS;
        if(dO>MAX_DIST || abs(dS)<SURF_DIST) break;
    }
    
    return dO;
}


// Tetrahedron technique for calculating gradients from Inigo Quilez
// https://iquilezles.org/www/articles/normalsSDF/normalsSDF.htm
vec3 calcNormal ( vec3 pos )
{
  const float h = 0.0001;
  const vec2 k = vec2(1,-1);
   return normalize( k.xyy*mandelbulbSDF( pos + k.xyy*h ) +
                    k.yyx*mandelbulbSDF( pos + k.yyx*h ) +
                    k.yxy*mandelbulbSDF( pos + k.yxy*h ) +
                    k.xxx*mandelbulbSDF( pos + k.xxx*h ) 
                  );
}

vec3 GetNormal(vec3 pos) {
	//float d = GetDist(p);
    float d = mandelbulbSDF(pos);
    vec2 e = vec2(.01, 0); // adjust epsilon to get rid of hard edges

    vec3 n = d - vec3(
        GetDist(pos-e.xyy),
        GetDist(pos-e.yxy),
        GetDist(pos-e.yyx));
    
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

void main(  )
{
    //vec2 uv = (gl_FragCoord.xy-.5*u_resolution.xy) / u_resolution.y;
    vec2 uv = (2. * gl_FragCoord.xy-u_resolution.xy) / u_resolution.y;
    vec2 iuv = gl_FragCoord.xy/u_resolution.xy;
   // vec3 texColor0 = texture2D(tex0, iuv).rgb;
  
  
   // Add some color variation
   
    vec3 col1 = rgb(233., 217., 133.);
    vec3 col2 = rgb(178., 189. ,126.);
    vec3 col3 = rgb(116., 156. ,117.);
    vec3 col4 = rgb(106., 93. , 123.);
    vec3 col5 = rgb(93., 74., 102.);
    
    float f = fbm2( 4.0 * uv ); // Adjust parameter here to make variation more pronounced
    vec3 col12 = mix( col1, col2, f);
    vec3 col45 = mix( col4, col5, f);
  
  // Add a target for the camera
    vec3 ta = vec3(0.0,0.0,0.0);
    
    float an = 0.005 * iFrame;
    
   // float an = 10.0*iMouse.x/u_resolution.x;  // uncomment to get a static image

   // origin of camera (ta moves camera up)
    vec3 ro = ta +  vec3(1.45*sin(an),0.0,1.45*cos(an));  
   // vec3 texColor0 = texture2D(tex0, uv).rgb;
   
	vec2 m = iMouse.xy/u_resolution.xy;

    
    vec3 rd = GetRayDir(uv, ro, vec3(0,0.,0), .8); // adjust last parameter to change zoom
    
   // vec3 col = mix(texColor0, rd, .8);
   //vec3 col = texture3D(texColor0, rd); //this is giving an error
   vec3 col = vec3(0.);
  
    float d = RayMarch(ro, rd, 1.); // outside of object
    
    // Index of refraction
    //float IOR = 1.45;  // 1.33 for water, diamonds 2.4
    float IOR = 2.4;
    
    if(d<MAX_DIST) {
        vec3 p = ro + rd * d;
        vec3 n = GetNormal(p);
        vec3 r = reflect(rd, n);
        
        //vec3 refOutside = mix(texColor0, r, .5);
        vec3 refOutside = mix(col12, r, .5);

        // refraction
        vec3 rdIn = refract(rd, n, 1./IOR); // ray dir when entering
        
        
        // Ray march on inside of object
        vec3 pEnter = p - n*SURF_DIST*3.;
        
        float dIn = RayMarch(pEnter, rdIn, -1.);
        
        
        vec3 pExit = pEnter + rdIn * dIn;  // 3D position of exit
  
        vec3 nExit = -GetNormal(pExit);
        
       
        //vec3 refrTex = vec3(0);
        
        vec3 rdOut = vec3(0);
        
        // Add chromatic aberration
        float abb = .01;
        
        // red
        rdOut = refract(rdIn, nExit, IOR-abb);
        if (dot(rdOut, rdOut) == 0.) rdOut = reflect(rdIn, nExit);
        vec3 refrTex = mix(vec3(col12.rg, rdOut), rdOut, .1);
     
//         // green
//         rdOut = refract(rdIn, nExit, IOR);
//         if (dot(rdOut, rdOut) == 0.) rdOut = reflect(rdIn, nExit);
//         refrTex.g = mix(vec3(texColor0.rg, rdOut), rdOut, .2);
        
//         // blue
//         rdOut = refract(rdIn, nExit, IOR+abb);
//         if (dot(rdOut, rdOut) == 0.) rdOut = reflect(rdIn, nExit);
//         refrTex.b = texture(iChannel0, rdOut).b; // reflacted teture
        
       float density = .5;
       // Add optimal distance
       float optDist =  exp(-dIn*density);
         // refraction
        


         refrTex = refrTex*optDist*col2;  // can add color
        
//         refrTex = refrTex*optDist;
        
//         // Calculate a fresnel
        float fresnel = pow(1. + dot(rd, n), 5.);
        
        col = refrTex;
      
//         col = mix(refrTex, refOutside, fresnel);
       
//         vec3 colXY = texture2D(tex0, p.xy*.5+0.5).rgb;
//         vec3 colXZ = texture2D(tex0, p.xz*.5+0.5).rgb;
//         vec3 colYZ = texture2D(tex0, p.yz*.5+0.5).rgb;
      
//         n = abs(n);  // take absolute value to get all faces of cube
  //      col = colXZ*n.y + colXY*n.z + colYZ*n.x ; 
        //col = n*.5 + .5;  // added  for debugging
       
    }
    
    
    
    col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}