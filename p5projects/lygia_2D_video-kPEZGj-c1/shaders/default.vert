// #ifdef GL_ES
// precision mediump float;
// #endif

// attribute vec3 aPosition;

// varying vec2   v_texcoord;

// void main() { 
//   v_texcoord = aPosition.xy;
//   v_texcoord.y = 1.0-v_texcoord.y;
//   gl_Position = vec4(aPosition * 2.0 - 1.0, 1.0); 
// }

// // vert file and comments from adam ferriss
// // https://github.com/aferriss/p5jsShaderExamples

// our vertex data
attribute vec3 aPosition;
attribute vec2 aTexCoord;

// lets get texcoords just for fun!
varying vec2 v_texcoord;

void main() {
    // copy the texcoords
    v_texcoord = aTexCoord;
    
    // copy the position data into a vec4, using 1.0 as the w component
    vec4 positionVec4 = vec4(aPosition, 1.0);
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
    
    // send the vertex information on to the fragment shader
    gl_Position = positionVec4;
}
