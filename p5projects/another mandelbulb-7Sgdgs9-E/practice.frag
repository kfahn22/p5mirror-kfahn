// Here is a discussion of how to add textures to a p5 sketch
// https://stackoverflow.com/questions/60045681/porting-shadertoy-chromakey-example-to-p5-js

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
uniform sampler2D tex0;


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


float GetDist(vec3 p) {
    
    //p.xz *= Rot(iTime*.1);
    
    float d = mandelbulbSDF(p);
    //float d = sdBox(p, vec3(1));
    
    return d;
}


// Add side to RayMarch that can either be +1 or -1
float RayMarch(vec3 ro, vec3 rd, float side) {
	float dO=0.;
    
    for(int i=0; i<MAX_STEPS; i++) {
    	vec3 p = ro + rd*dO;
        float dS = GetDist(p)*side;
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
vec3 GetNormal(vec3 p) {
	float d = GetDist(p);
    vec2 e = vec2(.01, 0); // adjust epsilon to get rid of hard edges
    
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

void main(  )
{
    //vec2 uv = (gl_FragCoord.xy-.5*u_resolution.xy) / u_resolution.y;
    vec2 uv = (2. * gl_FragCoord.xy-u_resolution.xy) / u_resolution.y;
  
    vec3 texColor0 = texture2D(tex0, uv).rgb;
   
	vec2 m = iMouse.xy/u_resolution.xy;

    //vec3 ro = vec3(0, 3, -3)*.7;
    vec3 ro = vec3(0, 3, -3)*.5;
    // ro.yz *= Rot(-m.y*3.14+1.);
    // ro.xz *= Rot(-m.x*6.2831);
    
    vec3 rd = GetRayDir(uv, ro, vec3(0,0.,0), 1.);
    
   // vec3 col = mix(texColor0, rd, .8);
   //vec3 col = texture3D(texColor0, rd); //this is giving an error
    vec3 col = vec3(0.);
  
    float d = RayMarch(ro, rd, 1.); // outside of object
    
    // Index of refraction
    float IOR = 1.45;  // 1.33 for water, diamonds 2.4
    
    
    if(d<MAX_DIST) {
        vec3 p = ro + rd * d;
        vec3 n = GetNormal(p);
        vec3 r = reflect(rd, n);
       
        vec3 refOutside = mix(texColor0, r, .5);

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
        vec3 refrTex = mix(vec3(texColor0.rg, rdOut), rdOut, .2);
     
//         // green
//         rdOut = refract(rdIn, nExit, IOR);
//         if (dot(rdOut, rdOut) == 0.) rdOut = reflect(rdIn, nExit);
//         refrTex.g = texture(iChannel0, rdOut).g;
        
//         // blue
//         rdOut = refract(rdIn, nExit, IOR+abb);
//         if (dot(rdOut, rdOut) == 0.) rdOut = reflect(rdIn, nExit);
//         refrTex.b = texture(iChannel0, rdOut).b; // reflacted teture
        
       float density = .1;
       // Add optimal distance
       float optDist =  exp(-dIn*density);
         // refraction
        


         refrTex = refrTex*optDist*vec3(.8,.2,.7);  // can add color
        
//         refrTex = refrTex*optDist;
        
//         // Calculate a fresnel
       float fresnel = pow(1. + dot(rd, n), 5.);
        
       col = refrTex;
      
         col = mix(refrTex, refOutside, fresnel);
        //col = n*.5 + .5;  // added  for debugging
       
    }
    
    
    
    col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}