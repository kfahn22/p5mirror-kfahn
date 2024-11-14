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


int GetNeighbors(ivec2 p) {
  int num = 0;
  
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
       if (x == 0 && y == 0) continue;
       num += texelFetch(tex0, p + ivec2(x,y), 0).r > .5 ? 1 : 0;
    }
  }
}
void main( )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
   
    
    vec3 col = vec3(0.0);
    
  if (iFrame<10)
    col = texture2D(tex0, uv);
  else {
    bool alive = texelFetch(tex0, ivec2(gl_FragCoord), 0).r > .5;
    int num = GetNeighbors(ivec2(gl_FragCoord));
    
    float next = 0.
      if (alive && (num==2 || num == 3))
        num =1;
    else if ( !alive && num == 3)
      next = 1;
    else 
      next = 0;
     
    col = vec4(0);
  
  }
//     // Output to screen
     col = vec3(1.0, 0.0, 1.0)*mask;  // shape is referred as a mask
    
    gl_FragColor = vec4(col, 1.0);
}
