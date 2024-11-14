// Using Jaffer et al's approach to mathematical marbling.
// http://people.csail.mit.edu/jaffer/Marbling/
#ifdef GL_ES
precision mediump float;
#endif

const float ALPHA = 0.25;
const float LAMBDA = 0.02;
const int MAX_OPS = 32;

uniform sampler2D backgroundTexture;
//uniform vec2 resolution;
uniform vec3 backgroundColor;
uniform int operationCount;
uniform Operation operations[MAX_OPS];
// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;



struct Operation {
  int type;
  float scale;
  vec4 color;
  vec2 start;
  vec2 end;
};


vec4 getColorAtPosition(vec2 p) {

  for (int i = 0; i < MAX_OPS; i++) {
    if (i >= operationCount) {
      return texture2D(backgroundTexture, p);
    }

    Operation op = operations[i];

    // Drop
    if (op.type == 0) {
      vec2 d = p - op.start;
      float r = length(op.end - op.start) * op.scale;
      float l = length(d);
      if (l < r) {
        return op.color;
      }
      else {
        float l2 = sqrt((l * l) - (r * r));
        p = op.start + (d / l * l2);
      }
    }

    // Comb
    else if (op.type == 1) {
      float alpha = length(op.end - op.start);
      float beta = max(op.scale * 0.25, 2.0 / (u_resolution.x + u_resolution.y));

      if (alpha > 0.01) {
        vec2 m = (op.end - op.start) / alpha;
        vec2 n = vec2(-m.y, m.x);
        float l1 = length(dot(p - op.start, n));
        float l2 = abs(mod(l1, beta * 2.0) - beta);
        float l3 = (alpha * LAMBDA) / (beta - l2 + LAMBDA);
        p = p - (m * l3 * pow(l2 / beta, 2.0));
      }
    }
  }

  return texture2D(backgroundTexture, p);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  gl_FragColor = getColorAtPosition(uv);
}
