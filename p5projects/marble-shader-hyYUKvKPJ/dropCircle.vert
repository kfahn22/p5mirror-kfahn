// Vertex shader for dropCircle

// Attributes
attribute vec3 aPosition;
attribute vec2 aTexCoord;

// Uniforms
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

// Varyings
varying vec2 vTexCoord;

void main() {
  // Set vertex position
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
  
  // Pass texture coordinates to fragment shader
  vTexCoord = aTexCoord;
}
