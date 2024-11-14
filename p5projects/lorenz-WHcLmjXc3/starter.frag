

#ifdef GL_ES
precision mediump float;
#endif



// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;
uniform sampler2D tex0;

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .001
#define S smoothstep
#define T iTime
#define f(x) texelFetch(tex0, ivec2(x), 0)

// Function to take r,g,b values to range 0,1
// Remember to input a float!
vec3 rgb( float r, float g, float b) 
{
   return vec3(r/ 255.0, g / 255.0, b / 255.0);
}

 // Create a normal line that rotates around origin
vec2 N(float angle)
  {
  return vec2( sin(angle), cos(angle) );
}

// vec2 Koch( vec2 uv) {
  
//     uv.x = abs(uv.x);  // Reflect around y axis
//     uv.y += tan((5./6.)*3.1415)*.5;
//     vec2 n = N((5./6.)*3.1415);
//     float d = dot(uv- vec2(.5,0), n);  //remap to right-most side of Koch curve
//     uv -= n * max(0., d) * 2.; // Code for a reflection about a line
  
//     n = N((2./3.)*3.1415);
//     float scale = 1.;  // keeps track of how mnay times we compress the uvs
//     uv.x += .5; // adjustment to reorient Koch curve
   
//     for (int i = 0; i < 4; i++) {
    
//         // Remap uv so that one line segment [-.5,.5]
//         uv *= 3.;
//         scale *= 3.;
//         // put (0,0) in middle of line segment
//         uv.x -= 1.5; 

//         // Fold x coordinates in half by taking absolute value 
//         uv.x = abs(uv.x);

//         // Substract 0.5 on either side to increase the length of line to 3 units
//         uv.x -= .5;
//         d = dot(uv, n);
//         uv -= n * min(0., d) *  2.;
//      }
//   uv /= scale;
//   return uv;
// }

vec3 Lorenz( vec3 uv) {
 vec3 st = uv; //vec3(0);
 vec3 param = vec3(10.0, 28.0, 8./3.);
  float dt = 0.01;
  float dx = param.x * (st.y - st.x) * dt;
  float dy = (st.x * ( param.y - st.z) - st.y) * dt;
  float dz = (st.x * st.y - param.z * st.z) * dt;
  st.x = st.x + dx;
  st.y = st.y + dy;
  st.z = st.z + dz;
  return st;
}


mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

float sdBox(vec3 p, vec3 s) {
    p = abs(p)-s;
	return length(max(p, 0.))+min(max(p.x, max(p.y, p.z)), 0.);
}


float GetDist(vec3 p) {
  
    vec3 l = Lorenz( p );
    //float d = sdBox(l, vec3(0.1));
    

   float d = length(l) - 0.25;
  
//    vec2 xy = Koch(vec2(length(p.xy), p.z));
//    vec2 yz = Koch(vec2(length(p.yz), p.x));
//    vec2 xz = Koch(vec2(length(p.xz), p.y));
//    d = max(xy.y, max(yz.y, xz.y));
  
//    d = mix(d, length(p) - .5, 0.5);
   
  
  // can tile plane with Koch curves
    // d = max(d, abs(p.z)- 0.1);
    return d;
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


void main(  ) {
    //vec2 uv = (gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
    vec3 c = f(tex0);
    
    p.x -= 250.;

    c += p.y > 1. ?
        
        f(0)/exp(2.+length(p - 5.*f(0).yx)) - c/4e2 :
    
    gl_FragColor = vec4(c.z*c.y - 2.6*c.x,
         10.*(c.z-c.y) + .1,
         c.y*(28.-c.x)-c.z,
         0)/1e2;
  
 // gl_FragColor = vec4(col,1.0);
    
}

// void main( )
// {
//     vec2 uv = (gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
// 	vec2 m = iMouse.xy/u_resolution.xy;

//     vec3 ro = vec3(0, 3, -3);
//     ro.yz *= Rot(-m.y*3.14+1.);
//     ro.xz *= Rot(-m.x*6.2831);
    
//     vec3 rd = GetRayDir(uv, ro, vec3(0,0.,0), 3.);
//     vec3 col = vec3(0);
   
//     float d = RayMarch(ro, rd);

//     if(d<MAX_DIST) {
//         vec3 p = ro + rd * d;
//         vec3 n = GetNormal(p);
//         vec3 r = reflect(rd, n);

//         float dif = dot(n, normalize(vec3(1,2,3)))*.5+.5;
//         // col = vec3(dif);
//         // col = n*.5 + .5;
//         vec3 st = Lorenz( p );
//         col = vec3(st.y);
//     }
   
//     // vec3 st = Lorenz( p );
//     // col = vec3(st.y);
//     col = pow(col, vec3(.4545));	// gamma correction
    
//     gl_FragColor = vec4(col,1.0);
// }