// attribute vec3 vertexPosition;

// void main() {
// 	gl_Position = vec4(vertexPosition, 1);
// }

#ifdef GL_ES
precision mediump float;
#endif

// our vertex data
attribute vec3 aPosition;

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;

void main() {

  // Copy the position data into a vec4, adding 1.0 as the w parameter
 
  vec4 positionVec4 = vec4(aPosition, 1.0);
  
  // Scale to make the output fit the canvas
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0; 

  // Send the vertex information on to the fragment shader
  gl_Position = positionVec4;
}