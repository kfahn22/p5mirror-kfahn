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
uniform sampler2D u_tex0;
uniform sampler2D u_tex1;

varying vec2 vTexCoord;

#define S smoothstep
#define N 2.;
#define RED vec3(255, 0, 0) / 255.

float N21( vec2 p) {
    return fract( sin(p.x*100. + p.y*6574.)*5674. );
}


vec3 Fuzzy( vec2 p ) {
  float v1 = N21(p*23.42);
  float v2 = N21(p*45.23);
  float v3 = N21(p*35.12);
  return  vec3(v1, v2, v3);
}

float remap01(float a, float b, float t)
{
 return (t-a) / (b-a);
}

float remap(float a, float b, float c, float d, float  t)
{

  return remap01(a,b,t) * (d-c) + c;
}

// From Inigo Quilez
// https://iquilezles.org/articles/distfunctions2d/
float sdBox(  vec2 p, vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

vec3 GetColor(vec2 uv )
 {
  //float n = u_resolution.x;
  float n = 4.;
   vec2 gv = fract(uv*n) - 0.5;
   vec3 col = vec3(0.);
   vec4 tex_origin = texture2D(u_tex1, uv);
   vec4 texOffset;
   // vec2 left = vec2(-1.0,0.0) / u_resolution.xy;
   // vec2 gv_left = gv + left;
   vec4 tex;
   // tex_left = texture2D(u_tex0, gv_left);
   vec2 gv_offset;
   for (float y = -1.; y<=1.; y++) {
     for (float x = -1.; x <=1.; x++) {
      vec2 uv_offset = (uv + 1./n * vec2(x, y));
      vec2 gv_offset = (gv + 1./n * vec2(x, y));
       
      // vec2 uv_offset = (uv + vec2(x, y));
      // vec2 gv_offset = (gv + 1./n * vec2(x, y));
      
      vec2 offset = vec2(uv_offset - gv_offset/ n);
      texOffset = texture2D(u_tex1, uv_offset);
        
       if (texOffset.r > 0.25 || texOffset.g > 0.25) {
         tex = max(tex_origin, texOffset);
       }
       else {
         tex = min(tex_origin, texOffset);
       }
     }
   }
  //col = tex.rgb;
  col = texOffset.rgb;
  return col;
}

vec2 Offset(vec2 uv, float x, float y)
 {
    float n = 40.;
    vec2 gv = fract(uv*n) - 0.5;
    vec2 gv_offset = (gv + 1./n * vec2(x, y));
    vec4 texOffset = texture2D(u_tex1, gv_offset);

  return gv_offset;
}

vec2 AddNeighbors(vec2 uv )
 {
  //float n = u_resolution.x;
  float n = 1.;
   
   vec3 col = vec3(0.);
   vec4 tex_origin = texture2D(u_tex1, uv);
   vec4 texOffset;
   // vec2 left = vec2(-1.0,0.0) / u_resolution.xy;
   // vec2 gv_left = gv + left;
   vec4 tex;
   // tex_left = texture2D(u_tex0, gv_left);
   vec2 gv_offset;
   // for (float y = -1.; y<=1.; y++) {
   //   for (float x = -1.; x <=1.; x++) {
      vec2 or = Offset(uv, 0., 0.);
      vec2 lt = Offset(uv, -1., 0.);
      vec2 rt = Offset(uv, 0., 1.);
      
      vec2 sum = or + lt + rt;
      tex = max(texture2D(u_tex0, lt), texture2D(u_tex0, rt));
   
  //col = tex.rg;
  return tex.rg;
}


void main( )
{
    // Normalized pixel coordinates (from 0 to 1)
    //vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;
    vec4 tex;
    //float t =  iTime;
  
    vec3 col = vec3(0);
    //vec3 col = Fuzzy(uv);
//     if (iFrame < 10.0) { // initialize
//          col = texture2D(u_tex0, uv).rgb;
//        } else {
//        bool alive = texture2D(u_tex1, uv).b > 0.1;
//        //float num = GetNeighbors(st);
//          col.rgb = GetLeftNeighbors(uv);
//          //col = vec3(0.1, 1., 0.1);
//      }
    vec2 an = AddNeighbors(uv);
   col = texture2D(u_tex1, an).rgb;
    gl_FragColor = vec4(col, 1.);
}
