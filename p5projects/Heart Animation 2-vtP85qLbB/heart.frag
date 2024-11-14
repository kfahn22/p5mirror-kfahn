// Adapted to P5.js from the Art of Code YouTube star field tutorial
// by Martijn Steinrucken aka The Art of Code/BigWings - 2020
// YouTube: youtube.com/TheArtOfCodeIsCool

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
#define PI 3.14159

#define DKPURPLE vec3(53, 5, 68) / 255.
#define PURPLE vec3(83, 29,109) / 255.
#define RED vec3(191, 18, 97) / 255.
#define BLUE vec3(118, 212, 229) / 255.
#define PINK vec3(236,203,217) / 255.

// Function to create a color gradient
vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}

mat2 Rot( float a) 
{
   float s = sin(a);
   float c = cos(a);
   return mat2(c, -s, s, c);
}

// Spherical function modified from Daniel Shiffman
vec2 Spherical( vec2 pos) 
{
   float r = sqrt(pos.x*pos.x + pos.y*pos.y);
   float theta = atan(pos.y, pos.x);
   vec2 w = vec2(r, theta);
   return w;
}

float Heart( vec2 uv) {
  vec2 q;
  //Take the absolute value to make it symmetrical
   uv.x = abs(0.7*uv.x);
  // Take the negative to flip it right side up
   uv.y = -1.2*uv.y;
   
  float th = Spherical(uv).y;
  th = clamp(th, -2., -1.);

  // Equation for Heart curve 1
  float r = 9.0 * pow(sin(th), 7.0) * pow(2.71828, 2.0 * th);
  q.x = r * cos(th);
  q.y = -r * sin(th);

  float d = length(uv - q) ;
  float s = S(0.3, 0.299, d);
  return s;
}

// pseudo-random number function from Art of Code
 float Hash21(vec2 p)
 {
  p = fract(p*vec2(123.34, 456.21));
  p += dot(p, p+45.32);
  return fract(p.x*p.y);
 }
 
 // HeartLayer function adapted from StarLayer function from Art of Code
 vec3 HeartLayer(vec2 uv)
 {
    //vec3 col = vec3(0.);
    vec3 col = DKPURPLE;
    //col = colorGradient(uv, RED, DKPURPLE, 0.8);
    
    // Make boxes with (0,0) in middle
    vec2 gv = fract(uv) - 0.5;
    
    // Add Hearts
    // Add id for boxes
    vec2 id = floor(uv);
    
    // Iterate through neighborhood of box to add contribution from neighbors
    for (int  y =-1; y <= 1; y++)
    {
      for (int x=-1; x <= 1; x++) 
      {
         vec2 offset = vec2(x,y);
         float n = Hash21(id+offset);  // random number between 0,1
         
         //  Make hearts different sizes
         float size = fract(n*345.678);
         // Add by .5 to keep values between -.5, .5
        float heart = Heart( gv - offset- vec2(n, fract(n*56.)) +.5); 
        vec3 c = sin(vec3(0.6, 0.2, 0.6)*fract(n*2345.2)*19.)*.5+.5;
       // vec3 color = clamp(sin(vec3(0.6, 0.2, 0.6)*fract(n*2345.2)*19.)*.5+.5, vec3(0.8, 0., 0.9), vec3(0.8, 0., 0.9);
        vec3 color = clamp(c, vec3(0.9, 0.1, 0.2), vec3(0.8, 0.1, 0.6));
        //color += color*vec3(0.8*pow(size, 0.5), 0.01*pow(size, 0.5), 0.8*pow(size, 0.5)); // can filter out color by change R/G/B value to 0.
        
        // Add a twinkle
        //heart *= sin(iTime*3.+n*6.2831)*.5 + 1.;
        col += heart*size*color;
      }
    }
    return col;
}

void main()
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = (gl_FragCoord.xy - 0.5*u_resolution.xy)/u_resolution.y;
    float t = iTime*.02;
    //uv *= Rot(t);
    
    vec3 col = vec3(0.);

    for (float i=0.; i<1.; i += 1./NUM_LAYERS)
    {
      // Depth increases with time; if hits 1 get reset
      float depth = fract(i+t);
      //float scale = mix(20., 0.5, depth);
      float scale = mix(8., 0.5, depth);
      // Adjust so that repeat is not noticable
      float fade = depth*smoothstep(1., .8, depth); 
      col += HeartLayer(uv*scale+i*453.)*fade; // add value so layers are shifted
       
    }
    gl_FragColor = vec4(col,1.0);
}