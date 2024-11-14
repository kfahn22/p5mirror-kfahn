// Ported to P5.js from "RayMarching starting point" 
// by Martijn Steinrucken aka The Art of Code/BigWings - 2020
// The MIT License
// YouTube: youtube.com/TheArtOfCodeIsCool

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;
uniform sampler2D tex0;

#define S smoothstep

float N21( vec2 p) {
    return fract( sin(p.x*100. + p.y*6574.)*5674. );
}


// float SmoothNoise(vec2 uv) {
//    // lv goes from 0,1 inside each grid
//    // check out interpolation for dummies
//     vec2 lv = fract(uv);
   
//    //vec2 lv = smoothstep(0., 1., fract(uv*10.));  // create grid of boxes 
//     vec2 id = floor(uv); // find id of each of the boxes
//      lv = lv*lv*(3.-2.*lv); 
    
//     // get noise values for each of the corners
//     // Use mix function to join together
//     float bl = N21(id);
//     float br = N21(id+vec2(1,0));
//     float b = mix (bl, br, lv.x);
    
    
//     float tl = N21(id + vec2(0,1));
//     float tr = N21(id+vec2(1,1));
//     float t = mix (tl, tr, lv.x);
    
//     return mix(b, t, lv.y);
// }

// float SmoothNoise2 (vec2 uv) {
//    float c = SmoothNoise(uv*4.);
//      // Layer(or octave) of noise
//     // Double frequency of noise; half the amplitude
//     c += SmoothNoise(uv*8.)*.5;
//     c += SmoothNoise(uv*16.)*.25;
//     c += SmoothNoise(uv*32.)*.125;
//     c += SmoothNoise(uv*64.)*.0625;
    
//     return c/ 2.;  // have to normalize or could go past 1
  
// }
// mat2 Rot(float a) {
//     float s=sin(a), c=cos(a);
//     return mat2(c, -s, s, c);
// }

float Circle( vec2 uv, vec2 pos, float r, float blur ) 
{
    float d = length(uv - pos);
    float c = smoothstep(r, r-blur, d);
    return c;
}



// float Band( float t, float start, float end, float blur)
// {
//     float step1 = smoothstep(start-blur, start+blur, t);
//     float step2 = smoothstep(end+blur, end-blur, t);
//     return step1*step2;
// }


// float Rect(vec2 uv, float left, float right, float bottom, float top, float blur)
// {
//   float band1 = Band(uv.x, left, right, blur);
//   float band2 = Band(uv.y, bottom, top, blur);
//  return band1*band2; 
// }

float Band( float t, float start, float end)
{
    float step1 = smoothstep(start, start, t);
    float step2 = smoothstep(end, end, t);
    return step1*step2;
}

float Rect(vec2 uv, float left, float right, float bottom, float top)
{
  float band1 = Band(uv.x, left, right);
  float band2 = Band(uv.y, bottom, top);
 return band1*band2; 
}

float Smiley(vec2 uv, vec2 pos, float size) 
{
    uv -= pos; // translating coordinate system
    uv *= size;  // scaling the coordinate system (equivalent by dividing)
    float mask = Circle(uv, vec2(0.), 0.4, 0.01); //vec2 indicates pos of circle
    mask -= uv.y  + .1;
    // mask -= Circle(uv, vec2(-0.13, .2), 0.07, 0.01);
    // mask -= Circle(uv, vec2(0.13, .2), 0.07, 0.01);
 
//     float mouth = Circle(uv, vec2(0., 0.), 0.3, 0.02);
//     mouth -= Circle(uv, vec2(0., 0.1), 0.3, 0.02);
    
    //mask -= mouth;
    
    return mask;
}


float remap01(float a, float b, float t)
{
 return (t-a) / (b-a);
}

float remap(float a, float b, float c, float d, float  t)
{

  return remap01(a,b,t) * (d-c) + c;
}

void main( )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    float t =  iTime;
    uv -= 0.5;  // this changed origin of circle  ! this is really a vec2
    
    vec3 col = vec3(0.0);
    
    uv.x *= u_resolution.x/u_resolution.y;  // multitply by the aspect ratio
   
  
    float c = Circle(uv, vec2(0.), 0.25, 0.02);
    float mask = Smiley(uv, vec2(0.0, 0.0), 1.0);
    
    
    //float mask = 0.0;
    
   
    float x = uv.x;
   // float m = -(x-0.5)*(x+0.5);
   float m = sin(t + x*8.)*0.1;
   // m = m*m*2.0;
    float y = uv.y - m;
    
//     float blur = remap( -0.5, 0.5, 0.01, 0.25, x);
//     blur = pow(blur*4., 3.);  // nonliner blur
    //x += y*0.2;  // skew the box by changing vertexs (-0.2+y*0.2, 0.2-y*0.2,-0.3)
    //
    mask = Rect(vec2(x,y), -0.5, 0.5,-0.1, 0.1);
    
//     // Output to screen
     col = vec3(1.0, 0.0, 1.0)*mask;  // shape is referred as a mask
    
    gl_FragColor = vec4(col, 1.0);
}
