// Based on Shader Coding: Truchet Tiling Explained by The Art of Code
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


#define PINK vec3(236, 82, 184)/255.
#define BLUE vec3(0, 3, 105)/255.
#define S smoothstep
#define T iTime


float hash1( float n )
{
    return fract( n*17.0*fract( n*0.3183099 ) );
}

float HexDist( vec2 p)
  {
   // take absolute value to get uvs in NE quadrant
   p = abs(p);
   float c = dot( p, normalize( vec2(1., 1.73) ) );
   c = max(c, p.x);
  
  return c;
}

vec2 Remap(vec2 p, float b, float l, float t, float r) {
 return vec2( (p.x - l)/(r-l) , (p.y-b)/(t-b) );
}

vec4 Coord(vec2 uv)
  {
   // Make 2 square grids and then offset them so they fall on each others corners
    // Change to rectangle that encloses a hexagon
    vec2 r = vec2(1, 1);  // repeat rate
    vec2 h = r -.5;
    vec2 a = mod(uv, r) - h;
    vec2 b = mod(uv - h, r) - h;
  
    // Find id of hexagon
    vec2 gv;
    if ( length(a)<length(b) )
      gv = a;
    else
      gv = b;
  
    // distance to edge
    // float x = atan(gv.x, gv.y); 
    // float y = 0.5 - HexDist(gv);
    // vec2 id = uv - gv;
  
   // distance to edge
    float x = gv.x; 
    float y = gv.y;
    vec2 id = uv - gv;
    return vec4(x, y, id.x, id.y);
}

void main()
{
    vec2 uv = gl_FragCoord.xy/u_resolution.y;
	vec2 m = iMouse.xy/u_resolution.xy;

    vec3 col = BLUE;
  
    vec3 col1 = PINK;
    vec3 col2 = BLUE;
    vec3 col3 = mix(PINK, BLUE, .5);
  
    // create a bunch of grids (multiplication value determines # of grids)
    // Subtract .5 so that 0,0 stays in center of grid
    float size = 8.;
    float l = size*size;
    uv *= size;
    vec2 gv = fract(uv);
    vec2 id = floor(uv);
    
   
    vec4 hc = Coord(uv);
    vec2 pos = S(.01, .0, id.xy);
    // col = mix(col1, col2, c);
  
//    // Get a random number between 0,1
//     float n = Hash21(id);
//    float c = 0.;
   for ( float y = 0.; y < 64.; y++) {
     for ( float x = 0.; x < 64.; x++) {
     // float n = floor(hash1(64.));
      float l = length( uv- vec2(gv.x+1., gv.y + 6.) );
     
      float s1 = S(.008, .0, l);
      col += s1*col3;
      
     }
     
   }
     
//     float blur = .005;
//     for(float i=0.; i<1.; i+=1./10.) {  
//         float scale = mix(35., 1., i);  // make layers further away smaller
//     	vec4 layer = Layer(uv*scale+vec2(t+ i*75., t*.1 + i + .05)-.2, blur); 
//         // Add some brown color for the mountains
//         // Make more distant peaks lighter in color
//     	layer.rgb *= (1. - i)*LTBROWN; 
//         col = mix(col, layer, layer.a); // Mix the sky with the mountains
    
//     }
  
//    col += (pos.x - pos.y)*PINK;

//    col += (size*0.5)*(pos.x * pos.y)*col3;
 
   
//     float d = abs(gv.y);
  
//     float mask =  smoothstep( .01, -.01, d - width);
    
  
    // Add colors by mixing, using mask to interpolate between col1 & col2
  
    //col = mix(col1, col2, mask);
    //col += n;
    
  // col.rg += id*.05;  // visualize id 
  
   // Draw an outline around the grid
   //if (gv.x > .48 || gv.y > .48) col = vec3(0,0,1);
   
    
    //col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}