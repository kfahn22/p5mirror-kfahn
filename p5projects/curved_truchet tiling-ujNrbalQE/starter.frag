// Based on Shader Coding: Truchet Tiling Explained by The Art of Code
// YouTube: youtube.com/TheArtOfCodeIsCool

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform float iFrame;
uniform vec2 iMouse;
uniform sampler2D tex0;

#define T iTime

// Function to take r,g,b values to range 0,1
// Remember to input a float!
vec3 rgb( float r, float g, float b) 
{
   return vec3(r/ 255.0, g / 255.0, b / 255.0);
}

float Hash21(vec2 p)
  {
  p = fract(p*vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x*p.y);
}

void main()
{
    vec2 uv = (gl_FragCoord.xy - .5*u_resolution.xy)/u_resolution.y;
    vec2 UV = gl_FragCoord.xy/u_resolution.xy;
	vec2 m = iMouse.xy/u_resolution.xy;

    vec3 col = vec3(0.);
    
    //vec3 col = vec3(0.);
    vec3 col1 = rgb(84.,101.,255.);
    vec3 col2 = rgb(191.,215.,255.);
  
  
    // create a bunch of grids (multiplication value determines # of grids)
    // Subtract .5 so that 0,0 stays in center of grid
    uv *= 5.;
    vec2 gv = fract(uv) - .5;
    vec2 id = floor(uv);
    
   // Get a random number between 0,1
    float n = Hash21(id);
  
    // Create a diagonal line by taking absolute value of  gradient 
    // Adjust width by y values
    float width = .2*UV.y;  // width of line
  
   //Randomly change direction of line
    if (n<.5) gv.x *= -1.;
  
    // Make circle
    // Make radius .5 so that circle goes to middle of edge
    // Take sign to get other half of circle
    float d = length(gv - sign(gv.x + gv.y+.001) - .5);
    vec2 cUv = gv - sign(gv.x + gv.y+.001) * .5;
    d = length(cUv);
    float mask =  smoothstep( .01, -.01, abs(d-.5) - width );
    // Add some texture
    float angle = atan(cUv.x, cUv.y);  // -pi to pi
  
    //Add checkerboard pattern
    float checker = mod(id.x + id.y, 2.) *2. -1.;  // adjustments to remap values
    
    // won't always be able to find constistent flow
    float flow = sin(iTime + checker*angle*10.);
 
    // X coordinate goes along swiggle
    // y coordinate perpendicular to swiggle
    //float x = fract(angle*checker/1.57*iTime);
    float x = (checker*angle/1.57 + iTime*.3);
    float y = (d - (.5-width) )/(2.*width);
    y = abs(y-.5)*2.;
    vec2 tUv= vec2(x, y);
  
    col = mix(col1, col2, mask);
    //col += texture2D(tex0, tUv).rgb*mask;
    col *= 1. - tUv.y;
    // col.rg += tUv*mask;
    // col += y*mask;
    //col.rg += id*.3;  // visualize id 
    
   // Draw an outline around the grid
   //if (gv.x > .48 || gv.y > .48) col = vec3(0,0,1);
   
    
    //col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}