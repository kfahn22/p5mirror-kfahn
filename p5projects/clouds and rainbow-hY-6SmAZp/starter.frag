// Frag shader creates tiles for wave function collapse

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;
//uniform sampler2D tex0;

#define S smoothstep
#define CG colorGradient
#define PI 3.14159

#define AQUA vec3(160,223,247)/255.
#define RASPBERRY vec3(253,96,182)/255.
#define PURPLE vec3(196,103,236)/255.
#define ORANGE  vec3(255,160,78)/255.
#define YELLOW vec3(254,241,9)/255.
#define RED vec3(255,77, 28)/255.

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

float sdCircle( vec2 p, float r )
{
    return length(p) - r;
}

float sdSegment( in vec2 p, in vec2 a, in vec2 b )
{
    vec2 pa = p-a, ba = b-a;
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
    return length( pa - ba*h );
}

float sdRoundedBox( in vec2 p, in vec2 b, in vec4 r )
{
    r.xy = (p.x>0.0)?r.xy : r.zw;
    r.x  = (p.y>0.0)?r.x  : r.y;
    vec2 q = abs(p)-b+r.x;
    return min(max(q.x,q.y),0.0) + length(max(q,0.0)) - r.x;
}

float sdEllipse( vec2 p, vec2 ab )
{
    p = abs(p); if( p.x > p.y ) {p=p.yx;ab=ab.yx;}
    float l = ab.y*ab.y - ab.x*ab.x;
    float m = ab.x*p.x/l;      float m2 = m*m; 
    float n = ab.y*p.y/l;      float n2 = n*n; 
    float c = (m2+n2-1.0)/3.0; float c3 = c*c*c;
    float q = c3 + m2*n2*2.0;
    float d = c3 + m2*n2;
    float g = m + m*n2;
    float co;
    if( d<0.0 )
    {
        float h = acos(q/c3)/3.0;
        float s = cos(h);
        float t = sin(h)*sqrt(3.0);
        float rx = sqrt( -c*(s + t + 2.0) + m2 );
        float ry = sqrt( -c*(s - t + 2.0) + m2 );
        co = (ry+sign(l)*rx+abs(g)/(rx*ry)- m)/2.0;
    }
    else
    {
        float h = 2.0*m*n*sqrt( d );
        float s = sign(q+h)*pow(abs(q+h), 1.0/3.0);
        float u = sign(q-h)*pow(abs(q-h), 1.0/3.0);
        float rx = -s - u - c*4.0 + 2.0*m2;
        float ry = (s - u)*sqrt(3.0);
        float rm = sqrt( rx*rx + ry*ry );
        co = (ry/sqrt(rm-rx)+2.0*g/rm-m)/2.0;
    }
    vec2 r = ab * vec2(co, sqrt(1.0-co*co));
    return length(r-p) * sign(p.y-r.y);
}


float sdUnevenCapsule( vec2 p, float r1, float r2, float h )
{
    p.x = abs(p.x);
    float b = (r1-r2)/h;
    float a = sqrt(1.0-b*b);
    float k = dot(p,vec2(-b,a));
    if( k < 0.0 ) return length(p) - r1;
    if( k > a*h ) return length(p-vec2(0.0,h)) - r2;
    return dot(p, vec2(a,b) ) - r1;
}

float sdCloud1( vec2 uv, float x, float y) {
   float d1 = sdRoundedBox(uv  - vec2(x, y), vec2(.14, .040), vec4(.05, .03, .05, .03) );
   float m1 = S(0.008, 0., d1);
   float d2 = sdEllipse(uv - vec2(x - .035, y+.01), vec2(.05, .05));
   float m2 = S(0.008, .00, d2);
   float d3 = sdEllipse(uv - vec2(x + .06, y+.03), vec2(.045, .06));
   float m3 = S(0.008, .00, d3);
   float d4 = sdEllipse(uv - vec2(x - .02 , y+.04), vec2(.05, .04));
   float m4 = S(0.008, .00, d4);
  return m1 + m2 + m3 + m4;
}

float sdCloud2( vec2 uv, float x, float y) {
   float d1 = sdRoundedBox(uv  - vec2(x, y), vec2(.14, .04), vec4(.05, .03, .05, .03) );
   float m1 = S(0.008, 0., d1);
   float d2 = sdEllipse(uv - vec2(x + .07, y+.02), vec2(.03, .055));
   float m2 = S(0.008, .00, d2);
   float d3 = sdEllipse(uv - vec2(x - .06, y+.02), vec2(.05, .06));
   float m3 = S(0.008, .00, d3);
   float d4 = sdEllipse(uv - vec2(x , y + 0.03), vec2(.055, 0.065));
  float m4 = S(0.008, .00, d4);
  return  m1 + m2 + m3 + m4;
}

float sdRainbow( vec2 uv) {
  // float s1 = abs(sdEllipse( uv - vec2(0.5, .5), vec2(.3, .3) ) ) - .02;
  float s1 = sdEllipse( uv - vec2(0., -.5), vec2(.3, .3) ) ;
  float m1 = S(0.075, 0.0, s1);
   float s2 = sdCircle( uv - vec2(0., -.5), .3 ) ;
  float m2 = S(0.075, 0.0, s2);
   float s3 = sdCircle( uv - vec2(0., -.48), .28 ) ;
  float m3 = S(0.075, 0.0, s3);
  float s4 = abs(sdEllipse( uv - vec2(0.0, 1.), vec2(.45, .45)) ) - .02;
  float m4 = S(0.01, 0.0, s4);
  return m2;//+ m2*RED;
}

void main()
{
    vec2 uv = (gl_FragCoord.xy -.5*u_resolution.xy)/u_resolution.y;
	
    vec3 col = vec3(0);
    vec3 sky = CG(uv, RASPBERRY, YELLOW, .5);
 
    // Uncomment to check for symmetry
    float d1 = sdSegment(uv, vec2(-.5, .0), vec2(0.5, .0));
    float l1 = S(.008, .0, d1); // horizontal center line
    float d2 = sdSegment(uv, vec2(0., -.5), vec2(0., .5));
    float l2 = S(.008, .0, d2); // vertical center line
    float d3 = sdSegment(uv, vec2(.25, .5), vec2(.25, -.5));
    float l3 = S(.008, .0, d3); // vertical center line
    //col += l1 + l2  + l3;
  
   // Change a (angle) to get Up, Down, Right, Left
   // a = 0. vertical, a = 1. horizontal
   float a = 3.; //  Right 0., Up  1., Left 2., Down 3. 
  
   float x = -iTime*.01;
  float cloud1 = sdCloud1(uv, x+.4, 0.28);
   float cloud2 = sdCloud2(uv, x, 0.24);
  float rb = sdRainbow(uv);
  //float mrb = S(.01, 0.0, rb);
  col = sky + rb*ORANGE;
   //col = (1.-rb)*sky + cloud1 + cloud2  + rb ;
  
    gl_FragColor = vec4(col,1.0);
}
