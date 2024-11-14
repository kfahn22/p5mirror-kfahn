// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 iMouse;
uniform float iTime;

#define PINK vec3(236,82,184)/255.
#define PI 3.14159
#define S smoothstep

// Rotation Matrix
mat2 Rot(float a)
{ 
float s = sin(a), c = cos(a);
return mat2(c, -s, s, c);
}

float random (vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233)))*
              43758.5453);
}

float random (float x) {
  return fract(sin(x*12.9898));
}

float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

// Copied from Inigo Quilez
float sdSegment( vec2 uv, vec2 a, vec2 b) {
  vec2 pa = uv-a, ba = b-a;
  float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
  return length( pa-ba*h );
}

void main() {
  
     vec2 uv = (gl_FragCoord.xy- .5*u_resolution.xy)/u_resolution.xy;
   
  uv.y *= u_resolution.x/u_resolution.y;
  vec2 pos = uv.yx*vec2(10.,3.);
  float pattern = pos.y;
    // float t = iTime*.2;
    // uv *= Rot(t);  // add rotation

    pos = Rot(PI*iTime*.1)  * noise(pos)  * pos;
    
    float d = sdSegment( pos, vec2(-.5, 0.), vec2(.5, 0.) );
    //float m = S(.008, 0., d);
  
//   vec2 st = uv *4.;
//   float n = noise(st);
  
//   float x = uv.x;
  
//   float i = floor(x);
//   float f = fract(x);
//   float u = f * f * (3.0 - 2.0 * f );
  
  // vec2 i = floor(uv);
  // vec2 f = fract(uv);
  
// float  y = random(st);
 // float y = mix(random(i) , random(i + 7.0), u);
  
// // Loop of octaves
// for (int i = 0; i < octaves; i++) {
// 	y += amplitude * noise(frequency*x);
// 	frequency *= lacunarity;
// 	amplitude *= gain;
// }


 
    vec3 col = vec3(d)*PINK;
    //col += m;

    gl_FragColor = vec4(col,1.0);
}

