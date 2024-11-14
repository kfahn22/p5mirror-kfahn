// This file renders a 3d heart
// The code for the superformula and supershape3D are based primarily on Daniel Shiffman's 3d Supershape Coding CHallenge


// Base code based on the Ray Marching Starting Point from the Art of Code
// https://www.youtube.com/watch?v=PGtv-dBi2wE

// Heart code based on Making a heart with Maths Youtube tutorial by Inigo Quilez

// https://iquilezles.org/articles/distfunctions/

#ifdef GL_ES
precision mediump float;
#endif

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .001
#define S smoothstep
#define T iTime
#define PI 3.14159

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;

// Add color
// The uvs are floating point with a range of [0.0,1.0] so we normalize by dividing by 255.
#define LTPURPLE vec3(255,153,255) / 255.
#define PURPLE vec3(153, 0, 153) / 255.
#define DKPURPLE vec3(102,0,102) / 255.
#define RED vec3(179, 0, 0) / 255.
#define RASPBERRY vec3(236,1,90) / 255.
#define PINK vec3(236,102,160) / 255.
#define DKROSE vec3(195, 51, 128) / 255.
#define MAROON vec3(177,0,0) / 255.
#define BLACK vec3(26,0,26) / 255.
#define LTLILAC vec3(237, 207, 233) / 255.
#define LILAC vec3(204,152,222) / 255.


vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
} 

// Rotation matrix
mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

//  Starting point for equations from Inigo Quelez
//float r = 15.0 + 3.0*pow((0.5 + 0.5*sin(1.5*PI*iTime + p.y/25.0)), 4.0);
// p.z = 2.0*(p.z - p.y/15.0);
// p.y = 4.0 + 1.2*p.y - abs(p.x)*sqrt((20.0-abs(p.x)/15.0));
float Heart_3D ( vec3 p ) {
    float r = 0.2 + 0.2*pow((0.5 + 0.5*sin(1.2*PI*iTime + p.y/25.0)), 3.0);
    p.z = 1.0*(p.z - p.y/15.0);
    p.y = 0.9*p.y - 1.3*abs(p.x)*sqrt((25.0 - abs(p.x))/35.0);
    return length(p) - r;
}

float GetDist(  vec3 p ) {
  return Heart_3D( p );
}

float RayMarch(vec3 ro, vec3 rd) {
	float dO=0.;
    
    for(int i=0; i<MAX_STEPS; i++) {
    	vec3 p = ro + rd*dO;
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

void main( )
{
    vec2 uv = (gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
    float t = iTime * 0.001;
	vec2 m = iMouse.xy/u_resolution.xy;
    vec3 col = vec3(0);
    
    vec3 ro = vec3(0, 3., -3);
    // ro.yz *= Rot(-m.y*3.14+1.);
    // ro.xz *= Rot(-m.x*6.2831);
   
    vec3 rd = GetRayDir(uv, ro, vec3(0,0,0), 3.);

    col = LILAC;
    float d = RayMarch(ro, rd);

    if(d<MAX_DIST) {
        vec3 p = ro + rd * d;
        vec3 n = GetNormal(p);
        vec3 r = reflect(rd, n);
        // float dif = dot(n, normalize(vec3(1,2,3)))*.5+.5;
        // col = mix(RED, vec3(dif), 0.3);      
        //col += Lighting( uv, p, n, col, rd);

        // lighting technique from Inigo Quelez Livecoding a temple
        vec3 sunlt = normalize(vec3(0.1, 0.8, 0.1));
        float dif = clamp( dot( n, sunlt), 0.0, 1.0);
        float amb = (0.5 + 0.5*n.y);
        col = mix(PURPLE, vec3(dif), 0.15);      
        col += amb*1.0*DKROSE;
        col += dif*0.1*vec3(0.8, 0.5, 0.8);

       float spec = pow(max(0.0, r.y), 0.5); // add specular highlight
       col += 0.05*spec*LTLILAC;
      
    } 
       
    col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}