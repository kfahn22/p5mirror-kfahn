
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
#define SIZE 4.
#define BRUSH_SIZE 1.
#define SPEED 2  // smaller number goes faster

int GetNeighbors(ivec2 p) {
   int num = 0;
   
   for(int y=-1; y <= 1; y++) {
     for(int x = -1; x <= 1; x++) {
         if ( x==0 && y == 0 ) continue;
           num += texelFetch(iChannel1, p+ivec2(x,y), 0).r > .5 ? 1 : 0;  // at mip 0
         }
     }
     return num;
}


void main(  )
{
    vec2 uv = gl_FragCoord/u_resolution.xy;
    vec4 col = vec4(0);
    
    if (iFrame<10) // initialize
      col = texture2D(iChannel0, uv);  // only update every 10th frame
    else if (iFrame % SPEED != 0) 
      col = texture2D(iChannel1, uv);
    else {  // do life
      bool alive = texelFetch(iChannel1, ivec2(gl_FragCoord), 0).r > 0.5;
      int num = GetNeighbors( ivec2(gl_FragCoord));
      
    
      
      int next = alive && num==2 || num==3 ? 1 : 0;
     
        
      /*  if (alive && (num==2 || num==3))
        next = 1;
      else if (!alive && num==3)
        next = 1;
      else 
        next = 0; */
        
      col = vec4(next);
      }
      if (iMouse.z > 0.5 && distance(iMouse.xy/SIZE, fragCoord.xy) < BRUSH_SIZE) col = vec4(1.);
    gl_FragColor = col;
}